'use client'

import React, { useState, useEffect, ReactNode } from 'react'
import { Lock } from 'lucide-react'
import { PasswordModal, isPasswordVerified } from './PasswordModal'
import type { Project, Media } from '@/payload-types'
import { RichText } from './RichText'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ProtectedProjectPageProps {
  project: Project
  nav: ReactNode
  footer: ReactNode
  backLink?: string
  backLabel?: string
}

export const ProtectedProjectPage: React.FC<ProtectedProjectPageProps> = ({
  project,
  nav,
  footer,
  backLink = '/projects',
  backLabel = 'Voltar para Projetos',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    // Check if already verified on mount
    const verified = isPasswordVerified()
    setIsUnlocked(verified)
    setHasChecked(true)

    // If protected and not unlocked, show modal
    if (project.isPasswordProtected && !verified) {
      setIsModalOpen(true)
    }
  }, [project.isPasswordProtected])

  const handleUnlockSuccess = () => {
    setIsUnlocked(true)
    setIsModalOpen(false)
  }

  const imageUrl = typeof project.image === 'object' ? (project.image as Media)?.url : ''

  // Don't render anything until we've checked localStorage
  if (!hasChecked) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#fdfcf0] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // If protected and not unlocked, show lock screen
  if (project.isPasswordProtected && !isUnlocked) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#fdfcf0]">
        {nav}

        <main className="flex flex-col items-center justify-center min-h-[80vh] px-6">
          <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
            <Lock className="text-[#fdfcf0]" size={40} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-center">
            Protected Project
          </h1>
          <p className="text-zinc-500 text-center max-w-md mb-8">
            This project is password protected. Click below to unlock.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#fdfcf0] text-black px-8 py-4 font-bold uppercase text-sm hover:bg-zinc-200 transition-colors"
          >
            Unlock Project
          </button>
          <Link
            href={backLink}
            className="mt-8 text-zinc-500 hover:text-[#fdfcf0] transition-colors uppercase text-xs tracking-widest flex items-center gap-2"
          >
            <ArrowLeft size={14} /> {backLabel}
          </Link>
        </main>

        {footer}

        <PasswordModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleUnlockSuccess}
          projectTitle="this project"
        />
      </div>
    )
  }

  // Show full project content
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fdfcf0] selection:bg-[#fdfcf0] selection:text-black">
      {nav}

      <main>
        {/* Cover Section */}
        <div className="relative h-[60vh] w-full border-b border-zinc-800 overflow-hidden group">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
              />
              <div className="absolute inset-0 bg-black/50" />
            </>
          ) : (
            <div className="absolute inset-0 bg-zinc-900 w-full h-full flex items-center justify-center text-zinc-700">
              [SEM IMAGEM]
            </div>
          )}

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto w-full">
            <Link
              href={backLink}
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#fdfcf0] transition-colors mb-6 uppercase text-xs tracking-widest w-fit"
            >
              <ArrowLeft size={14} /> {backLabel}
            </Link>

            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-[#fdfcf0]">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 md:gap-8 text-sm uppercase tracking-widest text-zinc-400 font-bold">
              {project.company && (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#fdfcf0] rounded-full" />
                  {project.company}
                </span>
              )}
              {project.type && (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-zinc-600 rounded-full" />
                  {project.type === 'app' ? 'App' : 'Website'}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 md:px-12 py-20">
          {/* Sidebar Info */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="border-t border-zinc-800 pt-6">
              <h3 className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-4">Role</h3>
              <p className="text-xl font-bold uppercase">{project.role}</p>
            </div>

            <div className="border-t border-zinc-800 pt-6">
              <h3 className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, i) => (
                  <span
                    key={i}
                    className="border border-zinc-800 px-3 py-1 text-xs uppercase tracking-wider hover:bg-zinc-900 transition-colors cursor-default"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-6">
              <h3 className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-4">Data</h3>
              <p className="text-sm font-mono text-zinc-400">
                {new Date(project.createdAt).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                })}
              </p>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-invert prose-lg max-w-none ">
              {project.content && <RichText data={project.content} />}
            </div>
          </div>
        </div>
      </main>

      {footer}
    </div>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Lock } from 'lucide-react'

import { PasswordModal, isPasswordVerified } from '@/components/PasswordModal'
import type { Media, Project } from '@/payload-types'

interface PortfolioV3ProjectCardProps {
  project: Project
  basePath?: string
}

export const PortfolioV3ProjectCard: React.FC<PortfolioV3ProjectCardProps> = ({
  project,
  basePath = '/projects',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)

  const isProtected = Boolean(project.isPasswordProtected)
  const href = project.slug && !isProtected ? `${basePath}/${project.slug}` : '/#'

  useEffect(() => {
    setIsUnlocked(isPasswordVerified())
  }, [])

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isProtected && !isUnlocked) {
      e.preventDefault()
      setIsModalOpen(true)
    }
  }

  const handleUnlockSuccess = () => {
    setIsUnlocked(true)
    if (project.slug) {
      window.location.href = `${basePath}/${project.slug}`
    }
  }

  const imageUrl =
    typeof project.image === 'object' && project.image !== null
      ? (project.image as Media)?.url
      : null

  return (
    <>
      <article className="group relative min-h-[360px] overflow-hidden rounded-xl border border-white/5 bg-[#080808] transition-colors hover:border-white/15">
        <Link
          href={href}
          onClick={handleCardClick}
          className="absolute inset-0 z-20"
          aria-label={project.title}
        />

        {imageUrl && (
          <div className="absolute inset-0 m-2 overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={isProtected && !isUnlocked ? 'Protected project' : project.title}
              fill
              className={`scale-100 object-cover transition-all duration-700 ${
                isProtected && !isUnlocked
                  ? 'opacity-20 grayscale'
                  : 'opacity-40 group-hover:scale-105 group-hover:opacity-60'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />
          </div>
        )}

        {isProtected && !isUnlocked && (
          <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[5px]">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/8">
              <Lock size={20} />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">
              Protected
            </span>
            <span className="mt-1 text-xs text-white/55">Click to unlock</span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 z-10 w-full p-7">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0 pr-2">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-orange-400">
                {project.type}
              </span>
              <h3 className="mb-1 text-xl font-bold md:text-2xl">{project.title}</h3>
              <p className="line-clamp-2 text-sm text-white/40">{project.company}</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all group-hover:bg-white group-hover:text-black">
              <ArrowUpRight size={18} />
            </div>
          </div>
        </div>
      </article>

      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUnlockSuccess}
        projectTitle={project.title}
      />
    </>
  )
}

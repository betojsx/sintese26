'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import { PasswordModal, isPasswordVerified } from './PasswordModal'
import type { Project, Media } from '@/payload-types'

interface ProtectedProjectCardProps {
  project: Project
  className?: string
  isPasswordProtected?: boolean
  basePath?: string
}

export const ProtectedProjectCard: React.FC<ProtectedProjectCardProps> = ({
  project,
  className = '',
  isPasswordProtected = false,
  basePath = '/projects',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    // Check if already verified on mount
    setIsUnlocked(isPasswordVerified())
  }, [])

  const handleCardClick = (e: React.MouseEvent) => {
    if (isPasswordProtected && !isUnlocked) {
      e.preventDefault()
      setIsModalOpen(true)
    }
  }

  const handleUnlockSuccess = () => {
    setIsUnlocked(true)
    // Navigate to the project after successful unlock
    if (project.slug) {
      window.location.href = `${basePath}/${project.slug}`
    }
  }

  const imageUrl =
    typeof project.image === 'object'
      ? (project.image as Media)?.url
      : typeof project.image === 'string'
        ? project.image
        : ''

  return (
    <>
      <Link
        href={project.slug ? `${basePath}/${project.slug}` : '#'}
        onClick={handleCardClick}
        className={`group relative overflow-hidden border border-zinc-800 transition-all hover:border-zinc-500 ${
          isPasswordProtected && !isUnlocked ? 'cursor-default' : 'cursor-pointer'
        } ${className}`}
      >
        {/* Image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={isPasswordProtected && !isUnlocked ? 'Protected project' : project.title}
            className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
              isPasswordProtected && !isUnlocked
                ? 'opacity-20 grayscale'
                : 'opacity-40 grayscale group-hover:opacity-80 group-hover:grayscale-0'
            }`}
          />
        ) : (
          <div className="h-full w-full bg-zinc-900 flex items-center justify-center">
            <span className="text-zinc-700 font-mono text-xs">[NO IMAGE]</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

        {/* Password protection overlay */}
        {isPasswordProtected && !isUnlocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full bg-zinc-900/80 border border-zinc-700 flex items-center justify-center mb-3">
              <Lock className="text-[#fdfcf0]" size={24} />
            </div>
            <span className="text-[#fdfcf0] font-bold uppercase text-sm tracking-wider">
              Protected
            </span>
            <span className="text-zinc-500 text-xs mt-1">Click to unlock</span>
          </div>
        )}

        {/* Title section - only show when not protected or unlocked */}
        {(!isPasswordProtected || isUnlocked) && (
          <div className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-500 group-hover:translate-x-2">
            <h3 className="text-xl font-bold uppercase tracking-tight text-[#fdfcf0]">
              {project.title}
            </h3>
            <div className="mt-2 h-0.5 w-0 bg-[#fdfcf0] transition-all duration-500 group-hover:w-16" />
          </div>
        )}
      </Link>

      {/* Password Modal */}
      <PasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUnlockSuccess}
        projectTitle="this project"
      />
    </>
  )
}

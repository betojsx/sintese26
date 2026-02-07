'use client'

import Link from 'next/link'
import React from 'react'
import { Globe } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import type { Portfolio } from '@/payload-types'

interface PortfolioNavProps {
  portfolio?: Portfolio
}

export const PortfolioNav = ({ portfolio }: PortfolioNavProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLocale = searchParams.get('locale') || 'en'
  const nav = portfolio?.navigation

  const toggleLocale = () => {
    const newLocale = currentLocale === 'en' ? 'pt-BR' : 'en'
    const params = new URLSearchParams(searchParams.toString())
    params.set('locale', newLocale)
    window.location.href = `${pathname}?${params.toString()}`
  }

  return (
    <nav className="py-8 px-6 md:px-12 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/portfolio" className="text-foreground font-medium tracking-tight text-base">
            <p className="m-0!">roberto@sintese.dev</p>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-muted-foreground">
            <Link href="/portfolio#work" className="hover:text-foreground transition-colors">
              {nav?.projectsLabel || 'Projects'}
            </Link>
            <Link href="/portfolio#stack" className="hover:text-foreground transition-colors">
              {nav?.experienceLabel || 'Experience'}
            </Link>
            <Link href="/portfolio#contact" className="hover:text-foreground transition-colors">
              {nav?.contactLabel || 'Contact'}
            </Link>
          </div>

          {/* Language Switcher */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-2 p-2 rounded-full border border-border/50 bg-background/50 hover:bg-background transition-colors"
            aria-label={`Switch to ${currentLocale === 'en' ? 'Portuguese' : 'English'}`}
          >
            <Globe size={18} className="text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground uppercase">
              {currentLocale === 'en' ? 'EN' : 'PT'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}

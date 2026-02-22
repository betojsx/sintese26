'use client'

import Link from 'next/link'
import { Globe } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'

interface PortfolioV3LocaleToggleProps {
  currentLocale: 'en' | 'pt-BR'
}

export const PortfolioV3LocaleToggle = ({ currentLocale }: PortfolioV3LocaleToggleProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const nextLocale = currentLocale === 'en' ? 'pt-BR' : 'en'
  const params = new URLSearchParams(searchParams.toString())
  params.set('locale', nextLocale)

  return (
    <Link
      href={`${pathname}?${params.toString()}`}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 font-mono text-[11px] tracking-[0.18em] text-white/75 transition-colors hover:bg-white/10 hover:text-white"
      aria-label={currentLocale === 'en' ? 'Switch to Portuguese' : 'Switch to English'}
    >
      <Globe size={14} />
      <span>{currentLocale === 'en' ? 'EN' : 'PT'}</span>
    </Link>
  )
}

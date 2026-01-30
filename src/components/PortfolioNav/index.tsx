import Link from 'next/link'
import React from 'react'

export const PortfolioNav = () => {
  return (
    <nav className="flex items-center justify-between py-8 px-6 md:px-12 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-2">
        <Link href="/portfolio" className="text-foreground font-medium tracking-tight text-base">
          <p>roberto@sintese.dev</p>
        </Link>
      </div>

      <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-muted-foreground">
        <Link href="/portfolio#work" className="hover:text-foreground transition-colors">
          Projects
        </Link>
        <Link href="/portfolio#stack" className="hover:text-foreground transition-colors">
          Experience
        </Link>
        <Link href="/portfolio#contact" className="hover:text-foreground transition-colors">
          Contact
        </Link>
      </div>

      <button className="bg-primary text-primary-foreground! px-6 py-3 text-xs font-bold uppercase tracking-tighter hover:bg-primary/90 transition-colors border border-primary/20">
        Start Project
      </button>
    </nav>
  )
}

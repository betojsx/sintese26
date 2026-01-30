import Link from 'next/link'
import React from 'react'

export const PortfolioNav = () => {
  return (
    <nav className="py-8 px-6 md:px-12 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Link href="/portfolio" className="text-foreground font-medium tracking-tight text-base">
            <p className="m-0!">roberto@sintese.dev</p>
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
      </div>
    </nav>
  )
}

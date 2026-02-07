'use client'

import React from 'react'
import { TopographyBackground } from '@/components/ui/topography'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'
import type { Portfolio } from '@/payload-types'

interface PortfolioFooterProps {
  cnpj?: string
  footer?: Portfolio['footer']
}

export const PortfolioFooter = ({ cnpj, footer }: PortfolioFooterProps) => {
  const socialLinks = footer?.socialLinks

  return (
    <footer id="contact" className="relative w-full border-t border-border/40 overflow-hidden">
      <div className="h-[500px] lg:h-[400px] w-full">
        <TopographyBackground
          lineColor="rgba(255, 255, 255, 0.1)"
          backgroundColor="hsl(var(--background))"
          className="absolute inset-0 h-full w-full"
        >
          <div className="container mx-auto px-6 md:px-12 h-full flex flex-col justify-center relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground mb-6">
                  {footer?.titleLine1 || "Let's Work"} <br />
                  <span className="text-muted-foreground/50">
                    {footer?.titleLine2 || 'Together'}
                  </span>
                </h2>
                <p className="text-muted-foreground max-w-md text-lg">
                  {footer?.description ||
                    "Have a project in mind? Let's turn your vision into reality. Open for new opportunities and collaborations."}
                </p>
              </div>

              <div className="flex flex-col gap-8 justify-center items-start md:items-end">
                <Link
                  href={`mailto:${footer?.contactEmail || 'contact@robertosilva.dev'}`}
                  className="text-2xl md:text-4xl font-light hover:text-primary transition-colors tracking-tight"
                >
                  {footer?.contactEmail || 'contact@robertosilva.dev'}
                </Link>

                <div className="flex gap-6">
                  {socialLinks?.github && (
                    <Link
                      href={socialLinks.github}
                      className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    >
                      <Github size={20} />
                    </Link>
                  )}
                  {socialLinks?.linkedin && (
                    <Link
                      href={socialLinks.linkedin}
                      className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    >
                      <Linkedin size={20} />
                    </Link>
                  )}
                  {socialLinks?.twitter && (
                    <Link
                      href={socialLinks.twitter}
                      className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    >
                      <Twitter size={20} />
                    </Link>
                  )}
                  {socialLinks?.email && (
                    <Link
                      href={`mailto:${socialLinks.email}`}
                      className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    >
                      <Mail size={20} />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="static lg:absolute bottom-8 left-0 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest text-muted-foreground/40 border-t border-white/5 pt-8">
              <span>{footer?.copyrightText || '© 2026 Roberto Silva. All rights reserved.'}</span>
              {cnpj && <span>CNPJ: {cnpj}</span>}
            </div>
          </div>
        </TopographyBackground>
      </div>
    </footer>
  )
}

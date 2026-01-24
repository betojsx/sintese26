import Link from 'next/link'
import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Shuffle from '../Shuffle/Shuffle'

export const Nav = async () => {
  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const logo = siteSettings?.general?.logo

  return (
    <nav className="flex items-center justify-between py-8 px-6 md:px-12 border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-foreground font-bold tracking-tighter uppercase text-lg">
          <Shuffle
            text="Sintese Software"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover
            respectReducedMotion={true}
            loop={false}
            loopDelay={0}
            tag="h1"
            style={{ fontSize: '1.8rem' }}
          />
        </Link>
      </div>

      <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-muted-foreground">
        <Link href="/#work" className="hover:text-foreground transition-colors">
          Projetos
        </Link>
        <Link href="/#stack" className="hover:text-foreground transition-colors">
          Tecnologia
        </Link>
        <Link href="/#process" className="hover:text-foreground transition-colors">
          Processo
        </Link>
        <Link href="/#contact" className="hover:text-foreground transition-colors">
          Contato
        </Link>
      </div>

      <button className="bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-tighter hover:bg-primary/90 transition-colors">
        Iniciar Projeto
      </button>
    </nav>
  )
}

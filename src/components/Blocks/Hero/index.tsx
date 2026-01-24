import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Page } from '@/payload-types'

type HeroBlockProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

const HeroAscii = () => (
  <pre className="text-2xl leading-[0.8] font-mono text-muted-foreground opacity-50 select-none hidden lg:block">
    {`
        ________________________________________________
       /                                                \\
      |    _________________________________________     |
      |   |                                         |    |
      |   |   ARQUITETURA HÍBRIDA NEXT.JS + EXPO    |    |
      |   |_________________________________________|    |
      |                                                  |
      |         _______           _______                |
      |        |       |         |       |               |
      |        |  WEB  | <-----> | MOBILE|               |
      |        |_______|         |_______|               |
      |            ^                 ^                   |
      |            |                 |                   |
      |      ______|_________________|______             |
      |     |                               |            |
      |     |       CAMADA DE API UNIFICADA |            |
      |     |_______________________________|            |
      |__________________________________________________|
               | |                          | |
               |_|                          |_|
`}
  </pre>
)

export const HeroBlock: React.FC<HeroBlockProps> = ({ title, description, cta1, cta2 }) => {
  return (
    <header className="px-6 md:px-12 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b border-border">
      <div>
        
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
          {title}
        </h1>
        <p className="text-muted-foreground max-w-md text-lg mb-10 leading-relaxed italic">
          {description}
        </p>
        <div className="flex flex-wrap gap-4">
          {cta1?.label && (
            <Link
              href={cta1.link || '#'}
              className="bg-primary text-primary-foreground! px-8 py-4 font-bold uppercase text-sm flex items-center gap-3 hover:translate-x-1 hover:-translate-y-1 transition-transform border-r-4 border-b-4 border-muted-foreground"
            >
              {cta1.label} <ArrowRight size={18} />
            </Link>
          )}
          {cta2?.label && (
            <Link
              href={cta2.link || '#'}
              className="border border-border px-8 py-4 font-bold uppercase text-sm hover:bg-secondary transition-colors"
            >
              {cta2.label}
            </Link>
          )}
        </div>
      </div>
      <div className="flex justify-center lg:justify-end">
        <HeroAscii />
      </div>
    </header>
  )
}

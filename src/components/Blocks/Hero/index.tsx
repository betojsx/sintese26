import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Page } from '@/payload-types'
import { HeroVideo } from '@/components/HeroVideo'
import DecryptedText from '@/components/DecryptedText'

type HeroBlockProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

const HeroImages = () => (
  <div className="relative w-full max-w-[820px] h-[700px] mx-auto">
    {/* Mobile Image */}
    <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-100 lg:opacity-0 flex items-center justify-center">
      <Image
        src="/images/hero-img-mobile.png"
        alt="Mobile Interface"
        fill
        className="object-contain"
        priority
      />
    </div>

    {/* Desktop Image */}
    <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out opacity-0 lg:opacity-100 flex items-center justify-center">
      <Image
        src="/images/hero-img-desktop.png"
        alt="Desktop Interface"
        fill
        className="object-contain"
        priority
      />
    </div>
  </div>
)

export const HeroBlock: React.FC<HeroBlockProps> = ({ title, description, cta1, cta2 }) => {
  return (
    <header className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      <HeroVideo />

      <div className="absolute inset-0 z-10 bg-black/70 backdrop-blur-[2px] flex flex-col justify-center">
        <div className="container mx-auto px-6 md:px-12 py-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-white max-w-3xl">
              {title}
            </h1>
            <div className="text-lg mb-10 max-w-2xl leading-relaxed italic min-h-[3em]">
              <DecryptedText
                text={description}
                animateOn="view"
                speed={8}
                maxIterations={16}
                sequential
                revealDirection="start"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              {cta1?.label && (
                <Link
                  href={cta1.link || '#'}
                  className="bg-primary text-primary-foreground! px-8 py-4 font-bold uppercase text-sm flex items-center gap-3 hover:translate-x-1 hover:-translate-y-1 transition-transform border-r-4 border-b-4 border-white/30"
                >
                  {cta1.label} <ArrowRight size={18} />
                </Link>
              )}
              {cta2?.label && (
                <Link
                  href={cta2.link || '#'}
                  className="border border-white/30 text-white px-8 py-4 font-bold uppercase text-sm hover:bg-white/10 transition-colors"
                >
                  {cta2.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

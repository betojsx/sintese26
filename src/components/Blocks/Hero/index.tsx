'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'motion/react'
import { Page } from '@/payload-types'

const Hero3D = dynamic(() => import('@/components/Hero3D').then((m) => m.Hero3D), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent" />,
})

type HeroBlockProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

export const HeroBlock: React.FC<HeroBlockProps> = ({ title, description, cta1, cta2 }) => {
  return (
    <section className="relative min-h-[80vh] w-full flex bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-[#050505] via-[#353131]/80 to-transparent z-0 pointer-events-none" />

      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-left"
        >
          <span className="inline-block py-2 px-4 rounded-full border border-white/20 bg-white/5 text-sm font-mono tracking-widest text-white/70 mb-2 backdrop-blur-sm">
            AGÊNCIA DE SOFTWARE
          </span>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1]">
            {title}
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-xl !mb-12 leading-relaxed font-light block">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            {cta1?.label && (
              <a
                href={cta1.link || '#contact'}
                className="shimmer-button relative px-10 py-5 font-bold text-lg rounded-lg tracking-wide bg-background/10 hover:bg-background/20 transition-colors duration-500 text-center overflow-hidden"
              >
                <span className="relative z-10">{cta1.label}</span>
                <span className="shimmer-beam" />
              </a>
            )}
          </div>
        </motion.div>

        <div className="h-full w-full relative">
          <Hero3D />
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  )
}

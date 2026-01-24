import React from 'react'
import { Page } from '@/payload-types'

type StackBlockProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'stack' }>

export const StackBlock: React.FC<StackBlockProps> = ({ showMarquee }) => {
  if (!showMarquee) return null

  return (
    <section className="bg-secondary/30 border-y border-border py-20 overflow-hidden whitespace-nowrap">
      <div className="flex animate-marquee gap-12 text-2xl font-black uppercase tracking-widest text-muted-foreground select-none">
        <span>Escalabilidade • Segurança • Cloud • React Native • Next.js • UX Design • </span>
        <span>Escalabilidade • Segurança • Cloud • React Native • Next.js • UX Design • </span>
        <span>Escalabilidade • Segurança • Cloud • React Native • Next.js • UX Design • </span>
      </div>
    </section>
  )
}

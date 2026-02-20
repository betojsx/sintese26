'use client'

import { motion } from 'motion/react'
import React from 'react'

interface ServiceCardProps {
  category: string
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
}

export function ServiceCard({ category, title, description, icon, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="group relative bg-[#0a0a0a] border border-white/10 p-6 h-[440px] flex flex-col overflow-hidden hover:border-white/30 transition-colors duration-300 rounded-2xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-sans text-xl font-bold text-white tracking-tight">{title}</h3>
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/40">{category}</span>
      </div>

      <div className="flex-1 relative bg-white/5 rounded-lg border border-white/5 overflow-hidden flex items-center justify-center group-hover:border-white/20 transition-colors duration-500">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30" />
        <div className="w-32 h-32 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-500">
          {icon}
        </div>
      </div>

      <div className="mt-6 z-10">
        <p className="font-sans text-sm text-white/50 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

'use client'

import { motion, Easing } from 'motion/react'
import React from 'react'

const transition = {
  duration: 2,
  repeat: Infinity,
  repeatType: 'reverse' as const,
  ease: 'easeInOut' as Easing,
}

export const WebsiteIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-current">
    <motion.rect
      x="10" y="20" width="80" height="60" rx="4"
      fill="none" stroke="currentColor" strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    />
    <motion.line
      x1="10" y1="35" x2="90" y2="35"
      stroke="currentColor" strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
    <motion.circle cx="20" cy="28" r="2" fill="currentColor" animate={{ opacity: [0.5, 1, 0.5] }} transition={transition} />
    <motion.circle cx="28" cy="28" r="2" fill="currentColor" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ ...transition, delay: 0.2 }} />
    <motion.circle cx="36" cy="28" r="2" fill="currentColor" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ ...transition, delay: 0.4 }} />
    <motion.rect
      x="20" y="45" width="30" height="20" rx="2"
      fill="currentColor" fillOpacity="0.2"
      animate={{ y: [0, -2, 0] }}
      transition={transition}
    />
    <motion.line x1="55" y1="48" x2="80" y2="48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <motion.line x1="55" y1="56" x2="75" y2="56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <motion.line x1="55" y1="64" x2="80" y2="64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const MobileIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-current">
    <motion.rect
      x="30" y="15" width="40" height="70" rx="6"
      fill="none" stroke="currentColor" strokeWidth="2"
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
    />
    <motion.path
      d="M20 30 L25 35 M20 50 L25 50 M20 70 L25 65"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      animate={{ x: [0, -2, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
    />
    <motion.path
      d="M80 30 L75 35 M80 50 L75 50 M80 70 L75 65"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      animate={{ x: [0, 2, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
    />
    <motion.rect x="45" y="75" width="10" height="2" rx="1" fill="currentColor" />
  </svg>
)

export const DashboardIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-current">
    <rect x="10" y="15" width="80" height="70" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="10" y1="30" x2="90" y2="30" stroke="currentColor" strokeWidth="2" />
    <line x1="35" y1="30" x2="35" y2="85" stroke="currentColor" strokeWidth="2" />
    <motion.rect
      x="45" y="65" width="10" height="0"
      fill="currentColor" fillOpacity="0.5"
      animate={{ height: 15, y: 50 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
    />
    <motion.rect
      x="60" y="65" width="10" height="0"
      fill="currentColor" fillOpacity="0.5"
      animate={{ height: 25, y: 40 }}
      transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', delay: 0.2 }}
    />
    <motion.rect
      x="75" y="65" width="10" height="0"
      fill="currentColor" fillOpacity="0.5"
      animate={{ height: 20, y: 45 }}
      transition={{ duration: 1.1, repeat: Infinity, repeatType: 'reverse', delay: 0.4 }}
    />
  </svg>
)

export const CorporateIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-current">
    <motion.path
      d="M20 80 L20 40 L50 20 L80 40 L80 80 Z"
      fill="none" stroke="currentColor" strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: 'easeInOut' }}
    />
    <motion.rect
      x="35" y="50" width="10" height="10"
      stroke="currentColor" strokeWidth="1.5" fill="none"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.rect
      x="55" y="50" width="10" height="10"
      stroke="currentColor" strokeWidth="1.5" fill="none"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
    <motion.rect
      x="45" y="65" width="10" height="15"
      stroke="currentColor" strokeWidth="1.5" fill="none"
    />
  </svg>
)

export const ChatbotIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-current">
    <motion.path
      d="M20 30 C20 15 80 15 80 30 C80 45 60 50 60 50 L50 65 L40 50 C20 50 20 30 20 30 Z"
      fill="none" stroke="currentColor" strokeWidth="2"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.circle cx="35" cy="32" r="3" fill="currentColor" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} />
    <motion.circle cx="50" cy="32" r="3" fill="currentColor" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
    <motion.circle cx="65" cy="32" r="3" fill="currentColor" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />
  </svg>
)

export const InfrastructureIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-current">
    <rect x="25" y="25" width="50" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
    {[0, 1, 2, 3].map((i) => (
      <React.Fragment key={i}>
        <line x1={35 + i * 10} y1="25" x2={35 + i * 10} y2="15" stroke="currentColor" strokeWidth="2" />
        <line x1={35 + i * 10} y1="75" x2={35 + i * 10} y2="85" stroke="currentColor" strokeWidth="2" />
        <line x1="25" y1={35 + i * 10} x2="15" y2={35 + i * 10} stroke="currentColor" strokeWidth="2" />
        <line x1="75" y1={35 + i * 10} x2="85" y2={35 + i * 10} stroke="currentColor" strokeWidth="2" />
      </React.Fragment>
    ))}
    <motion.rect
      x="40" y="40" width="20" height="20"
      fill="currentColor" fillOpacity="0.2"
      animate={{ opacity: [0.2, 0.8, 0.2] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  </svg>
)

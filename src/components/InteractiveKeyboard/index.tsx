'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

export function InteractiveKeyboard() {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      const textToType = 'SINTESE'
      let currentIndex = 0

      const typeInterval = setInterval(() => {
        if (currentIndex < textToType.length) {
          const char = textToType[currentIndex]
          setActiveKey(char)
          setTimeout(() => setActiveKey(null), 150)
          currentIndex++
        } else {
          clearInterval(typeInterval)
        }
      }, 300)

      return () => clearInterval(typeInterval)
    }
  }, [isInView])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setActiveKey(e.key.toUpperCase())
    }
    const handleKeyUp = () => {
      setActiveKey(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full max-w-4xl mx-auto p-4 sm:p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl relative"
    >
      <div className="relative z-10 flex flex-col gap-2 sm:gap-3 items-center select-none">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 sm:gap-2 w-full justify-center">
            {row.map((key) => {
              const isActive = activeKey === key
              return (
                <motion.div
                  key={key}
                  animate={{
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.05)',
                    color: isActive ? '#000' : '#fff',
                    scale: isActive ? 0.95 : 1,
                    boxShadow: isActive ? '0 0 15px rgba(255,255,255,0.5)' : 'none',
                  }}
                  transition={{ duration: 0.1 }}
                  className="w-[9%] max-w-[64px] aspect-square flex items-center justify-center rounded-md sm:rounded-lg border border-white/10 font-mono text-xs sm:text-lg font-bold cursor-default"
                >
                  {key}
                </motion.div>
              )
            })}
          </div>
        ))}
        <div className="mt-2 w-full max-w-lg px-4">
          <motion.div
            animate={{
              backgroundColor: activeKey === ' ' ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.05)',
              scale: activeKey === ' ' ? 0.98 : 1,
              boxShadow: activeKey === ' ' ? '0 0 15px rgba(255,255,255,0.5)' : 'none',
            }}
            className="h-10 sm:h-14 w-full rounded-lg border border-white/10"
          />
        </div>
      </div>
    </div>
  )
}

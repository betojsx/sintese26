'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

export const Keyboard3D: React.FC = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      // Map space to 'enter' for visual feedback
      const targetKey = key === ' ' ? 'enter' : key

      if (['1', '2', 'enter'].includes(targetKey)) {
        setPressedKeys((prev) => {
          const newSet = new Set(prev)
          newSet.add(targetKey)
          return newSet
        })
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      const targetKey = key === ' ' ? 'enter' : key

      if (['1', '2', 'enter'].includes(targetKey)) {
        setPressedKeys((prev) => {
          const newSet = new Set(prev)
          newSet.delete(targetKey)
          return newSet
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const preventFocus = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  return (
    <div className={styles.keypad}>
      <div className={styles.base}>
        <img src="/assets/keyboard/keypad-base.webp" alt="" />
      </div>

      {/* Key 1 - Red */}
      <button
        id="one"
        className={`${styles.key} ${styles.single} ${styles.left}`}
        data-pressed={pressedKeys.has('1')}
        style={
          {
            '--hue': '0',
            '--saturate': '1',
          } as React.CSSProperties
        }
        onMouseDown={preventFocus}
        onClick={() => console.log('1 pressed')}
      >
        <span className={styles.keyMask}>
          <span className={styles.keyContent}>
            <span className={styles.keyText}>1</span>
            <img src="/assets/keyboard/keypad-single.webp" alt="" />
          </span>
        </span>
      </button>

      {/* Key 2 - Grey */}
      <button
        id="two"
        className={`${styles.key} ${styles.single}`}
        data-pressed={pressedKeys.has('2')}
        style={
          {
            '--hue': '0',
            '--saturate': '0',
            '--brightness': '1.2',
          } as React.CSSProperties
        }
        onMouseDown={preventFocus}
        onClick={() => console.log('2 pressed')}
      >
        <span className={styles.keyMask}>
          <span className={styles.keyContent}>
            <span className={styles.keyText}>2</span>
            <img src="/assets/keyboard/keypad-single.webp" alt="" />
          </span>
        </span>
      </button>

      {/* Key 3 - Enviar (Double) */}
      <button
        id="three"
        className={`${styles.key} ${styles.double}`}
        data-pressed={pressedKeys.has('enter')}
        style={
          {
            '--hue': '210',
            '--saturate': '0',
            '--brightness': '0.3', // Dark grey/black
          } as React.CSSProperties
        }
        onMouseDown={preventFocus}
        onClick={() => console.log('Enviar pressed')}
      >
        <span className={styles.keyMask}>
          <span className={styles.keyContent}>
            <span className={styles.keyText}>enviar</span>
            <img src="/assets/keyboard/keypad-double.webp" alt="" />
          </span>
        </span>
      </button>
    </div>
  )
}

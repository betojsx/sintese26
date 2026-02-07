'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from './styles.module.scss'

const useSetState = <T extends unknown>(initialState: T[] = []) => {
  const [state, setState] = useState(new Set(initialState))
  const add = (item: T) => setState((prev) => new Set(prev).add(item))
  const remove = (item: T) =>
    setState((prev) => {
      const next = new Set(prev)
      next.delete(item)
      return next
    })
  return { set: state, add, remove, has: (item: T) => state.has(item) }
}

const useSound = (url: string) => {
  const sound = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    sound.current = new Audio(url)
  }, [url])

  return {
    play: () => {
      if (sound.current) {
        sound.current.currentTime = 0
        sound.current.play().catch(() => {})
      }
    },
    stop: () => {
      if (sound.current) {
        sound.current.pause()
        sound.current.currentTime = 0
      }
    },
  }
}

interface KeyProps {
  char: string
  span?: boolean
  active: boolean
  onClick?: () => void
}

const Key: React.FC<KeyProps> = ({ char, span, active, onClick }) => {
  const classNames = [styles.key, span && styles.span, active && styles.active]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classNames} onMouseDown={onClick}>
      <div className={styles.side} />
      <div className={styles.top} />
      <div className={styles.char}>{char}</div>
    </div>
  )
}

const Column: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.column}>{children}</div>
)

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.row}>{children}</div>
)

export const Keyboard3D: React.FC = () => {
  // Mechanical click sound
  const { play, stop } = useSound('https://cdn.yoavik.com/codepen/mechanical-keyboard/keytype.mp3')

  const { add, remove, has } = useSetState<string>([])
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Keep track of visibility in a ref for event listeners
  const isVisibleRef = useRef(isVisible)
  useEffect(() => {
    isVisibleRef.current = isVisible
  }, [isVisible])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const validKeys = [
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    'enter',
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if visible and no modifier keys (cmd, ctrl, alt) are pressed
      if (!isVisibleRef.current || e.metaKey || e.ctrlKey || e.altKey) return

      const key = e.key.toLowerCase()
      if (validKeys.includes(key)) {
        add(key)
        stop()
        play()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      // Only trigger if visible
      if (!isVisibleRef.current) return

      const key = e.key.toLowerCase()
      if (validKeys.includes(key)) {
        remove(key)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [add, remove, play, stop])

  const renderKeys = (chars: string[], spans: boolean[] = []) =>
    chars.map((char, i) => (
      <Key
        key={char}
        char={char}
        span={spans[i] || false}
        active={has(char.toLowerCase())}
        onClick={() => {
          play()
          add(char.toLowerCase())
          setTimeout(() => remove(char.toLowerCase()), 200)
        }}
      />
    ))

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <div className={styles.keyboard}>
        <Column>
          <Row>{renderKeys(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'])}</Row>
          <Row>{renderKeys(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'])}</Row>
          <Row>
            {renderKeys(
              ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter'],
              [false, false, false, false, false, false, false, true],
            )}
          </Row>
        </Column>
        <div className={styles.shade} />
        <div className={styles.cover} />
      </div>
    </div>
  )
}

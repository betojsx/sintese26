'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useInView } from 'motion/react'
import { LaptopMinimalCheckIcon } from '@/components/ui/laptop-minimal-check'
import { VibrateIcon } from '@/components/ui/vibrate'
import { MessageCircleIcon } from '@/components/ui/message-circle'
import { CpuIcon } from '@/components/ui/cpu'

export interface BentoCardProps {
  color?: string
  title?: string
  description?: string
  label?: string
  textAutoHide?: boolean
  disableAnimations?: boolean
  Icon: React.ElementType
}

export interface BentoProps {
  textAutoHide?: boolean
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  disableAnimations?: boolean
  spotlightRadius?: number
  enableTilt?: boolean
  glowColor?: string
  clickEffect?: boolean
  enableMagnetism?: boolean
}

const DEFAULT_SPOTLIGHT_RADIUS = 300
const DEFAULT_GLOW_COLOR = '200, 200, 200'
const MOBILE_BREAKPOINT = 768

const cardData: BentoCardProps[] = [
  {
    title: 'Websites',
    description: 'Desenvolvimento de sites modernos e responsivos para sua marca.',
    label: 'Digital',
    Icon: LaptopMinimalCheckIcon,
  },
  {
    title: 'Aplicativos',
    description: 'Apps nativos e multiplataforma com a melhor experiência de usuário.',
    label: 'Mobile',
    Icon: VibrateIcon,
  },
  {
    title: 'Painel administrativo',
    description: 'Gerenciamento completo do seu negócio com dashboards intuitivos.',
    label: 'Gestão',
    Icon: LaptopMinimalCheckIcon,
  },
  {
    title: 'Sites institucionais',
    description: 'Fortaleça sua presença online com um site institucional profissional.',
    label: 'Corporativo',
    Icon: LaptopMinimalCheckIcon,
  },
  {
    title: 'Whatsapp Chatbots',
    description: 'Automatize seu atendimento e venda mais pelo WhatsApp.',
    label: 'Automação',
    Icon: MessageCircleIcon,
  },
  {
    title: 'Hospedagem',
    description: 'Servidores rápidos e seguros para manter seus serviços sempre online.',
    label: 'Infraestrutura',
    Icon: CpuIcon,
  },
]

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
})

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number,
) => {
  const rect = card.getBoundingClientRect()
  const relativeX = ((mouseX - rect.left) / rect.width) * 100
  const relativeY = ((mouseY - rect.top) / rect.height) * 100

  card.style.setProperty('--glow-x', `${relativeX}%`)
  card.style.setProperty('--glow-y', `${relativeY}%`)
  card.style.setProperty('--glow-intensity', glow.toString())
  card.style.setProperty('--glow-radius', `${radius}px`)
}

const InteractiveCard: React.FC<{
  children: React.ReactNode
  className?: string
  disableAnimations?: boolean
  style?: React.CSSProperties
  glowColor?: string
  enableTilt?: boolean
  clickEffect?: boolean
  enableMagnetism?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  onMouseEnter,
  onMouseLeave,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isHoveredRef = useRef(false)
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null)
  const onMouseEnterRef = useRef(onMouseEnter)
  const onMouseLeaveRef = useRef(onMouseLeave)

  useEffect(() => {
    onMouseEnterRef.current = onMouseEnter
    onMouseLeaveRef.current = onMouseLeave
  }, [onMouseEnter, onMouseLeave])

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return

    const element = cardRef.current

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      onMouseEnterRef.current?.()

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
        })
      }
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      onMouseLeaveRef.current?.()

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return

      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000,
        })
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05
        const magnetY = (y - centerY) * 0.05

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return

      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      )

      const ripple = document.createElement('div')
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `

      element.appendChild(ripple)

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        },
      )
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('click', handleClick)

    return () => {
      isHoveredRef.current = false
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('click', handleClick)
    }
  }, [disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor])

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  )
}

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>
  disableAnimations?: boolean
  enabled?: boolean
  spotlightRadius?: number
  glowColor?: string
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
}) => {
  const isInsideSection = useRef(false)

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return

      const section = gridRef.current
      const rect = section?.getBoundingClientRect()
      const mouseInside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      isInsideSection.current = mouseInside || false
      const cards = Array.from(gridRef.current.children) as HTMLElement[]

      if (!mouseInside) {
        cards.forEach((card) => {
          card.style.setProperty('--glow-intensity', '0')
        })
        return
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius)

      cards.forEach((card) => {
        const cardElement = card
        const cardRect = cardElement.getBoundingClientRect()
        const centerX = cardRect.left + cardRect.width / 2
        const centerY = cardRect.top + cardRect.height / 2
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2
        const effectiveDistance = Math.max(0, distance)

        let glowIntensity = 0
        if (effectiveDistance <= proximity) {
          glowIntensity = 1
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity)
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius)
      })
    }

    const handleMouseLeave = () => {
      isInsideSection.current = false
      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children) as HTMLElement[]
        cards.forEach((card) => {
          card.style.setProperty('--glow-intensity', '0')
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [gridRef, disableAnimations, enabled, spotlightRadius])

  return null
}

const BentoCardGrid: React.FC<{
  children: React.ReactNode
  gridRef?: React.RefObject<HTMLDivElement | null>
}> = ({ children, gridRef }) => (
  <div
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 md:px-12 mx-auto p-4"
    ref={gridRef}
  >
    {children}
  </div>
)

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

const Features: React.FC<BentoProps> = ({
  textAutoHide = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()
  const shouldDisableAnimations = disableAnimations || isMobile
  const iconRefs = useRef<any[]>([])
  const isInView = useInView(gridRef, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      iconRefs.current.forEach((ref, index) => {
        setTimeout(() => {
          ref?.startAnimation()
        }, index * 100)
      })
    }
  }, [isInView])

  return (
    <section className="py-20 bg-[#0a0a0a]">
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-[#fdfcf0] mb-4 uppercase tracking-tight">
          O que fazemos
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Descubra como nossa plataforma pode transformar sua experiência.
        </p>
      </div>
      <div className="container mx-auto">
        <BentoCardGrid gridRef={gridRef}>
          {cardData.map((card, index) => {
            // Construct class names with Tailwind
            const baseClassName = `
            relative group p-6 h-[300px] flex flex-col justify-between
            bg-[#0a0a0a] border border-zinc-800 overflow-hidden
            ${enableBorderGlow ? 'hover:border-zinc-500/50' : ''}
          `

            const cardProps = {
              className: baseClassName,
              style: {
                '--glow-color': glowColor,
                '--glow-x': '50%',
                '--glow-y': '50%',
                '--glow-intensity': '0',
                '--glow-radius': `${spotlightRadius}px`,
              } as React.CSSProperties,
            }

            const BorderGlow = () =>
              enableBorderGlow ? (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    padding: '1px',
                    background: `radial-gradient(
                   var(--glow-radius) circle at var(--glow-x) var(--glow-y), 
                   rgba(${glowColor}, var(--glow-intensity)), 
                   transparent 100%
                 )`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor', // For Safari
                  }}
                />
              ) : null

            return (
              <InteractiveCard
                key={index}
                {...cardProps}
                disableAnimations={shouldDisableAnimations}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
                onMouseEnter={() => iconRefs.current[index]?.startAnimation()}
                onMouseLeave={() => iconRefs.current[index]?.stopAnimation()}
              >
                <BorderGlow />
                <div className="flex justify-between items-start z-10 relative">
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 border border-zinc-800 px-2 py-1 bg-black/50 backdrop-blur-sm">
                    {card.label}
                  </div>
                  <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    <card.Icon
                      ref={(el: any) => (iconRefs.current[index] = el)}
                      size={64}
                      className="text-zinc-600 group-hover:text-[#fdfcf0] transition-colors duration-300"
                    />
                  </div>
                </div>
                <div className="space-y-2 z-10 relative mt-auto">
                  <h2 className="text-2xl font-bold text-[#fdfcf0] group-hover:text-zinc-200 transition-colors">
                    {card.title}
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed">{card.description}</p>
                </div>
              </InteractiveCard>
            )
          })}
        </BentoCardGrid>
      </div>
    </section>
  )
}

export { Features }

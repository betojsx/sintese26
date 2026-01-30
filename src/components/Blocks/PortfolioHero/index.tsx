import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import BlurText from '@/components/BlurText'

export const PortfolioHero = () => {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center pt-24 pb-12 overflow-hidden border-b border-border/40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Senior Frontend Developer
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-foreground">
                Roberto <br />
                <span className="text-muted-foreground">Silva</span>
              </h1>

              <div className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed font-light min-h-[220px]">
                <BlurText
                  text="Building digital bridges since 2018. With over 8 years of experience, I specialize in creating fluid, high-performance applications across the entire frontend spectrum. From hybrid solutions with Ionic to native experiences using React Native, I craft pixel-perfect interfaces that scale. My mission is to translate complex requirements into seamless reliable user experiences."
                  delay={30}
                  animateBy="words"
                  direction="bottom"
                  className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed font-light"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="#contact"
                  className="bg-primary text-primary-foreground! px-8 py-4 font-bold uppercase text-sm flex items-center gap-3 hover:translate-x-1 hover:-translate-y-1 transition-transform border-r-4 border-b-4 border-white/20"
                >
                  Contact Me <ArrowRight size={18} />
                </Link>

                <div className="flex items-center gap-4 px-6 border-l border-border/50">
                  <Link
                    href="#"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                  >
                    <Github size={24} />
                  </Link>
                  <Link
                    href="#"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                  >
                    <Linkedin size={24} />
                  </Link>
                  <Link
                    href="#contact"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                  >
                    <Mail size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-square lg:aspect-[4/5]">
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 w-full h-full border-2 border-primary/20 rounded-2xl z-0 transform translate-x-4 translate-y-4"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl"></div>

              <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl z-10 bg-zinc-900/50 grayscale hover:grayscale-0 transition-all duration-700">
                <Image
                  src="/images/roberto.png"
                  alt="Roberto Silva"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

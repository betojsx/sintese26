import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Media, Page, Project } from '@/payload-types'

type ProjectsBlockProps = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'projects-block' }
> & {
  projects: Project[]
}

const ProjectCard = ({
  title,
  image,
  slug,
  className = '',
  type,
}: {
  title: string
  image: string | number | Media | null | undefined
  slug?: string | null
  type?: 'app' | 'website'
  className?: string
}) => {
  const imageUrl = typeof image === 'object' ? image?.url : typeof image === 'string' ? image : ''

  return (
    <Link
      href={slug ? `/projects/${slug}` : '#'}
      className={`group relative overflow-hidden border border-zinc-800 bg-zinc-900/20 transition-all hover:border-zinc-500 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 z-10" />
      <div className="absolute inset-0 flex flex-col justify-end p-8 transition-transform duration-500 group-hover:translate-x-2 z-20">
        <div className="mb-2">
          {type && (
            <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-widest font-bold text-zinc-400 border border-zinc-700 bg-black/50 backdrop-blur-sm rounded-sm">
              {type === 'app' ? 'App' : 'Website'}
            </span>
          )}
        </div>
        <h3 className="text-2xl font-black uppercase tracking-tight text-[#fdfcf0] mb-2">
          {title}
        </h3>
        <div className="h-0.5 w-8 bg-[#fdfcf0] transition-all duration-500 group-hover:w-24" />
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-80 group-hover:grayscale-0"
        />
      )}
    </Link>
  )
}

const PlaceholderCard = ({ className = '' }: { className?: string }) => {
  return <div className={`border border-zinc-800/30 bg-zinc-900/10 ${className}`} />
}

export const ProjectsBlock: React.FC<ProjectsBlockProps> = ({ title, subtitle, projects = [] }) => {
  // Bento grid configuration: we want 6 slots for a nice layout
  const TOTAL_SLOTS = 6

  // Combine real projects with placeholders
  const displayItems = [...projects]
  while (displayItems.length < TOTAL_SLOTS) {
    displayItems.push({
      id: `placeholder-${displayItems.length}`,
      isPlaceholder: true,
    } as any)
  }

  const getBentoClass = (index: number) => {
    // 3-column grid layout pattern
    // [ 0 0 1 ]
    // [ 0 0 2 ]
    // [ 3 4 5 ]

    switch (index) {
      case 0:
        return 'md:col-span-2 md:row-span-2 min-h-[500px]'
      case 1:
        return 'md:col-span-1 md:row-span-1 min-h-[240px]'
      case 2:
        return 'md:col-span-1 md:row-span-1 min-h-[240px]'
      default:
        return 'md:col-span-1 md:row-span-1 min-h-[300px]'
    }
  }

  return (
    <section id="work" className="px-6 md:px-12 py-24 border-b border-zinc-800 bg-[#0a0a0a]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-[#fdfcf0]">
              {title || 'Nossos Projetos'}
            </h2>
            <p className="text-zinc-500 uppercase text-xs tracking-[0.2em] font-medium">
              {subtitle || 'Soluções reais para problemas complexos • 2024-2025'}
            </p>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-zinc-800 text-8xl font-black opacity-50">02</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayItems.map((item, i) => {
            const gridClass = getBentoClass(i)

            if ((item as any).isPlaceholder) {
              return <PlaceholderCard key={item.id} className={gridClass} />
            }

            const project = item as Project
            return (
              <ProjectCard
                key={project.id}
                title={project.title}
                image={project.image}
                slug={project.slug}
                type={project.type}
                className={gridClass}
              />
            )
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/projects"
            className="border border-zinc-800 px-12 py-4 font-bold uppercase text-xs tracking-widest text-zinc-400 hover:text-[#fdfcf0] hover:bg-zinc-900 transition-all flex items-center gap-3 group"
          >
            Ver todos os projetos{' '}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

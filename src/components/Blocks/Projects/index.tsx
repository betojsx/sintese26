import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Page, Project } from '@/payload-types'
import { ProtectedProjectCard } from '@/components/ProtectedProjectCard'

type ProjectsBlockProps = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'projects-block' }
> & {
  projects: Project[]
}

const PlaceholderCard = ({ className = '' }: { className?: string }) => {
  return <div className={`border border-zinc-800/30 bg-zinc-900/10 ${className}`} />
}

export const ProjectsBlock: React.FC<ProjectsBlockProps> = ({ title, subtitle, projects = [] }) => {
  // Combine real projects with placeholders
  const displayItems = [...projects]

  const getBentoClass = (index: number) => {
    // 3-column grid layout pattern
    // [ 0 0 1 ]
    // [ 0 0 2 ]
    // [ 3 4 5 ]

    switch (index) {
      case 0:
        return 'md:col-span-2 md:row-span-2 min-h-[230px] lg:min-h-[500px]'
      case 1:
        return 'md:col-span-1 md:row-span-1 min-h-[230px]'
      case 2:
        return 'md:col-span-1 md:row-span-1 min-h-[230px]'
      default:
        return 'md:col-span-1 md:row-span-1 min-h-[230px] lg:min-h-[300px]'
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
              <ProtectedProjectCard
                key={project.id}
                project={project}
                className={gridClass}
                isPasswordProtected={project.isPasswordProtected || false}
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

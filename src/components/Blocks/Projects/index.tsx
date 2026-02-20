import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Project, Portfolio } from '@/payload-types'
import { ProtectedProjectCard } from '@/components/ProtectedProjectCard'
import { DotGridBackground } from '@/components/DotGridBackground'

interface ProjectsBlockProps {
  projects: Project[]
  projectsSection?: Portfolio['projects']
  basePath?: string
  viewAllLink?: string
}

const PlaceholderCard = ({ className = '' }: { className?: string }) => {
  return <div className={`border border-white/10 bg-[#0a0a0a] rounded-2xl ${className}`} />
}

export const ProjectsBlock: React.FC<ProjectsBlockProps> = ({
  projects = [],
  projectsSection,
  basePath = '/projects',
  viewAllLink = '/projects',
}) => {
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
    <section id="work" className="relative py-24 px-8 md:px-16 border-t border-white/5 bg-[#050505]">
      <DotGridBackground />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="mb-16">
          <span className="font-mono text-xs text-white/40 tracking-widest uppercase mb-2 block">
            {projectsSection?.subtitle || 'Portfolio'}
          </span>
          <h2 className="text-4xl font-bold text-white">
            {projectsSection?.title || 'Selected Works'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className={`${gridClass} rounded-2xl border-white/10 bg-[#0a0a0a]`}
                isPasswordProtected={project.isPasswordProtected || false}
                basePath={basePath}
              />
            )
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href={viewAllLink}
            className="border border-white/10 px-12 py-4 font-bold uppercase text-xs tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all flex items-center gap-3 group rounded-full"
          >
            {projectsSection?.viewAllLabel || 'View all projects'}{' '}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

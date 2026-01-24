import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Media, Page, Project } from '@/payload-types'

type ProjectsBlockProps = Extract<NonNullable<Page['layout']>[number], { blockType: 'projects-block' }> & {
  projects: Project[]
}

const ProjectCard = ({
  title,
  image,
  slug,
  className = '',
}: {
  title: string
  image: string | number | Media | null | undefined
  slug?: string | null
  className?: string
}) => {
  const imageUrl = typeof image === 'object' ? image?.url : typeof image === 'string' ? image : ''

  return (
    <Link
      href={slug ? `/projects/${slug}` : '#'}
      className={`group relative overflow-hidden border border-border transition-all hover:border-primary ${className}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover opacity-40 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-80 group-hover:grayscale-0"
        />
      ) : (
        <div className="h-full w-full bg-secondary flex items-center justify-center">
          <span className="text-muted-foreground font-mono text-xs">[NO IMAGE]</span>
        </div>
      )}
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-500 group-hover:translate-x-2">
        <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">{title}</h3>
        <div className="mt-2 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-16" />
      </div>
    </Link>
  )
}

export const ProjectsBlock: React.FC<ProjectsBlockProps> = ({ title, subtitle, projects }) => {
  const hasProjects = projects && projects.length > 0

  return (
    <section id="work" className="px-6 md:px-12 py-24 border-b border-border">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic">
            {title || 'Nossos Projetos'}
          </h2>
          <p className="text-muted-foreground uppercase text-xs tracking-[0.2em]">
            {subtitle || 'Soluções reais para problemas complexos • 2024-2025'}
          </p>
        </div>
        <div className="text-right">
          <span className="text-muted text-6xl font-black opacity-20">02</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
        {hasProjects ? (
          projects.map((project, i) => {
            const gridClass = 'md:col-span-1 md:row-span-1'
            return (
              <ProjectCard
                key={project.id}
                title={project.title}
                image={project.image}
                slug={project.slug}
                className={gridClass}
              />
            )
          })
        ) : (
          <div className="md:col-span-4 py-20 text-center border border-dashed border-border">
            <p className="text-muted-foreground uppercase tracking-[0.2em]">
              Carregando projetos do portfólio...
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          href="/projects"
          className="border border-border px-12 py-4 font-bold uppercase text-sm hover:bg-secondary transition-colors flex items-center gap-3 group"
        >
          Ver todos os projetos{' '}
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}

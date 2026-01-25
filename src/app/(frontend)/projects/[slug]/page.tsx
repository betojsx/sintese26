import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Media } from '@/payload-types'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { RichText } from '@/components/RichText'


type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const project = docs[0]

  if (!project) {
    notFound()
  }

  const imageUrl = typeof project.image === 'object' ? (project.image as Media)?.url : ''

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fdfcf0]   selection:bg-[#fdfcf0] selection:text-black">
      <Nav />

      <main>
        {/* Cover Section */}
        <div className="relative h-[60vh] w-full border-b border-zinc-800 overflow-hidden group">
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
              />
              <div className="absolute inset-0 bg-black/50" />
            </>
          ) : (
            <div className="absolute inset-0 bg-zinc-900 w-full h-full flex items-center justify-center text-zinc-700">
              [SEM IMAGEM]
            </div>
          )}

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto w-full">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#fdfcf0] transition-colors mb-6 uppercase text-xs tracking-widest w-fit"
            >
              <ArrowLeft size={14} /> Voltar para Projetos
            </Link>

            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-[#fdfcf0]">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 md:gap-8 text-sm uppercase tracking-widest text-zinc-400 font-bold">
              {project.company && (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#fdfcf0] rounded-full" />
                  {project.company}
                </span>
              )}
              {project.type && (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-zinc-600 rounded-full" />
                  {project.type === 'app' ? 'App' : 'Website'}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 md:px-12 py-20">
          {/* Sidebar Info */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="border-t border-zinc-800 pt-6">
              <h3 className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-4">Role</h3>
              <p className="text-xl font-bold uppercase">{project.role}</p>
            </div>

            <div className="border-t border-zinc-800 pt-6">
              <h3 className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, i) => (
                  <span
                    key={i}
                    className="border border-zinc-800 px-3 py-1 text-xs uppercase tracking-wider hover:bg-zinc-900 transition-colors cursor-default"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-6">
              <h3 className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-4">Data</h3>
              <p className="text-sm font-mono text-zinc-400">
                {new Date(project.createdAt).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                })}
              </p>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-invert prose-lg max-w-none  ">
              {project.content && (
                <RichText data={project.content} />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const project = docs[0]

  if (!project) {
    return {
      title: 'Projeto não encontrado',
    }
  }

  return {
    title: `${project.title} | ExpoNext Studio`,
    description: `Detalhes do projeto ${project.title}`,
  }
}

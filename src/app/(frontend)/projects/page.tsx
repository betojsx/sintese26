import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Media } from '@/payload-types'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export default async function ProjectsPage() {
  const payload = await getPayload({ config })
  const { docs: projects } = await payload.find({
    collection: 'projects',
    sort: '-createdAt',
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fdfcf0]   selection:bg-[#fdfcf0] selection:text-black">
      <Nav />

      <main className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#fdfcf0] transition-colors mb-12 uppercase text-xs tracking-widest"
        >
          <ArrowLeft size={14} /> Voltar para Home
        </Link>

        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            Todos os <span className="text-zinc-600">Projetos.</span>
          </h1>
          <p className="text-zinc-400 max-w-xl text-lg italic">
            Uma lista completa de nossos desenvolvimentos, experimentos e parcerias técnicas.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {projects.length > 0 ? (
            projects.map((project) => {
              const imageUrl =
                typeof project.image === 'object' ? (project.image as Media)?.url : ''

              return (
                <article
                  key={project.id}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-zinc-900 pb-12 hover:border-zinc-700 transition-colors"
                >
                  <div className="lg:col-span-5 aspect-video overflow-hidden border border-zinc-800">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-100 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-800 font-mono">
                        [SEM IMAGEM]
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight group-hover:text-[#fdfcf0] transition-colors">
                        {project.title}
                      </h2>
                      <span className="text-zinc-700 font-mono text-sm uppercase tracking-widest">
                        {new Date(project.createdAt).getFullYear()}
                      </span>
                    </div>

                    <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl">
                      {project.slug ? `/${project.slug}` : 'Sem slug definido.'}
                    </p>

                    <div className="flex gap-4 mt-4">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 border border-zinc-700 px-6 py-3 font-bold uppercase text-xs hover:bg-zinc-900 transition-colors"
                      >
                        Ver Detalhes <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })
          ) : (
            <div className="py-20 text-center border border-dashed border-zinc-800">
              <p className="text-zinc-600 uppercase tracking-[0.2em]">
                Nenhum projeto encontrado no banco de dados.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Mail, Plus } from 'lucide-react'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Media } from '@/payload-types'
import { PortfolioV3LocaleToggle } from '@/components/portfolio/PortfolioV3LocaleToggle'
import { PortfolioV3ProjectCard } from '@/components/portfolio/PortfolioV3ProjectCard'

interface PortfolioV3PageProps {
  locale: 'en' | 'pt-BR'
}

async function getPortfolioData(locale: 'en' | 'pt-BR') {
  const payload = await getPayload({ config })
  const [portfolio, projectsResult] = await Promise.all([
    payload.findGlobal({ slug: 'portfolio', locale }),
    payload.find({ collection: 'projects', sort: '-createdAt', limit: 5 }),
  ])

  return { portfolio, projects: projectsResult.docs }
}

const toExternalHref = (url?: string | null) => {
  if (!url) return null

  const trimmed = url.trim()
  if (!trimmed) return null

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }

  return `https://${trimmed}`
}

const toEmailAddress = (email?: string | null) => {
  if (!email) return null

  const trimmed = email.replace(/^mailto:/i, '').trim()
  return trimmed || null
}

const getHandleFromUrl = (url?: string | null) => {
  if (!url) return null

  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`)
    const segments = parsed.pathname.split('/').filter(Boolean)
    const handle = segments[segments.length - 1]

    if (handle) return handle
    return parsed.hostname.replace(/^www\./, '')
  } catch {
    return url
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/+$/, '')
      .split('/')
      .filter(Boolean)
      .pop()
  }
}

type BentoCellProps = {
  children: React.ReactNode
  className?: string
  colSpan?: string
  rowSpan?: string
  title?: string | null
  id?: string
}

const BentoCell = ({
  children,
  className = '',
  title,
  colSpan = 'col-span-1',
  rowSpan = 'row-span-1',
  id,
}: BentoCellProps) => (
  <div
    id={id}
    className={`relative overflow-hidden rounded-xl border border-white/5 bg-[#0A0A0A] p-6 transition-colors hover:border-white/10 md:p-8 ${colSpan} ${rowSpan} ${className}`}
  >
    {title && (
      <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
          {title}
        </span>
      </div>
    )}
    {children}
  </div>
)

export const PortfolioV3Page = async ({ locale }: PortfolioV3PageProps) => {
  const { portfolio, projects } = await getPortfolioData(locale)

  const hero = portfolio?.hero
  const projectsSection = portfolio?.projects
  const profileImage = hero?.profileImage as Media | undefined
  const fullName = [hero?.firstName, hero?.lastName].filter(Boolean).join(' ') || 'Roberto Silva'

  const githubHref = toExternalHref(hero?.socialLinks?.github)
  const linkedinHref = toExternalHref(hero?.socialLinks?.linkedin)
  const emailAddress = toEmailAddress(hero?.socialLinks?.email)

  const githubHandle = getHandleFromUrl(githubHref)
  const linkedinHandle = getHandleFromUrl(linkedinHref)

  const ctaHref = emailAddress ? `mailto:${emailAddress}` : '#work'

  return (
    <div className="min-h-screen bg-[#050505] p-4 font-sans text-white selection:bg-orange-500 selection:text-white md:p-8">
      <div className="mx-auto mb-4 grid max-w-[1600px] auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        <BentoCell
          colSpan="col-span-1 md:col-span-4 lg:col-span-4 xl:col-span-4"
          rowSpan="row-span-2"
          className="flex min-h-[420px] flex-col justify-end"
        >
          <div className="absolute right-6 top-6 flex items-center gap-3">
            <span className="hidden font-mono text-xs text-white/20 md:block">
              {locale === 'en' ? 'AVAILABLE FOR WORK' : 'DISPONIVEL PARA PROJETOS'}
            </span>
            <PortfolioV3LocaleToggle currentLocale={locale} />
          </div>

          {profileImage?.url && (
            <div className="relative mb-3 h-16 w-16 overflow-hidden rounded-full border border-white/10">
              <Image src={profileImage.url} alt={fullName} fill className="object-cover" />
            </div>
          )}

          <h1 className="max-w-2xl text-3xl! font-bold leading-[0.95] tracking-tight">
            {fullName}
          </h1>

          <p className="mt-4 max-w-2xl text-sm font-light tracking-normal text-white/55 md:text-base lg:text-lg">
            {hero?.subtitle || 'Digital Craftsman'}
          </p>

          {hero?.bio && typeof hero.bio === 'object' && (
            <div className="mt-4 max-w-2xl text-xs leading-relaxed text-white/60 md:text-sm [&_p]:mb-3 [&_p:last-child]:mb-0">
              <RichText data={hero.bio} />
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href={ctaHref}
              className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 px-7 py-3 text-center text-xs font-bold tracking-wide transition-colors duration-500 hover:bg-white/10 md:text-sm"
            >
              <span>
                {hero?.ctaLabel || (locale === 'en' ? 'Start Project' : 'Iniciar Projeto')}
              </span>
            </Link>
          </div>
        </BentoCell>

        <BentoCell
          id="stack"
          colSpan="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2"
          rowSpan="row-span-2"
          title="Skills"
        >
          <ul className="mt-8 space-y-3 font-mono text-xs text-white/60 md:text-sm">
            {[
              'React / Next.js',
              'Typescript',
              'Expo / React Native',
              'Angular',
              'Shadcn-ui',
              'Material UI',
              'Tailwind CSS',
              'UI/UX Design',
              'AWS',
              'Docker',
              'Coolify',
            ].map((skill, index) => (
              <li
                key={skill}
                className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0"
              >
                <span>{skill}</span>
                <span className="text-white/20">{String(index + 1).padStart(2, '0')}</span>
              </li>
            ))}
          </ul>
        </BentoCell>

        <BentoCell
          id="contact"
          colSpan="col-span-1 md:col-span-2"
          title={locale === 'en' ? 'Connect' : 'Contato'}
          className="flex flex-col justify-center"
        >
          <div className="mt-8 space-y-3">
            {linkedinHref && (
              <Link
                href={linkedinHref}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4"
                aria-label="LinkedIn"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Linkedin size={20} />
                </span>
                <span className="min-w-0 truncate font-mono text-[12px] tracking-[0.16em] text-white/55 transition-colors group-hover:text-white/90">
                  /{linkedinHandle || 'linkedin'}
                </span>
              </Link>
            )}

            {githubHref && (
              <Link
                href={githubHref}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4"
                aria-label="GitHub"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white transition-colors group-hover:bg-white">
                  <Github
                    size={20}
                    className="text-white transition-colors group-hover:text-black"
                  />
                </span>
                <span className="min-w-0 truncate font-mono text-[12px] tracking-[0.16em] text-white/55 transition-colors group-hover:text-white/90">
                  /{githubHandle || 'github'}
                </span>
              </Link>
            )}

            {emailAddress && (
              <Link
                href={`mailto:${emailAddress}`}
                className="group flex items-center gap-4"
                aria-label="Email"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                  <Mail size={20} />
                </span>
                <span className="min-w-0 truncate font-mono text-[12px] tracking-[0.16em] text-white/55 transition-colors group-hover:text-white/90">
                  @{emailAddress}
                </span>
              </Link>
            )}
          </div>
        </BentoCell>

        <BentoCell
          colSpan="col-span-1 md:col-span-2"
          title={locale === 'en' ? 'Status' : 'Status'}
          className="flex items-center justify-center"
        >
          <div className="mt-6 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
            <span className="font-mono text-sm">
              {locale === 'en' ? 'Open to offers' : 'Disponivel para trabalhos'}
            </span>
          </div>
        </BentoCell>
      </div>

      <div className="mx-auto max-w-[1600px]">
        <BentoCell
          id="work"
          title={projectsSection?.title || 'Selected Works'}
          className="col-span-1 row-span-1"
        >
          {projectsSection?.subtitle && (
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-white/35">
              {projectsSection.subtitle}
            </p>
          )}

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              return (
                <PortfolioV3ProjectCard key={project.id} project={project} basePath="/projects" />
              )
            })}

            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={`empty-slot-${index}`}
                className="flex min-h-[360px] cursor-default flex-col items-center justify-center rounded-xl border border-dashed border-white/5 bg-[#0A0A0A]/50 p-8 text-white/10 transition-all hover:border-white/10 hover:text-white/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/5">
                  <Plus size={20} />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest">
                  {locale === 'en' ? 'Coming Soon' : 'Em Breve'}
                </span>
              </div>
            ))}
          </div>
        </BentoCell>
      </div>
    </div>
  )
}

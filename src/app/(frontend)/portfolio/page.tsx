import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { PortfolioNav } from '@/components/PortfolioNav'
import { PortfolioFooter } from '@/components/Blocks/PortfolioFooter'
import { PortfolioHero } from '@/components/Blocks/PortfolioHero'
import { ProjectsBlock } from '@/components/Blocks/Projects'

export const dynamic = 'force-dynamic'

async function getHostname(): Promise<string> {
  const headersList = await headers()
  const forwarded = headersList.get('x-forwarded-host')
  const host = headersList.get('host') || ''
  const raw = (forwarded || host).split(',')[0].trim()
  const withoutPort = raw.includes(':') ? raw.slice(0, raw.indexOf(':')) : raw
  return withoutPort.toLowerCase()
}

interface PortfolioPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const hostname = await getHostname()
  const params = await searchParams
  const locale = (params?.locale as string) || 'pt-BR'

  const isPortfolioDomain = hostname === 'roberto.sintese.dev'
  const isMainDomain = hostname === 'sintese.dev' || hostname === 'www.sintese.dev'

  // For main domain (/sintese.dev), /portfolio should 404
  if (isMainDomain) {
    notFound()
  }

  // For portfolio domain, /portfolio should redirect to /
  // Using Next.js App Router - we need to handle the redirect differently
  // Since redirect() from next/navigation doesn't accept status codes,
  // we'll use a server action to send a 308 redirect via response
  if (isPortfolioDomain) {
    // Return a 308 Permanent Redirect response
    return new Response(null, {
      status: 308,
      headers: {
        Location: '/',
      },
    })
  }

  // For any other domain, render the portfolio page (fallback behavior)
  const payload = await getPayload({ config })

  // Fetch Projects
  const { docs: projects } = await payload.find({
    collection: 'projects',
    sort: '-createdAt',
    limit: 6,
  })

  // Fetch Site Settings for Footer CNPJ
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Fetch Portfolio content with localization
  const portfolio = await payload.findGlobal({
    slug: 'portfolio',
    locale: locale as 'en' | 'pt-BR',
  })

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <PortfolioNav portfolio={portfolio} />
      <PortfolioHero hero={portfolio?.hero} />
      <ProjectsBlock
        projects={projects}
        projectsSection={portfolio?.projects}
        basePath="/portfolio/projects"
        viewAllLink="/portfolio#work"
      />
      <PortfolioFooter cnpj={siteSettings?.general?.cnpj} footer={portfolio?.footer} />
    </div>
  )
}

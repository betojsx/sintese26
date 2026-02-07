import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PortfolioNav } from '@/components/PortfolioNav'
import { PortfolioFooter } from '@/components/Blocks/PortfolioFooter'
import { PortfolioHero } from '@/components/Blocks/PortfolioHero'
import { ProjectsBlock } from '@/components/Blocks/Projects'

interface PortfolioPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const params = await searchParams
  const locale = (params?.locale as string) || 'en'
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

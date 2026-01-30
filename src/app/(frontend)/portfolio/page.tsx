import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { PortfolioNav } from '@/components/PortfolioNav'
import { PortfolioFooter } from '@/components/Blocks/PortfolioFooter'
import { PortfolioHero } from '@/components/Blocks/PortfolioHero'
import { ProjectsBlock } from '@/components/Blocks/Projects'

export default async function PortfolioPage() {
  const payload = await getPayload({ config })

  // Fetch Projects
  const { docs: projects } = await payload.find({
    collection: 'projects',
    sort: '-createdAt',
    limit: 6,
  })

  // Fetch Site Settings for Footer
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Projects Content
  const projectsProps = {
    blockType: 'projects-block' as const,
    title: 'Selected Works',
    subtitle: 'A Showcase of Technical Excellence • 2024-2026',
    projects: projects,
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <PortfolioNav />
      <PortfolioHero />
      <ProjectsBlock {...projectsProps} />
      <PortfolioFooter cnpj={siteSettings?.general?.cnpj} />
    </div>
  )
}

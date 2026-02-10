import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { RenderBlocks } from '@/components/Blocks/RenderBlocks'
import { DefaultHome } from '@/components/DefaultHome'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
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

export default async function App({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const hostname = await getHostname()
  const isPortfolioDomain = hostname === 'roberto.sintese.dev'
  const params = await searchParams
  const locale = (params?.locale as string) || 'pt-BR'

  const payload = await getPayload({ config })

  // If on roberto.sintese.dev/, render portfolio content
  if (isPortfolioDomain) {
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

  // Default: Render main domain homepage

  // Fetch Projects (shared data)
  const { docs: projects } = await payload.find({
    collection: 'projects',
    sort: '-createdAt',
    limit: 4,
  })

  // Fetch 'home' page
  const { docs: pages } = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })
  const homePage = pages[0] || null

  // Fetch Site Settings
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  // Fallback if no homepage is defined in CMS
  if (!homePage) {
    return <DefaultHome projects={projects} />
  }

  // Extract WhatsApp number from Contact block if present, to pass to Footer
  const contactBlock = homePage.layout?.find((block) => block.blockType === 'contact')
  const whatsappNumber = contactBlock?.blockType === 'contact' ? contactBlock.whatsappNumber : null

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Nav />
      <RenderBlocks layout={homePage.layout} projects={projects} />
      <Footer whatsappNumber={whatsappNumber} cnpj={siteSettings?.general?.cnpj} />
    </div>
  )
}

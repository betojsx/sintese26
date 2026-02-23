import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { RenderBlocks } from '@/components/Blocks/RenderBlocks'

import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { PortfolioV3Page } from '@/components/portfolio/PortfolioV3Page'

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
  const locale = params?.locale === 'en' ? 'en' : 'pt-BR'

  const payload = await getPayload({ config })

  // If on roberto.sintese.dev/, render portfolio content
  if (isPortfolioDomain) {
    return <PortfolioV3Page locale={locale} />
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

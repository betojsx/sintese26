import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RenderBlocks } from '@/components/Blocks/RenderBlocks'
import { DefaultHome } from '@/components/DefaultHome'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export default async function App() {
  const payload = await getPayload({ config })
  
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
    <div className="min-h-screen bg-background text-foreground font-mono selection:bg-primary selection:text-primary-foreground">
      <Nav />
      <RenderBlocks layout={homePage.layout} projects={projects} />
      <Footer 
        whatsappNumber={whatsappNumber} 
        cnpj={siteSettings?.general?.cnpj}
      />
    </div>
  )
}

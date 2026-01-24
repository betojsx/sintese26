import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import './styles.css'

export async function generateMetadata() {
  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const title = siteSettings?.general?.title || 'Sintese Software'
  const favicon = siteSettings?.general?.favicon
  const faviconUrl = typeof favicon === 'object' && favicon !== null ? favicon.url : '/favicon.ico'

  return {
    title,
    description: 'Seu App. Seu Site. No Ar.',
    icons: {
      icon: faviconUrl,
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Mona_Sans, BioRhyme } from 'next/font/google'
import localFont from 'next/font/local'
import './styles.css'

const monaSans = Mona_Sans({
  subsets: ['latin'],
  variable: '--font-mona-sans',
  display: 'swap',
})

const bioRhyme = BioRhyme({
  subsets: ['latin'],
  variable: '--font-biorhyme',
  weight: ['200', '300', '400', '700', '800'],
  display: 'swap',
})

const monaspaceArgon = localFont({
  src: '../../../public/assets/fonts/Monaspace Argon Var.woff2',
  variable: '--font-monaspace-argon',
  display: 'swap',
})

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
    <html
      lang="pt-BR"
      className={`${monaSans.variable} ${monaspaceArgon.variable} ${bioRhyme.variable}`}
    >
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

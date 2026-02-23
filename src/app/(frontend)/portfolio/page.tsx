import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

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

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>
}) {
  const hostname = await getHostname()
  const params = await searchParams
  const locale = (params?.locale as 'en' | 'pt-BR') || 'pt-BR'

  const isPortfolioDomain = hostname === 'roberto.sintese.dev'
  const isMainDomain = hostname === 'sintese.dev' || hostname === 'www.sintese.dev'

  if (isMainDomain) {
    notFound()
  }

  return <PortfolioV3Page locale={locale} />
}

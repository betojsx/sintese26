import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

function getHostname(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-host')
  const host = req.headers.get('host') || ''
  const raw = (forwarded || host).split(',')[0].trim()
  const withoutPort = raw.includes(':') ? raw.slice(0, raw.indexOf(':')) : raw
  return withoutPort.toLowerCase()
}

export async function GET(req: NextRequest) {
  const hostname = getHostname(req)
  const isPortfolio = hostname === 'roberto.sintese.dev'
  const isMain =
    hostname === 'sintese.dev' || hostname === 'www.sintese.dev'
  const match = isMain ? 'main' : isPortfolio ? 'portfolio' : 'other'

  const body = [
    `hostname=${hostname}`,
    `raw_host=${req.headers.get('host') ?? ''}`,
    `x_forwarded_host=${req.headers.get('x-forwarded-host') ?? ''}`,
    `match=${match}`,
  ].join('\n')

  return new Response(body, {
    status: 200,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}

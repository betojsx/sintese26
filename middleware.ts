import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function getHostname(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-host')
  const host = request.headers.get('host') || ''
  const raw = (forwarded || host).split(',')[0].trim()
  const withoutPort = raw.includes(':') ? raw.slice(0, raw.indexOf(':')) : raw
  return withoutPort.toLowerCase()
}

export function middleware(request: NextRequest) {
  const hostname = getHostname(request)

  const isPortfolioDomain = hostname === 'roberto.sintese.dev'
  const isMainDomain = hostname === 'sintese.dev' || hostname === 'www.sintese.dev'

  const response = NextResponse.next()

  // Add debugging headers
  response.headers.set('x-middleware-ran', '1')
  response.headers.set('x-middleware-host', hostname)
  response.headers.set('x-middleware-raw-host', request.headers.get('host') ?? '')
  response.headers.set('x-middleware-raw-forwarded', request.headers.get('x-forwarded-host') ?? '')
  response.headers.set(
    'x-middleware-match',
    isMainDomain ? 'main' : isPortfolioDomain ? 'portfolio' : 'other',
  )

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}

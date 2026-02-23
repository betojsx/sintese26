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
  const pathname = request.nextUrl.pathname

  const isPortfolioDomain = hostname === 'roberto.sintese.dev'
  const isMainDomain = hostname === 'sintese.dev' || hostname === 'www.sintese.dev'

  if (isPortfolioDomain && pathname === '/') {
    const rewriteURL = request.nextUrl.clone()
    rewriteURL.pathname = '/portfolio'
    return NextResponse.rewrite(rewriteURL)
  }

  const response = NextResponse.next()

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}

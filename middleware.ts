import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  const isPortfolioDomain = hostname === 'roberto.sintese.dev'
  const isMainDomain = hostname === 'sintese.dev' || hostname === 'www.sintese.dev'
  const isPortfolioPath = url.pathname === '/portfolio' || url.pathname.startsWith('/portfolio/')

  // Portfolio subdomain: serve portfolio at root
  if (isPortfolioDomain && url.pathname === '/') {
    url.pathname = '/portfolio'
    return NextResponse.rewrite(url)
  }

  // Portfolio subdomain: redirect /portfolio to /
  if (isPortfolioDomain && isPortfolioPath) {
    url.pathname = '/'
    return NextResponse.redirect(url, 308) // 308 Permanent Redirect
  }

  // Main domain: block /portfolio route completely
  if (isMainDomain && isPortfolioPath) {
    return new NextResponse('Not Found', { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}

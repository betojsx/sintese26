import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  const isPortfolioDomain = hostname === 'roberto.sintese.dev'
  const isMainDomain = hostname === 'sintese.dev' || hostname === 'www.sintese.dev'
  const isPortfolioPath = url.pathname === '/portfolio' || url.pathname.startsWith('/portfolio/')

  console.log('Middleware Debug:', {
    hostname,
    pathname: url.pathname,
    isPortfolioDomain,
    isMainDomain,
    isPortfolioPath,
  })

  let response: NextResponse

  // Portfolio subdomain: serve portfolio at root
  if (isPortfolioDomain && url.pathname === '/') {
    console.log('Rewriting root to /portfolio for subdomain')
    url.pathname = '/portfolio'
    response = NextResponse.rewrite(url)
  }
  // Portfolio subdomain: redirect /portfolio to /
  else if (isPortfolioDomain && isPortfolioPath) {
    console.log('Redirecting /portfolio path to root for subdomain')
    url.pathname = '/'
    response = NextResponse.redirect(url, 308) // 308 Permanent Redirect
  }
  // Main domain: block /portfolio route completely
  else if (isMainDomain && isPortfolioPath) {
    console.log('Blocking /portfolio path on main domain')
    response = new NextResponse('Not Found', { status: 404 })
  } else {
    response = NextResponse.next()
  }

  response.headers.set('x-debug-hostname', hostname)
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}

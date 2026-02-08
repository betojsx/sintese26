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
  const url = request.nextUrl.clone()

  const isPortfolioDomain = hostname === 'roberto.sintese.dev'
  const isMainDomain = hostname === 'sintese.dev' || hostname === 'www.sintese.dev'
  const isPortfolioPath = url.pathname === '/portfolio' || url.pathname.startsWith('/portfolio/')

  if (url.pathname === '/__host_debug') {
    const body = [
      `hostname=${hostname}`,
      `raw_host=${request.headers.get('host') ?? ''}`,
      `x_forwarded_host=${request.headers.get('x-forwarded-host') ?? ''}`,
      `match=${isMainDomain ? 'main' : isPortfolioDomain ? 'portfolio' : 'other'}`,
    ].join('\n')
    return new NextResponse(body, {
      status: 200,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }

  let response: NextResponse

  if (isPortfolioDomain && url.pathname === '/') {
    url.pathname = '/portfolio'
    response = NextResponse.rewrite(url)
  } else if (isPortfolioDomain && isPortfolioPath) {
    url.pathname = '/'
    response = NextResponse.redirect(url, 308)
  } else if (isMainDomain && isPortfolioPath) {
    response = new NextResponse('Not Found', { status: 404 })
  } else {
    response = NextResponse.next()
  }

  response.headers.set('x-middleware-ran', '1')
  response.headers.set('x-middleware-host', hostname)
  response.headers.set('x-middleware-raw-host', request.headers.get('host') ?? '')
  response.headers.set('x-middleware-raw-forwarded', request.headers.get('x-forwarded-host') ?? '')
  response.headers.set('x-middleware-match', isMainDomain ? 'main' : isPortfolioDomain ? 'portfolio' : 'other')
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}

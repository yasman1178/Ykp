/**
 * Next.js Middleware for SEO optimization and security
 * Handles canonical URL enforcement, redirects, and security headers
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { needsCanonicalRedirect, getRedirectForPattern } from '@/lib/canonical-url';

export function middleware(request: NextRequest) {
  const { pathname, searchParams, hostname } = request.nextUrl;

  // 0. Domain Normalization (Redirect to www.ykp-eg.com)
  const primaryDomain = 'www.ykp-eg.com';
  const secondaryDomains = ['ykp-eg.com'];

  if (secondaryDomains.includes(hostname)) {
    const url = request.nextUrl.clone();
    url.hostname = primaryDomain;
    return NextResponse.redirect(url, 301);
  }

  // 1. Handle canonical URL enforcement (except for API routes and static files)
  if (!pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|webmanifest)$/)) {

    // Check if URL needs canonical redirect
    const { needsRedirect, canonicalPath } = needsCanonicalRedirect(
      pathname,
      searchParams
    );

    if (needsRedirect) {
      const url = request.nextUrl.clone();
      url.pathname = canonicalPath;
      return NextResponse.redirect(url, 301);
    }

    // Check for pattern-based redirects
    const patternRedirect = getRedirectForPattern(pathname);
    if (patternRedirect && patternRedirect !== pathname) {
      const url = request.nextUrl.clone();
      url.pathname = patternRedirect;
      return NextResponse.redirect(url, 301);
    }
  }

  // 2. Handle admin routes with enhanced security
  if (pathname.startsWith('/admin')) {
    const response = NextResponse.next();

    // Prevent caching of admin pages
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    // Add security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

    // Add CSP header for admin pages
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com;"
    );

    return response;
  }

  // 3. Add standard security headers for all other routes
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Add language headers based on path
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en';
  response.headers.set('Content-Language', locale);

  // Add cache headers for static content
  if (pathname.startsWith('/product') ||
    pathname.startsWith('/products') ||
    pathname.startsWith('/public') ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
/**
 * Canonical URL Management System
 * Handles canonical URL generation, enforcement, and duplicate content prevention
 */

export interface CanonicalConfig {
  baseUrl: string;
  enforceTrailingSlash: boolean;
  enforceLowercase: boolean;
  removeQueryParams: string[];
  locale?: string;
}

const DEFAULT_CONFIG: CanonicalConfig = {
  baseUrl: 'https://www.ykp-eg.com',
  enforceTrailingSlash: false,
  enforceLowercase: true,
  removeQueryParams: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'ref', 'source']
};

/**
 * Generate canonical URL for a given path
 */
export function generateCanonicalUrl(
  pathname: string,
  config: Partial<CanonicalConfig> = {}
): string {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  let canonicalPath = pathname;

  // Remove leading slash for processing
  if (canonicalPath.startsWith('/')) {
    canonicalPath = canonicalPath.substring(1);
  }

  // Enforce lowercase
  if (mergedConfig.enforceLowercase) {
    canonicalPath = canonicalPath.toLowerCase();
  }

  // Handle trailing slash
  if (mergedConfig.enforceTrailingSlash) {
    if (!canonicalPath.endsWith('/') && canonicalPath !== '') {
      canonicalPath += '/';
    }
  } else {
    // Remove trailing slash (except for root)
    if (canonicalPath.endsWith('/') && canonicalPath !== '') {
      canonicalPath = canonicalPath.slice(0, -1);
    }
  }

  // Construct full canonical URL
  const fullUrl = canonicalPath === ''
    ? mergedConfig.baseUrl
    : `${mergedConfig.baseUrl}/${canonicalPath}`;

  return fullUrl;
}

/**
 * Check if URL needs redirect for canonical enforcement
 */
export function needsCanonicalRedirect(
  currentPath: string,
  searchParams?: URLSearchParams,
  config: Partial<CanonicalConfig> = {}
): { needsRedirect: boolean; canonicalPath: string } {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  let needsRedirect = false;
  let canonicalPath = currentPath;

  // Check for uppercase characters
  if (mergedConfig.enforceLowercase && currentPath !== currentPath.toLowerCase()) {
    canonicalPath = currentPath.toLowerCase();
    needsRedirect = true;
  }

  // Check trailing slash
  if (mergedConfig.enforceTrailingSlash) {
    if (!currentPath.endsWith('/') && currentPath !== '/') {
      canonicalPath = currentPath + '/';
      needsRedirect = true;
    }
  } else {
    if (currentPath.endsWith('/') && currentPath !== '/') {
      canonicalPath = currentPath.slice(0, -1);
      needsRedirect = true;
    }
  }

  // Check for tracking parameters that should be removed
  if (searchParams) {
    const cleanParams = new URLSearchParams();
    let hasTrackingParams = false;

    searchParams.forEach((value, key) => {
      if (!mergedConfig.removeQueryParams.includes(key)) {
        cleanParams.append(key, value);
      } else {
        hasTrackingParams = true;
      }
    });

    if (hasTrackingParams) {
      needsRedirect = true;
      const queryString = cleanParams.toString();
      if (queryString) {
        canonicalPath = `${canonicalPath}?${queryString}`;
      }
    }
  }

  return { needsRedirect, canonicalPath };
}

/**
 * Get canonical URL for sitemap entry
 */
export function getCanonicalForSitemap(
  pathname: string,
  locale?: string
): string {
  return generateCanonicalUrl(pathname, { locale });
}

/**
 * Generate hreflang alternate URLs
 */
export function generateHreflangUrls(
  pathname: string,
  locales: string[] = ['en', 'ar']
): Array<{ locale: string; url: string }> {
  return locales.map(locale => ({
    locale: locale === 'en' ? 'en-US' : 'ar-EG',
    url: generateCanonicalUrl(pathname, { locale })
  }));
}

/**
 * Normalize URL path for comparison
 */
export function normalizeUrlPath(path: string): string {
  let normalized = path;

  // Remove protocol and domain if present
  normalized = normalized.replace(/^https?:\/\/[^\/]+/, '');

  // Remove trailing slash
  if (normalized.endsWith('/') && normalized !== '/') {
    normalized = normalized.slice(0, -1);
  }

  // Convert to lowercase
  normalized = normalized.toLowerCase();

  // Remove query parameters
  const queryIndex = normalized.indexOf('?');
  if (queryIndex !== -1) {
    normalized = normalized.substring(0, queryIndex);
  }

  // Remove hash
  const hashIndex = normalized.indexOf('#');
  if (hashIndex !== -1) {
    normalized = normalized.substring(0, hashIndex);
  }

  return normalized;
}

/**
 * Check if two URLs are canonical equivalents
 */
export function areCanonicalEquivalents(url1: string, url2: string): boolean {
  return normalizeUrlPath(url1) === normalizeUrlPath(url2);
}

/**
 * Get canonical URL meta tag content
 */
export function getCanonicalMetaTag(pathname: string, locale?: string): string {
  return generateCanonicalUrl(pathname, { locale });
}

/**
 * Common URL patterns that should redirect
 */
export const REDIRECT_PATTERNS: Array<{
  pattern: RegExp;
  redirect: (match: RegExpMatchArray) => string;
}> = [
    // Redirect /products/collection/product/ to /products/collection/product
    {
      pattern: /^\/products\/([^\/]+)\/([^\/]+)\/$/,
      redirect: (match) => `/products/${match[1]}/${match[2]}`
    },
    // Redirect /blog/article/ to /blog/article
    {
      pattern: /^\/blog\/([^\/]+)\/$/,
      redirect: (match) => `/blog/${match[1]}`
    }
  ];

/**
 * Check if path matches any redirect pattern
 */
export function getRedirectForPattern(pathname: string): string | null {
  for (const { pattern, redirect } of REDIRECT_PATTERNS) {
    const match = pathname.match(pattern);
    if (match) {
      return redirect(match);
    }
  }
  return null;
}

/**
 * Validate canonical URL format
 */
export function isValidCanonicalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      parsed.hostname.length > 0 &&
      !parsed.pathname.includes('//')
    );
  } catch {
    return false;
  }
}

const canonicalUrlUtils = {
  generateCanonicalUrl,
  needsCanonicalRedirect,
  getCanonicalForSitemap,
  generateHreflangUrls,
  normalizeUrlPath,
  areCanonicalEquivalents,
  getCanonicalMetaTag,
  getRedirectForPattern,
  isValidCanonicalUrl,
  REDIRECT_PATTERNS
};

export default canonicalUrlUtils;

/**
 * Canonical Tag Component
 * Adds canonical URL meta tag to page head
 */

import Head from 'next/head';
import { useRouter } from 'next/router';
import { generateCanonicalUrl, generateHreflangUrls } from '@/lib/canonical-url';

interface CanonicalTagProps {
  /**
   * Override the canonical URL (optional)
   * If not provided, will use current pathname
   */
  canonicalUrl?: string;
  
  /**
   * Include hreflang tags for multilingual support
   */
  includeHreflang?: boolean;
  
  /**
   * Available locales for hreflang tags
   */
  locales?: string[];
}

export const CanonicalTag: React.FC<CanonicalTagProps> = ({
  canonicalUrl,
  includeHreflang = true,
  locales = ['en', 'ar']
}) => {
  const router = useRouter();
  const pathname = router.pathname;
  
  // Generate canonical URL
  const canonical = canonicalUrl || generateCanonicalUrl(pathname);
  
  // Generate hreflang URLs if needed
  const hreflangUrls = includeHreflang ? generateHreflangUrls(pathname, locales) : [];
  
  return (
    <Head>
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Hreflang tags for multilingual support */}
      {hreflangUrls.map(({ locale, url }) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={url}
        />
      ))}
      
      {/* x-default for international targeting */}
      {includeHreflang && (
        <link
          rel="alternate"
          hrefLang="x-default"
          href={generateCanonicalUrl(pathname, { locale: 'en' })}
        />
      )}
    </Head>
  );
};

/**
 * Hook for getting canonical URL in components
 */
export const useCanonicalUrl = (customPath?: string): string => {
  const router = useRouter();
  const pathname = customPath || router.pathname;
  return generateCanonicalUrl(pathname);
};

export default CanonicalTag;

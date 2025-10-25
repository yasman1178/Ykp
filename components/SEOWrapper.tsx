import React from 'react';
import { SEOHead } from './SEOHead';
import { generateSEOTags, PAGE_SEO_CONFIGS, SEOConfig } from '@/lib/seo-config';
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema,
  generateBreadcrumbSchema 
} from '@/lib/structured-data';

interface SEOWrapperProps {
  children: React.ReactNode;
  pageType: keyof typeof PAGE_SEO_CONFIGS | 'custom';
  customSEO?: Partial<SEOConfig>;
  structuredData?: any;
  breadcrumbs?: Array<{name: string, url: string}>;
  canonical?: string;
}

export const SEOWrapper: React.FC<SEOWrapperProps> = ({
  children,
  pageType,
  customSEO = {},
  structuredData,
  breadcrumbs,
  canonical
}) => {
  // Generate SEO configuration
  const baseSEO = pageType === 'custom' ? {} : PAGE_SEO_CONFIGS[pageType];
  const seoConfig = generateSEOTags({ ...baseSEO, ...customSEO });

  // Generate structured data
  const combinedStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      generateOrganizationSchema(),
      generateWebsiteSchema(),
      ...(breadcrumbs ? [generateBreadcrumbSchema(breadcrumbs)] : []),
      ...(structuredData ? [structuredData] : [])
    ]
  };

  return (
    <>
      <SEOHead 
        seoConfig={seoConfig}
        structuredData={combinedStructuredData}
        canonical={canonical}
      />
      {children}
    </>
  );
};

export default SEOWrapper;
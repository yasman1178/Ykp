// Blog Sitemap Generator
// Generates XML sitemap entries for blog articles with SEO optimization

import { PHARAONIC_SYMBOLS_ARTICLES } from '@/data/blog-articles';
import { generateBlogSEOUrl } from './seo-content';

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternateUrls?: Array<{
    href: string;
    hreflang: string;
  }>;
}

// Generate sitemap entries for all blog articles
export const generateBlogSitemapEntries = (): SitemapEntry[] => {
  const baseUrl = 'https://www.ykp-eg.com';

  return PHARAONIC_SYMBOLS_ARTICLES.map(article => {
    const seoUrls = generateBlogSEOUrl(article);

    return {
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: article.lastModified,
      changeFrequency: 'monthly' as const,
      priority: article.featured ? 0.9 : 0.8,
      alternateUrls: [
        {
          href: `${baseUrl}${seoUrls.en}`,
          hreflang: 'en'
        },
        {
          href: `${baseUrl}${seoUrls.ar}`,
          hreflang: 'ar'
        }
      ]
    };
  });
};

// Generate blog index sitemap entry
export const generateBlogIndexSitemapEntry = (): SitemapEntry => {
  const baseUrl = 'https://www.ykp-eg.com';

  return {
    url: `${baseUrl}/blog`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
    alternateUrls: [
      {
        href: `${baseUrl}/blog`,
        hreflang: 'en'
      },
      {
        href: `${baseUrl}/ar/blog`,
        hreflang: 'ar'
      }
    ]
  };
};

// Generate XML sitemap content for blog
export const generateBlogSitemapXML = (): string => {
  const blogEntries = generateBlogSitemapEntries();
  const blogIndexEntry = generateBlogIndexSitemapEntry();
  const allEntries = [blogIndexEntry, ...blogEntries];

  const xmlEntries = allEntries.map(entry => {
    const alternateLinks = entry.alternateUrls?.map(alt =>
      `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`
    ).join('\n') || '';

    return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
${alternateLinks}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlEntries}
</urlset>`;
};

// Generate robots.txt entries for blog
export const generateBlogRobotsTxt = (): string[] => {
  return [
    'Sitemap: https://www.ykp-eg.com/sitemap-blog.xml',
    '',
    '# Blog specific rules',
    'Allow: /blog/',
    'Allow: /blog/*.html',
    'Allow: /ar/blog/',
    'Allow: /ar/blog/*.html',
    '',
    '# Blog images',
    'Allow: /blog-images/',
    'Allow: /blog-images/*.jpg',
    'Allow: /blog-images/*.png',
    'Allow: /blog-images/*.webp'
  ];
};

const blogSitemapGenerator = {
  generateBlogSitemapEntries,
  generateBlogIndexSitemapEntry,
  generateBlogSitemapXML,
  generateBlogRobotsTxt
};

export default blogSitemapGenerator;
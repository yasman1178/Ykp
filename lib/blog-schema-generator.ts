/**
 * Blog Schema Markup Generator
 * Generates JSON-LD structured data for blog articles, FAQ sections, and breadcrumbs
 * Optimized for Google Rich Results and enhanced search visibility
 */

import { BlogArticle } from '@/data/blog-articles';

// Base URL for the website
const SITE_URL = 'https://www.ykp-eg.com';
const SITE_NAME = 'YKP Supplies';
const LOGO_URL = `${SITE_URL}/logo.png`;

/**
 * Organization Schema
 * Used across all pages for brand consistency
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 250,
      height: 60
    },
    description: 'Premium Egyptian travel pillow manufacturer specializing in authentic Pharaonic designs and memory foam comfort products.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EG',
      addressLocality: 'Cairo',
      addressRegion: 'Cairo Governorate'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Arabic']
    },
    sameAs: [
      'https://facebook.com/ykp-eg',
      'https://instagram.com/ykp-eg',
      'https://linkedin.com/company/ykp-eg'
    ]
  };
}

/**
 * Blog Schema (for blog listing page)
 */
export function generateBlogSchema(articles: BlogArticle[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Egyptian Pharaonic Symbols Blog - Ancient Wisdom & Travel Pillows',
    description: 'Explore the fascinating world of ancient Egyptian symbols and their meanings. Discover how Pharaonic heritage inspires our premium Egyptian travel pillow designs.',
    url: `${SITE_URL}/blog`,
    publisher: generateOrganizationSchema(),
    inLanguage: ['en', 'ar'],
    blogPost: articles.slice(0, 10).map(article => ({
      '@type': 'BlogPosting',
      headline: article.title,
      alternativeHeadline: article.arabicTitle,
      description: article.description,
      url: `${SITE_URL}/blog/${article.slug}`,
      datePublished: article.publishDate,
      dateModified: article.lastModified,
      author: {
        '@type': 'Person',
        name: article.author
      },
      image: `${SITE_URL}/blog/${article.slug}-featured.jpg`,
      keywords: article.seoKeywords.primary.join(', ')
    }))
  };
}

/**
 * Article Schema (for individual blog posts)
 * Includes E-E-A-T signals for better rankings
 */
export function generateArticleSchema(article: BlogArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    alternativeHeadline: article.arabicTitle,
    description: article.description,
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/blog/${article.slug}-featured.jpg`,
      width: 1200,
      height: 630,
      caption: article.title
    },
    author: {
      '@type': 'Person',
      name: article.author,
      description: getAuthorDescription(article.author),
      jobTitle: getAuthorJobTitle(article.author),
      affiliation: {
        '@type': 'Organization',
        name: SITE_NAME
      }
    },
    publisher: generateOrganizationSchema(),
    datePublished: article.publishDate,
    dateModified: article.lastModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`
    },
    articleBody: article.content,
    articleSection: article.symbol.name,
    wordCount: calculateWordCount(article.content),
    timeRequired: `PT${article.readingTime}M`,
    inLanguage: ['en', 'ar'],
    keywords: [
      ...article.seoKeywords.primary,
      ...article.seoKeywords.secondary,
      ...article.tags
    ].join(', '),
    about: {
      '@type': 'Thing',
      name: article.symbol.name,
      description: article.symbol.meaning,
      sameAs: `https://en.wikipedia.org/wiki/${article.symbol.name.replace(/\s+/g, '_')}`
    },
    mentions: article.relatedProducts.map(productId => ({
      '@type': 'Product',
      name: `${article.symbol.name} Travel Pillow`,
      url: `${SITE_URL}/products/${productId}`
    }))
  };
}

/**
 * FAQ Schema (for FAQ sections in articles)
 * Optimized for Google's FAQ rich results
 */
export interface FAQItem {
  question: string;
  arabicQuestion?: string;
  answer: string;
  arabicAnswer?: string;
}

export function generateFAQSchema(faqItems: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
        inLanguage: 'en'
      }
    }))
  };
}

/**
 * BreadcrumbList Schema
 * Helps Google understand site structure
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

/**
 * WebSite Schema with Search Action
 * Enables Google's sitelinks search box
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: ['en', 'ar']
  };
}

/**
 * ItemList Schema (for blog listing with articles)
 * Helps Google understand the list structure
 */
export function generateItemListSchema(articles: BlogArticle[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: articles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/blog/${article.slug}`,
      name: article.title,
      image: `${SITE_URL}/blog/${article.slug}-featured.jpg`
    }))
  };
}

/**
 * Combined Schema for Blog Article Page
 * Includes Article, FAQ, Breadcrumb, and Organization schemas
 */
export function generateBlogArticlePageSchema(
  article: BlogArticle,
  faqItems?: FAQItem[],
  breadcrumbs?: Array<{ name: string; url: string }>
) {
  const schemas: any[] = [
    generateArticleSchema(article),
    generateOrganizationSchema()
  ];

  if (faqItems && faqItems.length > 0) {
    schemas.push(generateFAQSchema(faqItems));
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas
  };
}

/**
 * Combined Schema for Blog Listing Page
 * Includes Blog, ItemList, WebSite, and Organization schemas
 */
export function generateBlogListingPageSchema(articles: BlogArticle[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      generateBlogSchema(articles),
      generateItemListSchema(articles),
      generateWebSiteSchema(),
      generateOrganizationSchema()
    ]
  };
}

// Helper Functions

function calculateWordCount(content: string): number {
  return content.split(/\s+/).length;
}

function getAuthorDescription(authorName: string): string {
  const authorDescriptions: { [key: string]: string } = {
    'Dr. Amira Hassan, Egyptian Cultural Historian': 'Expert in ancient Egyptian culture and symbolism with over 15 years of research experience.',
    'Prof. Mohamed El-Sharif, Egyptologist': 'Professor of Egyptology specializing in ancient Egyptian religious practices and symbolism.',
    'Dr. Yasmin Farouk, Egyptian Art Historian': 'Specialist in ancient Egyptian art and royal iconography with focus on the Amarna period.',
    'Dr. Khaled Mahmoud, Egyptologist and Pyramid Researcher': 'Leading researcher in pyramid construction and ancient Egyptian architecture.',
    'Dr. Nadia El-Masry, Expert in Egyptian Mythology': 'Authority on ancient Egyptian mythology and religious symbolism.',
    'Dr. Hossam Abdel-Rahman, Egyptian Religious Studies Scholar': 'Scholar specializing in ancient Egyptian religious practices and spiritual symbols.',
    'Dr. Layla Hassan, Botanist and Egyptian Cultural Researcher': 'Expert in ancient Egyptian botany and the cultural significance of plants.',
    'Prof. Ahmed Zahi, Sphinx Research Institute': 'Director of Sphinx Research Institute with expertise in ancient Egyptian monuments.',
    'Dr. Salma Ikram, Cleopatra Studies Expert': 'Leading expert on Cleopatra VII and the Ptolemaic period.',
    'Dr. Mostafa Waziri, Former Secretary-General of Egypt\'s Supreme Council of Antiquities': 'Former head of Egypt\'s antiquities authority with extensive knowledge of pharaonic symbols.'
  };

  return authorDescriptions[authorName] || 'Expert in Egyptian cultural heritage and ancient symbolism.';
}

function getAuthorJobTitle(authorName: string): string {
  if (authorName.includes('Dr.')) return 'Research Scholar';
  if (authorName.includes('Prof.')) return 'Professor';
  return 'Cultural Expert';
}

/**
 * Validate Schema Markup
 * Checks for required fields and proper structure
 */
export function validateSchema(schema: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!schema['@context']) {
    errors.push('Missing @context');
  }

  if (!schema['@type']) {
    errors.push('Missing @type');
  }

  if (schema['@type'] === 'Article') {
    if (!schema.headline) errors.push('Article missing headline');
    if (!schema.author) errors.push('Article missing author');
    if (!schema.datePublished) errors.push('Article missing datePublished');
    if (!schema.publisher) errors.push('Article missing publisher');
  }

  if (schema['@type'] === 'FAQPage') {
    if (!schema.mainEntity || schema.mainEntity.length === 0) {
      errors.push('FAQPage missing mainEntity');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Generate Schema Script Tag
 * Returns HTML script tag with JSON-LD
 */
export function generateSchemaScriptTag(schema: any): string {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

/**
 * Export all schema generators
 */
// All functions are already exported above

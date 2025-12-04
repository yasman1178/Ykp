import React from 'react';
import Head from 'next/head';
import { BlogArticle } from '@/data/blog-articles';
import {
  generateBlogArticlePageSchema,
  generateBlogListingPageSchema,
  FAQItem
} from '@/lib/blog-schema-generator';

interface BlogSchemaMarkupProps {
  type: 'article' | 'listing';
  article?: BlogArticle;
  articles?: BlogArticle[];
  faqItems?: FAQItem[];
  breadcrumbs?: Array<{ name: string; url: string }>;
}

/**
 * BlogSchemaMarkup Component
 * Adds JSON-LD structured data to blog pages for enhanced SEO
 * 
 * Usage:
 * - For article pages: <BlogSchemaMarkup type="article" article={article} faqItems={faqs} breadcrumbs={breadcrumbs} />
 * - For listing pages: <BlogSchemaMarkup type="listing" articles={articles} />
 */
export default function BlogSchemaMarkup({
  type,
  article,
  articles,
  faqItems,
  breadcrumbs
}: BlogSchemaMarkupProps) {
  let schema: any;

  if (type === 'article' && article) {
    schema = generateBlogArticlePageSchema(article, faqItems, breadcrumbs);
  } else if (type === 'listing' && articles) {
    schema = generateBlogListingPageSchema(articles);
  } else {
    console.warn('BlogSchemaMarkup: Invalid props provided');
    return null;
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}

/**
 * Standalone FAQ Schema Component
 * Can be used independently for FAQ sections
 */
interface FAQSchemaProps {
  items: FAQItem[];
}

export function FAQSchemaMarkup({ items }: FAQSchemaProps) {
  if (!items || items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}

/**
 * Breadcrumb Schema Component
 * Can be used independently for breadcrumb navigation
 */
interface BreadcrumbSchemaProps {
  breadcrumbs: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchemaMarkup({ breadcrumbs }: BreadcrumbSchemaProps) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}

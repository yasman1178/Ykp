// Dynamic Sitemap Generation with Enhanced SEO and Blog Integration
import { GetServerSideProps } from 'next';
import { productService } from '@/lib/product-service';
import { PHARAONIC_SYMBOLS_ARTICLES } from '@/data/blog-articles';
import { ENHANCED_BLOG_ARTICLES } from '@/data/blog-articles-enhanced';
import { ALL_PRODUCTS } from '@/data/products';
import { getCanonicalForSitemap } from '@/lib/canonical-url';

interface SitemapEntry {
  url: string;
  changefreq: string;
  priority: string;
  lastmod: string;
  images?: Array<{
    loc: string;
    title: string;
    caption?: string;
  }>;
  news?: {
    publication: {
      name: string;
      language: string;
    };
    publication_date: string;
    title: string;
    keywords?: string;
  };
}

// Calculate priority based on page importance
const calculatePriority = (pageType: string, featured: boolean = false): string => {
  const priorities: Record<string, number> = {
    home: 1.0,
    products_main: 0.9,
    collection: 0.85,
    product_featured: 0.8,
    product: 0.7,
    blog_main: 0.75,
    blog_featured: 0.7,
    blog: 0.65,
    wholesale: 0.85,
    contact: 0.8,
    about: 0.75,
    services: 0.7,
    other: 0.6
  };

  if (featured && pageType.startsWith('product')) return priorities.product_featured.toString();
  if (featured && pageType.startsWith('blog')) return priorities.blog_featured.toString();

  return (priorities[pageType] || priorities.other).toString();
};

// Get accurate lastmod timestamps
const getLastModified = (type: string, data?: any): string => {
  const now = new Date();

  if (data?.lastModified) {
    return new Date(data.lastModified).toISOString();
  }

  if (data?.publishDate) {
    return new Date(data.publishDate).toISOString();
  }

  // Default lastmod based on content type
  const defaultDates: Record<string, Date> = {
    home: new Date(now.getFullYear(), now.getMonth(), 1), // First of current month
    products: new Date(now.getFullYear(), now.getMonth(), 1),
    blog: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7), // Week ago
    static: new Date(now.getFullYear(), now.getMonth() - 1, 1) // Month ago
  };

  return (defaultDates[type] || now).toISOString();
};

const generateSitemap = (): string => {
  const baseUrl = 'https://www.ykp-eg.com';
  const currentDate = new Date().toISOString();

  const allPages: SitemapEntry[] = [];

  // Static pages with calculated priorities
  const staticPages: SitemapEntry[] = [
    {
      url: '/',
      changefreq: 'weekly',
      priority: calculatePriority('home'),
      lastmod: getLastModified('home')
    },
    {
      url: '/products',
      changefreq: 'weekly',
      priority: calculatePriority('products_main'),
      lastmod: getLastModified('products')
    },
    {
      url: '/about',
      changefreq: 'monthly',
      priority: calculatePriority('about'),
      lastmod: getLastModified('static')
    },
    {
      url: '/contact',
      changefreq: 'monthly',
      priority: calculatePriority('contact'),
      lastmod: getLastModified('static')
    },
    {
      url: '/wholesale',
      changefreq: 'monthly',
      priority: calculatePriority('wholesale'),
      lastmod: getLastModified('static')
    },
    {
      url: '/retail',
      changefreq: 'weekly',
      priority: '0.85',
      lastmod: getLastModified('products')
    },
    {
      url: '/partnership',
      changefreq: 'monthly',
      priority: calculatePriority('other'),
      lastmod: getLastModified('static')
    },
    {
      url: '/distributor',
      changefreq: 'monthly',
      priority: calculatePriority('other'),
      lastmod: getLastModified('static')
    },
    {
      url: '/services',
      changefreq: 'monthly',
      priority: calculatePriority('services'),
      lastmod: getLastModified('static')
    },
    {
      url: '/blog',
      changefreq: 'weekly',
      priority: calculatePriority('blog_main'),
      lastmod: getLastModified('blog')
    },
    {
      url: '/egyptian-culture',
      changefreq: 'monthly',
      priority: calculatePriority('other'),
      lastmod: getLastModified('static')
    },
    {
      url: '/pharaonic-symbols',
      changefreq: 'monthly',
      priority: calculatePriority('other'),
      lastmod: getLastModified('static')
    }
  ];

  allPages.push(...staticPages);

  // Collection pages with images
  const collections = ['b123', 't', 'tb'];
  const collectionPages: SitemapEntry[] = collections.map(collection => ({
    url: `/products/${collection}`,
    changefreq: 'weekly',
    priority: calculatePriority('collection'),
    lastmod: getLastModified('products'),
    images: [{
      loc: `${baseUrl}/prodect/${collection}/1.webp`,
      title: `Egyptian Travel Pillows - ${collection.toUpperCase()} Collection`,
      caption: `Premium Egyptian travel pillows from the ${collection.toUpperCase()} collection with authentic Pharaonic designs`
    }]
  }));

  allPages.push(...collectionPages);

  // Product pages with dynamic data and images
  const productPages: SitemapEntry[] = ALL_PRODUCTS.map(product => {
    const images = [];

    // Add primary product image
    images.push({
      loc: `${baseUrl}/prodect/${product.collection}/${product.id.split('-').pop()}.webp`,
      title: product.name,
      caption: product.description
    });

    // Add additional product images if available
    if (product.images && product.images.length > 0) {
      product.images.slice(0, 3).forEach((img: any, index: number) => {
        images.push({
          loc: img.url.startsWith('http') ? img.url : `${baseUrl}${img.url}`,
          title: `${product.name} - View ${index + 2}`,
          caption: img.alt || product.description
        });
      });
    }

    return {
      url: `/products/${product.collection}/${product.id}`,
      changefreq: 'monthly',
      priority: calculatePriority('product', product.featured),
      lastmod: getLastModified('products', product),
      images
    };
  });

  allPages.push(...productPages);

  // Enhanced blog article pages with news sitemap and images
  const blogPages: SitemapEntry[] = ENHANCED_BLOG_ARTICLES.map(article => {
    const images = [];

    // Add featured image
    if (article.featuredImage) {
      images.push({
        loc: article.featuredImage.url.startsWith('http')
          ? article.featuredImage.url
          : `${baseUrl}${article.featuredImage.url}`,
        title: article.featuredImage.alt,
        caption: article.featuredImage.caption
      });
    }

    // Add gallery images
    if (article.gallery && article.gallery.length > 0) {
      article.gallery.slice(0, 3).forEach(img => {
        images.push({
          loc: img.url.startsWith('http') ? img.url : `${baseUrl}${img.url}`,
          title: img.alt,
          caption: img.caption
        });
      });
    }

    // Check if article is recent (within 2 days) for news sitemap
    const publishDate = new Date(article.publishDate);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const isRecent = publishDate >= twoDaysAgo;

    return {
      url: `/blog/${article.slug}`,
      changefreq: 'monthly',
      priority: calculatePriority('blog', article.featured),
      lastmod: getLastModified('blog', article),
      images,
      ...(isRecent && {
        news: {
          publication: {
            name: 'YKP Supplies Blog',
            language: 'en'
          },
          publication_date: publishDate.toISOString(),
          title: article.title,
          keywords: article.keywords.primary.join(', ')
        }
      })
    };
  });

  allPages.push(...blogPages);

  // Generate XML sitemap with enhanced metadata and multilingual hreflang
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xhtml="http://www.w3.org/1999/xhtml"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
          xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    ${allPages.map(page => {
    const canonicalUrl = getCanonicalForSitemap(page.url);
    const escapedUrl = canonicalUrl.replace(/&/g, '&amp;');
    const arUrl = `${baseUrl}/ar${page.url === '/' ? '' : page.url}`.replace(/&/g, '&amp;');

    return `
  <url>
    <loc>${escapedUrl}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${escapedUrl}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${arUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapedUrl}" />
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.news ? `
    <news:news>
      <news:publication>
        <news:name>${page.news.publication.name}</news:name>
        <news:language>${page.news.publication.language}</news:language>
      </news:publication>
      <news:publication_date>${page.news.publication_date}</news:publication_date>
      <news:title><![CDATA[${page.news.title}]]></news:title>${page.news.keywords ? `
      <news:keywords>${page.news.keywords}</news:keywords>` : ''}
    </news:news>` : ''}${page.images && page.images.length > 0 ? page.images.map(img => `
    <image:image>
      <image:loc>${img.loc.replace(/&/g, '&amp;')}</image:loc>
      <image:title><![CDATA[${img.title}]]></image:title>${img.caption ? `
      <image:caption><![CDATA[${img.caption}]]></image:caption>` : ''}
    </image:image>`).join('') : ''}
  </url>`;
  }).join('')}
  </urlset>`;

  return sitemap;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const sitemap = generateSitemap();

    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.statusCode = 500;
    res.end();
  }

  return {
    props: {}
  };
};

const SitemapPage = () => null;
export default SitemapPage;
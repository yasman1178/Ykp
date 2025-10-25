// Dynamic Sitemap Generation with Enhanced SEO and Blog Integration
import { GetServerSideProps } from 'next';
import { productService } from '@/lib/product-service';
import { PHARAONIC_SYMBOLS_ARTICLES } from '@/data/blog-articles';
import { generateBlogSitemapEntries } from '@/lib/blog-sitemap-generator';

const generateSitemap = () => {
  const baseUrl = 'https://pharaonicpillows.com';
  const currentDate = new Date().toISOString();
  
  // Static pages with enhanced SEO priorities
  const staticPages = [
    { url: '', changefreq: 'weekly', priority: '1.0', lastmod: currentDate },
    { url: '/products', changefreq: 'weekly', priority: '0.9', lastmod: currentDate },
    { url: '/about', changefreq: 'monthly', priority: '0.7', lastmod: currentDate },
    { url: '/contact', changefreq: 'monthly', priority: '0.7', lastmod: currentDate },
    { url: '/wholesale', changefreq: 'monthly', priority: '0.8', lastmod: currentDate },
    { url: '/partnership', changefreq: 'monthly', priority: '0.7', lastmod: currentDate },
    { url: '/blog', changefreq: 'weekly', priority: '0.6', lastmod: currentDate }
  ];

  // Collection pages with SEO optimization
  const collectionPages = [
    { url: '/products/', changefreq: 'weekly', priority: '0.8', lastmod: currentDate },
    { url: '/products/', changefreq: 'weekly', priority: '0.8', lastmod: currentDate },
    { url: '/products/', changefreq: 'weekly', priority: '0.8', lastmod: currentDate }
  ];

  // Product pages with dynamic data
  const allProducts = productService.getAllProducts();
  const productPages = allProducts.map(product => ({
    url: `/products/${product.collection}/${product.id}`,
    changefreq: 'monthly',
    priority: product.featured ? '0.7' : '0.6',
    lastmod: currentDate
  }));

  // Enhanced blog article pages with SEO optimization
  const blogSitemapEntries = generateBlogSitemapEntries();
  const blogPages = blogSitemapEntries.map(entry => {
    const article = PHARAONIC_SYMBOLS_ARTICLES.find(a => entry.url.includes(a.slug));
    return {
      url: entry.url.replace('https://pharaonicpillows.com', ''),
      changefreq: entry.changeFrequency,
      priority: entry.priority.toString(),
      lastmod: entry.lastModified,
      article: article
    };
  });

  // Combine all pages
  const allPages = [
    ...staticPages, 
    ...collectionPages, 
    ...productPages, 
    ...blogPages.map(({ article, ...page }) => ({ ...page, blogArticle: article }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages
  .map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.url.includes('/blog/') && 'blogArticle' in page && page.blogArticle ? `
    <news:news>
      <news:publication>
        <news:name>Pharaonic Pillows Blog</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${page.lastmod}</news:publication_date>
      <news:title>${(page as any).blogArticle.title}</news:title>
      <news:keywords>${(page as any).blogArticle.seoKeywords.primary.join(', ')}</news:keywords>
    </news:news>
    <image:image>
      <image:loc>${baseUrl}/blog-images/${(page as any).blogArticle.slug}-featured.jpg</image:loc>
      <image:title>${(page as any).blogArticle.title}</image:title>
      <image:caption>${(page as any).blogArticle.description}</image:caption>
    </image:image>` : ''}
    ${page.url.includes('/products/') && !page.url.match(/\/(b123|t|tb)$/) ? `
    <image:image>
      <image:loc>${baseUrl}/prodect/${page.url.split('/')[2]}/1.png</image:loc>
      <image:title>Egyptian Travel Pillow - Pharaonic Design</image:title>
      <image:caption>Premium Egyptian travel pillow with authentic Pharaonic design and memory foam comfort</image:caption>
    </image:image>` : ''}
  </url>`)
  .join('')}
</urlset>`;

  return sitemap;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSitemap();

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

const SitemapPage = () => null;
export default SitemapPage;
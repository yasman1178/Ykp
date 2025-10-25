// Internal Linking Strategy for SEO
// Comprehensive linking between products, blog articles, and pages

import { PHARAONIC_SYMBOLS_ARTICLES } from '@/data/blog-articles';
import { TARGET_KEYWORDS } from './seo-content';

export interface InternalLink {
  url: string;
  anchor: string;
  title: string;
  type: 'product' | 'blog' | 'collection' | 'page';
  keywords: string[];
  priority: 'high' | 'medium' | 'low';
}

// Product to Blog Article Linking
export const getProductToBlogLinks = (product: any): InternalLink[] => {
  const links: InternalLink[] = [];
  
  // Link to articles about symbols used in the product
  if (product.pharaonicDesign?.primarySymbols) {
    product.pharaonicDesign.primarySymbols.forEach((symbol: any) => {
      const relatedArticle = PHARAONIC_SYMBOLS_ARTICLES.find(article =>
        article.symbol.name.toLowerCase().includes(symbol.name.toLowerCase()) ||
        symbol.name.toLowerCase().includes(article.symbol.name.toLowerCase())
      );
      
      if (relatedArticle) {
        links.push({
          url: `/blog/${relatedArticle.slug}`,
          anchor: `Learn about ${symbol.name} symbolism`,
          title: `Discover the meaning of ${symbol.name} in ancient Egyptian culture`,
          type: 'blog',
          keywords: [symbol.name, 'Egyptian symbols', 'ancient Egypt'],
          priority: 'high'
        });
      }
    });
  }
  
  // Link to general Egyptian heritage articles
  links.push({
    url: '/blog',
    anchor: 'Explore Egyptian Heritage',
    title: 'Learn about ancient Egyptian symbols and their cultural significance',
    type: 'blog',
    keywords: ['Egyptian heritage', 'Pharaonic symbols', 'ancient Egypt'],
    priority: 'medium'
  });
  
  return links;
};

// Blog Article to Product Linking
export const getBlogToProductLinks = (article: any): InternalLink[] => {
  const links: InternalLink[] = [];
  
  // Link to related products mentioned in the article
  if (article.relatedProducts) {
    article.relatedProducts.forEach((productId: string) => {
      // Extract collection and product info from ID
      const parts = productId.split('-');
      const collection = parts[0];
      
      links.push({
        url: `/products/${collection}/${productId}`,
        anchor: `${productId.replace(/-/g, ' ')} Travel Pillow`,
        title: `Premium Egyptian travel pillow featuring ${article.symbol.name} design`,
        type: 'product',
        keywords: [
          'Egyptian travel pillows',
          article.symbol.name,
          'Pharaonic design',
          'memory foam'
        ],
        priority: 'high'
      });
    });
  }
  
  // Link to collection pages
  const collections = ['b123', 't', 'tb'];
  collections.forEach(collection => {
    const collectionNames = {
      b123: 'Premium Collection',
      t: 'Classic Collection', 
      tb: 'Heritage Collection'
    };
    
    links.push({
      url: `/products/${collection}`,
      anchor: `${collectionNames[collection as keyof typeof collectionNames]} Pillows`,
      title: `Explore ${collectionNames[collection as keyof typeof collectionNames]} Egyptian travel pillows`,
      type: 'collection',
      keywords: [
        'Egyptian travel pillows',
        collection === 'b123' ? 'premium' : collection === 't' ? 'classic' : 'heritage',
        'wholesale',
        'B2B'
      ],
      priority: 'medium'
    });
  });
  
  return links;
};

// Collection to Product and Blog Linking
export const getCollectionLinks = (collection: any): InternalLink[] => {
  const links: InternalLink[] = [];
  
  // Link to featured products in the collection
  if (collection.products) {
    collection.products.slice(0, 5).forEach((product: any) => {
      links.push({
        url: `/products/${collection.id}/${product.id}`,
        anchor: product.name,
        title: `${product.name} - Premium Egyptian travel pillow with authentic Pharaonic design`,
        type: 'product',
        keywords: [
          'Egyptian travel pillows',
          product.name,
          'Pharaonic design',
          'memory foam'
        ],
        priority: 'high'
      });
    });
  }
  
  // Link to relevant blog articles
  const relevantArticles = PHARAONIC_SYMBOLS_ARTICLES.filter(article =>
    collection.keySymbols?.some((symbol: string) =>
      article.symbol.name.toLowerCase().includes(symbol.toLowerCase())
    )
  );
  
  relevantArticles.slice(0, 3).forEach(article => {
    links.push({
      url: `/blog/${article.slug}`,
      anchor: `${article.symbol.name} Symbolism`,
      title: article.description,
      type: 'blog',
      keywords: [article.symbol.name, 'Egyptian symbols', 'ancient Egypt'],
      priority: 'medium'
    });
  });
  
  return links;
};

// Homepage Strategic Linking
export const getHomepageLinks = (): InternalLink[] => {
  return [
    // Product collections
    {
      url: '/products/',
      anchor: 'Premium Egyptian Travel Pillows',
      title: 'Luxury Egyptian travel pillows with authentic Pharaonic designs',
      type: 'collection',
      keywords: ['premium Egyptian travel pillows', 'luxury', 'Pharaonic design'],
      priority: 'high'
    },
    {
      url: '/products/',
      anchor: 'Classic Egyptian Collection',
      title: 'Traditional Egyptian travel pillows with timeless symbols',
      type: 'collection',
      keywords: ['classic Egyptian pillows', 'traditional', 'Egyptian symbols'],
      priority: 'high'
    },
    {
      url: '/products/',
      anchor: 'Heritage Egyptian Pillows',
      title: 'Ancient Egyptian hieroglyphic and symbol travel pillows',
      type: 'collection',
      keywords: ['heritage Egyptian pillows', 'hieroglyphic', 'ancient symbols'],
      priority: 'high'
    },
    
    // Featured blog articles
    {
      url: '/blog/anubis-god-death-afterlife-egyptian-culture',
      anchor: 'Anubis - Guardian of Travelers',
      title: 'Learn about Anubis, the ancient Egyptian god who protects travelers',
      type: 'blog',
      keywords: ['Anubis', 'Egyptian mythology', 'travel protection'],
      priority: 'medium'
    },
    {
      url: '/blog/royal-scarab-protection-renewal-egyptian-culture',
      anchor: 'Royal Scarab Protection Symbol',
      title: 'Discover the protective power of the Royal Scarab in Egyptian culture',
      type: 'blog',
      keywords: ['Royal Scarab', 'protection symbols', 'Egyptian culture'],
      priority: 'medium'
    },
    
    // Business pages
    {
      url: '/wholesale',
      anchor: 'Wholesale Egyptian Travel Pillows',
      title: 'B2B wholesale opportunities for Egyptian travel pillow distributors',
      type: 'page',
      keywords: ['wholesale Egyptian pillows', 'B2B', 'distributor opportunities'],
      priority: 'high'
    },
    {
      url: '/partnership',
      anchor: 'International Partnership Program',
      title: 'Join our global network of Egyptian travel pillow distributors',
      type: 'page',
      keywords: ['international partnership', 'distributor program', 'global network'],
      priority: 'medium'
    }
  ];
};

// SEO-Optimized Anchor Text Generation
export const generateSEOAnchorText = (
  targetPage: string,
  context: string,
  keywords: string[]
): string => {
  const keywordVariations = {
    'egyptian travel pillows': [
      'Egyptian travel pillows',
      'premium Egyptian travel pillows',
      'authentic Egyptian travel pillows',
      'luxury Egyptian travel pillows'
    ],
    'pharaonic design': [
      'Pharaonic design',
      'authentic Pharaonic design',
      'traditional Pharaonic patterns',
      'ancient Pharaonic symbols'
    ],
    'memory foam': [
      'memory foam comfort',
      'premium memory foam',
      'memory foam technology',
      'memory foam pillows'
    ]
  };
  
  // Select appropriate variation based on context
  const primaryKeyword = keywords[0]?.toLowerCase();
  const variations = keywordVariations[primaryKeyword as keyof typeof keywordVariations];
  
  if (variations) {
    // Use different variations to avoid repetitive anchor text
    const randomIndex = Math.floor(Math.random() * variations.length);
    return variations[randomIndex];
  }
  
  return keywords[0] || 'Learn more';
};

// Link Juice Distribution Strategy
export const prioritizeInternalLinks = (links: InternalLink[]): InternalLink[] => {
  return links.sort((a, b) => {
    // Priority order: high > medium > low
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.priority];
    const bPriority = priorityOrder[b.priority];
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    
    // Secondary sort by type importance
    const typeOrder = { product: 4, collection: 3, blog: 2, page: 1 };
    const aTypeOrder = typeOrder[a.type];
    const bTypeOrder = typeOrder[b.type];
    
    return bTypeOrder - aTypeOrder;
  });
};

// Generate contextual internal links for any page
export const generateContextualLinks = (
  pageType: 'product' | 'blog' | 'collection' | 'homepage',
  pageData: any,
  maxLinks: number = 8
): InternalLink[] => {
  let links: InternalLink[] = [];
  
  switch (pageType) {
    case 'product':
      links = getProductToBlogLinks(pageData);
      break;
    case 'blog':
      links = getBlogToProductLinks(pageData);
      break;
    case 'collection':
      links = getCollectionLinks(pageData);
      break;
    case 'homepage':
      links = getHomepageLinks();
      break;
  }
  
  // Prioritize and limit links
  const prioritizedLinks = prioritizeInternalLinks(links);
  return prioritizedLinks.slice(0, maxLinks);
};

export default {
  getProductToBlogLinks,
  getBlogToProductLinks,
  getCollectionLinks,
  getHomepageLinks,
  generateSEOAnchorText,
  prioritizeInternalLinks,
  generateContextualLinks
};
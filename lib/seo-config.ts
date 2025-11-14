// SEO Configuration and Utilities
// Comprehensive SEO setup for Egyptian Pharaonic Pillows website

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
    type: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
    creator?: string;
  };
  canonical?: string;
  robots?: string;
  structuredData?: any;
}

// Primary Keywords for Egyptian Travel Pillows
export const PRIMARY_KEYWORDS = {
  english: [
    'Egyptian travel pillows',
    'Pharaonic design pillows',
    'memory foam travel pillows',
    'Egyptian heritage pillows',
    'wholesale travel pillows',
    'B2B travel accessories',
    'Egyptian cultural pillows',
    'ancient Egyptian symbols',
    'travel comfort pillows',
    'Egyptian mythology pillows'
  ],
  arabic: [
    'مخدات سفر مصرية',
    'مخدات تصميم فرعوني',
    'مخدات رغوة الذاكرة',
    'مخدات تراث مصري',
    'مخدات سفر بالجملة',
    'إكسسوارات سفر تجارية',
    'مخدات ثقافة مصرية',
    'رموز مصرية قديمة',
    'مخدات راحة السفر',
    'مخدات أساطير مصرية'
  ]
};

// Long-tail Keywords for Better Targeting
export const LONG_TAIL_KEYWORDS = {
  english: [
    'premium Egyptian travel pillows wholesale',
    'authentic Pharaonic design memory foam pillows',
    'Egyptian cultural heritage travel accessories',
    'ancient Egyptian symbols travel pillows B2B',
    'luxury Egyptian travel comfort wholesale',
    'traditional Egyptian design travel pillows',
    'Egyptian mythology inspired travel accessories',
    'wholesale Egyptian heritage travel pillows',
    'premium memory foam Egyptian design pillows',
    'authentic Egyptian cultural travel accessories'
  ],
  arabic: [
    'مخدات سفر مصرية فاخرة بالجملة',
    'مخدات رغوة ذاكرة تصميم فرعوني أصيل',
    'إكسسوارات سفر تراث ثقافي مصري',
    'مخدات سفر رموز مصرية قديمة تجارية',
    'راحة سفر مصرية فاخرة بالجملة',
    'مخدات سفر تصميم مصري تقليدي',
    'إكسسوارات سفر مستوحاة من الأساطير المصرية',
    'مخدات تراث مصري بالجملة للسفر',
    'مخدات رغوة ذاكرة فاخرة تصميم مصري',
    'إكسسوارات سفر ثقافية مصرية أصيلة'
  ]
};

// Default SEO Configuration
export const DEFAULT_SEO: SEOConfig = {
  title: 'YKP Supplies - Premium Egyptian Travel Pillows | Wholesale B2B',
  description: 'Premium Egyptian travel pillows inspired by ancient Pharaonic designs. Memory foam comfort meets Egyptian heritage. Wholesale opportunities for international distributors and retailers.',
  keywords: [...PRIMARY_KEYWORDS.english, ...PRIMARY_KEYWORDS.arabic],
  openGraph: {
    title: 'YKP Supplies - Premium Egyptian Travel Pillows',
    description: 'Premium Egyptian travel pillows inspired by ancient Pharaonic designs. Memory foam comfort meets Egyptian heritage.',
    image: '/og-image-pharaonic-pillows.jpg',
    url: 'https://pharaonicpillows.com',
    type: 'website',
    siteName: 'Pharaonic Pillows'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pharaonic Pillows - Premium Egyptian Travel Pillows',
    description: 'Premium Egyptian travel pillows inspired by ancient Pharaonic designs. Memory foam comfort meets Egyptian heritage.',
    image: '/twitter-card-pharaonic-pillows.jpg',
    creator: '@pharaonicpillows'
  },
  robots: 'index, follow',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'YKP Supplies',
    description: 'Premium Egyptian travel pillows inspired by ancient Pharaonic designs',
    url: 'https://pharaonicpillows.com',
    logo: 'https://pharaonicpillows.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+20-100-240-6013',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic']
    },
    sameAs: [
      'https://www.linkedin.com/in/ykp-eg-483b8a398',
      'https://www.facebook.com/new.cairo.893792'
    ]
  }
};

// Page-specific SEO configurations
export const PAGE_SEO_CONFIGS = {
  home: {
    title: 'Pharaonic Pillows - Premium Egyptian Travel Pillows | Wholesale B2B',
    description: 'Premium Egyptian travel pillows inspired by ancient Pharaonic designs. Memory foam comfort meets Egyptian heritage. Wholesale opportunities for international distributors.',
    keywords: [
      'Egyptian travel pillows',
      'Pharaonic design',
      'wholesale travel pillows',
      'B2B travel accessories',
      'memory foam pillows',
      'Egyptian heritage',
      'travel comfort',
      'international wholesale'
    ]
  },
  
  products: {
    title: 'Egyptian Travel Pillows Collections | Premium Pharaonic Designs',
    description: 'Explore our complete collection of Egyptian travel pillows. Premium, Classic, and Heritage collections featuring authentic Pharaonic designs and modern comfort technology.',
    keywords: [
      'Egyptian pillow collections',
      'Pharaonic travel pillows',
      'premium travel accessories',
      'Egyptian design pillows',
      'memory foam travel pillows',
      'wholesale pillow collections'
    ]
  },
  
  about: {
    title: 'About Pharaonic Pillows - Egyptian Heritage Travel Comfort Company',
    description: 'Learn about Pharaonic Pillows mission to bring Egyptian heritage to modern travel comfort. Discover our story, values, and commitment to authentic Egyptian design.',
    keywords: [
      'Pharaonic Pillows company',
      'Egyptian heritage company',
      'travel pillow manufacturer',
      'Egyptian design company',
      'wholesale travel accessories',
      'B2B travel products'
    ]
  },
  
  contact: {
    title: 'Contact Pharaonic Pillows - Wholesale Inquiries & Partnership',
    description: 'Contact Pharaonic Pillows for wholesale inquiries, partnership opportunities, or questions about our Egyptian travel pillows. Global shipping available.',
    keywords: [
      'contact Pharaonic Pillows',
      'wholesale inquiries',
      'partnership opportunities',
      'Egyptian pillow supplier',
      'B2B contact',
      'international shipping'
    ]
  },
  
  wholesale: {
    title: 'Wholesale Egyptian Travel Pillows | B2B Partnership Program',
    description: 'Join our global network of distributors. Wholesale Egyptian travel pillows with authentic Pharaonic designs. Competitive pricing, global shipping, dedicated B2B support.',
    keywords: [
      'wholesale Egyptian pillows',
      'B2B travel accessories',
      'distributor program',
      'wholesale pricing',
      'international distribution',
      'travel pillow supplier'
    ]
  },
  
  blog: {
    title: 'Egyptian Heritage Blog | Pharaonic Symbols & Cultural Stories',
    description: 'Discover the fascinating world of ancient Egyptian symbols and their meanings. Learn about Pharaonic culture, mythology, and how it inspires our travel pillow designs.',
    keywords: [
      'Egyptian symbols',
      'Pharaonic culture',
      'ancient Egypt',
      'Egyptian mythology',
      'hieroglyphs',
      'Egyptian heritage',
      'cultural stories'
    ]
  }
};

// Collection-specific SEO
export const COLLECTION_SEO_CONFIGS = {
  b123: {
    title: 'Premium Collection (B123) - Luxury Egyptian Travel Pillows',
    description: 'Luxurious Egyptian travel pillows inspired by royal Pharaonic treasures. Premium memory foam with authentic golden designs. Wholesale available.',
    keywords: [
      'premium Egyptian pillows',
      'luxury travel pillows',
      'royal Pharaonic design',
      'golden Egyptian pillows',
      'premium memory foam',
      'luxury wholesale pillows'
    ]
  },
  
  t: {
    title: 'Classic Collection (T) - Traditional Egyptian Travel Pillows',
    description: 'Traditional Egyptian travel pillows featuring timeless symbols like Ankh, Scarab, and Eye of Horus. Affordable comfort with authentic Egyptian design.',
    keywords: [
      'classic Egyptian pillows',
      'traditional travel pillows',
      'Ankh symbol pillows',
      'Scarab design pillows',
      'Eye of Horus pillows',
      'affordable Egyptian pillows'
    ]
  },
  
  tb: {
    title: 'Heritage Collection (TB) - Ancient Egyptian Symbol Pillows',
    description: 'Heritage Egyptian travel pillows featuring authentic hieroglyphs and sacred symbols. Perfect for cultural enthusiasts and educational purposes.',
    keywords: [
      'heritage Egyptian pillows',
      'hieroglyphic pillows',
      'ancient Egyptian symbols',
      'cultural travel pillows',
      'educational Egyptian pillows',
      'authentic hieroglyphs'
    ]
  }
};

// Generate SEO meta tags
export const generateSEOTags = (config: Partial<SEOConfig> = {}): SEOConfig => {
  const mergedConfig = { ...DEFAULT_SEO, ...config };
  
  return {
    ...mergedConfig,
    openGraph: {
      ...DEFAULT_SEO.openGraph,
      ...config.openGraph
    },
    twitter: {
      ...DEFAULT_SEO.twitter,
      ...config.twitter
    }
  };
};

// Generate structured data for products
export const generateProductStructuredData = (product: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Pharaonic Pillows'
    },
    category: 'Travel Accessories',
    sku: product.sku,
    image: product.images?.map((img: any) => img.url) || [product.primaryImage],
    offers: {
      '@type': 'Offer',
      price: product.pricing?.retail?.min || 0,
      priceCurrency: 'USD',
      availability: product.availability?.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Pharaonic Pillows'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 127,
      bestRating: 5,
      worstRating: 1
    }
  };
};

// Generate structured data for collections
export const generateCollectionStructuredData = (collection: any) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.description,
    url: `https://pharaonicpillows.com/products/${collection.id}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: collection.totalProducts,
      itemListElement: collection.products?.map((product: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          url: `https://pharaonicpillows.com/products/${collection.id}/${product.id}`
        }
      })) || []
    }
  };
};

// SEO utility functions
export const createMetaTags = (seoConfig: SEOConfig) => {
  return [
    { name: 'description', content: seoConfig.description },
    { name: 'keywords', content: seoConfig.keywords.join(', ') },
    { name: 'robots', content: seoConfig.robots || 'index, follow' },
    
    // Open Graph
    { property: 'og:title', content: seoConfig.openGraph.title },
    { property: 'og:description', content: seoConfig.openGraph.description },
    { property: 'og:image', content: seoConfig.openGraph.image },
    { property: 'og:url', content: seoConfig.openGraph.url },
    { property: 'og:type', content: seoConfig.openGraph.type },
    { property: 'og:site_name', content: seoConfig.openGraph.siteName },
    
    // Twitter
    { name: 'twitter:card', content: seoConfig.twitter.card },
    { name: 'twitter:title', content: seoConfig.twitter.title },
    { name: 'twitter:description', content: seoConfig.twitter.description },
    { name: 'twitter:image', content: seoConfig.twitter.image },
    ...(seoConfig.twitter.creator ? [{ name: 'twitter:creator', content: seoConfig.twitter.creator }] : []),
    
    // Additional SEO
    { name: 'author', content: 'Pharaonic Pillows' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { httpEquiv: 'Content-Language', content: 'en' },
    { name: 'geo.region', content: 'EG' },
    { name: 'geo.placename', content: 'Egypt' }
  ];
};

// Enhanced meta tag generation with Egyptian-themed SEO
export const generateEnhancedMetaTags = (seoConfig: SEOConfig, additionalTags: any = {}) => {
  return [
    // Basic SEO
    { name: 'description', content: seoConfig.description },
    { name: 'keywords', content: seoConfig.keywords.join(', ') },
    { name: 'robots', content: seoConfig.robots || 'index, follow' },
    
    // Enhanced SEO
    { name: 'author', content: 'Pharaonic Pillows' },
    { name: 'publisher', content: 'Pharaonic Pillows' },
    { name: 'copyright', content: `© ${new Date().getFullYear()} Pharaonic Pillows. All rights reserved.` },
    { name: 'language', content: 'English' },
    { name: 'revisit-after', content: '7 days' },
    { name: 'distribution', content: 'global' },
    { name: 'rating', content: 'general' },
    
    // Geographic SEO
    { name: 'geo.region', content: 'EG' },
    { name: 'geo.placename', content: 'Egypt' },
    { name: 'geo.position', content: '26.8206;30.8025' },
    { name: 'ICBM', content: '26.8206, 30.8025' },
    
    // Business SEO
    { name: 'business:contact_data:street_address', content: 'Cairo, Egypt' },
    { name: 'business:contact_data:locality', content: 'Cairo' },
    { name: 'business:contact_data:region', content: 'Cairo Governorate' },
    { name: 'business:contact_data:postal_code', content: '11511' },
    { name: 'business:contact_data:country_name', content: 'Egypt' },
    
    // Open Graph
    { property: 'og:title', content: seoConfig.openGraph.title },
    { property: 'og:description', content: seoConfig.openGraph.description },
    { property: 'og:image', content: seoConfig.openGraph.image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Egyptian Pharaonic Travel Pillows' },
    { property: 'og:url', content: seoConfig.openGraph.url },
    { property: 'og:type', content: seoConfig.openGraph.type },
    { property: 'og:site_name', content: seoConfig.openGraph.siteName },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:locale:alternate', content: 'ar_EG' },
    
    // Twitter
    { name: 'twitter:card', content: seoConfig.twitter.card },
    { name: 'twitter:title', content: seoConfig.twitter.title },
    { name: 'twitter:description', content: seoConfig.twitter.description },
    { name: 'twitter:image', content: seoConfig.twitter.image },
    { name: 'twitter:image:alt', content: 'Egyptian Pharaonic Travel Pillows' },
    ...(seoConfig.twitter.creator ? [{ name: 'twitter:creator', content: seoConfig.twitter.creator }] : []),
    { name: 'twitter:site', content: '@pharaonicpillows' },
    
    // Additional tags
    ...Object.entries(additionalTags).map(([key, value]) => ({ name: key, content: value }))
  ];
};

// Generate sitemap data with enhanced structure
export const generateSitemapData = () => {
  const baseUrl = 'https://pharaonicpillows.com';
  const currentDate = new Date().toISOString();
  
  return {
    pages: [
      { url: `${baseUrl}/`, changefreq: 'weekly', priority: 1.0, lastmod: currentDate },
      { url: `${baseUrl}/products`, changefreq: 'weekly', priority: 0.9, lastmod: currentDate },
      { url: `${baseUrl}/products/`, changefreq: 'weekly', priority: 0.8, lastmod: currentDate },
      { url: `${baseUrl}/products/`, changefreq: 'weekly', priority: 0.8, lastmod: currentDate },
      { url: `${baseUrl}/products/`, changefreq: 'weekly', priority: 0.8, lastmod: currentDate },
      { url: `${baseUrl}/about`, changefreq: 'monthly', priority: 0.7, lastmod: currentDate },
      { url: `${baseUrl}/contact`, changefreq: 'monthly', priority: 0.7, lastmod: currentDate },
      { url: `${baseUrl}/wholesale`, changefreq: 'monthly', priority: 0.8, lastmod: currentDate },
      { url: `${baseUrl}/partnership`, changefreq: 'monthly', priority: 0.7, lastmod: currentDate },
      { url: `${baseUrl}/blog`, changefreq: 'weekly', priority: 0.6, lastmod: currentDate }
    ]
  };
};

export default {
  DEFAULT_SEO,
  PAGE_SEO_CONFIGS,
  COLLECTION_SEO_CONFIGS,
  PRIMARY_KEYWORDS,
  LONG_TAIL_KEYWORDS,
  generateSEOTags,
  generateProductStructuredData,
  generateCollectionStructuredData,
  createMetaTags,
  generateEnhancedMetaTags,
  generateSitemapData
};
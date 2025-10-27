// Enhanced Blog Types with SEO Optimization for Pillow Manufacturing Business
// Focus on pillow manufacturer keywords and Egyptian cultural content

export interface ManufacturerSEOKeywords {
  // Primary manufacturing keywords
  primary: string[];
  // Secondary pillow-related keywords  
  secondary: string[];
  // Long-tail manufacturing and cultural keywords
  longTail: string[];
  // Local SEO keywords for Egyptian manufacturing
  local: string[];
  // Product-specific keywords
  productSpecific: string[];
}

export interface BlogArticleEnhanced {
  // Basic Information
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  excerpt: string;
  
  // Publishing Information
  publishDate: string;
  lastModified: string;
  author: Author;
  status: 'draft' | 'published' | 'archived';
  
  // SEO Optimization for Pillow Manufacturing
  seoTitle: string;
  metaDescription: string;
  keywords: ManufacturerSEOKeywords;
  canonicalUrl?: string;
  
  // Manufacturing and Product Focus
  manufacturingFocus: {
    pillowTypes: string[]; // memory foam, travel, neck support, etc.
    materials: string[]; // Egyptian cotton, memory foam, bamboo fiber
    targetMarket: string[]; // B2B, wholesale, retail, export
    certifications: string[]; // quality standards, manufacturing certifications
  };
  
  // Content Organization
  category: BlogCategory;
  tags: BlogTag[];
  readingTime: number;
  featured: boolean;
  priority: number;
  
  // Egyptian Cultural Integration (Culturally Sensitive)
  culturalElement: {
    symbolName: string;
    englishName: string;
    meaning: string;
    historicalPeriod: string;
    culturalSignificance: string;
    iconCode: string;
    // Avoid religious terminology - use cultural/historical terms
    characterType: 'mythological_figure' | 'historical_character' | 'cultural_symbol' | 'ancient_monument';
  };
  
  // Product Integration for Manufacturing Business
  relatedProducts: string[];
  productRecommendations: ProductRecommendation[];
  manufacturingInsights: {
    productionProcess?: string;
    qualityFeatures?: string[];
    businessBenefits?: string[];
    wholesaleInfo?: string;
  };
  
  // Media
  featuredImage: {
    url: string;
    alt: string;
    caption?: string;
  };
  gallery?: BlogImage[];
  
  // Analytics and Performance
  viewCount: number;
  shareCount: number;
  engagementScore: number;
  conversionRate?: number; // for manufacturing leads
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  parentCategory?: string;
  articleCount: number;
  // SEO keywords specific to category
  seoKeywords: ManufacturerSEOKeywords;
  // Manufacturing relevance
  manufacturingRelevance: 'high' | 'medium' | 'low';
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  articleCount: number;
  // Tag type for better organization
  type: 'cultural' | 'product' | 'manufacturing' | 'material' | 'market';
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  expertise: string[];
  credentials?: string; // manufacturing expertise, cultural knowledge
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface ProductRecommendation {
  productId: string;
  relevanceScore: number;
  recommendationType: 'cultural_match' | 'material_similarity' | 'use_case' | 'manufacturing_feature';
  displayPriority: number;
}

export interface BlogImage {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

// SEO Optimization Utilities
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    image: string;
    type: 'article';
  };
  twitterCard: {
    card: 'summary_large_image';
    title: string;
    description: string;
    image: string;
  };
  structuredData: {
    '@context': 'https://schema.org';
    '@type': 'Article' | 'BlogPosting';
    headline: string;
    description: string;
    author: {
      '@type': 'Person';
      name: string;
    };
    publisher: {
      '@type': 'Organization';
      name: string;
      logo: string;
    };
    datePublished: string;
    dateModified: string;
    mainEntityOfPage: string;
    image: string;
  };
}

// Manufacturing-focused keyword sets
export const PILLOW_MANUFACTURER_KEYWORDS = {
  primary: [
    'pillow manufacturer',
    'memory foam pillow factory',
    'Egyptian pillow manufacturer',
    'travel pillow manufacturer',
    'custom pillow manufacturing',
    'wholesale pillow supplier'
  ],
  secondary: [
    'pillow production facility',
    'Egyptian cotton pillows',
    'memory foam manufacturing',
    'travel accessories manufacturer',
    'pillow export company',
    'custom pillow design'
  ],
  longTail: [
    'Egyptian travel pillow manufacturer wholesale',
    'memory foam pillow manufacturing Egypt',
    'custom Egyptian themed pillow manufacturer',
    'wholesale travel pillow supplier Egypt',
    'authentic Egyptian pillow manufacturing company',
    'premium memory foam pillow factory Egypt'
  ],
  local: [
    'pillow manufacturer Egypt',
    'Cairo pillow factory',
    'Egyptian textile manufacturing',
    'Middle East pillow supplier',
    'Egyptian export manufacturing'
  ],
  productSpecific: [
    'Anubis themed travel pillow',
    'Egyptian symbol memory foam pillow',
    'pharaonic design pillow manufacturer',
    'cultural heritage pillow supplier',
    'authentic Egyptian travel accessories'
  ]
} as const;

// Cultural sensitivity guidelines for content
export const CULTURAL_TERMINOLOGY_GUIDELINES = {
  // Preferred terms instead of religious references
  preferredTerms: {
    'ancient Egyptian figure': ['god', 'deity', 'divine being'],
    'mythological character': ['god', 'deity'],
    'cultural symbol': ['sacred symbol', 'divine symbol'],
    'historical figure': ['god', 'deity'],
    'ancient character': ['god', 'deity']
  },
  // Context-appropriate descriptions
  contextualDescriptions: {
    anubis: 'ancient Egyptian figure associated with the afterlife',
    horus: 'falcon-headed character from Egyptian mythology',
    isis: 'prominent figure in ancient Egyptian culture',
    ra: 'sun-associated character in Egyptian mythology'
  }
} as const;
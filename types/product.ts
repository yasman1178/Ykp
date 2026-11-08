// Advanced Product Type Definitions
// Comprehensive TypeScript interfaces for Egyptian travel pillows

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'inch';
  weight: {
    value: number;
    unit: 'g' | 'kg' | 'oz' | 'lb';
  };
}

export interface ProductMaterial {
  core: string;
  cover: string;
  filling: string;
  certifications: string[];
  careInstructions: string[];
  sustainability: {
    ecoFriendly: boolean;
    recyclable: boolean;
    sustainableSourcing: boolean;
  };
}

export interface ProductSpecs {
  dimensions: ProductDimensions;
  materials: ProductMaterial;
  firmness: 'soft' | 'medium-soft' | 'medium' | 'medium-firm' | 'firm';
  supportLevel: 'light' | 'medium' | 'high' | 'extra-high';
  temperature: 'cooling' | 'neutral' | 'warming';
  hypoallergenic: boolean;
  antimicrobial: boolean;
  warranty: {
    duration: number;
    unit: 'months' | 'years';
    coverage: string[];
  };
}

export interface EgyptianSymbolInfo {
  name: string;
  arabicName: string;
  meaning: string;
  historicalContext: string;
  culturalSignificance: string;
  modernRelevance: string;
  protectivePowers: string[];
  associatedDeities: string[];
  timeOrigin: string;
  symbolImage?: string;
}

export interface PharaonicDesignInfo {
  primarySymbols: EgyptianSymbolInfo[];
  secondarySymbols: string[];
  colorMeaning: Record<string, string>;
  designInspiration: string;
  historicalPeriod: string;
  culturalAuthenticity: {
    researchSources: string[];
    expertValidation: boolean;
    museumCollaboration?: string | null;
  };
  spiritualAspects: {
    energyProperties: string[];
    chakraAlignment?: string[];
    meditativeQualities: string[];
  };
}

export interface PricingTier {
  minQuantity: number;
  maxQuantity?: number;
  unitPrice: number;
  discount: number;
  currency: string;
  validUntil?: string;
  specialConditions?: string[];
}

export interface WholesaleInfo {
  minimumOrderQuantity: number;
  bulkPricing: PricingTier[];
  leadTime: {
    standard: string;
    rush: string;
    custom: string;
  };
  packaging: {
    individual: string;
    bulk: string;
    customOptions: string[];
  };
  shipping: {
    domestic: string;
    international: string;
    freeShippingThreshold?: number;
  };
  customization: {
    available: boolean;
    options: string[];
    minimumQuantity?: number;
    additionalCost?: string;
  };
  paymentTerms: {
    standard: string;
    earlyPaymentDiscount?: number;
    creditTerms?: string;
  };
}

export interface ProductSEO {
  primaryKeywords: {
    english: string[];
    arabic: string[];
  };
  secondaryKeywords: {
    english: string[];
    arabic: string[];
  };
  metaTitle: string;
  metaDescription: string;
  altText: string;
  canonicalUrl?: string;
  structuredData: ProductStructuredData;
  contentOptimization: {
    keywordDensity: number;
    readabilityScore: number;
    semanticKeywords: string[];
  };
}

export interface ProductStructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  brand: string;
  category: string;
  sku: string;
  gtin?: string;
  mpn?: string;
  image: string[];
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability: string;
    validFrom?: string;
    validThrough?: string;
    seller: {
      '@type': string;
      name: string;
    };
  };
  aggregateRating?: {
    '@type': string;
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
  review?: ProductReview[];
}

export interface ProductReview {
  '@type': string;
  author: {
    '@type': string;
    name: string;
  };
  datePublished: string;
  description: string;
  reviewRating: {
    '@type': string;
    ratingValue: number;
    bestRating: number;
    worstRating: number;
  };
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
  isPrimary: boolean;
  order: number;
  dimensions: {
    width: number;
    height: number;
  };
  variants?: {
    thumbnail: string;
    medium: string;
    large: string;
    zoom: string;
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  images: ProductImage[];
  specifications: Partial<ProductSpecs>;
  pricing: {
    retail: number;
    wholesale: number;
    currency: string;
  };
  availability: {
    inStock: boolean;
    quantity?: number;
    backorderAvailable: boolean;
    estimatedRestockDate?: string;
  };
}

export interface ProductCollection {
  id: 'b123' | 't' | 'tb' | 'print';
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  totalProducts: number;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  targetMarket: string;
  keyFeatures: string[];
  uniqueSellingPoints: string[];
  wholesaleInfo: WholesaleInfo;
  collectionStory: string;
  designPhilosophy: string;
  culturalBackground: string;
}

export interface Product {
  // Basic Information
  id: string;
  sku: string;
  name: string;
  shortName?: string;
  collection: ProductCollection['id'];
  
  // Content
  description: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  
  // Visual
  images: ProductImage[];
  primaryImage: string;
  variants?: ProductVariant[];
  
  // Egyptian Heritage
  pharaonicDesign: PharaonicDesignInfo;
  culturalStory: string;
  symbolMeaning: string;
  historicalConnection: string;
  
  // Technical
  specifications: ProductSpecs;
  designElements: string[];
  colorPalette: string[];
  
  // Business
  pricing: {
    retail: {
      min: number;
      max: number;
      currency: string;
    };
    wholesale: PricingTier[];
  };
  wholesaleInfo: WholesaleInfo;
  
  // Marketing
  targetAudience: string[];
  useCases: string[];
  competitiveAdvantages: string[];
  
  // SEO & Discovery
  seo: ProductSEO;
  tags: string[];
  categories: string[];
  
  // Inventory & Fulfillment
  availability: {
    inStock: boolean;
    quantity?: number;
    backorderAvailable: boolean;
    estimatedShipDate?: string;
  };
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'discontinued' | 'coming-soon';
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
}

// Utility Types
export type ProductSortBy = 
  | 'name' 
  | 'price-low-high' 
  | 'price-high-low' 
  | 'newest' 
  | 'bestseller' 
  | 'featured';

export type ProductFilterOptions = {
  collection?: ProductCollection['id'][];
  priceRange?: { min: number; max: number };
  symbols?: string[];
  firmness?: ProductSpecs['firmness'][];
  inStock?: boolean;
  featured?: boolean;
  bestseller?: boolean;
};

export interface ProductSearchResult {
  products: Product[];
  totalCount: number;
  facets: {
    collections: { id: string; name: string; count: number }[];
    priceRanges: { min: number; max: number; count: number }[];
    symbols: { name: string; count: number }[];
    firmness: { level: string; count: number }[];
  };
}

// Types are already exported above, no need to re-export
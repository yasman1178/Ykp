// Product-related types
export interface Product {
  id: string;
  name: string;
  category: 'b123' | 't' | 'tb';
  images: ProductImage[];
  description: ProductDescription;
  specifications: ProductSpecs;
  pharaonicDesign: PharaonicDesignInfo;
  wholesaleInfo: WholesaleInfo;
  seo: ProductSEO;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductDescription {
  shortDescription: string;
  fullDescription: string;
  egyptianStory: string;
  memoryFoamBenefits: string[];
  seoKeywords: string[];
}

export interface ProductSpecs {
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'inch';
  };
  weight: {
    value: number;
    unit: 'g' | 'kg' | 'oz' | 'lb';
  };
  materials: string[];
  colors: string[];
  firmness: 'soft' | 'medium' | 'firm';
  certifications: string[];
}

export interface PharaonicDesignInfo {
  symbolsUsed: string[];
  culturalSignificance: string;
  designInspiration: string;
  colorMeaning: string;
  historicalPeriod: string;
}

export interface WholesaleInfo {
  minimumOrderQuantity: number;
  bulkPricing: PricingTier[];
  packagingOptions: string[];
  shippingInfo: string;
  leadTime: string;
  customizationOptions: string[];
}

export interface PricingTier {
  minQuantity: number;
  maxQuantity?: number;
  pricePerUnit: number;
  currency: string;
  discount?: number;
}

export interface ProductSEO {
  primaryKeywords: {
    arabic: string[];
    english: string[];
  };
  metaTitle: string;
  metaDescription: string;
  structuredData: ProductStructuredData;
}

export interface ProductStructuredData {
  '@type': 'Product';
  name: string;
  description: string;
  brand: string;
  category: string;
  offers: {
    '@type': 'Offer';
    availability: string;
    price?: string;
    priceCurrency?: string;
  };
}

// Blog-related types
export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  symbol: PharaonicSymbol;
  content: ArticleContent;
  seoData: SEOData;
  relatedProducts: Product[];
  publishedAt: string;
  updatedAt: string;
  author: Author;
  readingTime: number;
}

export interface PharaonicSymbol {
  name: string;
  arabicName: string;
  meaning: string;
  historicalContext: string;
  visualElements: string[];
  modernRelevance: string;
  symbolImage: string;
}

export interface ArticleContent {
  introduction: string;
  sections: ContentSection[];
  conclusion: string;
  callToAction: string;
  images: ArticleImage[];
}

export interface ContentSection {
  id: string;
  title: string;
  content: string;
  order: number;
  type: 'text' | 'image' | 'quote' | 'list';
}

export interface ArticleImage {
  url: string;
  alt: string;
  caption?: string;
  order: number;
}

export interface Author {
  name: string;
  bio: string;
  avatar?: string;
  socialLinks?: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

// SEO and Analytics types
export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  openGraph: OpenGraphData;
  structuredData: any;
}

export interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
}

// Form types (re-exported from form schemas)
export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  socialMedia: SocialLink[];
}

export interface CompanyProfile {
  name: string;
  website?: string;
  yearEstablished: number;
  employeeCount: string;
  annualRevenue?: string;
}

export interface DistributionInfo {
  regions: string[];
  distributionChannels: string[];
  warehouseCapacity: string;
  logisticsPartners?: string;
}

// Navigation and Layout types
export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  icon?: string;
  isExternal?: boolean;
}

export interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  metaDescription: string;
  egyptianTheme?: 'gold' | 'blue' | 'terracotta';
  showBreadcrumbs?: boolean;
}

// Animation types
export interface AnimationConfig {
  initial: any;
  animate: any;
  exit?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
}

// Theme types
export interface EgyptianTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    pharaonicGold: string;
    deepBlue: string;
    terracotta: string;
  };
  fonts: {
    pharaonic: string;
    hieroglyphic: string;
    modernArabic: string;
  };
  animations: {
    duration: {
      fast: number;
      normal: number;
      slow: number;
    };
    easing: {
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Analytics types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export interface UserJourney {
  sessionId: string;
  userId?: string;
  events: AnalyticsEvent[];
  startTime: string;
  endTime?: string;
  source: string;
  medium: string;
  campaign?: string;
}
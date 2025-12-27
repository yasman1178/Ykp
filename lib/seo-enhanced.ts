// Enhanced SEO Configuration System with Bilingual Support
// Comprehensive Arabic/English SEO optimization for Egyptian Pharaonic Pillows

export interface BilingualText {
  en: string;
  ar: string;
}

export interface ArabicKeywordStrategy {
  primary: string[];  // Primary Arabic keywords like "مخدات سفر تصنيع"
  variations: string[];  // Different phrasings
  relatedTerms: string[];  // Semantic keywords
  targetDensity: number;  // Target keyword density (2-3%)
  placement: {
    title: boolean;
    h1: boolean;
    firstParagraph: boolean;
    metaDescription: boolean;
  };
}

export interface HreflangTag {
  locale: string;  // e.g., 'en-US', 'ar-EG'
  url: string;     // Full URL for this locale
}

export interface EnhancedSEOConfig {
  // Bilingual meta tags
  title: BilingualText;
  description: BilingualText;
  keywords: {
    en: string[];
    ar: string[];
    primary: string[];  // High-priority keywords
    secondary: string[];
    longTail: string[];
  };

  // Structured data
  structuredData: {
    organization?: any;
    product?: any;
    article?: any;
    breadcrumb?: any;
    localBusiness?: any;
  };

  // Language and localization
  hreflang: HreflangTag[];
  canonical: string;

  // Open Graph and Twitter
  openGraph: {
    title: BilingualText;
    description: BilingualText;
    image: string;
    imageAlt: BilingualText;
    url: string;
    type: string;
    siteName: string;
    locale: string;
    localeAlternate: string[];
  };

  twitter: {
    card: string;
    title: BilingualText;
    description: BilingualText;
    image: string;
    imageAlt: BilingualText;
    creator?: string;
  };

  // RTL support
  rtl: {
    enabled: boolean;
    direction: 'ltr' | 'rtl';
    lang: string;
  };

  // Search Console
  verification?: {
    google?: string;
    bing?: string;
  };

  // Robots
  robots?: string;
}

// Primary Arabic Keywords for Manufacturing
export const ARABIC_PRIMARY_KEYWORDS = [
  'مخدات سفر تصنيع',  // Travel pillows manufacturing
  'مخدات سفر مصرية',  // Egyptian travel pillows
  'تصنيع مخدات',      // Pillow manufacturing
  'مخدات بالجملة',    // Wholesale pillows
  'مخدات فرعونية',    // Pharaonic pillows
  'مخدات تراث مصري',  // Egyptian heritage pillows
];

// Arabic Keyword Variations
export const ARABIC_KEYWORD_VARIATIONS = [
  'مخدات سفر للتصنيع',
  'تصنيع مخدات السفر المصرية',
  'مخدات سفر مصرية بالجملة',
  'مخدات فرعونية للتصدير',
  'مخدات رغوة الذاكرة مصرية',
  'مخدات تصميم فرعوني',
];

// Arabic Long-tail Keywords
export const ARABIC_LONG_TAIL_KEYWORDS = [
  'مخدات سفر مصرية فاخرة بالجملة',
  'تصنيع مخدات سفر تصميم فرعوني',
  'مخدات رغوة ذاكرة تصميم مصري',
  'مخدات سفر تراث ثقافي مصري',
  'مخدات سفر رموز مصرية قديمة',
  'تصنيع مخدات سفر للتصدير',
];

// Arabic Related Terms
export const ARABIC_RELATED_TERMS = [
  'رموز فرعونية',      // Pharaonic symbols
  'تراث مصري',         // Egyptian heritage
  'رغوة الذاكرة',      // Memory foam
  'راحة السفر',        // Travel comfort
  'تصدير مصري',        // Egyptian export
  'جودة مصرية',        // Egyptian quality
];

// Default Arabic Keyword Strategy
export const DEFAULT_ARABIC_KEYWORD_STRATEGY: ArabicKeywordStrategy = {
  primary: ARABIC_PRIMARY_KEYWORDS,
  variations: ARABIC_KEYWORD_VARIATIONS,
  relatedTerms: ARABIC_RELATED_TERMS,
  targetDensity: 2.5,  // 2.5% target density
  placement: {
    title: true,
    h1: true,
    firstParagraph: true,
    metaDescription: true,
  },
};

/**
 * Generate hreflang tags for bilingual pages
 */
export function generateHreflangTags(
  basePath: string,
  baseUrl: string = 'https://ykp-eg.com'
): HreflangTag[] {
  return [
    {
      locale: 'en-US',
      url: `${baseUrl}/en${basePath}`,
    },
    {
      locale: 'ar-EG',
      url: `${baseUrl}/ar${basePath}`,
    },
    {
      locale: 'x-default',
      url: `${baseUrl}${basePath}`,
    },
  ];
}

/**
 * Generate RTL meta tags for Arabic content
 */
export function generateRTLMetaTags(locale: string): {
  direction: 'ltr' | 'rtl';
  lang: string;
  htmlAttributes: Record<string, string>;
} {
  const isArabic = locale === 'ar' || locale.startsWith('ar-');

  return {
    direction: isArabic ? 'rtl' : 'ltr',
    lang: locale,
    htmlAttributes: {
      dir: isArabic ? 'rtl' : 'ltr',
      lang: locale,
    },
  };
}

/**
 * Calculate keyword density in text
 */
export function calculateKeywordDensity(text: string, keyword: string): number {
  if (!text || !keyword) return 0;

  const textLower = text.toLowerCase();
  const keywordLower = keyword.toLowerCase();

  // Count keyword occurrences
  const regex = new RegExp(keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const matches = textLower.match(regex);
  const keywordCount = matches ? matches.length : 0;

  // Count total words
  const words = text.trim().split(/\s+/);
  const totalWords = words.length;

  if (totalWords === 0) return 0;

  // Calculate density as percentage
  return (keywordCount / totalWords) * 100;
}

/**
 * Optimize text for keyword density
 */
export function optimizeKeywordDensity(
  text: string,
  keyword: string,
  targetDensity: number = 2.5
): {
  currentDensity: number;
  targetDensity: number;
  isOptimal: boolean;
  suggestion: string;
} {
  const currentDensity = calculateKeywordDensity(text, keyword);
  const isOptimal = currentDensity >= targetDensity * 0.8 && currentDensity <= targetDensity * 1.2;

  let suggestion = '';
  if (currentDensity < targetDensity * 0.8) {
    suggestion = `Keyword density is too low (${currentDensity.toFixed(2)}%). Consider adding "${keyword}" ${Math.ceil((targetDensity - currentDensity) * text.split(/\s+/).length / 100)} more times.`;
  } else if (currentDensity > targetDensity * 1.2) {
    suggestion = `Keyword density is too high (${currentDensity.toFixed(2)}%). Consider reducing "${keyword}" usage to avoid keyword stuffing.`;
  } else {
    suggestion = `Keyword density is optimal (${currentDensity.toFixed(2)}%).`;
  }

  return {
    currentDensity,
    targetDensity,
    isOptimal,
    suggestion,
  };
}

/**
 * Generate bilingual meta tags
 */
export function generateBilingualMetaTags(
  config: EnhancedSEOConfig,
  locale: string = 'en'
): Array<{ name?: string; property?: string; content: string; httpEquiv?: string }> {
  const isArabic = locale === 'ar' || locale.startsWith('ar-');
  const rtl = generateRTLMetaTags(locale);

  const title = isArabic ? config.title.ar : config.title.en;
  const description = isArabic ? config.description.ar : config.description.en;
  const keywords = isArabic ? config.keywords.ar : config.keywords.en;

  return [
    // Basic meta tags
    { name: 'description', content: description },
    { name: 'keywords', content: keywords.join(', ') },
    { name: 'robots', content: config.robots || 'index, follow, max-image-preview:large' },

    // Language and direction
    { httpEquiv: 'Content-Language', content: locale },
    { name: 'language', content: locale },

    // Open Graph
    { property: 'og:title', content: isArabic ? config.openGraph.title.ar : config.openGraph.title.en },
    { property: 'og:description', content: isArabic ? config.openGraph.description.ar : config.openGraph.description.en },
    { property: 'og:image', content: config.openGraph.image },
    { property: 'og:image:alt', content: isArabic ? config.openGraph.imageAlt.ar : config.openGraph.imageAlt.en },
    { property: 'og:url', content: config.openGraph.url },
    { property: 'og:type', content: config.openGraph.type },
    { property: 'og:site_name', content: config.openGraph.siteName },
    { property: 'og:locale', content: config.openGraph.locale },
    ...config.openGraph.localeAlternate.map(alt => ({ property: 'og:locale:alternate', content: alt })),

    // Twitter
    { name: 'twitter:card', content: config.twitter.card },
    { name: 'twitter:title', content: isArabic ? config.twitter.title.ar : config.twitter.title.en },
    { name: 'twitter:description', content: isArabic ? config.twitter.description.ar : config.twitter.description.en },
    { name: 'twitter:image', content: config.twitter.image },
    { name: 'twitter:image:alt', content: isArabic ? config.twitter.imageAlt.ar : config.twitter.imageAlt.en },
    ...(config.twitter.creator ? [{ name: 'twitter:creator', content: config.twitter.creator }] : []),

    // Geographic
    { name: 'geo.region', content: 'EG' },
    { name: 'geo.placename', content: 'Egypt' },
    { name: 'geo.position', content: '30.0444;31.2357' },

    // Additional SEO
    { name: 'author', content: 'YKP Supplies' },
    { name: 'publisher', content: 'YKP Supplies' },
    { name: 'copyright', content: `© ${new Date().getFullYear()} YKP Supplies. All rights reserved.` },
  ];
}

/**
 * Generate enhanced SEO configuration for homepage
 */
export function generateHomepageEnhancedSEO(baseUrl: string = 'https://ykp-eg.com'): EnhancedSEOConfig {
  return {
    title: {
      en: 'Egyptian Travel Pillows Manufacturing | مخدات سفر تصنيع | Wholesale B2B',
      ar: 'مخدات سفر تصنيع مصرية | تصنيع مخدات بالجملة | Egyptian Travel Pillows',
    },
    description: {
      en: 'Premium Egyptian travel pillows manufacturing (مخدات سفر تصنيع). Authentic Pharaonic designs, memory foam comfort. Wholesale B2B opportunities for international distributors.',
      ar: 'تصنيع مخدات سفر مصرية فاخرة (مخدات سفر تصنيع). تصاميم فرعونية أصيلة، راحة رغوة الذاكرة. فرص الجملة B2B للموزعين الدوليين.',
    },
    keywords: {
      en: [
        'Egyptian travel pillows',
        'Pharaonic design pillows',
        'memory foam travel pillows',
        'wholesale travel pillows',
        'B2B travel accessories',
      ],
      ar: ARABIC_PRIMARY_KEYWORDS,
      primary: ['مخدات سفر تصنيع', 'Egyptian travel pillows', 'Pharaonic pillows'],
      secondary: [...ARABIC_KEYWORD_VARIATIONS.slice(0, 3), 'wholesale pillows', 'B2B accessories'],
      longTail: [...ARABIC_LONG_TAIL_KEYWORDS.slice(0, 3), 'premium Egyptian travel pillows wholesale'],
    },
    structuredData: {},
    hreflang: generateHreflangTags('/', baseUrl),
    canonical: baseUrl,
    openGraph: {
      title: {
        en: 'Egyptian Travel Pillows Manufacturing | مخدات سفر تصنيع',
        ar: 'مخدات سفر تصنيع مصرية | Egyptian Travel Pillows Manufacturing',
      },
      description: {
        en: 'Premium Egyptian travel pillows manufacturing with authentic Pharaonic designs. Wholesale B2B opportunities worldwide.',
        ar: 'تصنيع مخدات سفر مصرية فاخرة بتصاميم فرعونية أصيلة. فرص الجملة B2B في جميع أنحاء العالم.',
      },
      image: `${baseUrl}/og-image-pharaonic-pillows.jpg`,
      imageAlt: {
        en: 'Egyptian Pharaonic Travel Pillows - Premium Manufacturing',
        ar: 'مخدات سفر فرعونية مصرية - تصنيع فاخر',
      },
      url: baseUrl,
      type: 'website',
      siteName: 'YKP Supplies',
      locale: 'en_US',
      localeAlternate: ['ar_EG'],
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        en: 'Egyptian Travel Pillows Manufacturing | مخدات سفر تصنيع',
        ar: 'مخدات سفر تصنيع مصرية | Egyptian Travel Pillows',
      },
      description: {
        en: 'Premium Egyptian travel pillows with authentic Pharaonic designs. Wholesale B2B opportunities.',
        ar: 'مخدات سفر مصرية فاخرة بتصاميم فرعونية أصيلة. فرص الجملة B2B.',
      },
      image: `${baseUrl}/twitter-card-pharaonic-pillows.jpg`,
      imageAlt: {
        en: 'Egyptian Pharaonic Travel Pillows',
        ar: 'مخدات سفر فرعونية مصرية',
      },
      creator: '@ykp-eg',
    },
    rtl: {
      enabled: true,
      direction: 'ltr',
      lang: 'en',
    },
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  };
}

/**
 * Generate enhanced SEO configuration for product pages
 */
export function generateProductEnhancedSEO(
  productName: string,
  productDescription: string,
  productNameAr: string,
  productDescriptionAr: string,
  productPath: string,
  baseUrl: string = 'https://ykp-eg.com'
): EnhancedSEOConfig {
  return {
    title: {
      en: `${productName} | مخدات سفر تصنيع | Egyptian Travel Pillows`,
      ar: `${productNameAr} | مخدات سفر تصنيع مصرية | ${productName}`,
    },
    description: {
      en: `${productDescription} Premium Egyptian manufacturing (مخدات سفر تصنيع). Wholesale pricing available. Authentic Pharaonic design.`,
      ar: `${productDescriptionAr} تصنيع مصري فاخر (مخدات سفر تصنيع). أسعار الجملة متاحة. تصميم فرعوني أصيل.`,
    },
    keywords: {
      en: [
        productName,
        'Egyptian travel pillow',
        'Pharaonic design',
        'memory foam pillow',
        'wholesale pillow',
      ],
      ar: [
        productNameAr,
        'مخدات سفر تصنيع',
        'مخدات سفر مصرية',
        'مخدات فرعونية',
        'مخدات بالجملة',
      ],
      primary: ['مخدات سفر تصنيع', productName],
      secondary: ['Egyptian travel pillow', 'مخدات سفر مصرية'],
      longTail: ['مخدات سفر مصرية فاخرة بالجملة', `${productName} wholesale`],
    },
    structuredData: {},
    hreflang: generateHreflangTags(productPath, baseUrl),
    canonical: `${baseUrl}${productPath}`,
    openGraph: {
      title: {
        en: `${productName} | Egyptian Travel Pillows Manufacturing`,
        ar: `${productNameAr} | تصنيع مخدات سفر مصرية`,
      },
      description: {
        en: `${productDescription} Premium Egyptian manufacturing with authentic Pharaonic design.`,
        ar: `${productDescriptionAr} تصنيع مصري فاخر بتصميم فرعوني أصيل.`,
      },
      image: `${baseUrl}/products/${productPath.split('/').pop()}.jpg`,
      imageAlt: {
        en: `${productName} - Egyptian Pharaonic Travel Pillow`,
        ar: `${productNameAr} - مخدة سفر فرعونية مصرية`,
      },
      url: `${baseUrl}${productPath}`,
      type: 'product',
      siteName: 'YKP Supplies',
      locale: 'en_US',
      localeAlternate: ['ar_EG'],
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        en: `${productName} | Egyptian Travel Pillows`,
        ar: `${productNameAr} | مخدات سفر مصرية`,
      },
      description: {
        en: `${productDescription} Premium Egyptian manufacturing.`,
        ar: `${productDescriptionAr} تصنيع مصري فاخر.`,
      },
      image: `${baseUrl}/products/${productPath.split('/').pop()}.jpg`,
      imageAlt: {
        en: productName,
        ar: productNameAr,
      },
      creator: '@ykp-eg',
    },
    rtl: {
      enabled: true,
      direction: 'ltr',
      lang: 'en',
    },
    robots: 'index, follow, max-image-preview:large',
  };
}

export default {
  ARABIC_PRIMARY_KEYWORDS,
  ARABIC_KEYWORD_VARIATIONS,
  ARABIC_LONG_TAIL_KEYWORDS,
  ARABIC_RELATED_TERMS,
  DEFAULT_ARABIC_KEYWORD_STRATEGY,
  generateHreflangTags,
  generateRTLMetaTags,
  calculateKeywordDensity,
  optimizeKeywordDensity,
  generateBilingualMetaTags,
  generateHomepageEnhancedSEO,
  generateProductEnhancedSEO,
};

// Blog SEO and Product Integration System
// Comprehensive SEO optimization and product linking for Egyptian Pharaonic Symbols blog

import { BlogArticle } from '@/data/blog-articles';
import { Product } from '@/types/product';
import { ALL_PRODUCTS, getProductsBySymbol, getRelatedProducts } from '@/data/products';
import { TARGET_KEYWORDS, generateInternalLinks } from '@/lib/seo-content';

// Enhanced SEO Keywords for Blog Articles
export const BLOG_SEO_KEYWORDS = {
  arabic: {
    primary: [
      'رموز فرعونية ومعانيها',
      'الثقافة المصرية القديمة',
      'رموز مصرية قديمة',
      'معاني الرموز الفرعونية',
      'التراث المصري القديم',
      'الحضارة الفرعونية',
      'رموز الآلهة المصرية',
      'الفن المصري القديم'
    ],
    secondary: [
      'مخدات سفر فرعونية',
      'تصاميم مصرية أصيلة',
      'منتجات التراث المصري',
      'إكسسوارات سفر مصرية',
      'وسائد ميموري فوم مصرية',
      'هدايا ثقافية مصرية',
      'منتجات فرعونية فاخرة',
      'تصاميم رموز مصرية'
    ],
    longTail: [
      'معنى رمز العنخ في الثقافة المصرية القديمة',
      'قصة عين حورس ومعناها الروحي',
      'رمز الجعران الملكي في الحضارة الفرعونية',
      'وسائد سفر مستوحاة من الرموز الفرعونية',
      'منتجات مصرية أصيلة للتجارة بالجملة',
      'تصاميم فرعونية على وسائد الميموري فوم',
      'هدايا ثقافية مصرية للسياح الأجانب',
      'رموز الحماية في الثقافة المصرية القديمة'
    ]
  },
  english: {
    primary: [
      'Egyptian symbols meaning',
      'Pharaonic heritage Egypt',
      'ancient Egypt culture',
      'Egyptian mythology symbols',
      'Pharaonic symbols pillow designs',
      'Egyptian cultural heritage',
      'ancient Egyptian art',
      'Egyptian gods symbols'
    ],
    secondary: [
      'Egyptian travel pillows',
      'Pharaonic design pillows',
      'Egyptian heritage products',
      'cultural travel accessories',
      'memory foam Egyptian pillows',
      'Egyptian cultural gifts',
      'premium Pharaonic products',
      'authentic Egyptian designs'
    ],
    longTail: [
      'meaning of Ankh symbol in ancient Egyptian culture',
      'Eye of Horus spiritual significance and protection',
      'Royal Scarab beetle symbolism in Pharaonic civilization',
      'travel pillows inspired by ancient Egyptian symbols',
      'authentic Egyptian cultural products wholesale B2B',
      'Pharaonic symbol designs on memory foam pillows',
      'Egyptian cultural gifts for international tourists',
      'protection symbols in ancient Egyptian mythology'
    ]
  }
};

// Product-Symbol Mapping for Enhanced Integration
export const SYMBOL_PRODUCT_MAPPING = {
  'Anubis': {
    primaryProducts: ['b123-anubis-guardian', 'b123-afterlife-journey', 't-jackal-protector'],
    keywords: ['Anubis travel pillow', 'jackal god pillow', 'afterlife protection pillow'],
    arabicKeywords: ['وسادة أنوبيس', 'وسادة   ابن آوى', 'وسادة حماية الآخرة'],
    description: 'Travel pillows featuring Anubis designs offer protection and guidance during journeys, just as the ancient god guided souls through the afterlife.'
  },
  'Royal Scarab': {
    primaryProducts: ['b123-royal-scarab', 'b123-golden-beetle', 't-protection-scarab'],
    keywords: ['scarab beetle pillow', 'protection symbol pillow', 'renewal pillow'],
    arabicKeywords: ['وسادة الجعران الملكي', 'وسادة رمز الحماية', 'وسادة التجديد'],
    description: 'Scarab-inspired travel pillows symbolize protection and daily renewal, perfect for travelers seeking spiritual comfort.'
  },
  'Queen Nefertiti': {
    primaryProducts: ['b123-nefertiti-elegance', 'b123-royal-beauty', 'b123-amarna-queen'],
    keywords: ['Nefertiti luxury pillow', 'royal beauty pillow', 'elegant travel pillow'],
    arabicKeywords: ['وسادة نفرتيتي الفاخرة', 'وسادة الجمال الملكي', 'وسادة السفر الأنيقة'],
    description: 'Luxury travel pillows inspired by Queen Nefertiti combine royal elegance with modern comfort for sophisticated travelers.'
  },
  'Great Pyramids': {
    primaryProducts: ['b123-pyramid-eternal', 'b123-giza-monument', 't-pyramid-geometry'],
    keywords: ['pyramid design pillow', 'eternal comfort pillow', 'architectural pillow'],
    arabicKeywords: ['وسادة تصميم الهرم', 'وسادة الراحة الأبدية', 'وسادة معمارية'],
    description: 'Pyramid-inspired travel pillows embody eternal strength and architectural perfection for lasting comfort.'
  },
  'Eye of Horus': {
    primaryProducts: ['b123-horus-protection', 'b123-wadjet-guardian', 't-divine-eye'],
    keywords: ['Eye of Horus pillow', 'protection symbol pillow', 'divine eye pillow'],
    arabicKeywords: ['وسادة عين حورس', 'وسادة رمز الحماية', 'وسادة العين ال ية'],
    description: 'Eye of Horus travel pillows provide divine protection and watchful care during all your journeys.'
  },
  'Ankh': {
    primaryProducts: ['b123-ankh-eternal', 't-life-key', 'tb-eternal-life'],
    keywords: ['Ankh symbol pillow', 'eternal life pillow', 'key of life pillow'],
    arabicKeywords: ['وسادة رمز العنخ', 'وسادة الحياة الأبدية', 'وسادة مفتاح الحياة'],
    description: 'Ankh-themed travel pillows represent eternal life and spiritual renewal for meaningful travel experiences.'
  },
  'Sacred Lotus': {
    primaryProducts: ['tb-lotus-purity', 't-rebirth-flower', 'b123-sacred-bloom'],
    keywords: ['lotus flower pillow', 'purity symbol pillow', 'rebirth pillow'],
    arabicKeywords: ['وسادة زهرة اللوتس', 'وسادة رمز الطهارة', 'وسادة الولادة الجديدة'],
    description: 'Lotus-inspired travel pillows symbolize purity and rebirth, perfect for transformative journeys.'
  },
  'Great Sphinx': {
    primaryProducts: ['b123-sphinx-wisdom', 't-guardian-sphinx', 'tb-riddle-keeper'],
    keywords: ['Sphinx wisdom pillow', 'guardian pillow', 'strength symbol pillow'],
    arabicKeywords: ['وسادة حكمة أبو الهول', 'وسادة الحارس', 'وسادة رمز القوة'],
    description: 'Sphinx-themed travel pillows embody ancient wisdom and protective strength for thoughtful travelers.'
  },
  'Queen Cleopatra': {
    primaryProducts: ['b123-cleopatra-beauty', 'b123-royal-intelligence', 't-queen-power'],
    keywords: ['Cleopatra pillow', 'royal intelligence pillow', 'beauty wisdom pillow'],
    arabicKeywords: ['وسادة كليوباترا', 'وسادة الذكاء الملكي', 'وسادة حكمة الجمال'],
    description: 'Cleopatra-inspired travel pillows combine beauty and intelligence for travelers who appreciate historical elegance.'
  },
  "Pharaoh's Crown": {
    primaryProducts: ['b123-pharaoh-crown', 't-royal-authority', 'tb-divine-rule'],
    keywords: ['Pharaoh crown pillow', 'royal authority pillow', 'divine rule pillow'],
    arabicKeywords: ['وسادة تاج الفرعون', 'وسادة السلطة الملكية', 'وسادة الحكم ال ي'],
    description: 'Pharaoh crown travel pillows represent divine authority and royal comfort for distinguished travelers.'
  }
};

// Enhanced SEO Meta Generation for Blog Articles
export const generateBlogSEOMeta = (article: BlogArticle): {
  title: string;
  description: string;
  keywords: string[];
  openGraph: any;
  twitter: any;
} => {
  const symbolMapping = SYMBOL_PRODUCT_MAPPING[article.symbol.name as keyof typeof SYMBOL_PRODUCT_MAPPING];

  // Enhanced title with SEO keywords
  const seoTitle = `${article.title} | ${article.symbol.meaning} في الثقافة المصرية | Egyptian Pharaonic Symbols`;

  // Enhanced description with product integration
  const seoDescription = `${article.description} اكتشف وسائد السفر المصرية المستوحاة من ${article.symbol.arabicName}. ${symbolMapping?.description || ''}`;

  // Comprehensive keywords combining article and product keywords
  const keywords = [
    ...article.seoKeywords.primary,
    ...article.seoKeywords.secondary,
    ...BLOG_SEO_KEYWORDS.english.primary,
    ...BLOG_SEO_KEYWORDS.arabic.primary,
    ...(symbolMapping?.keywords || []),
    ...(symbolMapping?.arabicKeywords || [])
  ];

  return {
    title: seoTitle,
    description: seoDescription,
    keywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      image: `https://ykp-eg.com/blog-images/${article.slug}-og.jpg`,
      url: `https://ykp-eg.com/blog/${article.slug}`,
      type: "article",
      siteName: "Pharaonic Pillows Egypt",
      locale: "en_US",
      alternateLocale: "ar_EG"
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      image: `https://ykp-eg.com/blog-images/${article.slug}-twitter.jpg`,
      site: "@ykp-eg",
      creator: "@ykp-eg"
    }
  };
};

// Related Products Generator for Blog Articles
export const generateRelatedProducts = (article: BlogArticle): Product[] => {
  const symbolMapping = SYMBOL_PRODUCT_MAPPING[article.symbol.name as keyof typeof SYMBOL_PRODUCT_MAPPING];

  if (!symbolMapping) {
    return [];
  }

  // Get products by symbol name
  const symbolProducts = getProductsBySymbol(article.symbol.name);

  // Get specific mapped products
  const mappedProducts = ALL_PRODUCTS.filter(product =>
    symbolMapping.primaryProducts.includes(product.id)
  );

  // Combine and deduplicate
  const allRelatedProducts = [...mappedProducts, ...symbolProducts];
  const uniqueProducts = allRelatedProducts.filter((product, index, self) =>
    index === self.findIndex(p => p.id === product.id)
  );

  return uniqueProducts.slice(0, 6); // Return top 6 related products
};

// Internal Linking Strategy for Blog Articles
export const generateBlogInternalLinks = (article: BlogArticle): Array<{
  url: string;
  anchor: string;
  title: string;
  type: 'product' | 'blog' | 'collection' | 'page';
}> => {
  const links: Array<{
    url: string;
    anchor: string;
    title: string;
    type: 'product' | 'blog' | 'collection' | 'page';
  }> = [];

  const symbolMapping = SYMBOL_PRODUCT_MAPPING[article.symbol.name as keyof typeof SYMBOL_PRODUCT_MAPPING];

  // Link to related products
  if (symbolMapping) {
    symbolMapping.primaryProducts.forEach(productId => {
      const product = ALL_PRODUCTS.find(p => p.id === productId);
      if (product) {
        links.push({
          url: `/products/${product.collection}/${product.id}`,
          anchor: `${product.name} Travel Pillow`,
          title: `Premium Egyptian travel pillow featuring ${article.symbol.name} design`,
          type: 'product'
        });
      }
    });
  }

  // Link to product collections
  const collections = ['b123', 't', 'tb'];
  collections.forEach(collection => {
    links.push({
      url: `/products/${collection}`,
      anchor: `${collection.toUpperCase()} Collection`,
      title: `Explore ${collection.toUpperCase()} Egyptian travel pillow collection`,
      type: 'collection'
    });
  });

  // Link to other blog articles
  links.push({
    url: '/blog',
    anchor: 'More Egyptian Symbols',
    title: 'Explore more ancient Egyptian symbols and their meanings',
    type: 'blog'
  });

  // Link to wholesale page
  links.push({
    url: '/wholesale',
    anchor: 'Wholesale Opportunities',
    title: 'B2B wholesale opportunities for Egyptian travel pillows',
    type: 'page'
  });

  // Link to about page
  links.push({
    url: '/about',
    anchor: 'About Our Egyptian Heritage',
    title: 'Learn about our commitment to authentic Egyptian cultural products',
    type: 'page'
  });

  return links;
};

// Call-to-Action Generator for Blog Articles
export const generateBlogCTA = (article: BlogArticle): {
  primary: {
    arabicText: string;
    text: string;
    href: string;
    description: string;
  };
  secondary: {
    arabicText: string;
    text: string;
    href: string;
    description: string;
  };
  tertiary?: {
    arabicText: string;
    text: string;
    href: string;
    description: string;
  };
} => {
  const symbolMapping = SYMBOL_PRODUCT_MAPPING[article.symbol.name as keyof typeof SYMBOL_PRODUCT_MAPPING];

  return {
    primary: {
      arabicText: `تسوق وسائد ${article.symbol.arabicName}`,
      text: `Shop ${article.symbol.name} Pillows`,
      href: `/products?symbol=${encodeURIComponent(article.symbol.name)}`,
      description: `Discover premium Egyptian travel pillows inspired by ${article.symbol.name}`
    },
    secondary: {
      arabicText: 'عرض جميع المنتجات',
      text: 'View All Products',
      href: '/products',
      description: 'Explore our complete collection of Egyptian travel pillows'
    },
    tertiary: {
      arabicText: 'فرص الجملة',
      text: 'Wholesale Opportunities',
      href: '/wholesale',
      description: 'Learn about B2B wholesale opportunities for retailers and distributors'
    }
  };
};

// SEO Content Optimization for Blog Articles
export const optimizeBlogContent = (article: BlogArticle): {
  optimizedContent: string;
  keywordDensity: { [keyword: string]: number };
  suggestions: string[];
} => {
  let optimizedContent = article.content;
  const targetKeywords = [
    ...BLOG_SEO_KEYWORDS.english.primary,
    ...BLOG_SEO_KEYWORDS.english.secondary,
    ...article.seoKeywords.primary,
    ...article.seoKeywords.secondary
  ];

  // Add natural keyword integration
  const symbolMapping = SYMBOL_PRODUCT_MAPPING[article.symbol.name as keyof typeof SYMBOL_PRODUCT_MAPPING];

  if (symbolMapping) {
    // Add product integration paragraph
    const productIntegration = `\n\n## ${article.symbol.name} in Modern Egyptian Travel Pillows\n\n${symbolMapping.description} Our premium Egyptian travel pillow collection features authentic ${article.symbol.name} designs that honor the cultural significance of this ancient symbol while providing modern comfort for today's travelers.\n\n`;

    // Insert after the first major section
    const firstSectionEnd = optimizedContent.indexOf('\n\n##');
    if (firstSectionEnd > -1) {
      optimizedContent = optimizedContent.slice(0, firstSectionEnd) + productIntegration + optimizedContent.slice(firstSectionEnd);
    } else {
      optimizedContent += productIntegration;
    }
  }

  // Add wholesale opportunity section
  const wholesaleSection = `\n\n## Wholesale Opportunities for ${article.symbol.name} Products\n\nRetailers and distributors interested in authentic Egyptian cultural products will find strong market demand for ${article.symbol.name}-themed travel pillows. These products appeal to customers seeking meaningful travel accessories that combine cultural significance with practical comfort. Our B2B wholesale program offers competitive pricing and authentic Egyptian designs that resonate with cultural enthusiasts, spiritual travelers, and premium travel accessory customers.\n\n`;

  optimizedContent += wholesaleSection;

  // Calculate keyword density
  const words = optimizedContent.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  const keywordDensity: { [keyword: string]: number } = {};

  targetKeywords.forEach(keyword => {
    const keywordCount = (optimizedContent.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
    keywordDensity[keyword] = (keywordCount / totalWords) * 100;
  });

  // Generate optimization suggestions
  const suggestions: string[] = [];

  Object.entries(keywordDensity).forEach(([keyword, density]) => {
    if (density === 0) {
      suggestions.push(`Consider adding the keyword "${keyword}" naturally to the content`);
    } else if (density > 3) {
      suggestions.push(`Reduce usage of "${keyword}" to avoid keyword stuffing (current: ${density.toFixed(1)}%)`);
    }
  });

  return {
    optimizedContent,
    keywordDensity,
    suggestions
  };
};

// Structured Data Generator for Blog Articles
export const generateBlogStructuredData = (article: BlogArticle) => {
  const relatedProducts = generateRelatedProducts(article);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    alternativeHeadline: article.arabicTitle,
    description: article.description,
    image: `https://ykp-eg.com/blog-images/${article.slug}-featured.jpg`,
    datePublished: article.publishDate,
    dateModified: article.lastModified,
    author: {
      '@type': 'Person',
      name: article.author,
      description: 'Egyptian Cultural Historian and Heritage Expert'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pharaonic Pillows Egypt',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ykp-eg.com/logo.png',
        width: 200,
        height: 60
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ykp-eg.com/blog/${article.slug}`
    },
    keywords: article.seoKeywords.primary.join(', '),
    articleSection: 'Egyptian Culture and Heritage',
    wordCount: article.content.split(/\s+/).length,
    timeRequired: `PT${article.readingTime}M`,
    inLanguage: ['en', 'ar'],
    about: {
      '@type': 'Thing',
      name: article.symbol.name,
      description: article.symbol.meaning,
      sameAs: `https://en.wikipedia.org/wiki/${article.symbol.name.replace(/\s+/g, '_')}`
    },
    mentions: relatedProducts.map(product => ({
      '@type': 'Product',
      name: product.name,
      description: product.description,
      url: `https://ykp-eg.com/products/${product.collection}/${product.id}`,
      brand: {
        '@type': 'Brand',
        name: 'Pharaonic Pillows Egypt'
      }
    }))
  };
};

export default {
  BLOG_SEO_KEYWORDS,
  SYMBOL_PRODUCT_MAPPING,
  generateBlogSEOMeta,
  generateRelatedProducts,
  generateBlogInternalLinks,
  generateBlogCTA,
  optimizeBlogContent,
  generateBlogStructuredData
};
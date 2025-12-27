// Blog Content Optimizer
// Utility to enhance existing blog articles with SEO optimization and product integration

import { BlogArticle } from '@/data/blog-articles';
import { BLOG_SEO_KEYWORDS, SYMBOL_PRODUCT_MAPPING } from './blog-seo-integration';

// Enhanced SEO keywords for each article
export const enhanceArticleSEO = (article: BlogArticle): BlogArticle => {
  const symbolMapping = SYMBOL_PRODUCT_MAPPING[article.symbol.name as keyof typeof SYMBOL_PRODUCT_MAPPING];

  // Enhanced SEO keywords
  const enhancedKeywords = {
    primary: [
      ...article.seoKeywords.primary,
      ...BLOG_SEO_KEYWORDS.english.primary.filter(keyword =>
        keyword.toLowerCase().includes(article.symbol.name.toLowerCase()) ||
        article.symbol.name.toLowerCase().includes(keyword.toLowerCase())
      ),
      ...(symbolMapping?.keywords || [])
    ],
    secondary: [
      ...article.seoKeywords.secondary,
      ...BLOG_SEO_KEYWORDS.english.secondary,
      ...(symbolMapping?.arabicKeywords || [])
    ],
    longTail: [
      ...article.seoKeywords.longTail || [],
      ...BLOG_SEO_KEYWORDS.english.longTail.filter(keyword =>
        keyword.toLowerCase().includes(article.symbol.name.toLowerCase())
      ),
      `${article.symbol.name} Egyptian travel pillow wholesale`,
      `authentic ${article.symbol.name} memory foam pillows B2B`,
      `${article.symbol.name} symbol meaning Egyptian culture travel accessories`
    ]
  };

  // Enhanced related products
  const enhancedRelatedProducts = [
    ...article.relatedProducts,
    ...(symbolMapping?.primaryProducts || [])
  ].filter((product, index, self) => self.indexOf(product) === index); // Remove duplicates

  return {
    ...article,
    seoKeywords: enhancedKeywords,
    relatedProducts: enhancedRelatedProducts,
    // Add product integration flag
    hasProductIntegration: true
  } as BlogArticle & { hasProductIntegration: boolean };
};

// Add call-to-action content to articles
export const addCTAContent = (content: string, symbolName: string): string => {
  const symbolMapping = SYMBOL_PRODUCT_MAPPING[symbolName as keyof typeof SYMBOL_PRODUCT_MAPPING];

  if (!symbolMapping) {
    return content;
  }

  // Add product integration section
  const productCTA = `

## ${symbolName} في وسائد السفر المصرية الحديثة

${symbolMapping.description}

تتميز مجموعة وسائد السفر المصرية الفاخرة لدينا بتصاميم أصيلة مستوحاة من رمز ${symbolName} التي تكرم الأهمية الثقافية لهذا الرمز القديم مع توفير الراحة العصرية للمسافرين اليوم.

### مميزات وسائد ${symbolName}:
- تصاميم أصيلة مستوحاة من الفن المصري القديم
- رغوة الذاكرة عالية الجودة للراحة الفائقة
- أقمشة مصرية فاخرة مقاومة للبكتيريا
- تعبئة صديقة للبيئة وقابلة لإعادة التدوير
- شهادة الأصالة الثقافية المصرية

## فرص الجملة للموزعين الدوليين

يجد تجار التجزئة والموزعون المهتمون بالمنتجات الثقافية المصرية الأصيلة طلباً قوياً في السوق على وسائد السفر المستوحاة من رمز ${symbolName}. هذه المنتجات تجذب العملاء الذين يبحثون عن إكسسوارات سفر ذات معنى تجمع بين الأهمية الثقافية والراحة العملية.

### مزايا برنامج الجملة لدينا:
- أسعار تنافسية للكميات الكبيرة
- تصاميم مصرية أصيلة تحظى بإعجاب عشاق الثقافة
- دعم تسويقي شامل للموزعين
- شحن دولي موثوق وسريع
- ضمان الجودة والأصالة الثقافية

`;

  return content + productCTA;
};

// Generate internal linking content
export const addInternalLinks = (content: string, article: BlogArticle): string => {
  const symbolMapping = SYMBOL_PRODUCT_MAPPING[article.symbol.name as keyof typeof SYMBOL_PRODUCT_MAPPING];

  if (!symbolMapping) {
    return content;
  }

  // Add natural internal links within the content
  let enhancedContent = content;

  // Add product links naturally in the content
  symbolMapping.primaryProducts.forEach(productId => {
    const productMention = `وسادة ${article.symbol.arabicName}`;
    const productLink = `[${productMention}](/products/${productId})`;

    // Replace first occurrence of product mention with link
    enhancedContent = enhancedContent.replace(productMention, productLink);
  });

  // Add collection links
  const collectionMentions = {
    'Premium Collection': '/products/',
    'Classic Collection': '/products/',
    'Heritage Collection': '/products/'
  };

  Object.entries(collectionMentions).forEach(([mention, link]) => {
    const regex = new RegExp(`\\b${mention}\\b`, 'g');
    enhancedContent = enhancedContent.replace(regex, `[${mention}](${link})`);
  });

  return enhancedContent;
};

// Optimize article meta description
export const optimizeMetaDescription = (article: BlogArticle): string => {
  const symbolMapping = SYMBOL_PRODUCT_MAPPING[article.symbol.name as keyof typeof SYMBOL_PRODUCT_MAPPING];

  let optimizedDescription = article.description;

  // Add product integration mention
  if (symbolMapping) {
    optimizedDescription += ` اكتشف وسائد السفر المصرية المستوحاة من ${article.symbol.arabicName}.`;
  }

  // Add wholesale mention for B2B SEO
  optimizedDescription += ' فرص الجملة متاحة للموزعين الدوليين.';

  // Ensure it's within SEO limits (155 characters)
  if (optimizedDescription.length > 155) {
    optimizedDescription = optimizedDescription.substring(0, 152) + '...';
  }

  return optimizedDescription;
};

// Generate structured data for enhanced SEO
export const generateEnhancedStructuredData = (article: BlogArticle) => {
  const symbolMapping = SYMBOL_PRODUCT_MAPPING[article.symbol.name as keyof typeof SYMBOL_PRODUCT_MAPPING];

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    alternativeHeadline: article.arabicTitle,
    description: optimizeMetaDescription(article),
    image: [
      `https://ykp-eg.com/blog-images/${article.slug}-featured.jpg`,
      `https://ykp-eg.com/blog-images/${article.slug}-og.jpg`,
      `https://ykp-eg.com/blog-images/${article.slug}-twitter.jpg`
    ],
    datePublished: article.publishDate,
    dateModified: article.lastModified,
    author: {
      '@type': 'Person',
      name: article.author,
      description: 'Egyptian Cultural Historian and Heritage Expert',
      sameAs: [
        'https://www.linkedin.com/in/egyptian-cultural-expert',
        'https://twitter.com/EgyptianHeritage'
      ]
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pharaonic Pillows Egypt',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ykp-eg.com/logo.png',
        width: 200,
        height: 60
      },
      sameAs: [
        'https://www.facebook.com/new.cairo.893792',
        'https://twitter.com/ykp-eg'
      ]
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ykp-eg.com/blog/${article.slug}`
    },
    keywords: enhanceArticleSEO(article).seoKeywords.primary.join(', '),
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
    mentions: symbolMapping?.primaryProducts.map(productId => ({
      '@type': 'Product',
      name: `${article.symbol.name} Egyptian Travel Pillow`,
      description: `Premium Egyptian travel pillow featuring ${article.symbol.name} design`,
      url: `https://ykp-eg.com/products/${productId}`,
      brand: {
        '@type': 'Brand',
        name: 'Pharaonic Pillows Egypt'
      },
      category: 'Travel Accessories',
      material: 'Memory Foam',
      countryOfOrigin: 'Egypt'
    })) || [],
    isPartOf: {
      '@type': 'Blog',
      name: 'Egyptian Pharaonic Symbols Blog',
      description: 'Comprehensive guide to ancient Egyptian symbols and their modern applications in travel accessories',
      url: 'https://ykp-eg.com/blog'
    }
  };
};

export default {
  enhanceArticleSEO,
  addCTAContent,
  addInternalLinks,
  optimizeMetaDescription,
  generateEnhancedStructuredData
};
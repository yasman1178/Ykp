// SEO Content Optimization Utilities
// Comprehensive keyword integration and content optimization for Egyptian Pharaonic Pillows

import { PRIMARY_KEYWORDS, LONG_TAIL_KEYWORDS } from './seo-config';

// Target Keywords Integration
export const TARGET_KEYWORDS = {
  primary: {
    arabic: [
      'مخدات سفر فرعونية',
      'مخدات ميموري فوم مصرية', 
      'مخدات تصميم مصري',
      'مخدات سفر مصرية'
    ],
    english: [
      'Egyptian travel pillows',
      'memory foam Egypt',
      'Pharaonic design pillows',
      'Egyptian heritage pillows'
    ]
  },
  secondary: {
    arabic: [
      'مخدات راحة السفر',
      'إكسسوارات سفر مصرية',
      'مخدات تراث فرعوني',
      'مخدات رغوة الذاكرة'
    ],
    english: [
      'travel comfort pillows',
      'Egyptian travel accessories',
      'Pharaonic heritage pillows',
      'memory foam travel pillows'
    ]
  },
  longTail: {
    arabic: [
      'مخدات سفر فرعونية فاخرة بالجملة',
      'مخدات رغوة ذاكرة تصميم مصري أصيل',
      'إكسسوارات سفر تراث مصري للتجارة',
      'مخدات سفر رموز فرعونية قديمة'
    ],
    english: [
      'premium Egyptian travel pillows wholesale',
      'authentic Pharaonic design memory foam pillows',
      'Egyptian cultural heritage travel accessories B2B',
      'ancient Egyptian symbols travel pillows wholesale'
    ]
  }
};

// SEO-Friendly URL Slug Generation
export const generateSEOSlug = (text: string, language: 'en' | 'ar' = 'en'): string => {
  if (language === 'ar') {
    // Arabic slug generation
    return text
      .trim()
      .replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, (match) => {
        // Convert Arabic characters to transliteration
        const arabicToLatin: { [key: string]: string } = {
          'ا': 'a', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h',
          'خ': 'kh', 'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's',
          'ش': 'sh', 'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a',
          'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm',
          'ن': 'n', 'ه': 'h', 'و': 'w', 'ي': 'y', 'ة': 'h'
        };
        return arabicToLatin[match] || match;
      })
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  
  // English slug generation
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Product SEO URL Generation
export const generateProductSEOUrl = (product: any): { en: string; ar: string } => {
  const englishSlug = generateSEOSlug(
    `${product.name} ${product.collection} egyptian travel pillow`, 
    'en'
  );
  
  const arabicSlug = generateSEOSlug(
    `مخدة سفر فرعونية ${product.name}`,
    'ar'
  );
  
  return {
    en: `/products/${product.collection}/${englishSlug}`,
    ar: `/ar/products/${product.collection}/${arabicSlug}`
  };
};

// Blog Article SEO URL Generation
export const generateBlogSEOUrl = (article: any): { en: string; ar: string } => {
  const englishSlug = generateSEOSlug(
    `${article.title} egyptian pharaonic symbol meaning`,
    'en'
  );
  
  const arabicSlug = generateSEOSlug(
    `${article.arabicTitle || article.title} رمز فرعوني مصري`,
    'ar'
  );
  
  return {
    en: `/blog/${englishSlug}`,
    ar: `/ar/blog/${arabicSlug}`
  };
};

// Keyword-Optimized Content Generation
export const optimizeProductDescription = (product: any): string => {
  const keywords = TARGET_KEYWORDS.primary.english;
  const longTailKeywords = TARGET_KEYWORDS.longTail.english;
  
  // Base description with natural keyword integration
  let optimizedDescription = product.description;
  
  // Add primary keywords naturally
  if (!optimizedDescription.toLowerCase().includes('egyptian travel pillows')) {
    optimizedDescription = `Premium Egyptian travel pillows featuring ${optimizedDescription.toLowerCase()}`;
  }
  
  if (!optimizedDescription.toLowerCase().includes('memory foam')) {
    optimizedDescription += ` Crafted with high-quality memory foam for superior comfort during travel.`;
  }
  
  if (!optimizedDescription.toLowerCase().includes('pharaonic design')) {
    optimizedDescription += ` Authentic Pharaonic design elements bring ancient Egyptian heritage to modern travel comfort.`;
  }
  
  // Add collection-specific keywords
  const collectionKeywords = {
    b123: 'premium luxury Egyptian travel accessories',
    t: 'traditional Egyptian symbols travel pillows',
    tb: 'heritage Egyptian hieroglyphic travel accessories'
  };
  
  const collectionKeyword = collectionKeywords[product.collection as keyof typeof collectionKeywords];
  if (collectionKeyword && !optimizedDescription.toLowerCase().includes(collectionKeyword)) {
    optimizedDescription += ` Perfect for travelers seeking ${collectionKeyword}.`;
  }
  
  return optimizedDescription;
};

// Meta Description Generation with Keywords
export const generateSEOMetaDescription = (
  content: string, 
  type: 'product' | 'collection' | 'blog' | 'page',
  keywords: string[] = []
): string => {
  const maxLength = 155;
  const primaryKeywords = [...TARGET_KEYWORDS.primary.english, ...keywords];
  
  let metaDescription = content;
  
  // Add relevant keywords based on type
  switch (type) {
    case 'product':
      if (!metaDescription.includes('Egyptian travel pillows')) {
        metaDescription = `Egyptian travel pillows: ${metaDescription}`;
      }
      if (!metaDescription.includes('memory foam') && metaDescription.length < 120) {
        metaDescription += ' Memory foam comfort.';
      }
      break;
      
    case 'collection':
      if (!metaDescription.includes('wholesale')) {
        metaDescription += ' Wholesale B2B opportunities available.';
      }
      break;
      
    case 'blog':
      if (!metaDescription.includes('Egyptian symbols') && metaDescription.length < 120) {
        metaDescription += ' Learn about ancient Egyptian symbols and culture.';
      }
      break;
  }
  
  // Truncate if too long
  if (metaDescription.length > maxLength) {
    metaDescription = metaDescription.substring(0, maxLength - 3) + '...';
  }
  
  return metaDescription;
};

// Internal Linking Strategy
export const generateInternalLinks = (
  currentPage: any,
  type: 'product' | 'blog' | 'collection'
): Array<{ url: string; anchor: string; title: string }> => {
  const links: Array<{ url: string; anchor: string; title: string }> = [];
  
  switch (type) {
    case 'product':
      // Link to collection page
      links.push({
        url: `/products/${currentPage.collection}`,
        anchor: `${currentPage.collection.toUpperCase()} Collection`,
        title: `Explore more ${currentPage.collection.toUpperCase()} Egyptian travel pillows`
      });
      
      // Link to related blog articles
      if (currentPage.pharaonicDesign?.primarySymbols) {
        currentPage.pharaonicDesign.primarySymbols.forEach((symbol: any) => {
          links.push({
            url: `/blog/${generateSEOSlug(symbol.name + ' egyptian symbol meaning')}`,
            anchor: `Learn about ${symbol.name}`,
            title: `Discover the meaning of ${symbol.name} in ancient Egyptian culture`
          });
        });
      }
      
      // Link to wholesale page
      links.push({
        url: '/wholesale',
        anchor: 'Wholesale Opportunities',
        title: 'B2B wholesale pricing for Egyptian travel pillows'
      });
      break;
      
    case 'blog':
      // Link to related products
      if (currentPage.relatedProducts) {
        currentPage.relatedProducts.forEach((productId: string) => {
          links.push({
            url: `/products/${productId}`,
            anchor: `${productId} Travel Pillow`,
            title: `Egyptian travel pillow featuring ${currentPage.title} design`
          });
        });
      }
      
      // Link to other blog articles
      links.push({
        url: '/blog',
        anchor: 'More Egyptian Symbols',
        title: 'Explore more ancient Egyptian symbols and their meanings'
      });
      break;
      
    case 'collection':
      // Link to individual products
      if (currentPage.products) {
        currentPage.products.slice(0, 3).forEach((product: any) => {
          links.push({
            url: `/products/${currentPage.id}/${product.id}`,
            anchor: product.name,
            title: `${product.name} - Premium Egyptian travel pillow`
          });
        });
      }
      
      // Link to blog articles
      links.push({
        url: '/blog',
        anchor: 'Egyptian Heritage Stories',
        title: 'Learn about the cultural significance behind our designs'
      });
      break;
  }
  
  return links;
};

// Keyword Density Checker
export const checkKeywordDensity = (
  content: string, 
  keywords: string[]
): { [keyword: string]: { count: number; density: number } } => {
  const words = content.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  const results: { [keyword: string]: { count: number; density: number } } = {};
  
  keywords.forEach(keyword => {
    const keywordWords = keyword.toLowerCase().split(/\s+/);
    let count = 0;
    
    // Count occurrences
    for (let i = 0; i <= words.length - keywordWords.length; i++) {
      const phrase = words.slice(i, i + keywordWords.length).join(' ');
      if (phrase === keyword.toLowerCase()) {
        count++;
      }
    }
    
    const density = (count / totalWords) * 100;
    results[keyword] = { count, density };
  });
  
  return results;
};

// Content Optimization Suggestions
export const generateContentSuggestions = (
  content: string,
  targetKeywords: string[]
): string[] => {
  const suggestions: string[] = [];
  const keywordDensity = checkKeywordDensity(content, targetKeywords);
  
  targetKeywords.forEach(keyword => {
    const stats = keywordDensity[keyword];
    
    if (stats.density === 0) {
      suggestions.push(`Add the keyword "${keyword}" to improve SEO relevance`);
    } else if (stats.density < 0.5) {
      suggestions.push(`Consider adding "${keyword}" more naturally throughout the content`);
    } else if (stats.density > 3) {
      suggestions.push(`Reduce usage of "${keyword}" to avoid keyword stuffing (current: ${stats.density.toFixed(1)}%)`);
    }
  });
  
  return suggestions;
};

const seoContent = {
  TARGET_KEYWORDS,
  generateSEOSlug,
  generateProductSEOUrl,
  generateBlogSEOUrl,
  optimizeProductDescription,
  generateSEOMetaDescription,
  generateInternalLinks,
  checkKeywordDensity,
  generateContentSuggestions
};

export default seoContent;
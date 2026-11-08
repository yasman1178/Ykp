// Arabic Keyword Optimization System
// Comprehensive keyword optimization for "مخدات سفر تصنيع" and related terms

import {
  ARABIC_PRIMARY_KEYWORDS,
  ARABIC_KEYWORD_VARIATIONS,
  ARABIC_LONG_TAIL_KEYWORDS,
  ARABIC_RELATED_TERMS,
  calculateKeywordDensity,
  optimizeKeywordDensity,
} from './seo-enhanced';

export interface KeywordOptimizationResult {
  keyword: string;
  density: number;
  isOptimal: boolean;
  suggestion: string;
  placement: {
    inTitle: boolean;
    inDescription: boolean;
    inFirstParagraph: boolean;
    inH1: boolean;
  };
}

export interface PageOptimizationReport {
  title: KeywordOptimizationResult;
  description: KeywordOptimizationResult;
  content: KeywordOptimizationResult;
  overallScore: number;
  recommendations: string[];
}

/**
 * Optimize page title with Arabic keywords
 * Ensures primary keyword appears in first 60 characters
 */
export function optimizePageTitle(
  title: string,
  primaryKeyword: string = 'مخدات سفر تصنيع',
  maxLength: number = 60
): {
  optimized: string;
  hasKeyword: boolean;
  keywordPosition: number;
  length: number;
  isOptimal: boolean;
} {
  const hasKeyword = title.includes(primaryKeyword);
  const keywordPosition = title.indexOf(primaryKeyword);
  const length = title.length;
  
  // If title already has keyword in first 60 chars and is good length, return as is
  if (hasKeyword && keywordPosition < 60 && length <= maxLength) {
    return {
      optimized: title,
      hasKeyword: true,
      keywordPosition,
      length,
      isOptimal: true,
    };
  }
  
  // If title doesn't have keyword, prepend it
  if (!hasKeyword) {
    const optimized = `${primaryKeyword} | ${title}`;
    return {
      optimized: optimized.substring(0, maxLength),
      hasKeyword: true,
      keywordPosition: 0,
      length: optimized.length,
      isOptimal: optimized.length <= maxLength,
    };
  }
  
  // If keyword is too far in title, restructure
  if (keywordPosition >= 60) {
    const withoutKeyword = title.replace(primaryKeyword, '').trim();
    const optimized = `${primaryKeyword} | ${withoutKeyword}`;
    return {
      optimized: optimized.substring(0, maxLength),
      hasKeyword: true,
      keywordPosition: 0,
      length: optimized.length,
      isOptimal: optimized.length <= maxLength,
    };
  }
  
  // Title is too long, truncate
  if (length > maxLength) {
    return {
      optimized: title.substring(0, maxLength - 3) + '...',
      hasKeyword,
      keywordPosition,
      length: maxLength,
      isOptimal: false,
    };
  }
  
  return {
    optimized: title,
    hasKeyword,
    keywordPosition,
    length,
    isOptimal: true,
  };
}

/**
 * Optimize meta description with Arabic keywords and CTA
 * Target length: 150-160 characters
 */
export function optimizeMetaDescription(
  description: string,
  primaryKeyword: string = 'مخدات سفر تصنيع',
  minLength: number = 150,
  maxLength: number = 160
): {
  optimized: string;
  hasKeyword: boolean;
  hasCTA: boolean;
  length: number;
  isOptimal: boolean;
} {
  const hasKeyword = description.includes(primaryKeyword);
  const ctaPatterns = [
    'اتصل',      // Contact
    'اطلب',      // Order
    'احصل',      // Get
    'اكتشف',     // Discover
    'تواصل',     // Connect
    'استفسر',    // Inquire
    'Call',
    'Order',
    'Get',
    'Discover',
    'Contact',
  ];
  const hasCTA = ctaPatterns.some(cta => description.includes(cta));
  const length = description.length;
  
  // If description is optimal, return as is
  if (hasKeyword && hasCTA && length >= minLength && length <= maxLength) {
    return {
      optimized: description,
      hasKeyword: true,
      hasCTA: true,
      length,
      isOptimal: true,
    };
  }
  
  let optimized = description;
  
  // Add keyword if missing
  if (!hasKeyword) {
    optimized = `${primaryKeyword} - ${optimized}`;
  }
  
  // Add CTA if missing and there's room
  if (!hasCTA && optimized.length < maxLength - 20) {
    optimized = `${optimized} اتصل الآن للاستفسار.`; // "Contact now to inquire."
  }
  
  // Truncate if too long
  if (optimized.length > maxLength) {
    // Try to cut at sentence boundary
    const sentences = optimized.split('. ');
    let result = '';
    for (const sentence of sentences) {
      if ((result + sentence + '. ').length <= maxLength) {
        result += sentence + '. ';
      } else {
        break;
      }
    }
    
    if (result.length > 0 && result.length >= minLength) {
      optimized = result.trim();
    } else {
      // Cut at word boundary
      optimized = optimized.substring(0, maxLength - 3) + '...';
    }
  }
  
  // Pad if too short
  if (optimized.length < minLength) {
    const padding = ' جودة مصرية فاخرة.'; // "Premium Egyptian quality."
    if (optimized.length + padding.length <= maxLength) {
      optimized += padding;
    }
  }
  
  return {
    optimized,
    hasKeyword: optimized.includes(primaryKeyword),
    hasCTA: ctaPatterns.some(cta => optimized.includes(cta)),
    length: optimized.length,
    isOptimal: optimized.length >= minLength && optimized.length <= maxLength,
  };
}

/**
 * Generate Arabic meta description with CTA for different page types
 */
export function generateArabicMetaDescription(
  pageType: 'homepage' | 'product' | 'collection' | 'blog' | 'contact',
  customContent?: string
): string {
  const descriptions: Record<string, string> = {
    homepage: 'مخدات سفر تصنيع مصرية فاخرة بتصاميم فرعونية أصيلة. رغوة الذاكرة المريحة، جودة عالية، أسعار الجملة. اتصل الآن للاستفسار عن فرص B2B.',
    product: `مخدات سفر تصنيع ${customContent || 'فاخرة'} بتصميم فرعوني أصيل. رغوة ذاكرة مريحة، جودة مصرية عالية. أسعار الجملة متاحة. اطلب الآن.`,
    collection: `مجموعة مخدات سفر تصنيع ${customContent || 'مصرية'} بتصاميم فرعونية متنوعة. جودة فاخرة، أسعار الجملة التنافسية. اكتشف المجموعة الآن.`,
    blog: `${customContent || 'مخدات سفر تصنيع'} - معلومات شاملة عن التصنيع المصري والتراث الفرعوني. اكتشف المزيد عن منتجاتنا الفاخرة.`,
    contact: 'تواصل معنا للاستفسار عن مخدات سفر تصنيع مصرية بالجملة. فريقنا جاهز لخدمتك. أسعار تنافسية، شحن دولي. اتصل الآن.',
  };
  
  return descriptions[pageType] || descriptions.homepage;
}

/**
 * Add long-tail Arabic keyword variations to content
 */
export function generateLongTailKeywordContent(
  baseContent: string,
  targetKeywords: string[] = ARABIC_LONG_TAIL_KEYWORDS.slice(0, 3)
): string {
  const variations = [
    `نحن متخصصون في ${targetKeywords[0]}.`,
    `منتجاتنا تشمل ${targetKeywords[1]}.`,
    `نقدم ${targetKeywords[2]} للعملاء في جميع أنحاء العالم.`,
  ];
  
  return `${baseContent}\n\n${variations.join(' ')}`;
}

/**
 * Check keyword density for multiple keywords
 */
export function analyzeKeywordDensity(
  content: string,
  keywords: string[] = ARABIC_PRIMARY_KEYWORDS
): KeywordOptimizationResult[] {
  return keywords.map(keyword => {
    const analysis = optimizeKeywordDensity(content, keyword, 2.5);
    
    return {
      keyword,
      density: analysis.currentDensity,
      isOptimal: analysis.isOptimal,
      suggestion: analysis.suggestion,
      placement: {
        inTitle: false, // Will be checked separately
        inDescription: false, // Will be checked separately
        inFirstParagraph: content.substring(0, 300).includes(keyword),
        inH1: false, // Will be checked separately
      },
    };
  });
}

/**
 * Generate comprehensive page optimization report
 */
export function generatePageOptimizationReport(
  title: string,
  description: string,
  content: string,
  primaryKeyword: string = 'مخدات سفر تصنيع'
): PageOptimizationReport {
  const titleAnalysis = optimizeKeywordDensity(title, primaryKeyword, 5); // Higher density for title
  const descAnalysis = optimizeKeywordDensity(description, primaryKeyword, 3); // Medium density for description
  const contentAnalysis = optimizeKeywordDensity(content, primaryKeyword, 2.5); // Target density for content
  
  const titleResult: KeywordOptimizationResult = {
    keyword: primaryKeyword,
    density: titleAnalysis.currentDensity,
    isOptimal: titleAnalysis.isOptimal,
    suggestion: titleAnalysis.suggestion,
    placement: {
      inTitle: title.includes(primaryKeyword),
      inDescription: description.includes(primaryKeyword),
      inFirstParagraph: content.substring(0, 300).includes(primaryKeyword),
      inH1: false,
    },
  };
  
  const descResult: KeywordOptimizationResult = {
    keyword: primaryKeyword,
    density: descAnalysis.currentDensity,
    isOptimal: descAnalysis.isOptimal,
    suggestion: descAnalysis.suggestion,
    placement: {
      inTitle: title.includes(primaryKeyword),
      inDescription: description.includes(primaryKeyword),
      inFirstParagraph: content.substring(0, 300).includes(primaryKeyword),
      inH1: false,
    },
  };
  
  const contentResult: KeywordOptimizationResult = {
    keyword: primaryKeyword,
    density: contentAnalysis.currentDensity,
    isOptimal: contentAnalysis.isOptimal,
    suggestion: contentAnalysis.suggestion,
    placement: {
      inTitle: title.includes(primaryKeyword),
      inDescription: description.includes(primaryKeyword),
      inFirstParagraph: content.substring(0, 300).includes(primaryKeyword),
      inH1: false,
    },
  };
  
  // Calculate overall score (0-100)
  let score = 0;
  if (titleResult.placement.inTitle) score += 25;
  if (descResult.placement.inDescription) score += 25;
  if (contentResult.placement.inFirstParagraph) score += 20;
  if (contentResult.isOptimal) score += 30;
  
  // Generate recommendations
  const recommendations: string[] = [];
  if (!titleResult.placement.inTitle) {
    recommendations.push(`Add "${primaryKeyword}" to the page title, preferably in the first 60 characters.`);
  }
  if (!descResult.placement.inDescription) {
    recommendations.push(`Include "${primaryKeyword}" in the meta description.`);
  }
  if (!contentResult.placement.inFirstParagraph) {
    recommendations.push(`Place "${primaryKeyword}" in the first paragraph of content.`);
  }
  if (!contentResult.isOptimal) {
    recommendations.push(contentResult.suggestion);
  }
  if (recommendations.length === 0) {
    recommendations.push('Page is well-optimized for the target keyword!');
  }
  
  return {
    title: titleResult,
    description: descResult,
    content: contentResult,
    overallScore: score,
    recommendations,
  };
}

/**
 * Generate optimized content for product pages
 */
export function generateOptimizedProductContent(
  productName: string,
  productNameAr: string,
  culturalElement: string,
  culturalElementAr: string
): {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  h1En: string;
  h1Ar: string;
} {
  return {
    titleEn: `${productName} | مخدات سفر تصنيع | Egyptian Travel Pillows Manufacturing`,
    titleAr: `${productNameAr} | مخدات سفر تصنيع مصرية | ${productName}`,
    descriptionEn: `Premium ${productName} featuring ${culturalElement} design. Egyptian travel pillows manufacturing (مخدات سفر تصنيع) with memory foam comfort. Wholesale B2B pricing available.`,
    descriptionAr: `${productNameAr} فاخرة بتصميم ${culturalElementAr}. مخدات سفر تصنيع مصرية برغوة الذاكرة المريحة. أسعار الجملة B2B متاحة.`,
    h1En: `${productName} - Premium Egyptian Travel Pillow Manufacturing`,
    h1Ar: `${productNameAr} - مخدات سفر تصنيع مصرية فاخرة`,
  };
}

/**
 * Generate optimized content for collection pages
 */
export function generateOptimizedCollectionContent(
  collectionName: string,
  collectionNameAr: string,
  productCount: number
): {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  h1En: string;
  h1Ar: string;
} {
  return {
    titleEn: `${collectionName} Collection | مخدات سفر تصنيع | ${productCount} Egyptian Travel Pillows`,
    titleAr: `مجموعة ${collectionNameAr} | مخدات سفر تصنيع | ${productCount} مخدة سفر مصرية`,
    descriptionEn: `Explore ${collectionName} collection of Egyptian travel pillows manufacturing (مخدات سفر تصنيع). ${productCount} premium designs with authentic Pharaonic symbols. Wholesale B2B available.`,
    descriptionAr: `اكتشف مجموعة ${collectionNameAr} من مخدات سفر تصنيع مصرية. ${productCount} تصميم فاخر برموز فرعونية أصيلة. الجملة B2B متاحة.`,
    h1En: `${collectionName} Collection - Egyptian Travel Pillows Manufacturing`,
    h1Ar: `مجموعة ${collectionNameAr} - مخدات سفر تصنيع مصرية`,
  };
}

/**
 * Generate optimized homepage content
 */
export function generateOptimizedHomepageContent(): {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  h1En: string;
  h1Ar: string;
  heroTextEn: string;
  heroTextAr: string;
} {
  return {
    titleEn: 'Egyptian Travel Pillows Manufacturing | مخدات سفر تصنيع | Wholesale B2B',
    titleAr: 'مخدات سفر تصنيع مصرية | تصنيع مخدات بالجملة | Egyptian Manufacturing',
    descriptionEn: 'Premium Egyptian travel pillows manufacturing (مخدات سفر تصنيع). Authentic Pharaonic designs, memory foam comfort, wholesale B2B opportunities. International shipping available.',
    descriptionAr: 'تصنيع مخدات سفر مصرية فاخرة (مخدات سفر تصنيع). تصاميم فرعونية أصيلة، راحة رغوة الذاكرة، فرص الجملة B2B. الشحن الدولي متاح.',
    h1En: 'Premium Egyptian Travel Pillows Manufacturing',
    h1Ar: 'مخدات سفر تصنيع مصرية فاخرة',
    heroTextEn: 'Discover authentic Egyptian travel pillows manufacturing (مخدات سفر تصنيع) with premium Pharaonic designs. We combine ancient Egyptian heritage with modern memory foam comfort technology. Wholesale B2B opportunities for international distributors.',
    heroTextAr: 'اكتشف مخدات سفر تصنيع مصرية أصيلة بتصاميم فرعونية فاخرة. نجمع بين التراث المصري القديم وتكنولوجيا رغوة الذاكرة الحديثة. فرص الجملة B2B للموزعين الدوليين.',
  };
}

const arabicKeywordOptimizer = {
  optimizePageTitle,
  optimizeMetaDescription,
  generateArabicMetaDescription,
  generateLongTailKeywordContent,
  analyzeKeywordDensity,
  generatePageOptimizationReport,
  generateOptimizedProductContent,
  generateOptimizedCollectionContent,
  generateOptimizedHomepageContent,
};

export default arabicKeywordOptimizer;

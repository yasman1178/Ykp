// SEO Optimization for Pillow Manufacturing Business
// Focus on manufacturing keywords and Egyptian cultural content

import { BlogArticleEnhanced, SEOMetadata, ManufacturerSEOKeywords, PILLOW_MANUFACTURER_KEYWORDS } from '@/types/blog-enhanced';

export class ManufacturingSEOOptimizer {
  private readonly companyName = 'Egyptian Pillow Manufacturing Co.';
  private readonly baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com';

  /**
   * Generate SEO-optimized meta tags for manufacturing-focused blog articles
   */
  generateSEOMetadata(article: BlogArticleEnhanced): SEOMetadata {
    const manufacturingKeywords = this.extractManufacturingKeywords(article);
    const optimizedTitle = this.optimizeTitle(article.title, manufacturingKeywords);
    const optimizedDescription = this.optimizeDescription(article.description, manufacturingKeywords);

    return {
      title: optimizedTitle,
      description: optimizedDescription,
      keywords: [...manufacturingKeywords.primary, ...manufacturingKeywords.secondary],
      openGraph: {
        title: optimizedTitle,
        description: optimizedDescription,
        image: article.featuredImage.url,
        type: 'article'
      },
      twitterCard: {
        card: 'summary_large_image',
        title: optimizedTitle,
        description: optimizedDescription,
        image: article.featuredImage.url
      },
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: optimizedTitle,
        description: optimizedDescription,
        author: {
          '@type': 'Person',
          name: article.author.name
        },
        publisher: {
          '@type': 'Organization',
          name: this.companyName,
          logo: `${this.baseUrl}/logo.png`
        },
        datePublished: article.publishDate,
        dateModified: article.lastModified,
        mainEntityOfPage: `${this.baseUrl}/blog/${article.slug}`,
        image: article.featuredImage.url
      }
    };
  }

  /**
   * Optimize title for manufacturing SEO
   */
  private optimizeTitle(originalTitle: string, keywords: ManufacturerSEOKeywords): string {
    // Check if title already contains manufacturing keywords
    const hasManufacturingKeyword = keywords.primary.some(keyword => 
      originalTitle.toLowerCase().includes(keyword.toLowerCase())
    );

    if (hasManufacturingKeyword) {
      return originalTitle;
    }

    // Add manufacturing context to cultural titles
    if (originalTitle.includes('Egyptian') || originalTitle.includes('Pharaonic')) {
      return `${originalTitle} | Premium Pillow Manufacturing`;
    }

    // For symbol-specific articles, add manufacturing context
    const culturalSymbols = ['Anubis', 'Horus', 'Ankh', 'Scarab', 'Pyramid', 'Nefertiti'];
    const hasSymbol = culturalSymbols.some(symbol => originalTitle.includes(symbol));
    
    if (hasSymbol) {
      return `${originalTitle} - Egyptian Pillow Manufacturer`;
    }

    return `${originalTitle} | Egyptian Pillow Manufacturing`;
  }

  /**
   * Optimize description for manufacturing SEO
   */
  private optimizeDescription(originalDescription: string, keywords: ManufacturerSEOKeywords): string {
    // Ensure description includes manufacturing context
    const manufacturingContext = 'Discover authentic Egyptian-themed pillows from our premium manufacturing facility.';
    
    if (originalDescription.length + manufacturingContext.length > 160) {
      // Truncate original and add manufacturing context
      const truncated = originalDescription.substring(0, 120);
      return `${truncated}... ${manufacturingContext}`;
    }

    return `${originalDescription} ${manufacturingContext}`;
  }

  /**
   * Extract and enhance manufacturing keywords from article
   */
  private extractManufacturingKeywords(article: BlogArticleEnhanced): ManufacturerSEOKeywords {
    const baseKeywords = { ...PILLOW_MANUFACTURER_KEYWORDS };
    
    // Add article-specific manufacturing keywords
    const articleSpecific = this.generateArticleSpecificKeywords(article);
    
    return {
      primary: [...baseKeywords.primary, ...articleSpecific.primary],
      secondary: [...baseKeywords.secondary, ...articleSpecific.secondary],
      longTail: [...baseKeywords.longTail, ...articleSpecific.longTail],
      local: [...baseKeywords.local],
      productSpecific: [...baseKeywords.productSpecific, ...articleSpecific.productSpecific]
    };
  }

  /**
   * Generate article-specific manufacturing keywords
   */
  private generateArticleSpecificKeywords(article: BlogArticleEnhanced): ManufacturerSEOKeywords {
    const symbolName = article.culturalElement.englishName.toLowerCase();
    const materials = article.manufacturingFocus.materials;
    const pillowTypes = article.manufacturingFocus.pillowTypes;

    return {
      primary: [
        `${symbolName} pillow manufacturer`,
        `Egyptian ${symbolName} pillow factory`
      ],
      secondary: [
        `${symbolName} themed pillow production`,
        `authentic ${symbolName} pillow supplier`
      ],
      longTail: [
        `custom ${symbolName} memory foam pillow manufacturer Egypt`,
        `wholesale ${symbolName} themed travel pillow supplier`,
        `premium Egyptian ${symbolName} pillow manufacturing company`
      ],
      local: [
        `${symbolName} pillow manufacturer Egypt`,
        `Egyptian ${symbolName} pillow export`
      ],
      productSpecific: [
        ...materials.map(material => `${symbolName} ${material} pillow`),
        ...pillowTypes.map(type => `${symbolName} ${type} manufacturer`)
      ]
    };
  }

  /**
   * Analyze keyword density in content
   */
  analyzeKeywordDensity(content: string, keywords: string[]): { [key: string]: number } {
    const wordCount = content.split(/\s+/).length;
    const density: { [key: string]: number } = {};

    keywords.forEach(keyword => {
      const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = content.match(regex) || [];
      density[keyword] = (matches.length / wordCount) * 100;
    });

    return density;
  }

  /**
   * Generate internal linking suggestions for manufacturing content
   */
  generateInternalLinks(article: BlogArticleEnhanced, allArticles: BlogArticleEnhanced[]): Array<{
    anchor: string;
    url: string;
    relevance: number;
  }> {
    const links: Array<{ anchor: string; url: string; relevance: number }> = [];
    
    // Find related manufacturing articles
    const relatedArticles = allArticles.filter(otherArticle => 
      otherArticle.id !== article.id &&
      (
        // Same cultural symbol
        otherArticle.culturalElement.englishName === article.culturalElement.englishName ||
        // Similar manufacturing focus
        otherArticle.manufacturingFocus.pillowTypes.some(type => 
          article.manufacturingFocus.pillowTypes.includes(type)
        ) ||
        // Similar materials
        otherArticle.manufacturingFocus.materials.some(material =>
          article.manufacturingFocus.materials.includes(material)
        )
      )
    );

    relatedArticles.forEach(relatedArticle => {
      const relevance = this.calculateRelevanceScore(article, relatedArticle);
      if (relevance > 0.3) {
        links.push({
          anchor: `${relatedArticle.culturalElement.englishName} ${relatedArticle.manufacturingFocus.pillowTypes[0]} manufacturing`,
          url: `/blog/${relatedArticle.slug}`,
          relevance
        });
      }
    });

    return links.sort((a, b) => b.relevance - a.relevance).slice(0, 5);
  }

  /**
   * Calculate relevance score between articles
   */
  private calculateRelevanceScore(article1: BlogArticleEnhanced, article2: BlogArticleEnhanced): number {
    let score = 0;

    // Cultural symbol match
    if (article1.culturalElement.englishName === article2.culturalElement.englishName) {
      score += 0.4;
    }

    // Manufacturing focus overlap
    const pillowTypeOverlap = article1.manufacturingFocus.pillowTypes.filter(type =>
      article2.manufacturingFocus.pillowTypes.includes(type)
    ).length;
    score += (pillowTypeOverlap / Math.max(article1.manufacturingFocus.pillowTypes.length, 1)) * 0.3;

    // Material overlap
    const materialOverlap = article1.manufacturingFocus.materials.filter(material =>
      article2.manufacturingFocus.materials.includes(material)
    ).length;
    score += (materialOverlap / Math.max(article1.manufacturingFocus.materials.length, 1)) * 0.2;

    // Category match
    if (article1.category.id === article2.category.id) {
      score += 0.1;
    }

    return Math.min(score, 1);
  }

  /**
   * Generate manufacturing-focused sitemap entries
   */
  generateSitemapEntry(article: BlogArticleEnhanced): {
    url: string;
    lastModified: string;
    changeFrequency: 'weekly' | 'monthly';
    priority: number;
  } {
    const priority = this.calculateSitemapPriority(article);
    
    return {
      url: `${this.baseUrl}/blog/${article.slug}`,
      lastModified: article.lastModified,
      changeFrequency: article.featured ? 'weekly' : 'monthly',
      priority
    };
  }

  /**
   * Calculate sitemap priority based on manufacturing relevance
   */
  private calculateSitemapPriority(article: BlogArticleEnhanced): number {
    let priority = 0.5; // Base priority

    // Featured articles get higher priority
    if (article.featured) priority += 0.2;

    // High manufacturing relevance
    if (article.category.manufacturingRelevance === 'high') priority += 0.2;
    else if (article.category.manufacturingRelevance === 'medium') priority += 0.1;

    // Recent articles get slight boost
    const daysSincePublished = (Date.now() - new Date(article.publishDate).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSincePublished < 30) priority += 0.1;

    return Math.min(priority, 1.0);
  }
}

// Export singleton instance
export const manufacturingSEO = new ManufacturingSEOOptimizer();

// Utility functions for content optimization
export const contentOptimization = {
  /**
   * Replace religious terminology with culturally appropriate terms
   */
  sanitizeCulturalContent(content: string): string {
    const replacements = {
      'god of': 'ancient Egyptian figure associated with',
      'deity': 'mythological character',
      'divine': 'revered',
      'worship': 'honor',
      'sacred': 'culturally significant',
      'holy': 'revered',
      'blessed': 'honored'
    };

    let sanitizedContent = content;
    Object.entries(replacements).forEach(([original, replacement]) => {
      const regex = new RegExp(original, 'gi');
      sanitizedContent = sanitizedContent.replace(regex, replacement);
    });

    return sanitizedContent;
  },

  /**
   * Add manufacturing context to cultural content
   */
  addManufacturingContext(content: string, culturalElement: string): string {
    const manufacturingContext = `\n\nOur premium pillow manufacturing facility creates authentic ${culturalElement}-themed travel pillows that honor this cultural heritage while providing modern comfort. Each pillow is crafted with attention to cultural accuracy and manufacturing excellence.`;
    
    return content + manufacturingContext;
  },

  /**
   * Optimize content for manufacturing keywords
   */
  optimizeForManufacturingKeywords(content: string, keywords: ManufacturerSEOKeywords): string {
    // This is a simplified version - in practice, you'd want more sophisticated NLP
    let optimizedContent = content;
    
    // Ensure primary keywords appear naturally
    keywords.primary.forEach(keyword => {
      if (!optimizedContent.toLowerCase().includes(keyword.toLowerCase())) {
        // Add keyword naturally in a manufacturing context
        const contextSentence = `As a leading ${keyword}, we understand the importance of cultural authenticity in our products.`;
        optimizedContent = optimizedContent.replace(/\n\n/, `\n\n${contextSentence}\n\n`);
      }
    });

    return optimizedContent;
  }
};
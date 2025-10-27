// Keyword Management System for Pillow Manufacturing Business
// Advanced keyword research and optimization for Egyptian pillow manufacturer

import { ManufacturerSEOKeywords } from '@/types/blog-enhanced';

export interface KeywordAnalysis {
  keyword: string;
  searchVolume: 'high' | 'medium' | 'low';
  competition: 'high' | 'medium' | 'low';
  manufacturingRelevance: number; // 0-1 score
  culturalRelevance: number; // 0-1 score
  commercialIntent: 'high' | 'medium' | 'low';
  difficulty: number; // 1-100 SEO difficulty score
}

export interface KeywordCluster {
  primaryKeyword: string;
  relatedKeywords: string[];
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
  manufacturingFocus: string[];
  culturalElements: string[];
}

export class KeywordManager {
  private readonly manufacturingKeywords: ManufacturerSEOKeywords;
  
  constructor() {
    this.manufacturingKeywords = {
      primary: [
        'pillow manufacturer Egypt',
        'memory foam pillow factory',
        'Egyptian pillow manufacturing',
        'travel pillow manufacturer',
        'custom pillow production',
        'wholesale pillow supplier Egypt'
      ],
      secondary: [
        'pillow manufacturing facility',
        'Egyptian cotton pillow factory',
        'memory foam production Egypt',
        'travel accessories manufacturer',
        'pillow export company Egypt',
        'custom pillow design services'
      ],
      longTail: [
        'Egyptian themed travel pillow manufacturer',
        'memory foam pillow manufacturing company Egypt',
        'wholesale Egyptian cultural pillow supplier',
        'custom pharaonic design pillow manufacturer',
        'authentic Egyptian pillow manufacturing facility',
        'premium travel pillow factory Egypt'
      ],
      local: [
        'pillow manufacturer Cairo',
        'Egyptian textile manufacturing company',
        'Middle East pillow supplier',
        'North Africa pillow manufacturer',
        'Egyptian pillow export business'
      ],
      productSpecific: [
        'Anubis themed pillow manufacturer',
        'Egyptian symbol memory foam pillow',
        'pharaonic design travel pillow',
        'cultural heritage pillow supplier',
        'authentic Egyptian travel accessories manufacturer'
      ]
    };
  }

  /**
   * Generate keyword clusters for content planning
   */
  generateKeywordClusters(): KeywordCluster[] {
    return [
      {
        primaryKeyword: 'Egyptian pillow manufacturer',
        relatedKeywords: [
          'pillow manufacturing Egypt',
          'Egyptian pillow factory',
          'pillow production facility Egypt',
          'Egyptian textile manufacturing'
        ],
        intent: 'commercial',
        manufacturingFocus: ['production', 'facility', 'quality', 'export'],
        culturalElements: ['Egyptian heritage', 'authentic design', 'cultural accuracy']
      },
      {
        primaryKeyword: 'memory foam pillow manufacturing',
        relatedKeywords: [
          'memory foam production process',
          'memory foam pillow factory',
          'custom memory foam pillows',
          'memory foam manufacturing technology'
        ],
        intent: 'informational',
        manufacturingFocus: ['technology', 'materials', 'process', 'quality control'],
        culturalElements: ['comfort', 'modern technology', 'traditional craftsmanship']
      },
      {
        primaryKeyword: 'travel pillow manufacturer',
        relatedKeywords: [
          'travel accessories manufacturing',
          'portable pillow production',
          'travel comfort products',
          'airline pillow supplier'
        ],
        intent: 'commercial',
        manufacturingFocus: ['portability', 'comfort', 'durability', 'design'],
        culturalElements: ['travel culture', 'comfort traditions', 'journey symbolism']
      },
      {
        primaryKeyword: 'Egyptian cultural pillow designs',
        relatedKeywords: [
          'pharaonic symbol pillows',
          'ancient Egyptian themed pillows',
          'cultural heritage pillows',
          'authentic Egyptian designs'
        ],
        intent: 'informational',
        manufacturingFocus: ['design', 'authenticity', 'cultural accuracy'],
        culturalElements: ['pharaonic symbols', 'ancient figures', 'cultural heritage', 'historical accuracy']
      },
      {
        primaryKeyword: 'wholesale pillow supplier Egypt',
        relatedKeywords: [
          'bulk pillow manufacturing',
          'pillow wholesale distributor',
          'B2B pillow supplier',
          'pillow export services'
        ],
        intent: 'transactional',
        manufacturingFocus: ['bulk production', 'wholesale pricing', 'export logistics'],
        culturalElements: ['Egyptian quality', 'cultural authenticity', 'heritage craftsmanship']
      }
    ];
  }

  /**
   * Analyze keyword performance and relevance
   */
  analyzeKeyword(keyword: string): KeywordAnalysis {
    // This would typically integrate with SEO tools APIs
    // For now, providing estimated analysis based on keyword characteristics
    
    const isManufacturingKeyword = this.isManufacturingRelated(keyword);
    const isCulturalKeyword = this.isCulturalRelated(keyword);
    const isLongTail = keyword.split(' ').length > 3;
    const hasLocationModifier = keyword.toLowerCase().includes('egypt') || keyword.toLowerCase().includes('cairo');

    return {
      keyword,
      searchVolume: this.estimateSearchVolume(keyword),
      competition: this.estimateCompetition(keyword),
      manufacturingRelevance: isManufacturingKeyword ? 0.9 : 0.3,
      culturalRelevance: isCulturalKeyword ? 0.8 : 0.2,
      commercialIntent: this.determineCommercialIntent(keyword),
      difficulty: this.estimateDifficulty(keyword, isLongTail, hasLocationModifier)
    };
  }

  /**
   * Generate content-specific keywords for articles
   */
  generateContentKeywords(culturalElement: string, pillowType: string, materials: string[]): ManufacturerSEOKeywords {
    const element = culturalElement.toLowerCase();
    const type = pillowType.toLowerCase();
    
    return {
      primary: [
        `${element} ${type} manufacturer`,
        `Egyptian ${element} pillow factory`,
        `${element} themed pillow production`
      ],
      secondary: [
        `authentic ${element} pillow supplier`,
        `${element} design pillow manufacturing`,
        `cultural ${element} pillow factory`
      ],
      longTail: [
        `custom ${element} ${type} manufacturer Egypt`,
        `wholesale ${element} themed pillow supplier`,
        `premium Egyptian ${element} pillow manufacturing`,
        `authentic ${element} ${type} factory Egypt`
      ],
      local: [
        `${element} pillow manufacturer Egypt`,
        `Egyptian ${element} pillow export`,
        `Cairo ${element} pillow factory`
      ],
      productSpecific: [
        ...materials.map(material => `${element} ${material} pillow manufacturer`),
        `${element} ${type} wholesale supplier`,
        `Egyptian ${element} pillow export company`
      ]
    };
  }

  /**
   * Optimize keyword density for content
   */
  optimizeKeywordDensity(content: string, targetKeywords: string[]): {
    optimizedContent: string;
    keywordDensity: { [key: string]: number };
    recommendations: string[];
  } {
    const wordCount = content.split(/\s+/).length;
    const targetDensity = 0.015; // 1.5% target density
    const recommendations: string[] = [];
    let optimizedContent = content;
    
    const currentDensity: { [key: string]: number } = {};
    
    targetKeywords.forEach(keyword => {
      const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = content.match(regex) || [];
      const density = (matches.length / wordCount) * 100;
      currentDensity[keyword] = density;
      
      if (density < targetDensity) {
        recommendations.push(`Increase density of "${keyword}" (current: ${density.toFixed(2)}%, target: ${targetDensity}%)`);
      } else if (density > targetDensity * 2) {
        recommendations.push(`Reduce density of "${keyword}" (current: ${density.toFixed(2)}%, max recommended: ${(targetDensity * 2).toFixed(2)}%)`);
      }
    });

    return {
      optimizedContent,
      keywordDensity: currentDensity,
      recommendations
    };
  }

  /**
   * Generate semantic keywords for better content coverage
   */
  generateSemanticKeywords(primaryKeyword: string): string[] {
    const semanticMap: { [key: string]: string[] } = {
      'pillow manufacturer': [
        'pillow production', 'pillow factory', 'pillow supplier', 'pillow maker',
        'cushion manufacturer', 'bedding manufacturer', 'textile production'
      ],
      'memory foam': [
        'viscoelastic foam', 'pressure relief foam', 'temperature sensitive foam',
        'orthopedic foam', 'supportive foam', 'comfort foam'
      ],
      'travel pillow': [
        'neck pillow', 'portable pillow', 'travel comfort', 'journey pillow',
        'airline pillow', 'travel accessories', 'comfort travel'
      ],
      'Egyptian': [
        'pharaonic', 'ancient Egypt', 'Nile valley', 'Egyptian heritage',
        'Egyptian culture', 'Middle Eastern', 'North African'
      ]
    };

    const semanticKeywords: string[] = [];
    
    Object.entries(semanticMap).forEach(([key, synonyms]) => {
      if (primaryKeyword.toLowerCase().includes(key.toLowerCase())) {
        semanticKeywords.push(...synonyms);
      }
    });

    return Array.from(new Set(semanticKeywords)); // Remove duplicates
  }

  // Private helper methods
  private isManufacturingRelated(keyword: string): boolean {
    const manufacturingTerms = ['manufacturer', 'factory', 'production', 'supplier', 'wholesale', 'export'];
    return manufacturingTerms.some(term => keyword.toLowerCase().includes(term));
  }

  private isCulturalRelated(keyword: string): boolean {
    const culturalTerms = ['egyptian', 'pharaonic', 'anubis', 'horus', 'ankh', 'pyramid', 'cultural', 'heritage'];
    return culturalTerms.some(term => keyword.toLowerCase().includes(term));
  }

  private estimateSearchVolume(keyword: string): 'high' | 'medium' | 'low' {
    const wordCount = keyword.split(' ').length;
    const hasPopularTerms = ['pillow', 'manufacturer', 'egyptian'].some(term => 
      keyword.toLowerCase().includes(term)
    );
    
    if (wordCount <= 2 && hasPopularTerms) return 'high';
    if (wordCount <= 3 && hasPopularTerms) return 'medium';
    return 'low';
  }

  private estimateCompetition(keyword: string): 'high' | 'medium' | 'low' {
    const commercialTerms = ['manufacturer', 'supplier', 'wholesale', 'buy', 'price'];
    const hasCommercialTerms = commercialTerms.some(term => keyword.toLowerCase().includes(term));
    const isLongTail = keyword.split(' ').length > 3;
    
    if (hasCommercialTerms && !isLongTail) return 'high';
    if (hasCommercialTerms || !isLongTail) return 'medium';
    return 'low';
  }

  private determineCommercialIntent(keyword: string): 'high' | 'medium' | 'low' {
    const highIntentTerms = ['manufacturer', 'supplier', 'wholesale', 'buy', 'price', 'factory'];
    const mediumIntentTerms = ['pillow', 'product', 'company', 'service'];
    
    if (highIntentTerms.some(term => keyword.toLowerCase().includes(term))) return 'high';
    if (mediumIntentTerms.some(term => keyword.toLowerCase().includes(term))) return 'medium';
    return 'low';
  }

  private estimateDifficulty(keyword: string, isLongTail: boolean, hasLocationModifier: boolean): number {
    let difficulty = 50; // Base difficulty
    
    if (isLongTail) difficulty -= 20;
    if (hasLocationModifier) difficulty -= 15;
    if (keyword.toLowerCase().includes('manufacturer')) difficulty += 15;
    if (keyword.toLowerCase().includes('wholesale')) difficulty += 10;
    
    return Math.max(10, Math.min(90, difficulty));
  }
}

// Export singleton instance
export const keywordManager = new KeywordManager();

// Utility functions for keyword research
export const keywordUtils = {
  /**
   * Extract keywords from content
   */
  extractKeywordsFromContent(content: string): string[] {
    // Simple keyword extraction - in practice, you'd use more sophisticated NLP
    const words = content.toLowerCase().match(/\b\w+\b/g) || [];
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    
    const filteredWords = words.filter(word => 
      word.length > 3 && !stopWords.includes(word)
    );
    
    // Count frequency and return top keywords
    const frequency: { [key: string]: number } = {};
    filteredWords.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([word]) => word);
  },

  /**
   * Generate keyword variations
   */
  generateKeywordVariations(baseKeyword: string): string[] {
    const variations: string[] = [];
    const modifiers = {
      prefix: ['best', 'top', 'premium', 'quality', 'professional', 'authentic'],
      suffix: ['Egypt', 'Cairo', '2024', 'company', 'supplier', 'factory'],
      replacement: {
        'pillow': ['cushion', 'headrest'],
        'manufacturer': ['factory', 'supplier', 'producer', 'maker'],
        'Egyptian': ['pharaonic', 'ancient Egyptian', 'Nile valley']
      }
    };
    
    // Add prefix variations
    modifiers.prefix.forEach(prefix => {
      variations.push(`${prefix} ${baseKeyword}`);
    });
    
    // Add suffix variations
    modifiers.suffix.forEach(suffix => {
      variations.push(`${baseKeyword} ${suffix}`);
    });
    
    // Add replacement variations
    Object.entries(modifiers.replacement).forEach(([original, replacements]) => {
      if (baseKeyword.includes(original)) {
        replacements.forEach(replacement => {
          variations.push(baseKeyword.replace(original, replacement));
        });
      }
    });
    
    return Array.from(new Set(variations)); // Remove duplicates
  }
};
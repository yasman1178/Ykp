// Intelligent Product Recommendation Engine for Manufacturing Blog
// Advanced recommendation system based on cultural elements, user behavior, and manufacturing focus

import { BlogArticleEnhanced } from '@/types/blog-enhanced';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: {
    wholesale: number;
    retail: number;
    currency: string;
    minimumOrder: number;
  };
  culturalElement: {
    name: string;
    arabicName: string;
    significance: string;
  };
  specifications: {
    dimensions: string;
    material: string[];
    weight: string;
    colors: string[];
    certifications: string[];
  };
  manufacturing: {
    productionTime: string;
    capacity: number;
    customization: boolean;
    exportReady: boolean;
  };
  images: {
    primary: string;
    gallery: string[];
    lifestyle: string[];
  };
  seo: {
    keywords: string[];
    category: string;
  };
  analytics: {
    popularity: number;
    conversionRate: number;
    averageRating: number;
    reviewCount: number;
  };
}

export interface RecommendationContext {
  article: BlogArticleEnhanced;
  userBehavior?: {
    previousViews: string[];
    searchHistory: string[];
    timeOnPage: number;
    scrollDepth: number;
  };
  sessionData?: {
    referrer: string;
    deviceType: 'mobile' | 'desktop' | 'tablet';
    location?: string;
  };
}

export interface RecommendationResult {
  product: Product;
  score: number;
  reasons: string[];
  recommendationType: 'cultural_match' | 'material_similarity' | 'user_behavior' | 'trending' | 'manufacturing_focus';
  confidence: number;
  displayPriority: number;
}

// Sample product data for Egyptian pillow manufacturing
export const MANUFACTURING_PRODUCTS: Product[] = [
  {
    id: 'anubis-premium-travel',
    name: 'Anubis Premium Travel Pillow',
    slug: 'anubis-premium-travel-pillow',
    description: 'Authentic Anubis-themed memory foam travel pillow with Egyptian cotton cover. Perfect for wholesale and retail markets.',
    price: {
      wholesale: 15.99,
      retail: 39.99,
      currency: 'USD',
      minimumOrder: 100
    },
    culturalElement: {
      name: 'Anubis',
      arabicName: 'أنوبيس',
      significance: 'Ancient protector figure associated with safe journeys and transitions'
    },
    specifications: {
      dimensions: '12" x 16" x 4"',
      material: ['Memory Foam', 'Egyptian Cotton', 'Bamboo Fiber'],
      weight: '0.8 lbs',
      colors: ['Gold & Black', 'Blue & Gold', 'Traditional Brown'],
      certifications: ['ISO 9001', 'OEKO-TEX', 'Egyptian Quality Mark']
    },
    manufacturing: {
      productionTime: '7-14 days',
      capacity: 5000,
      customization: true,
      exportReady: true
    },
    images: {
      primary: '/products/anubis-premium-travel-main.jpg',
      gallery: [
        '/products/anubis-premium-travel-1.jpg',
        '/products/anubis-premium-travel-2.jpg',
        '/products/anubis-premium-travel-3.jpg'
      ],
      lifestyle: [
        '/products/anubis-premium-lifestyle-1.jpg',
        '/products/anubis-premium-lifestyle-2.jpg'
      ]
    },
    seo: {
      keywords: ['Anubis travel pillow', 'Egyptian memory foam pillow', 'cultural travel accessories'],
      category: 'Travel Pillows'
    },
    analytics: {
      popularity: 0.92,
      conversionRate: 0.18,
      averageRating: 4.7,
      reviewCount: 234
    }
  },
  {
    id: 'eye-of-horus-protection',
    name: 'Eye of Horus Protection Pillow',
    slug: 'eye-of-horus-protection-pillow',
    description: 'Premium memory foam pillow featuring the protective Eye of Horus symbol. Ideal for wellness and spiritual markets.',
    price: {
      wholesale: 18.99,
      retail: 45.99,
      currency: 'USD',
      minimumOrder: 50
    },
    culturalElement: {
      name: 'Eye of Horus',
      arabicName: 'عين حورس',
      significance: 'Ancient protection symbol representing healing and restoration'
    },
    specifications: {
      dimensions: '14" x 20" x 5"',
      material: ['Premium Memory Foam', 'Organic Egyptian Cotton', 'Hypoallergenic Fill'],
      weight: '1.2 lbs',
      colors: ['Royal Blue & Gold', 'White & Silver', 'Traditional Egyptian'],
      certifications: ['ISO 9001', 'GOTS Organic', 'CertiPUR-US']
    },
    manufacturing: {
      productionTime: '10-21 days',
      capacity: 3000,
      customization: true,
      exportReady: true
    },
    images: {
      primary: '/products/eye-of-horus-protection-main.jpg',
      gallery: [
        '/products/eye-of-horus-protection-1.jpg',
        '/products/eye-of-horus-protection-2.jpg',
        '/products/eye-of-horus-protection-3.jpg'
      ],
      lifestyle: [
        '/products/eye-of-horus-lifestyle-1.jpg',
        '/products/eye-of-horus-lifestyle-2.jpg'
      ]
    },
    seo: {
      keywords: ['Eye of Horus pillow', 'protection symbol pillow', 'Egyptian wellness pillow'],
      category: 'Wellness Pillows'
    },
    analytics: {
      popularity: 0.87,
      conversionRate: 0.22,
      averageRating: 4.8,
      reviewCount: 189
    }
  },
  {
    id: 'ankh-eternal-comfort',
    name: 'Ankh Eternal Comfort Pillow',
    slug: 'ankh-eternal-comfort-pillow',
    description: 'Luxurious Ankh-themed pillow representing eternal life and comfort. Premium materials for discerning customers.',
    price: {
      wholesale: 22.99,
      retail: 55.99,
      currency: 'USD',
      minimumOrder: 25
    },
    culturalElement: {
      name: 'Ankh',
      arabicName: 'عنخ',
      significance: 'Ancient symbol representing life, vitality, and eternal well-being'
    },
    specifications: {
      dimensions: '16" x 24" x 6"',
      material: ['Luxury Memory Foam', 'Egyptian Cotton Sateen', 'Silk Blend'],
      weight: '1.5 lbs',
      colors: ['Gold & Cream', 'Emerald & Gold', 'Royal Purple & Gold'],
      certifications: ['ISO 9001', 'Luxury Textile Certified', 'Egyptian Heritage Approved']
    },
    manufacturing: {
      productionTime: '14-28 days',
      capacity: 1500,
      customization: true,
      exportReady: true
    },
    images: {
      primary: '/products/ankh-eternal-comfort-main.jpg',
      gallery: [
        '/products/ankh-eternal-comfort-1.jpg',
        '/products/ankh-eternal-comfort-2.jpg',
        '/products/ankh-eternal-comfort-3.jpg'
      ],
      lifestyle: [
        '/products/ankh-eternal-lifestyle-1.jpg',
        '/products/ankh-eternal-lifestyle-2.jpg'
      ]
    },
    seo: {
      keywords: ['Ankh pillow', 'eternal life pillow', 'luxury Egyptian pillow'],
      category: 'Luxury Pillows'
    },
    analytics: {
      popularity: 0.79,
      conversionRate: 0.25,
      averageRating: 4.9,
      reviewCount: 156
    }
  }
];

export class ProductRecommendationEngine {
  private products: Product[];
  
  constructor(products: Product[] = MANUFACTURING_PRODUCTS) {
    this.products = products;
  }

  /**
   * Generate product recommendations based on article content and user context
   */
  generateRecommendations(
    context: RecommendationContext,
    maxRecommendations: number = 3
  ): RecommendationResult[] {
    const recommendations: RecommendationResult[] = [];
    
    this.products.forEach(product => {
      const score = this.calculateRecommendationScore(product, context);
      if (score > 0.3) { // Minimum threshold
        recommendations.push({
          product,
          score,
          reasons: this.generateReasons(product, context),
          recommendationType: this.determineRecommendationType(product, context),
          confidence: this.calculateConfidence(score, product, context),
          displayPriority: this.calculateDisplayPriority(score, product)
        });
      }
    });

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, maxRecommendations);
  }

  /**
   * Calculate recommendation score based on multiple factors
   */
  private calculateRecommendationScore(product: Product, context: RecommendationContext): number {
    let score = 0;
    
    // Cultural element match (highest weight)
    if (product.culturalElement.name === context.article.culturalElement.englishName) {
      score += 0.4;
    }
    
    // Material similarity
    const materialMatch = this.calculateMaterialSimilarity(
      product.specifications.material,
      context.article.manufacturingFocus.materials
    );
    score += materialMatch * 0.25;
    
    // Manufacturing focus alignment
    const manufacturingMatch = this.calculateManufacturingAlignment(
      product,
      context.article.manufacturingFocus
    );
    score += manufacturingMatch * 0.2;
    
    // Product popularity and performance
    score += product.analytics.popularity * 0.1;
    score += product.analytics.conversionRate * 0.05;
    
    // User behavior factors
    if (context.userBehavior) {
      const behaviorScore = this.calculateUserBehaviorScore(product, context.userBehavior);
      score += behaviorScore * 0.1;
    }
    
    // Seasonal and trending factors
    const trendingScore = this.calculateTrendingScore(product);
    score += trendingScore * 0.05;
    
    return Math.min(score, 1.0);
  }

  /**
   * Calculate material similarity between product and article
   */
  private calculateMaterialSimilarity(productMaterials: string[], articleMaterials: string[]): number {
    const commonMaterials = productMaterials.filter(material =>
      articleMaterials.some(articleMaterial =>
        material.toLowerCase().includes(articleMaterial.toLowerCase()) ||
        articleMaterial.toLowerCase().includes(material.toLowerCase())
      )
    );
    
    return commonMaterials.length / Math.max(productMaterials.length, articleMaterials.length, 1);
  }

  /**
   * Calculate manufacturing alignment score
   */
  private calculateManufacturingAlignment(product: Product, manufacturingFocus: any): number {
    let score = 0;
    
    // Pillow type alignment
    const pillowTypeMatch = manufacturingFocus.pillowTypes.some((type: string) =>
      product.seo.category.toLowerCase().includes(type.toLowerCase()) ||
      product.name.toLowerCase().includes(type.toLowerCase())
    );
    if (pillowTypeMatch) score += 0.5;
    
    // Target market alignment
    const marketMatch = manufacturingFocus.targetMarket.some((market: string) =>
      (market === 'wholesale' && product.price.minimumOrder > 1) ||
      (market === 'export' && product.manufacturing.exportReady) ||
      (market === 'premium' && product.price.retail > 40)
    );
    if (marketMatch) score += 0.3;
    
    // Certification alignment
    const certificationMatch = product.specifications.certifications.some(cert =>
      manufacturingFocus.certifications?.includes(cert)
    );
    if (certificationMatch) score += 0.2;
    
    return Math.min(score, 1.0);
  }

  /**
   * Calculate user behavior score
   */
  private calculateUserBehaviorScore(product: Product, userBehavior: any): number {
    let score = 0;
    
    // Previous views similarity
    if (userBehavior.previousViews?.length > 0) {
      const viewedSimilarProducts = userBehavior.previousViews.some((view: string) =>
        view.includes(product.culturalElement.name.toLowerCase()) ||
        product.seo.keywords.some(keyword => view.includes(keyword.toLowerCase()))
      );
      if (viewedSimilarProducts) score += 0.4;
    }
    
    // Search history relevance
    if (userBehavior.searchHistory?.length > 0) {
      const searchRelevance = userBehavior.searchHistory.some((search: string) =>
        product.seo.keywords.some(keyword =>
          search.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      if (searchRelevance) score += 0.3;
    }
    
    // Engagement level (time on page, scroll depth)
    const engagementScore = (userBehavior.timeOnPage / 300) * (userBehavior.scrollDepth / 100);
    score += Math.min(engagementScore, 0.3);
    
    return Math.min(score, 1.0);
  }

  /**
   * Calculate trending score based on recent performance
   */
  private calculateTrendingScore(product: Product): number {
    // This would typically use real-time analytics data
    // For now, using static popularity and conversion metrics
    return (product.analytics.popularity + product.analytics.conversionRate) / 2;
  }

  /**
   * Generate human-readable reasons for recommendation
   */
  private generateReasons(product: Product, context: RecommendationContext): string[] {
    const reasons: string[] = [];
    
    if (product.culturalElement.name === context.article.culturalElement.englishName) {
      reasons.push(`Perfect match for ${product.culturalElement.name} cultural theme`);
    }
    
    const materialMatch = this.calculateMaterialSimilarity(
      product.specifications.material,
      context.article.manufacturingFocus.materials
    );
    if (materialMatch > 0.5) {
      reasons.push('Uses similar premium materials mentioned in the article');
    }
    
    if (product.analytics.conversionRate > 0.2) {
      reasons.push('High customer satisfaction and conversion rate');
    }
    
    if (product.manufacturing.customization) {
      reasons.push('Available for custom manufacturing and wholesale orders');
    }
    
    if (product.specifications.certifications.length > 2) {
      reasons.push('Multiple quality certifications and export ready');
    }
    
    return reasons;
  }

  /**
   * Determine the type of recommendation
   */
  private determineRecommendationType(product: Product, context: RecommendationContext): RecommendationResult['recommendationType'] {
    if (product.culturalElement.name === context.article.culturalElement.englishName) {
      return 'cultural_match';
    }
    
    const materialMatch = this.calculateMaterialSimilarity(
      product.specifications.material,
      context.article.manufacturingFocus.materials
    );
    if (materialMatch > 0.6) {
      return 'material_similarity';
    }
    
    if (product.analytics.popularity > 0.8) {
      return 'trending';
    }
    
    if (context.article.category.manufacturingRelevance === 'high') {
      return 'manufacturing_focus';
    }
    
    return 'user_behavior';
  }

  /**
   * Calculate confidence level for the recommendation
   */
  private calculateConfidence(score: number, product: Product, context: RecommendationContext): number {
    let confidence = score;
    
    // Boost confidence for exact cultural matches
    if (product.culturalElement.name === context.article.culturalElement.englishName) {
      confidence += 0.2;
    }
    
    // Boost confidence for high-performing products
    if (product.analytics.conversionRate > 0.2 && product.analytics.averageRating > 4.5) {
      confidence += 0.1;
    }
    
    // Reduce confidence for low-stock or complex products
    if (product.price.minimumOrder > 100) {
      confidence -= 0.05;
    }
    
    return Math.min(confidence, 1.0);
  }

  /**
   * Calculate display priority for UI ordering
   */
  private calculateDisplayPriority(score: number, product: Product): number {
    let priority = score * 100;
    
    // Boost priority for high-conversion products
    priority += product.analytics.conversionRate * 50;
    
    // Boost priority for products with good reviews
    priority += (product.analytics.averageRating - 4.0) * 20;
    
    // Boost priority for export-ready products (B2B focus)
    if (product.manufacturing.exportReady) {
      priority += 10;
    }
    
    return Math.round(priority);
  }

  /**
   * Get products by cultural element
   */
  getProductsByCulturalElement(culturalElement: string): Product[] {
    return this.products.filter(product =>
      product.culturalElement.name.toLowerCase() === culturalElement.toLowerCase()
    );
  }

  /**
   * Get trending products
   */
  getTrendingProducts(limit: number = 5): Product[] {
    return this.products
      .sort((a, b) => b.analytics.popularity - a.analytics.popularity)
      .slice(0, limit);
  }

  /**
   * Get products by price range (wholesale)
   */
  getProductsByPriceRange(minPrice: number, maxPrice: number): Product[] {
    return this.products.filter(product =>
      product.price.wholesale >= minPrice && product.price.wholesale <= maxPrice
    );
  }

  /**
   * Search products by keywords
   */
  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.culturalElement.name.toLowerCase().includes(lowerQuery) ||
      product.seo.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
    );
  }
}

// Export singleton instance
export const productRecommendationEngine = new ProductRecommendationEngine();

// Default export for module compatibility
export default ProductRecommendationEngine;
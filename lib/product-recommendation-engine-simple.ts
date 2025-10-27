// Simple Product Recommendation Engine
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

export interface RecommendationResult {
  product: Product;
  score: number;
  reasons: string[];
  recommendationType: 'cultural_match' | 'material_similarity' | 'user_behavior' | 'trending' | 'manufacturing_focus';
  confidence: number;
  displayPriority: number;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'anubis-premium-travel',
    name: 'Anubis Premium Travel Pillow',
    slug: 'anubis-premium-travel-pillow',
    description: 'Authentic Anubis-themed memory foam travel pillow',
    price: {
      wholesale: 15.99,
      retail: 39.99,
      currency: 'USD',
      minimumOrder: 100
    },
    culturalElement: {
      name: 'Anubis',
      arabicName: 'أنوبيس',
      significance: 'Ancient protector figure'
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
  }
];

export class ProductRecommendationEngine {
  private products: Product[];
  
  constructor(products: Product[] = SAMPLE_PRODUCTS) {
    this.products = products;
  }

  generateRecommendations(
    context: any,
    maxRecommendations: number = 3
  ): RecommendationResult[] {
    // Simple implementation - return sample recommendations
    return this.products.slice(0, maxRecommendations).map(product => ({
      product,
      score: 0.8,
      reasons: ['Cultural match', 'High quality materials'],
      recommendationType: 'cultural_match' as const,
      confidence: 0.9,
      displayPriority: 100
    }));
  }

  getProductsByCulturalElement(culturalElement: string): Product[] {
    return this.products.filter(product =>
      product.culturalElement.name.toLowerCase() === culturalElement.toLowerCase()
    );
  }

  getTrendingProducts(limit: number = 5): Product[] {
    return this.products
      .sort((a, b) => b.analytics.popularity - a.analytics.popularity)
      .slice(0, limit);
  }

  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.culturalElement.name.toLowerCase().includes(lowerQuery)
    );
  }
}

// Export singleton instance
export const productRecommendationEngine = new ProductRecommendationEngine();
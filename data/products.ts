// Complete Product Database
// Generated from image analysis and Egyptian cultural research

import { GENERATED_PRODUCTS } from '@/lib/product-generator';
import type { Product } from '@/types/product';

// Export all generated products
export const ALL_PRODUCTS = GENERATED_PRODUCTS.all;
export const B123_PRODUCTS = GENERATED_PRODUCTS.b123;
export const T_PRODUCTS = GENERATED_PRODUCTS.t;
export const TB_PRODUCTS = GENERATED_PRODUCTS.tb;

// Collection summaries for quick reference
export const COLLECTION_SUMMARIES = {
  b123: {
    id: 'b123',
    name: 'Premium Collection (B123)',
    shortName: 'Premium',
    description: 'Luxurious Egyptian travel pillows inspired by royal pharaonic treasures and ancient Egyptian royalty.',
    longDescription: 'Our Premium Collection represents the pinnacle of Egyptian-inspired travel comfort. Each pillow in this collection is meticulously crafted with premium memory foam and adorned with authentic pharaonic designs inspired by the treasures of ancient Egyptian royalty. From the golden artifacts of Tutankhamun to the elegant beauty of Queen Nefertiti, these pillows bring the luxury and grandeur of ancient Egypt to modern travelers.',
    totalProducts: 23,
    priceRange: { min: 70, max: 90, currency: 'USD' },
    targetMarket: 'Luxury travelers, business executives, premium gift market',
    keyFeatures: [
      'Premium memory foam core',
      'Egyptian cotton covers',
      'Royal pharaonic patterns',
      'Gold accent details',
      'Luxury packaging',
      'Certificate of authenticity'
    ],
    uniqueSellingPoints: [
      'Inspired by actual pharaonic treasures',
      'Premium materials and craftsmanship',
      'Limited edition designs',
      'Luxury travel experience',
      'Cultural authenticity guarantee'
    ],
    wholesaleInfo: {
      minimumOrder: 50,
      bulkDiscounts: [
        { quantity: 50, discount: 15 },
        { quantity: 100, discount: 25 },
        { quantity: 250, discount: 35 }
      ],
      leadTime: '3-4 weeks',
      customization: 'Available for orders over 100 units'
    }
  },
  t: {
    id: 't',
    name: 'Classic Collection (T)',
    shortName: 'Classic',
    description: 'Traditional Egyptian designs offering reliable comfort and authentic cultural patterns at accessible prices.',
    longDescription: 'The Classic Collection brings timeless Egyptian symbols and traditional designs to everyday travelers. Featuring iconic symbols like the Ankh, Sacred Scarab, and Eye of Horus, these pillows offer authentic Egyptian heritage at accessible prices. Perfect for cultural enthusiasts, students, and anyone seeking to connect with ancient Egyptian wisdom during their travels.',
    totalProducts: 21,
    priceRange: { min: 25, max: 45, currency: 'USD' },
    targetMarket: 'Budget-conscious travelers, students, cultural tourists, gift buyers',
    keyFeatures: [
      'Standard memory foam comfort',
      'Cotton blend covers',
      'Traditional Egyptian patterns',
      'Authentic cultural symbols',
      'Durable construction',
      'Educational symbol guide included'
    ],
    uniqueSellingPoints: [
      'Authentic traditional designs',
      'Excellent value for money',
      'Educational cultural content',
      'Durable everyday comfort',
      'Perfect for cultural gifts'
    ],
    wholesaleInfo: {
      minimumOrder: 100,
      bulkDiscounts: [
        { quantity: 100, discount: 20 },
        { quantity: 250, discount: 30 },
        { quantity: 500, discount: 40 }
      ],
      leadTime: '2-3 weeks',
      customization: 'Limited customization available'
    }
  },
  tb: {
    id: 'tb',
    name: 'Heritage Collection (TB)',
    shortName: 'Heritage',
    description: 'Ancient Egyptian symbols and hieroglyphs reimagined for modern travelers seeking cultural authenticity.',
    longDescription: 'The Heritage Collection celebrates the rich symbolic language of ancient Egypt through carefully researched designs featuring authentic hieroglyphs, sacred symbols, and cultural motifs. Each pillow tells a story of ancient Egyptian civilization, making them perfect for cultural enthusiasts, educators, and travelers who appreciate the deeper meanings behind Egyptian art and symbolism.',
    totalProducts: 36,
    priceRange: { min: 35, max: 65, currency: 'USD' },
    targetMarket: 'Cultural enthusiasts, educators, symbol collectors, heritage travelers',
    keyFeatures: [
      'Heritage foam technology',
      'Cultural fabric blends',
      'Authentic hieroglyphic patterns',
      'Sacred symbol designs',
      'Educational documentation',
      'Cultural authenticity certificate'
    ],
    uniqueSellingPoints: [
      'Largest collection of Egyptian symbols',
      'Authentic hieroglyphic designs',
      'Educational and cultural value',
      'Perfect for museums and cultural centers',
      'Comprehensive symbol meanings included'
    ],
    wholesaleInfo: {
      minimumOrder: 75,
      bulkDiscounts: [
        { quantity: 75, discount: 18 },
        { quantity: 150, discount: 28 },
        { quantity: 300, discount: 38 }
      ],
      leadTime: '2-4 weeks',
      customization: 'Custom hieroglyphic messages available'
    }
  }
};

// Product search and filter functions
export const getProductsByCollection = (collection: 'b123' | 't' | 'tb'): Product[] => {
  switch (collection) {
    case 'b123': return B123_PRODUCTS;
    case 't': return T_PRODUCTS;
    case 'tb': return TB_PRODUCTS;
    default: return [];
  }
};

export const getProductById = (id: string): Product | undefined => {
  return ALL_PRODUCTS.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return ALL_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    product.seo.primaryKeywords.english.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  );
};

export const getProductsByPriceRange = (minPrice: number, maxPrice: number): Product[] => {
  return ALL_PRODUCTS.filter(product => 
    product.pricing.retail.min >= minPrice && product.pricing.retail.max <= maxPrice
  );
};

export const getProductsBySymbol = (symbol: string): Product[] => {
  const lowercaseSymbol = symbol.toLowerCase();
  return ALL_PRODUCTS.filter(product =>
    product.pharaonicDesign.primarySymbols.some(s => s.name.toLowerCase().includes(lowercaseSymbol)) ||
    product.pharaonicDesign.secondarySymbols.some(s => s.toLowerCase().includes(lowercaseSymbol))
  );
};

export const getFeaturedProducts = (): Product[] => {
  return ALL_PRODUCTS.filter(product => product.featured).slice(0, 8);
};

export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  // Get products from the same collection first
  const sameCollection = getProductsByCollection(product.collection)
    .filter(p => p.id !== productId)
    .slice(0, limit);
  
  // If we need more products, add from other collections
  if (sameCollection.length < limit) {
    const otherProducts = ALL_PRODUCTS
      .filter(p => p.collection !== product.collection && p.id !== productId)
      .slice(0, limit - sameCollection.length);
    
    return [...sameCollection, ...otherProducts];
  }
  
  return sameCollection;
};

// Wholesale pricing calculator
export const calculateWholesalePrice = (
  collection: 'b123' | 't' | 'tb',
  quantity: number,
  basePrice: number
): { unitPrice: number; totalPrice: number; discount: number } => {
  const collectionInfo = COLLECTION_SUMMARIES[collection];
  let discount = 0;
  
  // Find applicable discount
  for (const tier of collectionInfo.wholesaleInfo.bulkDiscounts) {
    if (quantity >= tier.quantity) {
      discount = tier.discount;
    }
  }
  
  const unitPrice = basePrice * (1 - discount / 100);
  const totalPrice = unitPrice * quantity;
  
  return { unitPrice, totalPrice, discount };
};

// Export everything
export default {
  ALL_PRODUCTS,
  B123_PRODUCTS,
  T_PRODUCTS,
  TB_PRODUCTS,
  COLLECTION_SUMMARIES,
  getProductsByCollection,
  getProductById,
  searchProducts,
  getProductsByPriceRange,
  getProductsBySymbol,
  getFeaturedProducts,
  getRelatedProducts,
  calculateWholesalePrice
};
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
export const COLLECTION_SUMMARIES: Record<string, any> = {
  b123: {
    id: 'b123',
    slug: 'b123',
    aliasSlug: 'royal',
    name: 'Royal Pharaonic Collection',
    nameAr: 'المجموعة الملكية الفرعونية',
    shortName: 'Royal Pharaonic',
    badge: 'Royal Atelier Edition',
    badgeAr: 'إصدار القصور الملكية',
    description: 'Luxurious Egyptian travel pillows inspired by royal pharaonic treasures and ancient Egyptian royalty.',
    longDescription: 'Our Royal Pharaonic Collection represents the pinnacle of Egyptian-inspired travel comfort. Each pillow in this collection is meticulously crafted with premium memory foam and adorned with authentic pharaonic designs inspired by the treasures of ancient Egyptian royalty. From the golden artifacts of Tutankhamun to the elegant beauty of Queen Nefertiti, these pillows bring the luxury and grandeur of ancient Egypt to modern travelers.',
    totalProducts: 23,
    priceRange: { min: 70, max: 90, currency: 'USD' },
    targetMarket: 'Luxury travelers, business executives, premium gift market, boutique hotels',
    keyFeatures: [
      'High-density viscoelastic memory foam core',
      'Breathable Egyptian cotton velvet covers',
      'Royal pharaonic embroidery and patterns',
      'Gold accent precision details',
      'Luxury packaging with magnetic closure',
      'Certificate of cultural authenticity'
    ],
    uniqueSellingPoints: [
      'Inspired by actual pharaonic museum treasures',
      'Premium materials and artisanal Egyptian craftsmanship',
      'Limited edition collection designs',
      'Unsurpassed 360-degree cervical flight support',
      'Guaranteed authentic heritage'
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
    slug: 't',
    aliasSlug: 'sacred',
    name: 'Sacred Symbols & Icons Collection',
    nameAr: 'مجموعة الرموز والمقدسات المصرية',
    shortName: 'Sacred Symbols',
    badge: 'Heritage Icons',
    badgeAr: 'أيقونات البركة والخلود',
    description: 'Traditional Egyptian designs offering reliable comfort and authentic cultural patterns at accessible prices.',
    longDescription: 'The Sacred Symbols Collection brings timeless Egyptian emblems to everyday travelers. Featuring iconic sacred symbols like the Ankh (Key of Life), Sacred Scarab, and Eye of Horus (Wedjat), these pillows offer authentic Egyptian heritage and orthopedic cervical alignment.',
    totalProducts: 21,
    priceRange: { min: 25, max: 45, currency: 'USD' },
    targetMarket: 'International travelers, students, cultural tourists, gift buyers',
    keyFeatures: [
      'Orthopedic memory foam comfort',
      'Breathable soft-touch cotton blend covers',
      'Traditional Egyptian protective symbols',
      'Authentic cultural patterns',
      'Durable, machine-washable construction',
      'Educational symbol guide included'
    ],
    uniqueSellingPoints: [
      'Authentic traditional sacred designs',
      'Exceptional value for money and durability',
      'Educational cultural documentation',
      'Ergonomic everyday travel comfort',
      'Ideal for memorable cultural gifts'
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
    slug: 'tb',
    aliasSlug: 'heritage',
    name: 'Ancient Heritage & Hieroglyphs Collection',
    nameAr: 'مجموعة النقوش والبرديات الأثرية',
    shortName: 'Heritage & Hieroglyphs',
    badge: 'Papyrus & Inscriptions',
    badgeAr: 'نقوش المعابد والبرديات',
    description: 'Ancient Egyptian temple hieroglyphs and sacred papyrus scripts reimagined for modern travelers seeking authentic depth.',
    longDescription: 'The Heritage Collection celebrates the rich hieroglyphic language of ancient Egypt through carefully researched designs featuring authentic temple wall carvings, royal cartouches, and Nile papyrus scripts.',
    totalProducts: 36,
    priceRange: { min: 35, max: 65, currency: 'USD' },
    targetMarket: 'Cultural enthusiasts, educators, symbol collectors, museum shops',
    keyFeatures: [
      'Heritage resilience foam technology',
      'Jacquard and textured cultural fabrics',
      'Authentic hieroglyphic patterns from Karnak & Luxor',
      'Sacred cartouche and amulet designs',
      'Detailed historical documentation'
    ],
    uniqueSellingPoints: [
      'Comprehensive library of authentic Egyptian symbols',
      'Authentic hieroglyphic reliefs',
      'Deep educational and artistic value',
      'Preferred by museum stores and cultural centers'
    ],
    wholesaleInfo: {
      minimumOrder: 75,
      bulkDiscounts: [
        { quantity: 75, discount: 18 },
        { quantity: 150, discount: 28 },
        { quantity: 300, discount: 38 }
      ],
      leadTime: '2-4 weeks',
      customization: 'Custom hieroglyphic cartouche messages available'
    }
  },
  print: {
    id: 'print',
    slug: 'print',
    aliasSlug: 'custom',
    name: 'Custom & Corporate OEM Collection',
    nameAr: 'المجموعة المخصصة وتصنيع الفنادق والطيران',
    shortName: 'Custom & OEM',
    badge: 'Bespoke / OEM',
    badgeAr: 'تصنيع مخصص للعلامات التجارية',
    description: 'Bespoke manufactured and embroidered travel pillows for airlines, luxury hotels, corporate gifts, and private labels.',
    longDescription: 'Full OEM and private-label manufacturing capabilities straight from our New Cairo facility. Custom foam densities, certified fabrics, customized embroidery, and bespoke luxury packaging tailored to international brands.',
    totalProducts: 5,
    priceRange: { min: 30, max: 60, currency: 'USD' },
    targetMarket: 'Airlines, luxury hotels, corporate gift programs, private label distributors',
    keyFeatures: [
      'Custom memory foam density and firmness',
      'Bespoke embroidery with client logos and motifs',
      'OEKO-TEX and CertiPUR certified materials',
      'Custom luxury boxes and travel pouches'
    ],
    uniqueSellingPoints: [
      'Direct manufacturer pricing without middlemen',
      'Comprehensive private label customization',
      'Reliable global export logistics',
      'Strict quality control and fast sampling'
    ],
    wholesaleInfo: {
      minimumOrder: 100,
      bulkDiscounts: [
        { quantity: 100, discount: 20 },
        { quantity: 500, discount: 35 },
        { quantity: 1000, discount: 45 }
      ],
      leadTime: '3-4 weeks',
      customization: 'Full private label customization'
    }
  }
};

export const getProductsByCollection = (collection: string): Product[] => {
  const norm = collection.toLowerCase();
  if (norm === 'b123' || norm === 'royal') return B123_PRODUCTS;
  if (norm === 't' || norm === 'sacred') return T_PRODUCTS;
  if (norm === 'tb' || norm === 'heritage') return TB_PRODUCTS;
  if (norm === 'print' || norm === 'custom') {
    return ALL_PRODUCTS.filter(p => (p as any).collection === 'print' || p.id.includes('print'));
  }
  return [];
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
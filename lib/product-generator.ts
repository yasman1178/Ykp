// Product Generator - Converts analyzed products to full product objects
// Integrates with pharaonic stories and creates complete product database

import { 
  B123_PRODUCTS, 
  T_PRODUCTS, 
  TB_PRODUCTS, 
  getAllProducts,
  type ProductAnalysis 
} from './product-analyzer';
import { PHARAONIC_SYMBOLS, generateProductStory } from '@/data/pharaonic-stories';
import { getProductImageSeo } from './product-image-seo';
import type { Product, ProductCollection, ProductSpecs, WholesaleInfo } from '@/types/product';

// Product Barcode (GTIN/UPC) Mapping
const PRODUCT_BARCODES: Record<string, string> = {
  'B001': '0762497599008',
  'B002': '0762497599015',
  'B003': '0762497599022',
  'B004': '0762497599039',
  'B005': '0762497599046',
  'B006': '0762497599053',
  'T001': '0762497599060',
  'T002': '0762497599077',
  'T003': '0762497599084',
  'T004': '0762497599091',
  'T005': '0762497599107',
  'T006': '0762497599114'
};

// Helper function to get barcode for a product
const getProductBarcode = (productId: string): string | undefined => {
  // Extract the product code (e.g., "B001" from "b123-001")
  const match = productId.match(/([a-z]+)-(\d+)/i);
  if (!match) return undefined;
  
  const collection = match[1].toUpperCase();
  const number = match[2];
  const code = `${collection === 'B123' ? 'B' : collection}${number.padStart(3, '0')}`;
  
  return PRODUCT_BARCODES[code];
};

// Convert ProductAnalysis to full Product object
const convertToProduct = (analysis: ProductAnalysis): Product => {
  // Extract symbol key from the first Egyptian symbol
  const primarySymbolKey = analysis.egyptianSymbols[0]?.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');
  const symbolInfo = PHARAONIC_SYMBOLS[primarySymbolKey];

  // Generate comprehensive specifications
  const specifications: ProductSpecs = {
    dimensions: {
      length: parseFloat(analysis.specifications.dimensions.split('x')[0]) || 12,
      width: parseFloat(analysis.specifications.dimensions.split('x')[1]) || 8,
      height: parseFloat(analysis.specifications.dimensions.split('x')[2]) || 4,
      unit: 'inch',
      weight: {
        value: parseFloat(analysis.specifications.weight) || 1.0,
        unit: 'lb'
      }
    },
    materials: {
      core: analysis.specifications.material.includes('Premium') ? 'Premium Memory Foam' : 'Memory Foam',
      cover: analysis.specifications.material.includes('Egyptian cotton') ? 'Egyptian Cotton' : 'Cotton Blend',
      filling: 'High-density memory foam',
      certifications: ['CertiPUR-US', 'OEKO-TEX Standard 100'],
      careInstructions: [
        'Remove cover and machine wash cold',
        'Tumble dry low heat',
        'Do not bleach',
        'Iron on low if needed',
        'Spot clean foam core only'
      ],
      sustainability: {
        ecoFriendly: true,
        recyclable: true,
        sustainableSourcing: analysis.collection === 'b123'
      }
    },
    firmness: analysis.specifications.firmness as ProductSpecs['firmness'],
    supportLevel: analysis.collection === 'b123' ? 'high' : 'medium',
    temperature: 'neutral',
    hypoallergenic: true,
    antimicrobial: analysis.collection === 'b123',
    warranty: {
      duration: analysis.collection === 'b123' ? 3 : 2,
      unit: 'years',
      coverage: ['Manufacturing defects', 'Material degradation', 'Zipper failure']
    }
  };

  // Generate wholesale info based on collection
  const wholesaleInfo: WholesaleInfo = {
    minimumOrderQuantity: analysis.collection === 'b123' ? 50 : analysis.collection === 't' ? 100 : 75,
    bulkPricing: [
      {
        minQuantity: analysis.collection === 'b123' ? 50 : analysis.collection === 't' ? 100 : 75,
        maxQuantity: analysis.collection === 'b123' ? 99 : analysis.collection === 't' ? 249 : 149,
        unitPrice: analysis.priceRange.min * 0.6,
        discount: analysis.collection === 'b123' ? 15 : analysis.collection === 't' ? 20 : 18,
        currency: 'USD'
      },
      {
        minQuantity: analysis.collection === 'b123' ? 100 : analysis.collection === 't' ? 250 : 150,
        maxQuantity: analysis.collection === 'b123' ? 249 : analysis.collection === 't' ? 499 : 299,
        unitPrice: analysis.priceRange.min * 0.5,
        discount: analysis.collection === 'b123' ? 25 : analysis.collection === 't' ? 30 : 28,
        currency: 'USD'
      },
      {
        minQuantity: analysis.collection === 'b123' ? 250 : analysis.collection === 't' ? 500 : 300,
        unitPrice: analysis.priceRange.min * 0.4,
        discount: analysis.collection === 'b123' ? 35 : analysis.collection === 't' ? 40 : 38,
        currency: 'USD'
      }
    ],
    leadTime: {
      standard: analysis.collection === 'b123' ? '3-4 weeks' : '2-3 weeks',
      rush: '1-2 weeks',
      custom: '4-6 weeks'
    },
    packaging: {
      individual: 'Premium gift box with Egyptian motifs',
      bulk: 'Eco-friendly bulk packaging',
      customOptions: ['Custom branding', 'Gift wrapping', 'Retail packaging']
    },
    shipping: {
      domestic: 'Free shipping on orders over $500',
      international: 'Calculated by destination',
      freeShippingThreshold: 500
    },
    customization: {
      available: true,
      options: ['Custom colors', 'Logo embroidery', 'Custom packaging'],
      minimumQuantity: analysis.collection === 'b123' ? 100 : 250,
      additionalCost: '15-25% depending on customization'
    },
    paymentTerms: {
      standard: 'Net 30',
      earlyPaymentDiscount: 2,
      creditTerms: 'Available for qualified businesses'
    }
  };

  // Create full product object
  const product: Product = {
    // Basic Information
    id: analysis.id,
    sku: `PH-${analysis.collection.toUpperCase()}-${analysis.id.split('-')[1]}`,
    name: analysis.name,
    shortName: analysis.name.split(' ').slice(0, 2).join(' '),
    collection: analysis.collection,
    
    // Content
    description: analysis.description,
    shortDescription: analysis.description.split('.')[0] + '.',
    longDescription: symbolInfo ? generateProductStory(primarySymbolKey, analysis.name) : analysis.pharaonicStory,
    features: analysis.designElements,
    benefits: [
      'Superior travel comfort',
      'Authentic Egyptian design',
      'Premium memory foam support',
      'Cultural significance',
      'Durable construction'
    ],
    
    // Visual & Image SEO
    images: [{
      id: `${analysis.id}-primary`,
      url: analysis.imagePath,
      alt: getProductImageSeo(analysis.imagePath).altEn,
      isPrimary: true,
      order: 1,
      dimensions: { width: 800, height: 600 }
    }],
    primaryImage: analysis.imagePath,
    
    // Egyptian Heritage
    pharaonicDesign: {
      primarySymbols: symbolInfo ? [symbolInfo] : [],
      secondarySymbols: analysis.egyptianSymbols.slice(1),
      colorMeaning: analysis.colorPalette.reduce((acc, color, index) => {
        acc[color] = `Represents ${['divinity', 'protection', 'wisdom', 'purity'][index] || 'harmony'}`;
        return acc;
      }, {} as Record<string, string>),
      designInspiration: analysis.pharaonicStory,
      historicalPeriod: symbolInfo?.historicalContext.includes('Dynasty') ? 
        symbolInfo.historicalContext.match(/\d+.*?BCE/)?.[0] || 'Ancient Egypt' : 'Ancient Egypt',
      culturalAuthenticity: {
        researchSources: ['Egyptian Museum Cairo', 'Metropolitan Museum of Art', 'British Museum'],
        expertValidation: true,
        museumCollaboration: analysis.collection === 'b123' ? 'Egyptian Museum Cairo' : null
      },
      spiritualAspects: {
        energyProperties: symbolInfo?.protectivePowers || ['Protection', 'Comfort', 'Peace'],
        meditativeQualities: ['Calming', 'Centering', 'Grounding']
      }
    },
    culturalStory: analysis.pharaonicStory,
    symbolMeaning: symbolInfo?.meaning || 'Ancient Egyptian wisdom and protection',
    historicalConnection: symbolInfo?.historicalContext || 'Connected to ancient Egyptian civilization',
    
    // Technical
    specifications,
    designElements: analysis.designElements,
    colorPalette: analysis.colorPalette,
    
    // Business
    pricing: {
      retail: {
        min: analysis.priceRange.min,
        max: analysis.priceRange.max,
        currency: analysis.priceRange.currency
      },
      wholesale: wholesaleInfo.bulkPricing
    },
    wholesaleInfo,
    
    // Marketing
    targetAudience: analysis.targetAudience,
    useCases: [
      'Air travel comfort',
      'Road trip support',
      'Office napping',
      'Meditation aid',
      'Cultural gift giving'
    ],
    competitiveAdvantages: [
      'Authentic Egyptian design',
      'Premium comfort technology',
      'Cultural storytelling',
      'Wholesale availability',
      'Educational value'
    ],
    
    // SEO & Discovery (Powered by Product Image SEO Engine)
    seo: {
      primaryKeywords: analysis.seoKeywords,
      secondaryKeywords: {
        english: ['travel pillow', 'memory foam', 'egyptian design', 'comfort pillow', 'YKP Supplies'],
        arabic: ['مخدة سفر', 'رغوة الذاكرة', 'تصميم مصري', 'مخدة راحة', 'YKP Supplies']
      },
      metaTitle: `${getProductImageSeo(analysis.imagePath).titleEn} | YKP Supplies`,
      metaDescription: getProductImageSeo(analysis.imagePath).seoDescriptionEn,
      altText: getProductImageSeo(analysis.imagePath).altEn,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: getProductImageSeo(analysis.imagePath).titleEn,
        description: getProductImageSeo(analysis.imagePath).seoDescriptionEn,
        brand: 'YKP Supplies',
        category: 'Travel Accessories',
        sku: `PH-${analysis.collection.toUpperCase()}-${analysis.id.split('-')[1]}`,
        ...(getProductBarcode(analysis.id) && { gtin: getProductBarcode(analysis.id) }),
        image: [analysis.imagePath],
        offers: {
          '@type': 'Offer',
          price: analysis.priceRange.min.toString(),
          priceCurrency: analysis.priceRange.currency,
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'YKP Supplies'
          }
        }
      },
      contentOptimization: {
        keywordDensity: 2.8,
        readabilityScore: 88,
        semanticKeywords: [...analysis.egyptianSymbols, ...analysis.designElements, 'YKP Supplies']
      }
    },
    tags: [...analysis.egyptianSymbols, ...analysis.designElements, analysis.collection],
    categories: ['Travel Pillows', 'Egyptian Design', 'Memory Foam', `${analysis.collection.toUpperCase()} Collection`],
    
    // Inventory & Fulfillment
    availability: {
      inStock: true,
      quantity: Math.floor(Math.random() * 100) + 50, // Simulated inventory
      backorderAvailable: true,
      estimatedShipDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    
    // Metadata
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active',
    featured: analysis.id.includes('001') || analysis.id.includes('002'),
    bestseller: analysis.collection === 't' && analysis.id.includes('001'),
    newArrival: false
  };

  return product;
};

// Generate all products
const generateAllProducts = () => {
  const allAnalyzed = getAllProducts();
  return allAnalyzed.map(convertToProduct);
};

// Generate products by collection
const generateB123Products = () => B123_PRODUCTS.map(convertToProduct);
const generateTProducts = () => T_PRODUCTS.map(convertToProduct);
const generateTBProducts = () => TB_PRODUCTS.map(convertToProduct);

// Export generated products
export const GENERATED_PRODUCTS = {
  all: generateAllProducts(),
  b123: generateB123Products(),
  t: generateTProducts(),
  tb: generateTBProducts()
};

// Collection definitions
export const PRODUCT_COLLECTIONS: Record<string, ProductCollection> = {
  b123: {
    id: 'b123',
    name: 'Premium Collection (B123)',
    shortName: 'Premium',
    description: 'Luxurious Egyptian travel pillows inspired by royal pharaonic treasures',
    longDescription: 'Our Premium Collection represents the pinnacle of Egyptian-inspired travel comfort. Each pillow is meticulously crafted with premium memory foam and adorned with authentic pharaonic designs inspired by the treasures of ancient Egyptian royalty.',
    totalProducts: GENERATED_PRODUCTS.b123.length,
    priceRange: { min: 70, max: 95, currency: 'USD' },
    targetMarket: 'Luxury travelers, business executives, premium gift market',
    keyFeatures: [
      'Premium memory foam core',
      'Egyptian cotton covers',
      'Royal pharaonic patterns',
      'Gold accent details',
      'Luxury packaging'
    ],
    uniqueSellingPoints: [
      'Inspired by actual pharaonic treasures',
      'Premium materials and craftsmanship',
      'Limited edition designs',
      'Luxury travel experience'
    ],
    wholesaleInfo: GENERATED_PRODUCTS.b123[0]?.wholesaleInfo || {} as WholesaleInfo,
    collectionStory: 'Inspired by the golden treasures of pharaohs, this collection brings royal luxury to modern travel.',
    designPhilosophy: 'Every design element reflects the grandeur and sophistication of ancient Egyptian royalty.',
    culturalBackground: 'Based on artifacts from the tombs of Tutankhamun, Nefertiti, and other legendary pharaohs.'
  },
  t: {
    id: 't',
    name: 'Classic Collection (T)',
    shortName: 'Classic',
    description: 'Traditional Egyptian designs offering reliable comfort at accessible prices',
    longDescription: 'The Classic Collection brings timeless Egyptian symbols and traditional designs to everyday travelers. Perfect for cultural enthusiasts and anyone seeking authentic Egyptian heritage.',
    totalProducts: GENERATED_PRODUCTS.t.length,
    priceRange: { min: 25, max: 45, currency: 'USD' },
    targetMarket: 'Budget-conscious travelers, students, cultural tourists',
    keyFeatures: [
      'Standard memory foam comfort',
      'Cotton blend covers',
      'Traditional Egyptian patterns',
      'Authentic cultural symbols'
    ],
    uniqueSellingPoints: [
      'Authentic traditional designs',
      'Excellent value for money',
      'Educational cultural content',
      'Durable everyday comfort'
    ],
    wholesaleInfo: GENERATED_PRODUCTS.t[0]?.wholesaleInfo || {} as WholesaleInfo,
    collectionStory: 'Celebrating the enduring symbols that have represented Egyptian culture for millennia.',
    designPhilosophy: 'Authentic cultural symbols made accessible to every traveler.',
    culturalBackground: 'Features the most beloved and recognizable symbols of ancient Egypt.'
  },
  tb: {
    id: 'tb',
    name: 'Heritage Collection (TB)',
    shortName: 'Heritage',
    description: 'Ancient Egyptian symbols and hieroglyphs for cultural authenticity',
    longDescription: 'The Heritage Collection celebrates the rich symbolic language of ancient Egypt through carefully researched designs featuring authentic hieroglyphs and sacred symbols.',
    totalProducts: GENERATED_PRODUCTS.tb.length,
    priceRange: { min: 35, max: 65, currency: 'USD' },
    targetMarket: 'Cultural enthusiasts, educators, symbol collectors',
    keyFeatures: [
      'Heritage foam technology',
      'Cultural fabric blends',
      'Authentic hieroglyphic patterns',
      'Sacred symbol designs'
    ],
    uniqueSellingPoints: [
      'Largest collection of Egyptian symbols',
      'Authentic hieroglyphic designs',
      'Educational and cultural value',
      'Perfect for museums and cultural centers'
    ],
    wholesaleInfo: GENERATED_PRODUCTS.tb[0]?.wholesaleInfo || {} as WholesaleInfo,
    collectionStory: 'Preserving the wisdom and beauty of ancient Egyptian symbolic language.',
    designPhilosophy: 'Each symbol tells a story of ancient wisdom and spiritual power.',
    culturalBackground: 'Based on hieroglyphic inscriptions from temples, tombs, and papyri.'
  }
};

export default {
  GENERATED_PRODUCTS,
  PRODUCT_COLLECTIONS,
  convertToProduct
};
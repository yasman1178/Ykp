// Product Image Analysis and Categorization System
// Analyzes existing product images and generates detailed descriptions

export interface ProductAnalysis {
  id: string;
  collection: 'b123' | 't' | 'tb';
  imagePath: string;
  name: string;
  description: string;
  designElements: string[];
  egyptianSymbols: string[];
  colorPalette: string[];
  targetAudience: string[];
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  specifications: {
    dimensions: string;
    material: string;
    firmness: string;
    weight: string;
  };
  seoKeywords: {
    english: string[];
    arabic: string[];
  };
  pharaonicStory: string;
}

// Premium Collection (B123) - Luxury Egyptian Designs
export const B123_PRODUCTS: ProductAnalysis[] = [
  {
    id: 'b123-001',
    collection: 'b123',
    imagePath: '/prodect/b123/1.webp',
    name: 'Golden Pharaoh Memory Pillow',
    description: 'Luxurious travel pillow featuring intricate golden pharaonic patterns inspired by King Tutankhamun\'s treasures. Premium memory foam core provides exceptional comfort.',
    designElements: ['Golden accents', 'Royal patterns', 'Hieroglyphic borders', 'Premium fabric'],
    egyptianSymbols: ['Pharaoh crown', 'Ankh symbol', 'Eye of Horus', 'Sacred scarab'],
    colorPalette: ['Royal gold', 'Deep blue', 'Ivory white', 'Bronze accents'],
    targetAudience: ['Luxury travelers', 'Business executives', 'Cultural enthusiasts', 'Premium gift buyers'],
    priceRange: { min: 75, max: 85, currency: 'USD' },
    specifications: {
      dimensions: '12" x 8" x 4"',
      material: 'Premium memory foam with Egyptian cotton cover',
      firmness: 'Medium-firm',
      weight: '1.2 lbs'
    },
    seoKeywords: {
      english: ['luxury travel pillow', 'pharaoh design', 'memory foam', 'egyptian gold', 'premium comfort'],
      arabic: ['مخدة سفر فاخرة', 'تصميم فرعوني', 'رغوة الذاكرة', 'ذهبي مصري', 'راحة فائقة']
    },
    pharaonicStory: 'Inspired by the golden treasures found in Tutankhamun\'s tomb, this pillow embodies the luxury and grandeur of ancient Egyptian royalty. The intricate patterns mirror the sacred geometry found in pharaonic art.'
  },
  {
    id: 'b123-002',
    collection: 'b123',
    imagePath: '/prodect/b123/2.webp',
    name: 'Royal Nefertiti Comfort Pillow',
    description: 'Elegant travel pillow celebrating the beauty of Queen Nefertiti with sophisticated Egyptian motifs and premium comfort technology.',
    designElements: ['Queen silhouette', 'Elegant curves', 'Royal blue accents', 'Gold threading'],
    egyptianSymbols: ['Nefertiti profile', 'Lotus flower', 'Royal cartouche', 'Divine crown'],
    colorPalette: ['Royal blue', 'Antique gold', 'Pearl white', 'Silver highlights'],
    targetAudience: ['Female executives', 'Art lovers', 'Luxury travelers', 'History enthusiasts'],
    priceRange: { min: 70, max: 80, currency: 'USD' },
    specifications: {
      dimensions: '12" x 8" x 4"',
      material: 'Memory foam with silk-blend Egyptian cotton',
      firmness: 'Medium',
      weight: '1.1 lbs'
    },
    seoKeywords: {
      english: ['nefertiti pillow', 'queen design', 'luxury travel', 'egyptian art', 'premium memory foam'],
      arabic: ['مخدة نفرتيتي', 'تصميم ملكة', 'سفر فاخر', 'فن مصري', 'رغوة ذاكرة فائقة']
    },
    pharaonicStory: 'Queen Nefertiti, whose name means "the beautiful one has come," represents timeless elegance and power. This pillow captures her grace and the artistic mastery of the Amarna period.'
  },
  {
    id: 'b123-003',
    collection: 'b123',
    imagePath: '/prodect/b123/3.webp',
    name: 'Sacred Pyramid Energy Pillow',
    description: 'Premium travel pillow featuring pyramid geometry and sacred Egyptian symbols, designed to channel positive energy during travel.',
    designElements: ['Pyramid patterns', 'Sacred geometry', 'Energy lines', 'Mystical symbols'],
    egyptianSymbols: ['Great Pyramid', 'All-seeing eye', 'Sacred geometry', 'Energy spirals'],
    colorPalette: ['Desert gold', 'Pyramid stone', 'Mystical purple', 'Ancient bronze'],
    targetAudience: ['Spiritual travelers', 'Wellness enthusiasts', 'Meditation practitioners', 'Energy healers'],
    priceRange: { min: 80, max: 90, currency: 'USD' },
    specifications: {
      dimensions: '12" x 8" x 4"',
      material: 'Therapeutic memory foam with energy-infused fabric',
      firmness: 'Medium-firm',
      weight: '1.3 lbs'
    },
    seoKeywords: {
      english: ['pyramid pillow', 'energy healing', 'sacred geometry', 'spiritual travel', 'wellness pillow'],
      arabic: ['مخدة هرمية', 'شفاء بالطاقة', 'هندسة مقدسة', 'سفر روحي', 'مخدة عافية']
    },
    pharaonicStory: 'The Great Pyramid of Giza has fascinated humanity for millennia. This pillow incorporates the pyramid\'s sacred proportions and energy-focusing properties for restorative sleep.'
  }
  // Additional B123 products would continue here...
];

// Classic Collection (T) - Traditional Egyptian Comfort
export const T_PRODUCTS: ProductAnalysis[] = [
  {
    id: 't-001',
    collection: 't',
    imagePath: '/prodect/t/1.webp',
    name: 'Classic Ankh Travel Pillow',
    description: 'Traditional Egyptian travel pillow featuring the timeless Ankh symbol, offering reliable comfort with authentic Egyptian design.',
    designElements: ['Ankh symbol', 'Traditional patterns', 'Classic colors', 'Timeless design'],
    egyptianSymbols: ['Ankh (eternal life)', 'Papyrus scrolls', 'Traditional borders', 'Life symbols'],
    colorPalette: ['Classic gold', 'Traditional blue', 'Papyrus beige', 'Earth brown'],
    targetAudience: ['Budget-conscious travelers', 'Students', 'Cultural tourists', 'Gift buyers'],
    priceRange: { min: 35, max: 45, currency: 'USD' },
    specifications: {
      dimensions: '11" x 7" x 3.5"',
      material: 'Standard memory foam with cotton blend cover',
      firmness: 'Medium',
      weight: '0.9 lbs'
    },
    seoKeywords: {
      english: ['ankh pillow', 'egyptian travel', 'classic design', 'affordable comfort', 'traditional symbols'],
      arabic: ['مخدة عنخ', 'سفر مصري', 'تصميم كلاسيكي', 'راحة معقولة', 'رموز تقليدية']
    },
    pharaonicStory: 'The Ankh, symbol of eternal life, was carried by Egyptian gods and pharaohs. This classic design brings the protective power of this ancient symbol to modern travelers.'
  },
  {
    id: 't-002',
    collection: 't',
    imagePath: '/prodect/t/2.webp',
    name: 'Traditional Scarab Comfort Pillow',
    description: 'Comfortable travel pillow adorned with the protective scarab beetle design, symbolizing renewal and protection during journeys.',
    designElements: ['Scarab beetle', 'Protection symbols', 'Traditional weaving', 'Classic comfort'],
    egyptianSymbols: ['Sacred scarab', 'Sun disk', 'Protection amulets', 'Renewal symbols'],
    colorPalette: ['Beetle green', 'Sun gold', 'Desert sand', 'Protection blue'],
    targetAudience: ['Adventure travelers', 'Nature lovers', 'Protection seekers', 'Symbol enthusiasts'],
    priceRange: { min: 30, max: 40, currency: 'USD' },
    specifications: {
      dimensions: '11" x 7" x 3.5"',
      material: 'Comfort foam with durable fabric cover',
      firmness: 'Medium-soft',
      weight: '0.8 lbs'
    },
    seoKeywords: {
      english: ['scarab pillow', 'protection travel', 'beetle design', 'egyptian comfort', 'renewal symbol'],
      arabic: ['مخدة جعران', 'سفر حماية', 'تصميم خنفساء', 'راحة مصرية', 'رمز التجديد']
    },
    pharaonicStory: 'The scarab beetle was sacred to ancient Egyptians, representing the sun god Ra and the cycle of life. This pillow carries the protective energy of this powerful symbol.'
  }
  // Additional T products would continue here...
];

// Heritage Collection (TB) - Ancient Symbols & Modern Comfort
export const TB_PRODUCTS: ProductAnalysis[] = [
  {
    id: 'tb-001',
    collection: 'tb',
    imagePath: '/prodect/tb/1.webp',
    name: 'Eye of Horus Protection Pillow',
    description: 'Heritage travel pillow featuring the powerful Eye of Horus symbol, offering protection and healing energy for travelers.',
    designElements: ['Eye of Horus', 'Protective patterns', 'Ancient symbols', 'Healing colors'],
    egyptianSymbols: ['Eye of Horus', 'Protective wadjet', 'Healing symbols', 'Divine eye'],
    colorPalette: ['Protective blue', 'Healing gold', 'Ancient white', 'Sacred black'],
    targetAudience: ['Spiritual seekers', 'Healing practitioners', 'Symbol collectors', 'Protection seekers'],
    priceRange: { min: 50, max: 65, currency: 'USD' },
    specifications: {
      dimensions: '11.5" x 7.5" x 3.8"',
      material: 'Therapeutic foam with heritage fabric blend',
      firmness: 'Medium',
      weight: '1.0 lbs'
    },
    seoKeywords: {
      english: ['eye of horus pillow', 'protection travel', 'healing pillow', 'egyptian heritage', 'spiritual comfort'],
      arabic: ['مخدة عين حورس', 'سفر حماية', 'مخدة شفاء', 'تراث مصري', 'راحة روحية']
    },
    pharaonicStory: 'The Eye of Horus, or Wadjet, was the most powerful protective symbol in ancient Egypt. It represents healing, protection, and royal power, watching over travelers on their journeys.'
  },
  {
    id: 'tb-002',
    collection: 'tb',
    imagePath: '/prodect/tb/2.webp',
    name: 'Hieroglyphic Wisdom Pillow',
    description: 'Authentic heritage pillow decorated with ancient hieroglyphic inscriptions, bringing the wisdom of the pharaohs to modern travel.',
    designElements: ['Hieroglyphic text', 'Ancient script', 'Wisdom symbols', 'Scholar patterns'],
    egyptianSymbols: ['Sacred hieroglyphs', 'Wisdom symbols', 'Scribe tools', 'Knowledge signs'],
    colorPalette: ['Papyrus cream', 'Ink black', 'Scholar gold', 'Wisdom blue'],
    targetAudience: ['Scholars', 'Language enthusiasts', 'History teachers', 'Cultural travelers'],
    priceRange: { min: 45, max: 60, currency: 'USD' },
    specifications: {
      dimensions: '11.5" x 7.5" x 3.8"',
      material: 'Educational foam with authentic pattern fabric',
      firmness: 'Medium-firm',
      weight: '1.1 lbs'
    },
    seoKeywords: {
      english: ['hieroglyphic pillow', 'ancient writing', 'egyptian wisdom', 'scholar travel', 'heritage comfort'],
      arabic: ['مخدة هيروغليفية', 'كتابة قديمة', 'حكمة مصرية', 'سفر علمي', 'راحة تراثية']
    },
    pharaonicStory: 'Hieroglyphs were the sacred writing of ancient Egypt, used to record the wisdom of pharaohs and gods. This pillow carries inscriptions of protection and safe travels.'
  }
  // Additional TB products would continue here...
];

// Analysis Functions
export const analyzeProductCollection = (collection: 'b123' | 't' | 'tb'): ProductAnalysis[] => {
  switch (collection) {
    case 'b123':
      return B123_PRODUCTS;
    case 't':
      return T_PRODUCTS;
    case 'tb':
      return TB_PRODUCTS;
    default:
      return [];
  }
};

export const getAllProducts = (): ProductAnalysis[] => {
  return [...B123_PRODUCTS, ...T_PRODUCTS, ...TB_PRODUCTS];
};

export const getProductById = (id: string): ProductAnalysis | undefined => {
  return getAllProducts().find(product => product.id === id);
};

export const getProductsByCollection = (collection: 'b123' | 't' | 'tb'): ProductAnalysis[] => {
  return getAllProducts().filter(product => product.collection === collection);
};

export const searchProducts = (query: string): ProductAnalysis[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllProducts().filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.egyptianSymbols.some(symbol => symbol.toLowerCase().includes(lowercaseQuery)) ||
    product.seoKeywords.english.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
    product.seoKeywords.arabic.some(keyword => keyword.includes(query))
  );
};

// Collection Metadata
export const COLLECTION_INFO = {
  b123: {
    name: 'Premium Collection (B123)',
    description: 'Luxurious Egyptian travel pillows inspired by royal pharaonic treasures',
    totalProducts: 23,
    priceRange: { min: 70, max: 90, currency: 'USD' },
    targetMarket: 'Luxury travelers and premium gift market',
    keyFeatures: ['Premium memory foam', 'Royal Egyptian patterns', 'Luxury materials', 'Gold accents']
  },
  t: {
    name: 'Classic Collection (T)',
    description: 'Traditional Egyptian designs offering reliable comfort at accessible prices',
    totalProducts: 21,
    priceRange: { min: 25, max: 45, currency: 'USD' },
    targetMarket: 'Budget-conscious travelers and cultural enthusiasts',
    keyFeatures: ['Classic comfort', 'Traditional designs', 'Affordable pricing', 'Durable construction']
  },
  tb: {
    name: 'Heritage Collection (TB)',
    description: 'Ancient Egyptian symbols and hieroglyphs for cultural authenticity',
    totalProducts: 36,
    priceRange: { min: 35, max: 65, currency: 'USD' },
    targetMarket: 'Cultural tourists and symbol enthusiasts',
    keyFeatures: ['Heritage patterns', 'Cultural authenticity', 'Symbolic designs', 'Educational value']
  }
};

export default {
  analyzeProductCollection,
  getAllProducts,
  getProductById,
  getProductsByCollection,
  searchProducts,
  COLLECTION_INFO,
  B123_PRODUCTS,
  T_PRODUCTS,
  TB_PRODUCTS
};

// Additional B123 Premium Products
const ADDITIONAL_B123_PRODUCTS: ProductAnalysis[] = [
  {
    id: 'b123-004',
    collection: 'b123',
    imagePath: '/prodect/b123/4.webp',
    name: 'Cleopatra Royal Comfort Pillow',
    description: 'Luxurious pillow inspired by the legendary Queen Cleopatra, featuring serpent motifs and royal Egyptian elegance.',
    designElements: ['Serpent patterns', 'Royal crown', 'Golden asp', 'Regal fabrics'],
    egyptianSymbols: ['Royal asp', 'Crown of Egypt', 'Cleopatra cartouche', 'Divine serpent'],
    colorPalette: ['Royal purple', 'Cleopatra gold', 'Serpent green', 'Pearl white'],
    targetAudience: ['Luxury female travelers', 'History enthusiasts', 'Royal experience seekers', 'Premium collectors'],
    priceRange: { min: 85, max: 95, currency: 'USD' },
    specifications: {
      dimensions: '12" x 8" x 4"',
      material: 'Premium memory foam with silk Egyptian cotton',
      firmness: 'Plush-medium',
      weight: '1.2 lbs'
    },
    seoKeywords: {
      english: ['cleopatra pillow', 'royal comfort', 'luxury egyptian', 'queen design', 'premium travel'],
      arabic: ['مخدة كليوباترا', 'راحة ملكية', 'فخامة مصرية', 'تصميم ملكة', 'سفر فاخر']
    },
    pharaonicStory: 'Cleopatra VII, the last pharaoh of Egypt, was renowned for her intelligence, beauty, and political acumen. This pillow embodies her legendary luxury and sophistication.'
  },
  {
    id: 'b123-005',
    collection: 'b123',
    imagePath: '/prodect/b123/5.webp',
    name: 'Anubis Guardian Travel Pillow',
    description: 'Premium travel pillow featuring Anubis, the guardian of the afterlife, providing protection and peaceful rest during journeys.',
    designElements: ['Anubis silhouette', 'Guardian patterns', 'Protective symbols', 'Afterlife motifs'],
    egyptianSymbols: ['Anubis jackal', 'Scales of justice', 'Protective amulets', 'Guardian spirits'],
    colorPalette: ['Guardian black', 'Divine gold', 'Protective silver', 'Mystical blue'],
    targetAudience: ['Spiritual travelers', 'Protection seekers', 'Mythology enthusiasts', 'Premium comfort seekers'],
    priceRange: { min: 75, max: 85, currency: 'USD' },
    specifications: {
      dimensions: '12" x 8" x 4"',
      material: 'Guardian-grade memory foam with protective fabric',
      firmness: 'Medium-firm',
      weight: '1.3 lbs'
    },
    seoKeywords: {
      english: ['anubis pillow', 'guardian travel', 'protection pillow', 'egyptian mythology', 'spiritual comfort'],
      arabic: ['مخدة أنوبيس', 'سفر حارس', 'مخدة حماية', 'أساطير مصرية', 'راحة روحية']
    },
    pharaonicStory: 'Anubis, the jackal-headed god, was the guardian of the dead and guide to the afterlife. This pillow channels his protective energy for safe and peaceful travels.'
  }
];

// Additional T Classic Products
const ADDITIONAL_T_PRODUCTS: ProductAnalysis[] = [
  {
    id: 't-003',
    collection: 't',
    imagePath: '/prodect/t/3.webp',
    name: 'Lotus Flower Serenity Pillow',
    description: 'Classic travel pillow featuring the sacred lotus flower, symbol of rebirth and purity in ancient Egyptian culture.',
    designElements: ['Lotus petals', 'Water patterns', 'Serenity colors', 'Natural motifs'],
    egyptianSymbols: ['Sacred lotus', 'Water lily', 'Rebirth symbols', 'Purity signs'],
    colorPalette: ['Lotus pink', 'Water blue', 'Petal white', 'Stem green'],
    targetAudience: ['Wellness travelers', 'Nature enthusiasts', 'Meditation practitioners', 'Peaceful journey seekers'],
    priceRange: { min: 32, max: 42, currency: 'USD' },
    specifications: {
      dimensions: '11" x 7" x 3.5"',
      material: 'Comfort foam with natural fiber cover',
      firmness: 'Soft-medium',
      weight: '0.8 lbs'
    },
    seoKeywords: {
      english: ['lotus pillow', 'serenity travel', 'flower design', 'peaceful comfort', 'natural symbols'],
      arabic: ['مخدة لوتس', 'سفر هدوء', 'تصميم زهرة', 'راحة سلمية', 'رموز طبيعية']
    },
    pharaonicStory: 'The lotus flower emerged from the primordial waters of creation in Egyptian mythology. It represents rebirth, purity, and the sun, bringing peaceful energy to travelers.'
  },
  {
    id: 't-004',
    collection: 't',
    imagePath: '/prodect/t/4.webp',
    name: 'Sphinx Wisdom Travel Pillow',
    description: 'Traditional pillow featuring the Great Sphinx, combining ancient wisdom with modern comfort for thoughtful travelers.',
    designElements: ['Sphinx profile', 'Wisdom symbols', 'Desert colors', 'Ancient mystery'],
    egyptianSymbols: ['Great Sphinx', 'Riddle symbols', 'Wisdom eye', 'Desert guardian'],
    colorPalette: ['Sphinx stone', 'Desert gold', 'Wisdom brown', 'Mystery gray'],
    targetAudience: ['Intellectual travelers', 'Puzzle enthusiasts', 'History students', 'Wisdom seekers'],
    priceRange: { min: 35, max: 45, currency: 'USD' },
    specifications: {
      dimensions: '11" x 7" x 3.5"',
      material: 'Thoughtful foam with wisdom-woven fabric',
      firmness: 'Medium',
      weight: '0.9 lbs'
    },
    seoKeywords: {
      english: ['sphinx pillow', 'wisdom travel', 'riddle comfort', 'ancient mystery', 'thoughtful design'],
      arabic: ['مخدة أبو الهول', 'سفر حكمة', 'راحة لغز', 'غموض قديم', 'تصميم مدروس']
    },
    pharaonicStory: 'The Great Sphinx of Giza has guarded the pyramids for millennia, posing riddles to travelers. This pillow embodies the sphinx\'s wisdom and protective presence.'
  }
];

// Additional TB Heritage Products
const ADDITIONAL_TB_PRODUCTS: ProductAnalysis[] = [
  {
    id: 'tb-003',
    collection: 'tb',
    imagePath: '/prodect/tb/3.webp',
    name: 'Pharaoh\'s Cartouche Heritage Pillow',
    description: 'Authentic heritage pillow featuring royal cartouches and pharaonic names, connecting travelers to ancient Egyptian royalty.',
    designElements: ['Royal cartouches', 'Pharaoh names', 'Royal seals', 'Dynasty symbols'],
    egyptianSymbols: ['Royal cartouche', 'Pharaoh names', 'Dynasty seals', 'Royal hieroglyphs'],
    colorPalette: ['Royal gold', 'Cartouche blue', 'Papyrus cream', 'Seal red'],
    targetAudience: ['Royal history fans', 'Genealogy enthusiasts', 'Cultural scholars', 'Heritage collectors'],
    priceRange: { min: 48, max: 62, currency: 'USD' },
    specifications: {
      dimensions: '11.5" x 7.5" x 3.8"',
      material: 'Heritage foam with royal pattern fabric',
      firmness: 'Medium',
      weight: '1.0 lbs'
    },
    seoKeywords: {
      english: ['cartouche pillow', 'pharaoh names', 'royal heritage', 'dynasty comfort', 'egyptian royalty'],
      arabic: ['مخدة خرطوش', 'أسماء فراعنة', 'تراث ملكي', 'راحة أسرة', 'ملكية مصرية']
    },
    pharaonicStory: 'The cartouche was a protective oval enclosing the names of pharaohs, believed to protect the royal name for eternity. This pillow carries the power of royal protection.'
  },
  {
    id: 'tb-004',
    collection: 'tb',
    imagePath: '/prodect/tb/4.webp',
    name: 'Sacred Ibis Wisdom Pillow',
    description: 'Heritage pillow honoring Thoth, the ibis-headed god of wisdom and writing, perfect for scholarly travelers and knowledge seekers.',
    designElements: ['Ibis bird', 'Wisdom scrolls', 'Writing tools', 'Knowledge symbols'],
    egyptianSymbols: ['Sacred ibis', 'Thoth symbols', 'Writing reed', 'Wisdom scroll'],
    colorPalette: ['Ibis white', 'Wisdom gold', 'Scroll brown', 'Knowledge blue'],
    targetAudience: ['Scholars', 'Writers', 'Students', 'Knowledge workers'],
    priceRange: { min: 42, max: 58, currency: 'USD' },
    specifications: {
      dimensions: '11.5" x 7.5" x 3.8"',
      material: 'Scholarly foam with wisdom-infused fabric',
      firmness: 'Medium-firm',
      weight: '1.1 lbs'
    },
    seoKeywords: {
      english: ['ibis pillow', 'thoth wisdom', 'scholar travel', 'writing comfort', 'knowledge pillow'],
      arabic: ['مخدة أبو منجل', 'حكمة تحوت', 'سفر عالم', 'راحة كتابة', 'مخدة معرفة']
    },
    pharaonicStory: 'Thoth, the ibis-headed god, was the divine scribe and keeper of wisdom. He invented writing and recorded the deeds of the dead. This pillow channels his scholarly energy.'
  }
];

// Update the main product arrays
B123_PRODUCTS.push(...ADDITIONAL_B123_PRODUCTS);
T_PRODUCTS.push(...ADDITIONAL_T_PRODUCTS);
TB_PRODUCTS.push(...ADDITIONAL_TB_PRODUCTS);

// Update collection info with accurate counts
COLLECTION_INFO.b123.totalProducts = B123_PRODUCTS.length;
COLLECTION_INFO.t.totalProducts = T_PRODUCTS.length;
COLLECTION_INFO.tb.totalProducts = TB_PRODUCTS.length;

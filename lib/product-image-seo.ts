/**
 * Product Image SEO & Semantic Enrichment Engine
 * YKP Supplies - Egyptian Travel Pillows Manufacturer
 * 
 * Generates keyword-rich Alt Text, bilingual SEO descriptions,
 * cultural heritage stories, and Schema.org ImageObject metadata
 * for every product image across all collections.
 */

export interface ProductImageSeoData {
  imagePath: string;
  collectionId: 'royal' | 'sacred' | 'heritage' | 'custom';
  collectionNameEn: string;
  collectionNameAr: string;
  modelCode: string;
  titleEn: string;
  titleAr: string;
  altEn: string;
  altAr: string;
  seoDescriptionEn: string;
  seoDescriptionAr: string;
  culturalStoryEn: string;
  culturalStoryAr: string;
  symbol: string;
  symbolAr: string;
  materialEn: string;
  materialAr: string;
  keywordsEn: string[];
  keywordsAr: string[];
  dimensions: string;
  weight: string;
  suitableFor: string[];
}

// Map collections to luxury names
export const LUXURY_COLLECTION_MAP = {
  b123: {
    id: 'royal',
    slug: 'royal',
    code: 'b123',
    nameEn: 'Royal Pharaonic Collection',
    nameAr: 'المجموعة الملكية الفرعونية',
    badgeEn: 'Royal Atelier Edition',
    badgeAr: 'إصدار القصور الملكية',
    taglineEn: 'Masterpieces of ancient Egyptian royalty meets orthopedic memory foam comfort.',
    taglineAr: 'روائع كنوز الفراعنة تلتقي براحة الميموري فوم الطبية لرحلات السفر الفاخرة.'
  },
  t: {
    id: 'sacred',
    slug: 'sacred',
    code: 't',
    nameEn: 'Sacred Symbols & Icons Collection',
    nameAr: 'مجموعة الرموز والمقدسات المصرية',
    badgeEn: 'Heritage Icons',
    badgeAr: 'أيقونات البركة والخلود',
    taglineEn: 'Timeless spiritual emblems: Ankh, Eye of Horus, and the Sacred Scarab.',
    taglineAr: 'رموز أثرية خالدة: مفتاح الحياة، عين حورس الحامية، وجعران البعث والبركة.'
  },
  tb: {
    id: 'heritage',
    slug: 'heritage',
    code: 'tb',
    nameEn: 'Ancient Heritage & Hieroglyphs Collection',
    nameAr: 'مجموعة النقوش والبرديات الأثرية',
    badgeEn: 'Papyrus & Inscriptions',
    badgeAr: 'نقوش المعابد والبرديات',
    taglineEn: 'Authentic temple carvings and ancient papyrus art woven into ergonomic travel pillows.',
    taglineAr: 'نقوش المعابد المصرية ورسومات البرديات الأصيلة منسوجة على مخدات سفر مريحة.'
  },
  print: {
    id: 'custom',
    slug: 'custom',
    code: 'print',
    nameEn: 'Custom & Corporate OEM Collection',
    nameAr: 'المجموعة المخصصة وتصنيع الفنادق والطيران',
    badgeEn: 'Bespoke / OEM',
    badgeAr: 'تصنيع مخصص للعلامات التجارية',
    taglineEn: 'Custom embroidered and printed travel pillows for airlines, luxury hotels, and private labels.',
    taglineAr: 'تصنيع خاص وتطريز فاخر لشركات الطيران، الفنادق العالمية، والعلامات التجارية الخاصة.'
  }
};

// Royal Pharaonic Collection (B123) - 23 Pillows
const ROYAL_PRODUCTS_SEO: Record<number, Partial<ProductImageSeoData>> = {
  1: {
    titleEn: 'Royal Tutankhamun Golden Nemes Memory Foam Pillow',
    titleAr: 'مخدة السفر الملكية بنقش قناع توت عنخ آمون الذهبي',
    symbol: 'King Tutankhamun Nemes Mask',
    symbolAr: 'قناع توت عنخ آمون الملكي',
    altEn: 'Ergonomic Egyptian memory foam travel pillow with golden Tutankhamun pharaonic pattern by YKP Supplies New Cairo',
    altAr: 'مخدة سفر طبية من رغوة الذاكرة بنقش توت عنخ آمون الذهبي صناعة مصرية من مصنع YKP Supplies',
    culturalStoryEn: 'Inspired by the 18th-Dynasty solid gold death mask of King Tutankhamun, this pillow reflects royal craftsmanship and protection on long voyages.',
    culturalStoryAr: 'مستوحاة من القناع الذهبي الخالص للملك توت عنخ آمون بالأسرة الثامنة عشرة، لتمنح المسافر فخامة ملكية وحماية مريحة للرقبة طوال الرحلة.',
    keywordsEn: ['Tutankhamun travel pillow', 'Egyptian memory foam pillow', 'wholesale travel pillows Egypt', 'pharaonic neck pillow', 'luxury flight pillow'],
    keywordsAr: ['مخدة توت عنخ آمون', 'مخدات سفر ميموري فوم', 'مصنع مخدات سفر مصر', 'مخدة رقبة فرعونية', 'شراء مخدة سفر جملة وتجزئة']
  },
  2: {
    titleEn: 'Queen Nefertiti Crown Jewel Travel Pillow',
    titleAr: 'مخدة السفر الملكية بنقش تاج الملكة نفرتيتي',
    symbol: 'Queen Nefertiti Blue Crown',
    symbolAr: 'تاج الملكة نفرتيتي الأزرق',
    altEn: 'Luxury memory foam travel pillow with blue Nefertiti crown Egyptian motif manufactured in Cairo by YKP Supplies',
    altAr: 'مخدة سفر فاخرة بنقش تاج الملكة نفرتيتي الأزرق مع ميموري فوم طبي من مصنع YKP بالقاهرة',
    culturalStoryEn: 'Honoring the legendary elegance of Queen Nefertiti, celebrated for timeless beauty, graceful posture, and royal tranquility.',
    culturalStoryAr: 'تكريماً لجمال وأناقة الملكة نفرتيتي، تمنحك هذه المخدة دعماً طبيعياً للفقرات العنقية مع لمسة فنية لا تفقد رونقها.',
    keywordsEn: ['Nefertiti travel pillow', 'Egyptian queen neck support', 'Cairo pillow manufacturer', 'wholesale memory foam pillows'],
    keywordsAr: ['مخدة نفرتيتي للسفر', 'مخدة سفر قطن مصري', 'مصنع مخدات القاهرة الجديدة', 'مخدات طبية جملة']
  },
  3: {
    titleEn: 'Winged Goddess Isis Protective Travel Pillow',
    titleAr: 'مخدة السفر الفرعونية بأجنحة إيزيس الحامية',
    symbol: 'Winged Isis',
    symbolAr: 'أجنحة إيزيس الحامية',
    altEn: 'Egyptian travel pillow featuring winged goddess Isis emblem on orthopedic memory foam by YKP Supplies',
    altAr: 'مخدة سفر ميموري فوم بنقش أجنحة إيزيس الحامية من مصنع مخدات السفر المصرية YKP',
    culturalStoryEn: 'Goddess Isis spreads her wings to protect wanderers across distant skies, symbolising unconditional safety, healing, and rest.',
    culturalStoryAr: 'رمز أجنحة إيزيس الممتدة لحماية المسافرين عبر الآفاق، تجسيداً للسلام والأمان والراحة الفائقة أثناء الطيران.',
    keywordsEn: ['Isis winged pillow', 'Egyptian travel cushion', 'orthopedic neck pillow flight', 'wholesale B2B pillows Egypt'],
    keywordsAr: ['مخدة أجنحة إيزيس', 'مخدة طيران طبية', 'موردي مخدات سفر', 'تصدير مخدات فرعونية']
  },
  4: {
    titleEn: 'Golden Falcon Horus Sun Disk Pillow',
    titleAr: 'مخدة سفر فرعونية بنقش صقر حورس وقرص الشمس',
    symbol: 'Falcon Horus with Solar Disk',
    symbolAr: 'صقر حورس وقرص الشمس',
    altEn: 'High density memory foam neck pillow with golden Horus falcon design for international travelers',
    altAr: 'مخدة رقبة ميموري فوم عالية الكثافة بنقش صقر حورس الذهبي للمسافرين حول العالم',
    culturalStoryEn: 'The celestial falcon soaring through ancient Egyptian skies, bringing clarity of vision and triumph to every traveler.',
    culturalStoryAr: 'صقر السماء حورس المحلق بحرية، رمز العزة وقوة التحمل والرؤية الثاقبة، يمنح رقبتك توازناً مثالياً في رحلاتك.',
    keywordsEn: ['Horus falcon pillow', 'flight neck cushion', 'Egyptian souvenir pillow', 'B2B travel pillow supplier'],
    keywordsAr: ['مخدة صقر حورس', 'مخدة سفر للطيارات', 'مستلزمات سفر فرعونية', 'مخدات جملة للتصدير']
  },
  5: {
    titleEn: 'Sacred Winged Scarab of Transformation Pillow',
    titleAr: 'مخدة سفر فرعونية بنقش الجعران المجنح المقدس',
    symbol: 'Winged Kheper Scarab',
    symbolAr: 'الجعران المجنح رمز التجدد',
    altEn: 'Memory foam travel pillow with sacred winged scarab hieroglyphic embroidery by YKP Supplies',
    altAr: 'مخدة سفر فرعونية ميموري فوم بتطريز الجعران المجنح رمز التجدد والبركة من YKP',
    culturalStoryEn: 'The scarab beetle Kheper represents dawn, renewal, and endless vitality, rejuvenating your energy upon arrival.',
    culturalStoryAr: 'رمز خفر (الجعران المجنح) يرمز للبعث والتجدد وطاقة الصباح، مصمم لتصل وجهتك بكامل طاقتك ونشاطك.',
    keywordsEn: ['scarab travel pillow', 'Egyptian heritage travel cushion', 'memory foam neck roll', 'wholesale Egyptian souvenirs'],
    keywordsAr: ['مخدة الجعران الفرعوني', 'مخدات سفر مريحة', 'مصنع مخدات مصرية', 'مخدات فنادق وطيران']
  }
};

// Sacred Symbols & Icons Collection (T) - Sample details
const SACRED_SYMBOLS_SEO: Record<number, Partial<ProductImageSeoData>> = {
  1: {
    titleEn: 'Eternal Ankh Key of Life Travel Pillow',
    titleAr: 'مخدة السفر بنقش مفتاح الحياة (عنخ) الخالد',
    symbol: 'Ankh (Key of Life)',
    symbolAr: 'مفتاح الحياة (عنخ)',
    altEn: 'Ergonomic neck support pillow with Ankh key of life Egyptian hieroglyphic pattern by YKP Supplies',
    altAr: 'مخدة رقبة طبية للسفر بنقش مفتاح الحياة عنخ الفرعوني الأصيل من YKP Supplies',
    culturalStoryEn: 'The Ankh is the universal Egyptian hieroglyph for life and breath, infusing deep restfulness into travel.',
    culturalStoryAr: 'مفتاح الحياة (عنخ) رمز الحياة الخالدة والتنفس المريح، مصمم هندسياً لتوفير نوم عميق ومريح خلال السفر.',
    keywordsEn: ['Ankh travel pillow', 'Key of Life neck cushion', 'Egyptian symbols pillow', 'wholesale memory foam Egypt'],
    keywordsAr: ['مخدة مفتاح الحياة', 'مخدة عنخ فرعونية', 'مخدة سفر مريحة', 'مخدات جملة للموزعين']
  },
  2: {
    titleEn: 'Mystic Eye of Horus Wedjat Protective Pillow',
    titleAr: 'مخدة السفر بتميمة عين حورس (الوجات) الواقية',
    symbol: 'Eye of Horus (Wedjat)',
    symbolAr: 'عين حورس (الوجات)',
    altEn: 'Viscoelastic travel neck pillow with Eye of Horus Egyptian protective amulet design by YKP Supplies',
    altAr: 'مخدة سفر طبية بنقش عين حورس الوجات الفرعونية للحماية والراحة من مصنع YKP',
    culturalStoryEn: 'The Wedjat eye represents wholeness, healing, and unbroken protection for long journeys across time zones.',
    culturalStoryAr: 'عين حورس الوجات رمز الشفاء والحماية التامة وسلامة الجسد، تدعم عضلات الرقبة والكتفين وتخفف إجهاد السفر.',
    keywordsEn: ['Eye of Horus pillow', 'Wedjat travel pillow', 'Egyptian neck pillow wholesale', 'ergonomic travel cushion'],
    keywordsAr: ['مخدة عين حورس', 'مخدة سفر طبية', 'مخدات سفر ميموري فوم مصرية', 'مستلزمات سفر فاخرة']
  },
  3: {
    titleEn: 'Solar Ra Disk and Cobra Uraeus Travel Pillow',
    titleAr: 'مخدة السفر بنقش قرص الشمس رع وحية الكوبرا الملكية',
    symbol: 'Ra Solar Disk with Uraeus',
    symbolAr: 'قرص الشمس رع مع الصل الملكي',
    altEn: 'Egyptian solar disk travel pillow with ergonomic cervical contouring by YKP Supplies Cairo',
    altAr: 'مخدة سفر ميموري فوم بنقش قرص الشمس رع الملكي لدعم فقرات الرقبة من YKP Supplies بالقاهرة',
    culturalStoryEn: 'Embodying the warmth and power of the sun god Ra, this pillow provides soothing cervical warmth and support.',
    culturalStoryAr: 'تجسد طاقة ودفء إله الشمس رع، وتوفر دعماً متوازناً يقلل تشنج عضلات الرقبة في الرحلات الطويلة.',
    keywordsEn: ['Ra sun disk pillow', 'cervical travel pillow', 'wholesale flight accessories', 'Egyptian travel pillow'],
    keywordsAr: ['مخدة قرص الشمس', 'مخدة فقرات الرقبة', 'مخدات سفر طبية جملة', 'مصنع مخدات القاهرة']
  }
};

// Papyrus & Hieroglyphs Collection (TB) - Sample details
const HERITAGE_SYMBOLS_SEO: Record<number, Partial<ProductImageSeoData>> = {
  1: {
    titleEn: 'Temple Cartouche & Sacred Glyphs Travel Pillow',
    titleAr: 'مخدة السفر بالخرطوشة الملكية ونقوش المعابد المصرية',
    symbol: 'Royal Cartouche & Glyphs',
    symbolAr: 'الخرطوشة الملكية والنقوش',
    altEn: 'Hieroglyphic inscription travel pillow with royal cartouche pattern by YKP Supplies New Cairo',
    altAr: 'مخدة سفر فرعونية بنقوش الخرطوشة الملكية والخط الهيروغليفي من YKP Supplies القاهرة الجديدة',
    culturalStoryEn: 'Carved with royal cartouche borders that once enclosed the immortal names of pharaohs, ensuring timeless durability.',
    culturalStoryAr: 'تتزين بإطار الخرطوشة الملكية التي كانت تحمي أسماء ملوك الفراعنة، منسوجة بألياف متينة ناعمة على البشرة.',
    keywordsEn: ['hieroglyph travel pillow', 'cartouche neck pillow', 'Egyptian papyrus cushion', 'B2B Egyptian souvenirs'],
    keywordsAr: ['مخدة نقوش فرعونية', 'مخدة الخرطوشة الملكية', 'مخدة سفر ميموري فوم', 'مخدات تراثية مصرية']
  },
  2: {
    titleEn: 'Book of the Dead Papyrus Scroll Motif Pillow',
    titleAr: 'مخدة السفر بنقش برديات الحكمة القديمة',
    symbol: 'Ancient Papyrus Inscriptions',
    symbolAr: 'برديات الحكمة والأسرار',
    altEn: 'Ancient Egyptian papyrus scroll print travel pillow with memory foam core manufactured in Egypt',
    altAr: 'مخدة سفر ميموري فوم بنقش برديات الفراعنة القديمة صناعة مصرية عالية الجودة',
    culturalStoryEn: 'Echoing the delicate artistry of Nile papyrus scrolls, combining cultural depth with modern travel comfort.',
    culturalStoryAr: 'مستوحاة من فن برديات وادي النيل الخالدة، تجمع بين عمق الحضارة المصرية وراحة السفر المعاصرة.',
    keywordsEn: ['papyrus travel pillow', 'Egyptian scroll neck pillow', 'flight comfort cushion Egypt', 'wholesale travel pillow factory'],
    keywordsAr: ['مخدة برديات فرعونية', 'مخدة سفر قطن ناعم', 'مخدات ميموري فوم للجملة', 'مستلزمات سفر مصرية']
  }
};

/**
 * Generate full SEO metadata for any image path in the application
 */
export function getProductImageSeo(imagePath: string): ProductImageSeoData {
  const normalized = imagePath.toLowerCase().trim();
  
  // 1. Check Royal (b123)
  if (normalized.includes('/b123/')) {
    const numMatch = normalized.match(/\/(\d+)\.(webp|jpg|png)/);
    const num = numMatch ? parseInt(numMatch[1], 10) : 1;
    const custom = ROYAL_PRODUCTS_SEO[num] || {};
    
    const fallbackTitleEn = `Royal Pharaonic Sovereign Memory Foam Travel Pillow Model #${num}`;
    const fallbackTitleAr = `مخدة السفر الملكية الفرعونية الفاخرة موديل رقم ${num}`;
    const fallbackSymbolEn = `Royal Dynasty Artifact Motif #${num}`;
    const fallbackSymbolAr = `نقش ملكي فرعوني أصيل #${num}`;

    return {
      imagePath,
      collectionId: 'royal',
      collectionNameEn: LUXURY_COLLECTION_MAP.b123.nameEn,
      collectionNameAr: LUXURY_COLLECTION_MAP.b123.nameAr,
      modelCode: `RYL-${String(num).padStart(3, '0')}`,
      titleEn: custom.titleEn || fallbackTitleEn,
      titleAr: custom.titleAr || fallbackTitleAr,
      altEn: custom.altEn || `Royal Egyptian memory foam travel pillow featuring ${custom.symbol || fallbackSymbolEn} by YKP Supplies New Cairo`,
      altAr: custom.altAr || `مخدة سفر طبية من الميموري فوم بنقش ${custom.symbolAr || fallbackSymbolAr} صناعة مصرية فاخرة من YKP Supplies`,
      seoDescriptionEn: `Engineered with high-density viscoelastic memory foam and upholstered in breathable Egyptian cotton blend, the ${custom.titleEn || fallbackTitleEn} delivers 360-degree cervical spinal alignment on flights, trains, and road journeys. Inspired by the golden treasures of ancient Egypt. Available for direct retail and wholesale B2B distribution worldwide.`,
      seoDescriptionAr: `صُنعت من رغوة الذاكرة (Memory Foam) الطبية عالية الكثافة مع غطاء خارجي من القطن المصري القابل للتنفس. توفر دعماً مثالياً لفقرات الرقبة وتمنع الإجهاد أثناء السفر بالطيران أو السيارة. مستوحاة من عظمة الحضارة المصرية ومتاحة للبيع المباشر للأفراد وللتوريد بالجملة للموزعين حول العالم.`,
      culturalStoryEn: custom.culturalStoryEn || `Inspired by ancient Egyptian royal regalia, symbolizing majesty, balance, and restorative rest on every journey.`,
      culturalStoryAr: custom.culturalStoryAr || `مستوحاة من الفنون الملكية بمصر القديمة التي جسدت السمو والراحة والسلام في كل تفاصيلها.`,
      symbol: custom.symbol || fallbackSymbolEn,
      symbolAr: custom.symbolAr || fallbackSymbolAr,
      materialEn: 'High-Density Viscoelastic Memory Foam Core + Washable Breathable Egyptian Cotton Velvet Cover',
      materialAr: 'حشوة ميموري فوم طبية عالية الكثافة + غطاء قابل للغسل من مزيج القطن المصري الفاخر',
      keywordsEn: custom.keywordsEn || ['Egyptian travel pillow', 'royal pharaonic pillow', 'memory foam neck support', 'wholesale travel pillows Egypt', 'YKP Supplies'],
      keywordsAr: custom.keywordsAr || ['مخدة سفر فرعونية', 'مخدة ميموري فوم ملكية', 'مخدات سفر جملة مصر', 'مصنع مخدات القاهرة الجديدة', 'مخدة رقبة طبية'],
      dimensions: '30 x 28 x 11 cm (11.8 x 11 x 4.3 in)',
      weight: '360g (12.7 oz)',
      suitableFor: ['Long-haul flights', 'Business executive travel', 'Road trips', 'Luxury cultural gifts', 'Hotel VIP amenities']
    };
  }

  // 2. Check Sacred Symbols (t)
  if (normalized.includes('/t/')) {
    const numMatch = normalized.match(/\/(\d+)\.(webp|jpg|png)/);
    const num = numMatch ? parseInt(numMatch[1], 10) : 1;
    const custom = SACRED_SYMBOLS_SEO[num] || {};

    const fallbackTitleEn = `Sacred Egyptian Symbol Travel Pillow Model #${num}`;
    const fallbackTitleAr = `مخدة السفر بالرموز المصرية المقدسة موديل رقم ${num}`;
    const fallbackSymbolEn = `Sacred Egyptian Amulet Emblem #${num}`;
    const fallbackSymbolAr = `رمز أثري فرعوني مبارك #${num}`;

    return {
      imagePath,
      collectionId: 'sacred',
      collectionNameEn: LUXURY_COLLECTION_MAP.t.nameEn,
      collectionNameAr: LUXURY_COLLECTION_MAP.t.nameAr,
      modelCode: `SCR-${String(num).padStart(3, '0')}`,
      titleEn: custom.titleEn || fallbackTitleEn,
      titleAr: custom.titleAr || fallbackTitleAr,
      altEn: custom.altEn || `Authentic Egyptian sacred symbol travel pillow with ergonomic neck contouring by YKP Supplies`,
      altAr: custom.altAr || `مخدة سفر ميموري فوم بنقش الرموز المصرية المقدسة لدعم الرقبة صناعة YKP Supplies`,
      seoDescriptionEn: `Experience ergonomic tranquility with the ${custom.titleEn || fallbackTitleEn}. Designed with orthopedic memory foam to relieve neck tension during travel, featuring sacred hieroglyphic symbols celebrating life, protection, and endurance. Manufactured in New Cairo by YKP Supplies for global export.`,
      seoDescriptionAr: `استمتع براحة استثنائية مع ${custom.titleAr || fallbackTitleAr}. مصممة برغوة الذاكرة لتخفيف الضغط على فقرات العنق أثناء السفر، ومزينة برموز فرعونية أصيلة تجسد الحماية والبركة. صُنعت بمصنع YKP بالقاهرة الجديدة للتصدير والبيع المباشر.`,
      culturalStoryEn: custom.culturalStoryEn || `Emblem of ancient Egyptian wisdom, believed to channel positive energy and protection to voyagers far from home.`,
      culturalStoryAr: custom.culturalStoryAr || `رمز أثري يمثل الحكمة المصرية القديمة والحماية للمسافرين عبر الطرق والمسافات.`,
      symbol: custom.symbol || fallbackSymbolEn,
      symbolAr: custom.symbolAr || fallbackSymbolAr,
      materialEn: 'Ergonomic Memory Foam Core + Soft Microfiber Egyptian Motif Cover',
      materialAr: 'رغوة ميموري فوم مريحة + غطاء مايكروفايبر ناعم بنقش مصري أصيل',
      keywordsEn: custom.keywordsEn || ['Sacred Egyptian pillow', 'Ankh pillow', 'Horus neck pillow', 'wholesale travel pillows', 'YKP Supplies'],
      keywordsAr: custom.keywordsAr || ['مخدة الرموز الفرعونية', 'مخدة عنخ وحورس', 'مخدة رقبة للسفر', 'مخدات سفر جملة وتجزئة'],
      dimensions: '29 x 27 x 10 cm (11.4 x 10.6 x 3.9 in)',
      weight: '320g (11.3 oz)',
      suitableFor: ['International travel', 'Students & cultural explorers', 'Daily train & car commute', 'Souvenirs & gifts']
    };
  }

  // 3. Check Heritage & Hieroglyphs (tb)
  if (normalized.includes('/tb/')) {
    const numMatch = normalized.match(/\/(\d+)\.(webp|jpg|png)/);
    const num = numMatch ? parseInt(numMatch[1], 10) : 1;
    const custom = HERITAGE_SYMBOLS_SEO[num] || {};

    const fallbackTitleEn = `Ancient Papyrus & Hieroglyphic Inscription Pillow Model #${num}`;
    const fallbackTitleAr = `مخدة السفر بنقوش البرديات والمعابد الفرعونية موديل #${num}`;
    const fallbackSymbolEn = `Hieroglyphic Cartouche & Relief #${num}`;
    const fallbackSymbolAr = `نقش هيروغليفي ونقوش جدارية #${num}`;

    return {
      imagePath,
      collectionId: 'heritage',
      collectionNameEn: LUXURY_COLLECTION_MAP.tb.nameEn,
      collectionNameAr: LUXURY_COLLECTION_MAP.tb.nameAr,
      modelCode: `HRT-${String(num).padStart(3, '0')}`,
      titleEn: custom.titleEn || fallbackTitleEn,
      titleAr: custom.titleAr || fallbackTitleAr,
      altEn: custom.altEn || `Egyptian hieroglyphic script travel pillow with memory foam comfort by YKP Supplies`,
      altAr: custom.altAr || `مخدة سفر طبية بنقوش الخط الهيروغليفي وبرديات المعابد من مصنع YKP Supplies`,
      seoDescriptionEn: `Featuring authentic temple wall hieroglyphic reliefs and Nile papyrus scripts, the ${custom.titleEn || fallbackTitleEn} blends cultural immersion with orthopedic support. Engineered with high-resilience memory foam for maximum flight rest.`,
      seoDescriptionAr: `تتميز بنقوش جدران المعابد الفرعونية وبرديات النيل الخالدة، لتمنحك مخدة ${custom.titleAr || fallbackTitleAr} اندماجاً ثقافياً مع دعم طبي متقدم. صممت برغوة مرنة لراحة فائقة في الرحلات الطويلة.`,
      culturalStoryEn: custom.culturalStoryEn || `Carved with stories and spells from the temple walls of Luxor and Karnak, celebrating human heritage through timeless art.`,
      culturalStoryAr: custom.culturalStoryAr || `مستوحاة من نصوص ونقوش معابد الأقصر والكرنك التي خلدت عظمة الإنسان والتاريخ المصري القديم.`,
      symbol: custom.symbol || fallbackSymbolEn,
      symbolAr: custom.symbolAr || fallbackSymbolAr,
      materialEn: 'Viscoelastic Memory Foam + Textured Jacquard Heritage Fabric',
      materialAr: 'ميموري فوم طبي مرن + قماش جاكار تراثي ناعم ومتين',
      keywordsEn: custom.keywordsEn || ['hieroglyphs travel pillow', 'papyrus travel pillow', 'Egyptian temple pillow', 'travel pillow factory Egypt'],
      keywordsAr: ['مخدة نقوش هيروغليفية', 'مخدة برديات فرعونية', 'مخدات سفر طبية', 'مستلزمات سفر فرعونية مصنعة في مصر'],
      dimensions: '30 x 28 x 10.5 cm (11.8 x 11 x 4.1 in)',
      weight: '340g (12 oz)',
      suitableFor: ['Long flights', 'Museum gift shops', 'Travelers seeking authentic heritage', 'Home relaxation']
    };
  }

  // 4. Check Print / Custom OEM
  const isPrint = normalized.includes('/print/');
  return {
    imagePath,
    collectionId: 'custom',
    collectionNameEn: LUXURY_COLLECTION_MAP.print.nameEn,
    collectionNameAr: LUXURY_COLLECTION_MAP.print.nameAr,
    modelCode: 'OEM-CUSTOM',
    titleEn: 'Custom Embroidered & Private Label Travel Pillow',
    titleAr: 'مخدة سفر فرعونية مخصصة للتصنيع بالعلامة التجارية الخاصة',
    altEn: 'Custom manufactured Egyptian travel pillow with private label embroidery by YKP Supplies New Cairo',
    altAr: 'مخدة سفر مصرية بتطريز خاص وتصنيع للعلامات التجارية والفنادق من مصنع YKP Supplies',
    seoDescriptionEn: 'Full-service OEM and private-label travel pillow manufacturing. Choose from authentic Egyptian Pharaonic motifs or custom hotel, airline, and brand embroidery with CertiPUR certified memory foam.',
    seoDescriptionAr: 'خدمة التصنيع الكامل للعلامات التجارية الخاصة (OEM). اختر من بين النقوش الفرعونية الأصيلة أو التطريز المخصص للفنادق وخطوط الطيران برغوة ميموري فوم معتمدة ومطابقة للمواصفات العالمية.',
    culturalStoryEn: 'Bespoke Egyptian craftsmanship tailored for luxury brands worldwide, marrying millennia of textile tradition with modern ergonomic science.',
    culturalStoryAr: 'صناعة مصرية مخصصة تجمع بين عراقة النسيج المصري وعلوم الراحة العصرية لخدمة كبرى العلامات التجارية.',
    symbol: 'Bespoke Brand & Pharaonic Emblems',
    symbolAr: 'تطريز مخصص ونقوش فرعونية حصرية',
    materialEn: 'Custom Memory Foam Density + Choice of Egyptian Cotton, Velvet, or Cooling Bamboo Covers',
    materialAr: 'كثافة ميموري فوم مخصصة + خيارات من القطن المصري أو المخمل أو نسيج البامبو البارد',
    keywordsEn: ['custom travel pillows', 'OEM pillow manufacturer', 'private label travel pillows Egypt', 'hotel travel pillows wholesale'],
    keywordsAr: ['تصنيع مخدات سفر للغير', 'مخدات فنادق وطيران', 'مصنع مخدات سفر خاص', 'تطريز مخدات سفر لوجو'],
    dimensions: 'Customizable / 30 x 28 x 11 cm',
    weight: 'Customizable (320g - 420g)',
    suitableFor: ['Airlines first & business class', 'Luxury hotel gift shops', 'Corporate incentive gifts', 'Private label brands']
  };
}

/**
 * Generate Schema.org ImageObject JSON-LD
 */
export function generateImageSchema(seoData: ProductImageSeoData, baseUrl: string = 'https://www.ykp-eg.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    'contentUrl': `${baseUrl}${seoData.imagePath}`,
    'name': seoData.titleEn,
    'description': seoData.seoDescriptionEn,
    'caption': seoData.altEn,
    'keywords': seoData.keywordsEn.join(', '),
    'creator': {
      '@type': 'Organization',
      'name': 'YKP Supplies',
      'url': baseUrl
    },
    'copyrightHolder': {
      '@type': 'Organization',
      'name': 'YKP Supplies'
    },
    'acquireLicensePage': `${baseUrl}/wholesale`
  };
}

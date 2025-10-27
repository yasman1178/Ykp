// Bilingual Support Utilities for Egyptian Cultural Content
// Handles Arabic cultural terms with English translations and pronunciation guides

export interface CulturalTerm {
  arabic: string;
  english: string;
  pronunciation: string;
  meaning: string;
  culturalContext: string;
  manufacturingRelevance?: string;
}

export interface BilingualGlossary {
  [key: string]: CulturalTerm;
}

// Comprehensive glossary of Egyptian cultural terms
export const EGYPTIAN_CULTURAL_GLOSSARY: BilingualGlossary = {
  'anubis': {
    arabic: 'أنوبيس',
    english: 'Anubis',
    pronunciation: 'ah-NOO-bis',
    meaning: 'Ancient Egyptian figure associated with protection and safe passage',
    culturalContext: 'Jackal-headed character from Egyptian mythology, revered as a guardian during journeys',
    manufacturingRelevance: 'Inspires protective travel pillow designs with cultural authenticity'
  },
  'wadjet': {
    arabic: 'واجت',
    english: 'Wadjet (Eye of Horus)',
    pronunciation: 'WAH-jet',
    meaning: 'Ancient protection symbol representing healing and restoration',
    culturalContext: 'Sacred eye symbol used for protection in ancient Egyptian culture',
    manufacturingRelevance: 'Featured in protective pillow designs for travel safety and comfort'
  },
  'ankh': {
    arabic: 'عنخ',
    english: 'Ankh',
    pronunciation: 'AHNK',
    meaning: 'Ancient symbol representing life and vitality',
    culturalContext: 'Key-shaped symbol associated with eternal life in Egyptian culture',
    manufacturingRelevance: 'Incorporated into wellness and comfort-focused pillow designs'
  },
  'khepri': {
    arabic: 'خبري',
    english: 'Khepri (Scarab)',
    pronunciation: 'KHEP-ree',
    meaning: 'Ancient symbol of renewal and transformation',
    culturalContext: 'Scarab beetle associated with daily renewal and protection',
    manufacturingRelevance: 'Inspires renewal-themed pillow collections for refreshing sleep'
  },
  'nefertiti': {
    arabic: 'نفرتيتي',
    english: 'Nefertiti',
    pronunciation: 'nef-er-TEE-tee',
    meaning: 'Ancient Egyptian queen known for beauty and elegance',
    culturalContext: 'Historical figure representing royal sophistication and grace',
    manufacturingRelevance: 'Influences premium luxury pillow designs with elegant aesthetics'
  },
  'horus': {
    arabic: 'حورس',
    english: 'Horus',
    pronunciation: 'HOR-us',
    meaning: 'Ancient Egyptian figure associated with protection and royal power',
    culturalContext: 'Falcon-headed character representing divine protection and leadership',
    manufacturingRelevance: 'Featured in premium protection-themed pillow collections'
  },
  'isis': {
    arabic: 'إيزيس',
    english: 'Isis',
    pronunciation: 'EYE-sis',
    meaning: 'Ancient Egyptian figure associated with healing and protection',
    culturalContext: 'Revered character known for protective and nurturing qualities',
    manufacturingRelevance: 'Inspires comfort and healing-focused pillow designs'
  },
  'ra': {
    arabic: 'رع',
    english: 'Ra',
    pronunciation: 'RAH',
    meaning: 'Ancient Egyptian figure associated with the sun and renewal',
    culturalContext: 'Solar character representing daily renewal and life-giving energy',
    manufacturingRelevance: 'Influences energy and vitality-themed pillow collections'
  },
  'pharaoh': {
    arabic: 'فرعون',
    english: 'Pharaoh',
    pronunciation: 'FAIR-oh',
    meaning: 'Ancient Egyptian ruler and leader',
    culturalContext: 'Royal title representing leadership and cultural authority',
    manufacturingRelevance: 'Inspires premium royal-themed pillow collections'
  },
  'hieroglyphs': {
    arabic: 'هيروغليفية',
    english: 'Hieroglyphs',
    pronunciation: 'HIER-oh-glifs',
    meaning: 'Ancient Egyptian writing system using symbolic characters',
    culturalContext: 'Sacred writing system used for cultural and religious texts',
    manufacturingRelevance: 'Decorative elements featured in authentic Egyptian pillow designs'
  }
};

export class BilingualContentManager {
  private glossary: BilingualGlossary;

  constructor() {
    this.glossary = EGYPTIAN_CULTURAL_GLOSSARY;
  }

  /**
   * Get cultural term information
   */
  getCulturalTerm(englishTerm: string): CulturalTerm | null {
    const term = englishTerm.toLowerCase();
    return this.glossary[term] || null;
  }

  /**
   * Add pronunciation guide to content
   */
  addPronunciationGuide(content: string): string {
    let enhancedContent = content;
    
    Object.entries(this.glossary).forEach(([key, term]) => {
      const regex = new RegExp(`\\b${term.english}\\b`, 'gi');
      const replacement = `${term.english} (${term.arabic}, pronounced: ${term.pronunciation})`;
      
      // Only add pronunciation on first occurrence
      if (enhancedContent.match(regex)) {
        enhancedContent = enhancedContent.replace(regex, replacement);
      }
    });

    return enhancedContent;
  }

  /**
   * Generate cultural context tooltips for web content
   */
  generateCulturalTooltips(content: string): Array<{
    term: string;
    tooltip: string;
    position: number;
  }> {
    const tooltips: Array<{ term: string; tooltip: string; position: number }> = [];
    
    Object.entries(this.glossary).forEach(([key, term]) => {
      const regex = new RegExp(`\\b${term.english}\\b`, 'gi');
      let match;
      
      while ((match = regex.exec(content)) !== null) {
        tooltips.push({
          term: term.english,
          tooltip: `${term.arabic} (${term.pronunciation}): ${term.meaning}. ${term.culturalContext}`,
          position: match.index
        });
      }
    });

    return tooltips.sort((a, b) => a.position - b.position);
  }

  /**
   * Create bilingual glossary for articles
   */
  createArticleGlossary(content: string): CulturalTerm[] {
    const usedTerms: CulturalTerm[] = [];
    
    Object.entries(this.glossary).forEach(([key, term]) => {
      const regex = new RegExp(`\\b${term.english}\\b`, 'i');
      if (regex.test(content)) {
        usedTerms.push(term);
      }
    });

    return usedTerms;
  }

  /**
   * Generate manufacturing-relevant cultural explanations
   */
  generateManufacturingCulturalContext(culturalElement: string): string {
    const term = this.getCulturalTerm(culturalElement);
    if (!term) return '';

    return `
## Cultural Heritage in Manufacturing

**${term.english}** (${term.arabic}, pronounced: ${term.pronunciation})

${term.meaning}. ${term.culturalContext}

### Manufacturing Integration
${term.manufacturingRelevance || 'This cultural element inspires authentic Egyptian design elements in our pillow manufacturing process.'}

Our Egyptian pillow manufacturing facility ensures cultural accuracy while creating modern comfort products that honor this ancient heritage.
    `.trim();
  }

  /**
   * Sanitize content for cultural sensitivity
   */
  sanitizeForCulturalSensitivity(content: string): string {
    const sensitiveTerms = {
      'god': 'ancient figure',
      'deity': 'mythological character',
      'divine': 'revered',
      'worship': 'honor',
      'sacred': 'culturally significant',
      'holy': 'revered',
      'blessed': 'honored',
      'pray to': 'honor',
      'divine power': 'cultural significance'
    };

    let sanitizedContent = content;
    
    Object.entries(sensitiveTerms).forEach(([sensitive, replacement]) => {
      const regex = new RegExp(`\\b${sensitive}\\b`, 'gi');
      sanitizedContent = sanitizedContent.replace(regex, replacement);
    });

    return sanitizedContent;
  }

  /**
   * Add manufacturing context to cultural content
   */
  addManufacturingContext(content: string, culturalElement: string): string {
    const term = this.getCulturalTerm(culturalElement);
    if (!term) return content;

    const manufacturingContext = `

## ${term.english} in Modern Pillow Manufacturing

As a leading Egyptian pillow manufacturer, we draw inspiration from ${term.english} (${term.arabic}) to create authentic travel pillows that honor Egyptian cultural heritage. Our manufacturing process combines traditional cultural elements with modern comfort technology.

### Cultural Authenticity in Production
- **Design Accuracy**: Authentic ${term.english} motifs created by Egyptian cultural consultants
- **Manufacturing Excellence**: Premium memory foam and Egyptian cotton materials
- **Quality Standards**: ISO-certified production processes ensuring cultural respect
- **Wholesale Availability**: Bulk manufacturing for international distributors

${term.manufacturingRelevance || `Our ${term.english}-themed pillows represent the perfect fusion of ancient Egyptian culture and modern manufacturing excellence.`}
    `;

    return content + manufacturingContext;
  }

  /**
   * Generate SEO-friendly cultural descriptions
   */
  generateSEOCulturalDescription(culturalElement: string, manufacturingFocus: string[]): string {
    const term = this.getCulturalTerm(culturalElement);
    if (!term) return '';

    const focusAreas = manufacturingFocus.join(', ');
    
    return `Discover authentic ${term.english} (${term.arabic}) ${focusAreas} manufacturing in Egypt. ${term.meaning}. Premium Egyptian pillow factory with cultural heritage expertise and wholesale pricing.`;
  }
}

// Export singleton instance
export const bilingualManager = new BilingualContentManager();

// Utility functions for bilingual content
export const bilingualUtils = {
  /**
   * Format Arabic text with proper RTL support
   */
  formatArabicText(arabicText: string): string {
    return `<span dir="rtl" lang="ar">${arabicText}</span>`;
  },

  /**
   * Create pronunciation audio file names
   */
  generatePronunciationFileName(englishTerm: string): string {
    return `pronunciation-${englishTerm.toLowerCase().replace(/\s+/g, '-')}.mp3`;
  },

  /**
   * Generate cultural learning cards
   */
  generateCulturalCard(term: CulturalTerm): {
    front: string;
    back: string;
    pronunciation: string;
  } {
    return {
      front: term.english,
      back: `${term.arabic}\n\n${term.meaning}\n\n${term.culturalContext}`,
      pronunciation: term.pronunciation
    };
  },

  /**
   * Create bilingual navigation labels
   */
  createBilingualLabels(): { [key: string]: { en: string; ar: string } } {
    return {
      home: { en: 'Home', ar: 'الرئيسية' },
      blog: { en: 'Blog', ar: 'المدونة' },
      products: { en: 'Products', ar: 'المنتجات' },
      about: { en: 'About', ar: 'حول' },
      contact: { en: 'Contact', ar: 'اتصل بنا' },
      manufacturing: { en: 'Manufacturing', ar: 'التصنيع' },
      wholesale: { en: 'Wholesale', ar: 'الجملة' },
      cultural_heritage: { en: 'Cultural Heritage', ar: 'التراث الثقافي' },
      travel_pillows: { en: 'Travel Pillows', ar: 'وسائد السفر' },
      memory_foam: { en: 'Memory Foam', ar: 'الإسفنج الذكي' }
    };
  }
};
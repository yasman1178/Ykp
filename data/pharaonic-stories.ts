// Pharaonic Stories and Egyptian Symbol Meanings
// Comprehensive cultural and historical context for product designs

export interface EgyptianSymbolInfo {
  name: string;
  arabicName: string;
  meaning: string;
  historicalContext: string;
  culturalSignificance: string;
  modernRelevance: string;
  associatedDeities: string[];
  symbolPower: string;
  designElements: string[];
  colorAssociations: string[];
  story: string;
  protectivePowers: string[];
  timeOrigin: string;
}

export const PHARAONIC_SYMBOLS: Record<string, EgyptianSymbolInfo> = {
  ankh: {
    name: 'Ankh',
    arabicName: 'عنخ',
    meaning: 'Key of Life, Symbol of Eternal Life',
    historicalContext: 'The Ankh appeared in Egyptian art from the Early Dynastic Period (c. 3100-2686 BCE) and was one of the most important symbols in ancient Egypt.',
    culturalSignificance: 'Carried by gods and pharaohs, the Ankh represented the gift of life and the promise of eternal existence in the afterlife.',
    modernRelevance: 'Today, the Ankh symbolizes life, vitality, and spiritual awakening, making it perfect for travelers seeking renewal and energy.',
    associatedDeities: ['Ra', 'Isis', 'Osiris', 'Hathor'],
    symbolPower: 'Life force, protection, spiritual awakening, eternal existence',
    designElements: ['Cross with loop', 'Life key', 'Divine breath', 'Eternal circle'],
    colorAssociations: ['Gold (divine)', 'Blue (life)', 'Green (renewal)', 'White (purity)'],
    story: 'Legend tells that the Ankh was the key used by the gods to unlock the gates between life and death. When carried by mortals, it granted protection and ensured safe passage through all journeys, both earthly and spiritual.',
    protectivePowers: ['Life force protection', 'Spiritual awakening', 'Eternal existence', 'Divine blessing'],
    timeOrigin: 'Early Dynastic Period (c. 3100-2686 BCE)'
  },

  eyeofhorus: {
    name: 'Eye of Horus',
    arabicName: 'عين حورس',
    meaning: 'The All-Seeing Eye, Symbol of Protection and Royal Power',
    historicalContext: 'The Eye of Horus, or Wadjet, originated from the myth of Horus losing his eye in battle with Set, only to have it restored by Thoth.',
    culturalSignificance: 'Used as a powerful protective amulet, the Eye of Horus was believed to ward off evil and bring good health, protection, and royal power.',
    modernRelevance: 'Modern travelers use this symbol for protection during journeys, spiritual insight, and as a guardian against negative energies.',
    associatedDeities: ['Horus', 'Thoth', 'Ra', 'Wadjet'],
    symbolPower: 'Protection, healing, royal power, spiritual sight, divine protection',
    designElements: ['Falcon eye', 'Protective markings', 'Divine sight', 'Royal symbol'],
    colorAssociations: ['Blue (protection)', 'Gold (divine power)', 'Black (mystery)', 'White (purity)'],
    story: 'When Horus fought Set to avenge his father Osiris, he lost his left eye. Thoth, the god of wisdom, restored it with magic. The healed eye became the most powerful protective symbol, watching over all who carry it.',
    protectivePowers: ['Evil protection', 'Health blessing', 'Royal power', 'Spiritual sight'],
    timeOrigin: 'Old Kingdom Period (c. 2686-2181 BCE)'
  },

  scarab: {
    name: 'Sacred Scarab',
    arabicName: 'الجعران المقدس',
    meaning: 'Symbol of Renewal, Protection, and the Rising Sun',
    historicalContext: 'The scarab beetle was sacred to ancient Egyptians who observed its behavior of rolling dung balls, associating it with the sun god Ra rolling the sun across the sky.',
    culturalSignificance: 'Scarab amulets were placed over the hearts of mummies to ensure rebirth in the afterlife and were worn by the living for protection and renewal.',
    modernRelevance: 'Perfect for travelers seeking transformation, new beginnings, and protection during life transitions and journeys.',
    associatedDeities: ['Ra', 'Khepri', 'Atum'],
    symbolPower: 'Renewal, transformation, protection, solar energy, rebirth',
    designElements: ['Beetle form', 'Solar disk', 'Protective shell', 'Renewal cycle'],
    colorAssociations: ['Green (renewal)', 'Gold (sun)', 'Blue (protection)', 'Black (transformation)'],
    story: 'The scarab beetle emerges from the earth renewed each day, just as the sun rises. Ancient Egyptians believed that wearing a scarab would grant the same power of daily renewal and protection from harm.',
    protectivePowers: ['Renewal protection', 'Transformation power', 'Solar energy', 'Rebirth blessing'],
    timeOrigin: 'Early Dynastic Period (c. 3100 BCE)'
  }
};

// Product Story Generator
export const generateProductStory = (symbolKey: string, productName: string): string => {
  const symbol = PHARAONIC_SYMBOLS[symbolKey];
  if (!symbol) return '';

  return `The ${productName} draws its power from ${symbol.name}, ${symbol.meaning.toLowerCase()}. ${symbol.story} 

In ancient Egypt, ${symbol.culturalSignificance.toLowerCase()} Today, this pillow carries the same energy, offering ${symbol.symbolPower.toLowerCase()} to modern travelers.

${symbol.modernRelevance} Whether you're embarking on a business trip, spiritual journey, or adventure travel, this pillow connects you to the timeless wisdom and protection of ancient Egypt.`;
};

// Cultural Context for Collections
export const COLLECTION_STORIES = {
  b123: {
    title: 'Premium Collection: Royal Egyptian Treasures',
    story: `The Classic Collection  is inspired by the golden treasures found in the tombs of pharaohs, particularly the magnificent artifacts discovered in Tutankhamun's burial chamber. Each pillow in this collection represents the pinnacle of Egyptian artistry and royal luxury.`,
    targetExperience: 'Luxury, divinity, royal treatment, premium comfort'
  },

  t: {
    title: 'Classic Collection: Timeless Egyptian Heritage',
    story: `The  Premium Collection celebrates the enduring symbols and motifs that have represented Egyptian culture for millennia. These designs focus on the most recognizable and beloved symbols of ancient Egypt.`,
    targetExperience: 'Authenticity, cultural connection, timeless wisdom, accessible luxury'
  },

  tb: {
    title: 'Heritage Collection: Ancient Wisdom for Modern Journeys',
    story: `The Heritage Collection  delves deep into the mystical and scholarly aspects of ancient Egyptian civilization. These pillows feature hieroglyphic inscriptions, complex symbolic combinations, and designs that tell complete stories.`,
    targetExperience: 'Wisdom, enlightenment, cultural education, spiritual connection'
  }
};

export default {
  PHARAONIC_SYMBOLS,
  generateProductStory,
  COLLECTION_STORIES
};
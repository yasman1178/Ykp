// Utility functions for generating Egyptian-themed Open Graph images
// This would typically integrate with a service like Vercel OG or generate images server-side

export interface OGImageConfig {
  title: string;
  arabicTitle: string;
  symbolIcon: string;
  authorName: string;
  readingTime: number;
  category: string;
}

export function generateOGImageUrl(config: OGImageConfig): string {
  // In a real implementation, this would generate or fetch a pre-generated image
  // For now, we'll return a placeholder URL that could be handled by an API route
  const params = new URLSearchParams({
    title: config.title,
    arabicTitle: config.arabicTitle,
    symbol: config.symbolIcon,
    author: config.authorName,
    readingTime: config.readingTime.toString(),
    category: config.category
  });

  return `/api/og-image?${params.toString()}`;
}

export function generateTwitterImageUrl(config: OGImageConfig): string {
  // Twitter cards have different dimensions (1200x630 vs 1200x600)
  const params = new URLSearchParams({
    title: config.title,
    arabicTitle: config.arabicTitle,
    symbol: config.symbolIcon,
    author: config.authorName,
    readingTime: config.readingTime.toString(),
    category: config.category,
    format: 'twitter'
  });

  return `/api/og-image?${params.toString()}`;
}

// Egyptian color palette for OG images
export const EGYPTIAN_OG_COLORS = {
  gold: '#D4AF37',
  deepBlue: '#1E3A8A',
  terracotta: '#CD853F',
  papyrus: '#F5E6D3',
  hieroglyphBlack: '#1A1A1A',
  desertSand: '#EDC9AF',
  nileBlue: '#4682B4'
};

// Hieroglyphic symbols for OG images
export const HIEROGLYPH_SYMBOLS = {
  'Anubis': '𓃥',
  'Royal Scarab': '𓆣',
  'Queen Nefertiti': '𓇳',
  'Great Pyramids': '𓉴',
  'Eye of Horus': '𓂀',
  'Ankh': '𓋹',
  'Sacred Lotus': '𓆸',
  'Great Sphinx': '𓎛',
  'Queen Cleopatra': '𓇯',
  "Pharaoh's Crown": '𓋑'
};

// Template for generating Egyptian-themed OG image HTML/CSS
export const OG_IMAGE_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Amiri:wght@400;700&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      width: 1200px;
      height: 630px;
      background: linear-gradient(135deg, #D4AF37 0%, #1E3A8A 50%, #CD853F 100%);
      font-family: 'Cairo', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    
    .container {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 30px;
      padding: 60px;
      margin: 40px;
      text-align: center;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
      position: relative;
      z-index: 2;
    }
    
    .symbol {
      font-size: 120px;
      color: #D4AF37;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .arabic-title {
      font-family: 'Amiri', serif;
      font-size: 48px;
      font-weight: 700;
      color: #1E3A8A;
      margin-bottom: 15px;
      line-height: 1.2;
    }
    
    .english-title {
      font-size: 32px;
      font-weight: 600;
      color: #4682B4;
      margin-bottom: 30px;
      line-height: 1.3;
    }
    
    .meta {
      display: flex;
      justify-content: center;
      gap: 40px;
      font-size: 18px;
      color: #666;
      margin-bottom: 20px;
    }
    
    .brand {
      font-size: 24px;
      font-weight: 600;
      color: #D4AF37;
      margin-top: 20px;
    }
    
    .decorative-elements {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }
    
    .hieroglyph {
      position: absolute;
      font-size: 60px;
      opacity: 0.1;
      color: #F5E6D3;
    }
    
    .hieroglyph-1 { top: 50px; left: 50px; }
    .hieroglyph-2 { top: 100px; right: 80px; }
    .hieroglyph-3 { bottom: 80px; left: 100px; }
    .hieroglyph-4 { bottom: 50px; right: 50px; }
  </style>
</head>
<body>
  <div class="decorative-elements">
    <div class="hieroglyph hieroglyph-1">𓀀</div>
    <div class="hieroglyph hieroglyph-2">𓂀</div>
    <div class="hieroglyph hieroglyph-3">𓋹</div>
    <div class="hieroglyph hieroglyph-4">𓆣</div>
  </div>
  
  <div class="container">
    <div class="symbol">{{SYMBOL}}</div>
    <div class="arabic-title">{{ARABIC_TITLE}}</div>
    <div class="english-title">{{ENGLISH_TITLE}}</div>
    <div class="meta">
      <span>{{AUTHOR}}</span>
      <span>•</span>
      <span>{{READING_TIME}} دقائق قراءة</span>
      <span>•</span>
      <span>{{CATEGORY}}</span>
    </div>
    <div class="brand">Pharaonic Pillows Egypt | وسائد فرعونية مصر</div>
  </div>
</body>
</html>
`;

export function generateOGImageHTML(config: OGImageConfig): string {
  return OG_IMAGE_TEMPLATE
    .replace('{{SYMBOL}}', config.symbolIcon)
    .replace('{{ARABIC_TITLE}}', config.arabicTitle)
    .replace('{{ENGLISH_TITLE}}', config.title)
    .replace('{{AUTHOR}}', config.authorName)
    .replace('{{READING_TIME}}', config.readingTime.toString())
    .replace('{{CATEGORY}}', config.category);
}
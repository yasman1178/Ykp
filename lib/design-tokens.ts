// Egyptian Design System Tokens
// Centralized design tokens for consistent theming across the application

export const EGYPTIAN_COLORS = {
  // Primary Pharaonic Colors
  pharaonicGold: '#D4AF37',
  pharaonicGoldLight: '#FFD700',
  pharaonicGoldDark: '#B8860B',
  pharaonicGoldDarker: '#996515',
  
  deepBlue: '#1E3A8A',
  deepBlueLight: '#3B82F6',
  deepBlueDark: '#1E40AF',
  deepBlueDarker: '#1E3A8A',
  
  terracotta: '#CD853F',
  terracottaLight: '#DEB887',
  terracottaDark: '#A0522D',
  terracottaDarker: '#8B4513',
  
  // Supporting Colors
  papyrus: '#F5E6D3',
  papyrusLight: '#FAF0E6',
  papyrusDark: '#E6D7C3',
  
  hieroglyphBlack: '#1A1A1A',
  hieroglyphGray: '#2D2D2D',
  hieroglyphLight: '#4A4A4A',
  
  desertSand: '#EDC9AF',
  desertSandLight: '#F5DEB3',
  desertSandDark: '#DEB887',
  
  nileBlue: '#4682B4',
  nileBlueLight: '#87CEEB',
  nileBlueDark: '#4169E1',
  
  // Modern Accents
  royalPurple: '#6366F1',
  royalPurpleLight: '#8B5CF6',
  royalPurpleDark: '#4F46E5',
  
  // Neutral Colors for B2B
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
} as const;

export const EGYPTIAN_GRADIENTS = {
  golden: 'linear-gradient(135deg, #FFD700, #B8860B)',
  royal: 'linear-gradient(135deg, #1E3A8A, #3B82F6)',
  pharaonicHero: 'linear-gradient(135deg, #6366F1, #8B5CF6, #D4AF37)',
  terracotta: 'linear-gradient(135deg, #CD853F, #A0522D)',
  desert: 'linear-gradient(135deg, #EDC9AF, #F5E6D3)',
  nile: 'linear-gradient(135deg, #4682B4, #87CEEB)',
  
  // Interactive Gradients
  hoverGold: 'linear-gradient(135deg, #FFD700, #B8860B, #DAA520)',
  hoverBlue: 'linear-gradient(135deg, #3B82F6, #1E40AF)',
  hoverTerracotta: 'linear-gradient(135deg, #DEB887, #A0522D)',
  
  // Background Gradients
  egyptianHero: 'linear-gradient(135deg, #D4AF37 0%, #1E3A8A 50%, #CD853F 100%)',
  subtle: 'linear-gradient(135deg, #F5E6D3 0%, #EDC9AF 100%)',
  dark: 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
} as const;

export const EGYPTIAN_SHADOWS = {
  golden: '0 4px 15px rgba(212, 175, 55, 0.2)',
  goldenHover: '0 8px 25px rgba(212, 175, 55, 0.4)',
  goldenActive: '0 2px 8px rgba(212, 175, 55, 0.3)',
  
  blue: '0 4px 15px rgba(30, 58, 138, 0.2)',
  blueHover: '0 8px 25px rgba(30, 58, 138, 0.3)',
  
  card: '0 10px 40px rgba(0, 0, 0, 0.1)',
  cardHover: '0 25px 50px rgba(212, 175, 55, 0.3)',
  floating: '0 10px 40px rgba(212, 175, 55, 0.25)',
  
  soft: '0 2px 8px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 16px rgba(0, 0, 0, 0.12)',
  strong: '0 8px 32px rgba(0, 0, 0, 0.16)',
} as const;

export const EGYPTIAN_TYPOGRAPHY = {
  fontFamilies: {
    pharaonic: 'Amiri, Playfair Display, serif',
    hieroglyphic: 'Noto Sans Egyptian Hieroglyphs, serif',
    modernArabic: 'Cairo, Inter, sans-serif',
    primary: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    secondary: 'Playfair Display, Georgia, serif',
    mono: 'JetBrains Mono, Fira Code, monospace',
  },
  
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
    '9xl': '8rem',    // 128px
  },
  
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;

export const EGYPTIAN_SPACING = {
  px: '1px',
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
} as const;

export const EGYPTIAN_BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

export const EGYPTIAN_ANIMATIONS = {
  durations: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  
  easings: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    egyptian: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
} as const;

// Breakpoints for responsive design
export const EGYPTIAN_BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-index scale
export const EGYPTIAN_Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Component-specific design tokens
export const EGYPTIAN_COMPONENTS = {
  button: {
    heights: {
      sm: '2rem',    // 32px
      md: '2.5rem',  // 40px
      lg: '3rem',    // 48px
      xl: '3.5rem',  // 56px
    },
    paddings: {
      sm: '0.5rem 1rem',
      md: '0.75rem 1.5rem',
      lg: '1rem 2rem',
      xl: '1.25rem 2.5rem',
    },
  },
  
  card: {
    paddings: {
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '2.5rem',
    },
    borderRadius: '1rem',
    shadow: EGYPTIAN_SHADOWS.card,
    hoverShadow: EGYPTIAN_SHADOWS.cardHover,
  },
  
  input: {
    height: '2.5rem',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    borderWidth: '2px',
    focusBorderColor: EGYPTIAN_COLORS.pharaonicGold,
    errorBorderColor: '#EF4444',
  },
} as const;

// Export all tokens as a single object for easy access
export const EGYPTIAN_DESIGN_TOKENS = {
  colors: EGYPTIAN_COLORS,
  gradients: EGYPTIAN_GRADIENTS,
  shadows: EGYPTIAN_SHADOWS,
  typography: EGYPTIAN_TYPOGRAPHY,
  spacing: EGYPTIAN_SPACING,
  borderRadius: EGYPTIAN_BORDER_RADIUS,
  animations: EGYPTIAN_ANIMATIONS,
  breakpoints: EGYPTIAN_BREAKPOINTS,
  zIndex: EGYPTIAN_Z_INDEX,
  components: EGYPTIAN_COMPONENTS,
} as const;

// Type definitions for TypeScript
export type EgyptianColor = keyof typeof EGYPTIAN_COLORS;
export type EgyptianGradient = keyof typeof EGYPTIAN_GRADIENTS;
export type EgyptianShadow = keyof typeof EGYPTIAN_SHADOWS;
export type EgyptianFontFamily = keyof typeof EGYPTIAN_TYPOGRAPHY.fontFamilies;
export type EgyptianFontSize = keyof typeof EGYPTIAN_TYPOGRAPHY.fontSizes;
export type EgyptianSpacing = keyof typeof EGYPTIAN_SPACING;
export type EgyptianBorderRadius = keyof typeof EGYPTIAN_BORDER_RADIUS;
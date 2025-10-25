// Egyptian Design System Utilities
// Helper functions for consistent styling and theming

import { EGYPTIAN_DESIGN_TOKENS } from './design-tokens';
import type { 
  EgyptianColor, 
  EgyptianGradient, 
  EgyptianShadow, 
  EgyptianFontFamily,
  EgyptianSpacing 
} from './design-tokens';

/**
 * Get Egyptian color value by key
 */
export const getEgyptianColor = (colorKey: EgyptianColor): string => {
  return EGYPTIAN_DESIGN_TOKENS.colors[colorKey];
};

/**
 * Get Egyptian gradient by key
 */
export const getEgyptianGradient = (gradientKey: EgyptianGradient): string => {
  return EGYPTIAN_DESIGN_TOKENS.gradients[gradientKey];
};

/**
 * Get Egyptian shadow by key
 */
export const getEgyptianShadow = (shadowKey: EgyptianShadow): string => {
  return EGYPTIAN_DESIGN_TOKENS.shadows[shadowKey];
};

/**
 * Get Egyptian font family by key
 */
export const getEgyptianFont = (fontKey: EgyptianFontFamily): string => {
  return EGYPTIAN_DESIGN_TOKENS.typography.fontFamilies[fontKey];
};

/**
 * Get Egyptian spacing value by key
 */
export const getEgyptianSpacing = (spacingKey: EgyptianSpacing): string => {
  return EGYPTIAN_DESIGN_TOKENS.spacing[spacingKey];
};

/**
 * Generate CSS custom properties for Egyptian theme
 */
export const generateEgyptianCSSVars = (): Record<string, string> => {
  const cssVars: Record<string, string> = {};
  
  // Colors
  Object.entries(EGYPTIAN_DESIGN_TOKENS.colors).forEach(([key, value]) => {
    cssVars[`--egyptian-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
  });
  
  // Gradients
  Object.entries(EGYPTIAN_DESIGN_TOKENS.gradients).forEach(([key, value]) => {
    cssVars[`--egyptian-gradient-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
  });
  
  // Shadows
  Object.entries(EGYPTIAN_DESIGN_TOKENS.shadows).forEach(([key, value]) => {
    cssVars[`--egyptian-shadow-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
  });
  
  return cssVars;
};

/**
 * Create Egyptian-themed className combinations
 */
export const egyptianClasses = {
  // Button variants
  button: {
    primary: 'bg-gradient-gold text-white font-semibold shadow-golden hover:shadow-golden-hover transition-all duration-300',
    secondary: 'bg-gradient-royal text-white font-semibold shadow-blue hover:shadow-blue-hover transition-all duration-300',
    tertiary: 'bg-gradient-terracotta text-white font-semibold shadow-soft hover:shadow-medium transition-all duration-300',
    outline: 'border-2 border-pharaonic-gold text-pharaonic-gold hover:bg-pharaonic-gold hover:text-white transition-all duration-300',
    ghost: 'text-pharaonic-gold hover:bg-pharaonic-gold hover:bg-opacity-10 transition-all duration-300',
  },
  
  // Card variants
  card: {
    default: 'bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100',
    golden: 'bg-gradient-subtle rounded-2xl shadow-golden hover:shadow-golden-hover transition-all duration-300',
    floating: 'bg-white rounded-2xl shadow-floating hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-2',
    crystal: 'bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 clip-crystal-effect',
  },
  
  // Text variants
  text: {
    heading: 'font-pharaonic font-bold text-gradient-gold',
    subheading: 'font-secondary font-semibold text-deep-blue',
    body: 'font-primary text-hieroglyph-black leading-relaxed',
    caption: 'font-primary text-sm text-gray-600',
    hieroglyph: 'font-hieroglyphic text-pharaonic-gold',
  },
  
  // Layout variants
  container: {
    default: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    narrow: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
    wide: 'max-w-full mx-auto px-4 sm:px-6 lg:px-8',
  },
  
  // Animation variants
  animation: {
    float: 'animate-float',
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    scaleIn: 'animate-scale-in',
    gradientShift: 'animate-gradient-shift',
  },
};

/**
 * Responsive design helpers
 */
export const responsive = {
  // Font sizes that scale appropriately
  fontSize: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg md:text-xl',
    xl: 'text-xl md:text-2xl',
    '2xl': 'text-2xl md:text-3xl',
    '3xl': 'text-3xl md:text-4xl lg:text-5xl',
    '4xl': 'text-4xl md:text-5xl lg:text-6xl',
    '5xl': 'text-5xl md:text-6xl lg:text-7xl',
  },
  
  // Spacing that adapts to screen size
  spacing: {
    xs: 'p-2 md:p-3',
    sm: 'p-3 md:p-4',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
    xl: 'p-8 md:p-12',
  },
  
  // Grid layouts
  grid: {
    auto: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    products: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
    blog: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    features: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  },
};

/**
 * Egyptian-themed form styling helpers
 */
export const egyptianForm = {
  input: 'w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pharaonic-gold focus:outline-none transition-colors duration-200 bg-white',
  inputError: 'w-full px-4 py-3 rounded-lg border-2 border-red-500 focus:border-red-500 focus:outline-none transition-colors duration-200 bg-white',
  label: 'block text-sm font-medium text-hieroglyph-black mb-2',
  error: 'text-red-500 text-sm mt-1',
  select: 'w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pharaonic-gold focus:outline-none transition-colors duration-200 bg-white appearance-none',
  textarea: 'w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pharaonic-gold focus:outline-none transition-colors duration-200 bg-white resize-vertical min-h-[120px]',
  checkbox: 'w-4 h-4 text-pharaonic-gold border-gray-300 rounded focus:ring-pharaonic-gold focus:ring-2',
  radio: 'w-4 h-4 text-pharaonic-gold border-gray-300 focus:ring-pharaonic-gold focus:ring-2',
};

/**
 * Egyptian-themed navigation helpers
 */
export const egyptianNav = {
  link: 'text-hieroglyph-black hover:text-pharaonic-gold transition-colors duration-200 font-medium',
  activeLink: 'text-pharaonic-gold font-semibold',
  button: 'bg-gradient-gold text-white px-6 py-2 rounded-lg font-semibold hover:shadow-golden-hover transition-all duration-300',
  mobileMenu: 'bg-white shadow-strong rounded-lg border border-gray-100 p-4',
};

/**
 * Utility function to combine classes conditionally
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Generate Egyptian-themed CSS-in-JS styles
 */
export const egyptianStyles = {
  gradientText: (gradient: EgyptianGradient) => ({
    background: getEgyptianGradient(gradient),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }),
  
  gradientBackground: (gradient: EgyptianGradient) => ({
    background: getEgyptianGradient(gradient),
  }),
  
  egyptianShadow: (shadow: EgyptianShadow) => ({
    boxShadow: getEgyptianShadow(shadow),
  }),
  
  floatingCard: {
    transform: 'translateY(-10px) rotateX(5deg) rotateY(5deg)',
    boxShadow: getEgyptianShadow('cardHover'),
    transition: 'all 0.3s ease',
  },
  
  crystalClip: {
    clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
    filter: 'drop-shadow(0 10px 30px rgba(212, 175, 55, 0.3))',
  },
};

/**
 * Egyptian theme configuration for component libraries
 */
export const egyptianThemeConfig = {
  colors: {
    primary: EGYPTIAN_DESIGN_TOKENS.colors.pharaonicGold,
    secondary: EGYPTIAN_DESIGN_TOKENS.colors.deepBlue,
    accent: EGYPTIAN_DESIGN_TOKENS.colors.terracotta,
    background: EGYPTIAN_DESIGN_TOKENS.colors.white,
    surface: EGYPTIAN_DESIGN_TOKENS.colors.papyrus,
    text: EGYPTIAN_DESIGN_TOKENS.colors.hieroglyphBlack,
    textSecondary: EGYPTIAN_DESIGN_TOKENS.colors.gray600,
  },
  fonts: EGYPTIAN_DESIGN_TOKENS.typography.fontFamilies,
  spacing: EGYPTIAN_DESIGN_TOKENS.spacing,
  borderRadius: EGYPTIAN_DESIGN_TOKENS.borderRadius,
  shadows: EGYPTIAN_DESIGN_TOKENS.shadows,
};

/**
 * Accessibility helpers with Egyptian theming
 */
export const egyptianA11y = {
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-pharaonic-gold focus:ring-offset-2',
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-pharaonic-gold text-white px-4 py-2 rounded-lg font-semibold z-50',
  screenReaderOnly: 'sr-only',
  highContrast: 'contrast-more:border-black contrast-more:text-black',
};

/**
 * Performance optimization helpers
 */
export const egyptianPerf = {
  lazyImage: 'loading-lazy transition-opacity duration-300',
  willChange: 'will-change-transform',
  gpuAccelerated: 'transform-gpu',
  reducedMotion: 'motion-reduce:transition-none motion-reduce:animate-none',
};
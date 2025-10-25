/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        // Egyptian Pharaonic Color Palette
        pharaonic: {
          gold: '#D4AF37',
          'gold-light': '#FFD700',
          'gold-dark': '#B8860B',
          'gold-darker': '#996515',
        },
        'deep-blue': {
          DEFAULT: '#1E3A8A',
          light: '#3B82F6',
          dark: '#1E40AF',
          darker: '#1E3A8A',
        },
        terracotta: {
          DEFAULT: '#CD853F',
          light: '#DEB887',
          dark: '#A0522D',
          darker: '#8B4513',
        },
        papyrus: {
          DEFAULT: '#F5E6D3',
          light: '#FAF0E6',
          dark: '#E6D7C3',
        },
        'hieroglyph-black': '#1A1A1A',
        'hieroglyph-gray': '#2D2D2D',
        'hieroglyph-light': '#4A4A4A',
        'desert-sand': {
          DEFAULT: '#EDC9AF',
          light: '#F5DEB3',
          dark: '#DEB887',
        },
        'nile-blue': {
          DEFAULT: '#4682B4',
          light: '#87CEEB',
          dark: '#4169E1',
        },
        'royal-purple': {
          DEFAULT: '#6366F1',
          light: '#8B5CF6',
          dark: '#4F46E5',
        },
        // Legacy colors (keeping for compatibility)
        primary: '#131424',
        secondary: '#393A47',
        accent: '#F13024',
      },
      backgroundImage: {
        // Egyptian gradients
        'golden-gradient': 'linear-gradient(135deg, #FFD700, #B8860B)',
        'royal-gradient': 'linear-gradient(135deg, #1E3A8A, #3B82F6)',
        'pharaonic-hero': 'linear-gradient(135deg, #6366F1, #8B5CF6, #D4AF37)',
        'hover-gold': 'linear-gradient(135deg, #FFD700, #B8860B, #DAA520)',
        'egyptian-hero-gradient': 'linear-gradient(135deg, #D4AF37 0%, #1E3A8A 50%, #CD853F 100%)',
        // Legacy backgrounds
        explosion: 'url("/bg-explosion.png")',
        circles: 'url("/bg-circles.png")',
        circleStar: 'url("/circle-star.svg")',
        site: 'url("/site-bg.svg")',
      },
      boxShadow: {
        'floating': '0 10px 40px rgba(212, 175, 55, 0.25)',
        'card': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 25px 50px rgba(212, 175, 55, 0.3)',
        'golden': '0 4px 15px rgba(212, 175, 55, 0.2)',
        'golden-hover': '0 8px 25px rgba(212, 175, 55, 0.4)',
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'gradient-shift': 'gradientShift 6s ease infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(-10px) rotate(-2deg) scale(1)' },
          '50%': { transform: 'translateY(10px) rotate(2deg) scale(1.02)' },
        },
      },
      fontFamily: {
        // Legacy fonts
        poppins: [`var(--font-poppins)`, 'sans-serif'],
        sora: [`var(--font-sora)`, 'sans-serif'],
        // Egyptian Design System fonts
        pharaonic: ['Amiri', 'Playfair Display', 'serif'],
        hieroglyphic: ['Noto Sans Egyptian Hieroglyphs', 'serif'],
        'modern-arabic': ['Cairo', 'Inter', 'sans-serif'],
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        secondary: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      clipPath: {
        'pharaonic-polygon': 'polygon(30% 0%, 70% 30%, 100% 70%, 70% 100%, 30% 70%, 0% 30%)',
        'crystal-effect': 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
      },
    },
  },
  container: {
    padding: {
      DEFAULT: '15px',
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    function({ addUtilities }) {
      const newUtilities = {
        '.clip-pharaonic-polygon': {
          clipPath: 'polygon(30% 0%, 70% 30%, 100% 70%, 70% 100%, 30% 70%, 0% 30%)',
        },
        '.clip-crystal-effect': {
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
        },
        '.bg-size-200': {
          backgroundSize: '200% 200%',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};

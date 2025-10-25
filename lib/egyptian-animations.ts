/**
 * Egyptian-themed animations library inspired by CapaCV design
 * Contains crystal/polygonal effects, gradient animations, and micro-interactions
 */

export const EGYPTIAN_ANIMATIONS = {
  // Crystal/Polygonal reveal animations for product images
  pharaonicCrystalReveal: {
    initial: { 
      opacity: 0, 
      scale: 0.8, 
      rotateY: -15,
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)"
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)"
    },
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }
  },

  // Polygonal hover effect for product images
  pharaonicPolygonHover: {
    initial: { 
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scale: 1,
      rotateY: 0
    },
    hover: { 
      clipPath: "polygon(30% 0%, 70% 30%, 100% 70%, 70% 100%, 30% 70%, 0% 30%)",
      scale: 1.05,
      rotateY: 5
    },
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  },

  // Gradient background animations with Egyptian colors
  egyptianGradientShift: {
    initial: { backgroundPosition: "0% 50%" },
    animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] },
    transition: { duration: 6, repeat: Infinity, ease: [0, 0, 1, 1] }
  },

  // Staggered content reveal with easing effects
  contentStaggerReveal: {
    initial: { opacity: 0, y: 60, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { 
      duration: 0.8, 
      staggerChildren: 0.15
    }
  },

  // Individual item in staggered reveal
  staggerItem: {
    initial: { opacity: 0, y: 40, rotateX: -10 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },

  // Hover animations with scale and rotation for interactive elements
  interactiveHover: {
    initial: { scale: 1, rotateZ: 0 },
    hover: { 
      scale: 1.05, 
      rotateZ: 2,
      boxShadow: "0 10px 25px rgba(212, 175, 55, 0.4)"
    },
    tap: { scale: 0.98, rotateZ: -1 },
    transition: { duration: 0.3, ease: "easeOut" }
  },

  // Golden button animation
  goldenButton: {
    initial: { 
      scale: 1, 
      boxShadow: "0 4px 15px rgba(212, 175, 55, 0.2)",
      background: "linear-gradient(135deg, #D4AF37, #B8860B)"
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 8px 25px rgba(212, 175, 55, 0.4)",
      background: "linear-gradient(135deg, #FFD700, #B8860B, #DAA520)"
    },
    tap: { scale: 0.95 },
    transition: { duration: 0.2, ease: "easeInOut" }
  },

  // Floating card effect for products
  floatingCard: {
    initial: { y: 0, rotateX: 0, rotateY: 0 },
    hover: { 
      y: -10, 
      rotateX: 5, 
      rotateY: 5,
      boxShadow: "0 25px 50px rgba(212, 175, 55, 0.3)"
    },
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
  },

  // Hieroglyphic elements floating animation
  floatingHieroglyphs: {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      scale: [1, 1.02, 1]
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1]
    }
  },

  // Modern card entrance animation
  cardEntrance: {
    initial: { opacity: 0, y: 60, rotateX: -15 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  },

  // Egyptian-themed pulse animation
  egyptianPulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1]
    }
  }
};

// Animation variants for different contexts
export const ANIMATION_VARIANTS = {
  // Page container animations
  pageContainer: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
  },

  // Product grid animations
  productGrid: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  // Product card animations
  productCard: {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: {
      y: -10,
      scale: 1.02,
      rotateY: 5,
      boxShadow: "0 20px 40px rgba(212, 175, 55, 0.2)"
    },
    transition: { duration: 0.4, ease: "easeOut" }
  },

  // Blog article animations
  blogArticle: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },

  // Navigation animations
  navigation: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Easing functions for Egyptian-themed animations
export const EGYPTIAN_EASING = {
  pharaonicEase: [0.25, 0.46, 0.45, 0.94],
  goldenEase: [0.4, 0, 0.2, 1],
  crystalEase: [0.68, -0.55, 0.265, 1.55],
  smoothEase: [0.25, 0.1, 0.25, 1]
};
// Egyptian-themed animations inspired by modern UI patterns
export const EGYPTIAN_ANIMATIONS = {
  // Polygon effect for product images (inspired by CapaCV design)
  pharaonicPolygon: {
    initial: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
    animate: { 
      clipPath: [
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(20% 0%, 80% 20%, 100% 60%, 80% 100%, 20% 80%, 0% 40%)",
        "polygon(30% 0%, 70% 30%, 100% 70%, 70% 100%, 30% 70%, 0% 30%)"
      ]
    },
    transition: { duration: 3, repeat: Infinity, repeatType: "reverse" as const }
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
    transition: { duration: 0.3, ease: "easeOut" }
  },

  // Gradient background animation
  egyptianGradient: {
    initial: { backgroundPosition: "0% 50%" },
    animate: { backgroundPosition: "100% 50%" },
    transition: { duration: 5, repeat: Infinity, repeatType: "reverse" as const }
  },

  // Interactive button with Egyptian flair
  goldenButton: {
    initial: { scale: 1, boxShadow: "0 4px 15px rgba(212, 175, 55, 0.2)" },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 8px 25px rgba(212, 175, 55, 0.4)",
      background: "linear-gradient(135deg, #FFD700, #B8860B, #DAA520)"
    },
    tap: { scale: 0.95 },
    transition: { duration: 0.2 }
  },

  // Scarab flying animation
  scarabFly: {
    initial: { x: -100, rotate: 0 },
    animate: { x: 0, rotate: 360 },
    transition: { duration: 2, ease: "easeInOut" }
  },
  
  // Pyramid building effect
  pyramidBuild: {
    initial: { scaleY: 0, originY: 1 },
    animate: { scaleY: 1 },
    transition: { duration: 1.5, ease: "easeOut" }
  },
  
  // Hieroglyph reveal with stagger
  hieroglyphReveal: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, staggerChildren: 0.1 }
  },

  // Modern card entrance (inspired by CapaCV)
  cardEntrance: {
    initial: { opacity: 0, y: 60, rotateX: -15 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Advanced Egyptian-themed animations inspired by CapaCV
export const ADVANCED_ANIMATIONS = {
  // Crystal reveal effect for products
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
    transition: { duration: 1.2, ease: "easeOut" }
  },
  
  // Staggered content reveal like CapaCV
  contentStagger: {
    initial: { opacity: 0, y: 60, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { 
      duration: 0.8, 
      staggerChildren: 0.15, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  },
  
  // Floating elements with Egyptian theme
  floatingHieroglyphs: {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      scale: [1, 1.02, 1]
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  
  // Button hover effects
  pharaonicButton: {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(212, 175, 55, 0.4)",
      background: "linear-gradient(45deg, #FFD700, #B8860B)"
    },
    tap: { scale: 0.98 }
  }
};

// Page transition animations
export const PAGE_TRANSITIONS = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    transition: { duration: 0.4, ease: "easeInOut" }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
    transition: { duration: 0.3 }
  }
};

// Micro-interactions for UI elements
export const MICRO_INTERACTIONS = {
  buttonPress: {
    whileTap: { scale: 0.95 },
    whileHover: { scale: 1.05 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  
  cardHover: {
    whileHover: { 
      y: -5, 
      boxShadow: "0 20px 40px rgba(212, 175, 55, 0.2)" 
    },
    transition: { duration: 0.2 }
  },
  
  iconSpin: {
    whileHover: { rotate: 360 },
    transition: { duration: 0.5 }
  }
};
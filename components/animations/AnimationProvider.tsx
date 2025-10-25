/**
 * Animation Provider for Egyptian-themed animations
 * Provides global animation context and controls
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimationContextType {
  isAnimationEnabled: boolean;
  toggleAnimations: () => void;
  prefersReducedMotion: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  setAnimationSpeed: (speed: 'slow' | 'normal' | 'fast') => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    if (mediaQuery.matches) {
      setIsAnimationEnabled(false);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsAnimationEnabled(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleAnimations = () => {
    setIsAnimationEnabled(!isAnimationEnabled);
  };

  const getSpeedMultiplier = () => {
    switch (animationSpeed) {
      case 'slow': return 1.5;
      case 'fast': return 0.7;
      default: return 1;
    }
  };

  // Apply speed multiplier to document root
  useEffect(() => {
    const multiplier = getSpeedMultiplier();
    document.documentElement.style.setProperty('--animation-speed', multiplier.toString());
  }, [animationSpeed]);

  const contextValue: AnimationContextType = {
    isAnimationEnabled,
    toggleAnimations,
    prefersReducedMotion,
    animationSpeed,
    setAnimationSpeed
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      <div 
        className={`animation-provider ${!isAnimationEnabled ? 'animations-disabled' : ''}`}
        data-animation-speed={animationSpeed}
      >
        {children}
      </div>
    </AnimationContext.Provider>
  );
};

// Page transition wrapper with Egyptian theme
export const PageTransitionWrapper: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const { isAnimationEnabled } = useAnimation();

  if (!isAnimationEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={`page-transition-wrapper ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Scroll-triggered animation wrapper
export const ScrollReveal: React.FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}> = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'up' 
}) => {
  const { isAnimationEnabled } = useAnimation();

  if (!isAnimationEnabled) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50, x: 0 };
      case 'down': return { y: -50, x: 0 };
      case 'left': return { y: 0, x: 50 };
      case 'right': return { y: 0, x: -50 };
      default: return { y: 50, x: 0 };
    }
  };

  return (
    <motion.div
      className={`scroll-reveal ${className}`}
      initial={{ 
        opacity: 0, 
        scale: 0.95,
        ...getInitialPosition()
      }}
      whileInView={{ 
        opacity: 1, 
        scale: 1,
        y: 0,
        x: 0
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
};
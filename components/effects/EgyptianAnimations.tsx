import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/design-utils';

// Scarab Flying Animation
export const ScarabLoader: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div
    className={cn('flex items-center justify-center', className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="text-pharaonic-gold font-hieroglyphic text-4xl"
      animate={{
        x: [0, 100, 0],
        rotate: [0, 360, 720],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      𓆣
    </motion.div>
  </motion.div>
);

// Pyramid Building Animation
export const PyramidBuilder: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className,
  size = 'md'
}) => {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn('relative', sizes[size])}>
        {/* Base */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-2 bg-gradient-to-r from-terracotta to-terracotta-dark"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0 }}
        />

        {/* Middle Layer */}
        <motion.div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-terracotta-light to-terracotta"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        {/* Top Layer */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-1/2 h-2 bg-gradient-to-r from-desert-sand to-terracotta-light"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />

        {/* Capstone */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-1/4 h-2 bg-pharaonic-gold"
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        />
      </div>
    </div>
  );
};

// Hieroglyph Writing Animation
export const HieroglyphWriter: React.FC<{
  symbols?: string[];
  className?: string;
  speed?: number;
}> = ({
  symbols = ['𓂀', '𓁹', '𓋹', '𓆣', '𓇳'],
  className,
  speed = 0.5
}) => (
    <div className={cn('flex items-center space-x-2', className)}>
      {symbols.map((symbol, index) => (
        <motion.span
          key={index}
          className="font-hieroglyphic text-pharaonic-gold text-2xl"
          initial={{ opacity: 0, y: 20, rotate: -90 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            duration: 0.8 / speed,
            delay: (index * 0.2) / speed,
            ease: "easeOut",
          }}
        >
          {symbol}
        </motion.span>
      ))}
    </div>
  );

// Golden Particle Effect
export const GoldenParticles: React.FC<{
  count?: number;
  className?: string;
}> = ({ count = 15, className }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className={cn('absolute inset-0 pointer-events-none', className)} />;

  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-pharaonic-gold rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Ankh Rotation Animation
export const AnkhSpinner: React.FC<{ className?: string; size?: string }> = ({
  className,
  size = 'text-4xl'
}) => (
  <motion.div
    className={cn('text-pharaonic-gold font-hieroglyphic', size, className)}
    animate={{ rotate: 360 }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    ☥
  </motion.div>
);

// Eye of Horus Blink Animation
export const EyeOfHorus: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div
    className={cn('text-pharaonic-gold font-hieroglyphic text-4xl', className)}
    animate={{
      scaleY: [1, 0.1, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3,
      ease: "easeInOut",
    }}
  >
    𓁹
  </motion.div>
);

// Lotus Bloom Animation
export const LotusBloom: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div
    className={cn('text-pharaonic-gold font-hieroglyphic text-4xl', className)}
    initial={{ scale: 0, rotate: 0 }}
    animate={{
      scale: [0, 1.2, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      repeatDelay: 2,
      ease: "easeInOut",
    }}
  >
    𓆸
  </motion.div>
);

// Combined Egyptian Loading Animation
export const EgyptianLoader: React.FC<{
  variant?: 'scarab' | 'pyramid' | 'hieroglyph' | 'ankh' | 'eye' | 'lotus';
  className?: string;
}> = ({ variant = 'scarab', className }) => {
  const loaders = {
    scarab: <ScarabLoader />,
    pyramid: <PyramidBuilder />,
    hieroglyph: <HieroglyphWriter />,
    ankh: <AnkhSpinner />,
    eye: <EyeOfHorus />,
    lotus: <LotusBloom />,
  };

  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      {loaders[variant]}
    </div>
  );
};

// Page Transition Animations
export const pageTransitions = {
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
  },

  crystalReveal: {
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
  }
};

const EgyptianAnimations = {
  ScarabLoader,
  PyramidBuilder,
  HieroglyphWriter,
  GoldenParticles,
  AnkhSpinner,
  EyeOfHorus,
  LotusBloom,
  EgyptianLoader,
  pageTransitions,
};

export default EgyptianAnimations;
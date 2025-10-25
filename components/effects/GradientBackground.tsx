import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/design-utils';

export interface GradientBackgroundProps {
  variant?: 'hero' | 'subtle' | 'royal' | 'terracotta' | 'animated' | 'particles';
  className?: string;
  children?: React.ReactNode;
  animate?: boolean;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  variant = 'hero',
  className,
  children,
  animate = true,
}) => {
  const gradients = {
    hero: 'bg-gradient-to-br from-pharaonic-gold via-deep-blue to-terracotta',
    subtle: 'bg-gradient-to-br from-papyrus to-desert-sand',
    royal: 'bg-gradient-to-br from-deep-blue to-royal-purple',
    terracotta: 'bg-gradient-to-br from-terracotta to-terracotta-dark',
    animated: 'bg-gradient-to-br from-pharaonic-gold via-deep-blue to-terracotta',
    particles: 'bg-gradient-to-br from-hieroglyph-black via-deep-blue to-pharaonic-gold',
  };

  const backgroundClass = cn(
    'relative overflow-hidden',
    gradients[variant],
    animate && variant === 'animated' && 'bg-size-200 animate-gradient-shift',
    className
  );

  return (
    <div className={backgroundClass}>
      {/* Animated Orbs */}
      {variant === 'hero' && animate && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-pharaonic-gold rounded-full opacity-20 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-48 h-48 bg-deep-blue rounded-full opacity-20 blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-32 h-32 bg-terracotta rounded-full opacity-30 blur-2xl"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </>
      )}

      {/* Particle Effect */}
      {variant === 'particles' && animate && (
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-pharaonic-gold rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Geometric Patterns */}
      {(variant === 'hero' || variant === 'royal') && (
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="egyptianPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <polygon points="10,0 20,10 10,20 0,10" fill="currentColor" opacity="0.3" />
                <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#egyptianPattern)" />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Overlay for better text readability */}
      {variant === 'hero' && (
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      )}
    </div>
  );
};

export default GradientBackground;
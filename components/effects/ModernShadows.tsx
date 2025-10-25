import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/design-utils';

export interface ModernShadowsProps {
  children: React.ReactNode;
  variant?: 'golden' | 'blue' | 'soft' | 'strong' | 'neon' | 'layered';
  className?: string;
  animated?: boolean;
  hover?: boolean;
}

const ModernShadows: React.FC<ModernShadowsProps> = ({
  children,
  variant = 'golden',
  className,
  animated = false,
  hover = true,
}) => {
  const shadowVariants = {
    golden: {
      base: 'shadow-golden',
      hover: 'hover:shadow-golden-hover',
      animated: 'shadow-golden',
    },
    blue: {
      base: 'shadow-blue',
      hover: 'hover:shadow-blue-hover',
      animated: 'shadow-blue',
    },
    soft: {
      base: 'shadow-soft',
      hover: 'hover:shadow-medium',
      animated: 'shadow-soft',
    },
    strong: {
      base: 'shadow-strong',
      hover: 'hover:shadow-strong',
      animated: 'shadow-strong',
    },
    neon: {
      base: 'shadow-[0_0_20px_rgba(212,175,55,0.5)]',
      hover: 'hover:shadow-[0_0_40px_rgba(212,175,55,0.8)]',
      animated: 'shadow-[0_0_20px_rgba(212,175,55,0.5)]',
    },
    layered: {
      base: 'shadow-[0_4px_14px_0_rgba(212,175,55,0.2),0_12px_20px_6px_rgba(30,58,138,0.1)]',
      hover: 'hover:shadow-[0_8px_25px_0_rgba(212,175,55,0.4),0_20px_40px_12px_rgba(30,58,138,0.2)]',
      animated: 'shadow-[0_4px_14px_0_rgba(212,175,55,0.2),0_12px_20px_6px_rgba(30,58,138,0.1)]',
    },
  };

  const shadowClasses = cn(
    'transition-all duration-300',
    shadowVariants[variant].base,
    hover && shadowVariants[variant].hover,
    className
  );

  if (animated) {
    return (
      <motion.div
        className={shadowClasses}
        animate={{
          boxShadow: [
            shadowVariants[variant].animated,
            variant === 'golden' 
              ? '0 8px 25px rgba(212, 175, 55, 0.4)'
              : variant === 'blue'
              ? '0 8px 25px rgba(30, 58, 138, 0.3)'
              : variant === 'neon'
              ? '0 0 40px rgba(212, 175, 55, 0.8)'
              : '0 8px 32px rgba(0, 0, 0, 0.16)',
            shadowVariants[variant].animated,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={shadowClasses}>
      {children}
    </div>
  );
};

// Specialized shadow components
export const GoldenGlow: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <ModernShadows variant="golden" animated hover className={className}>
    {children}
  </ModernShadows>
);

export const BlueGlow: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <ModernShadows variant="blue" animated hover className={className}>
    {children}
  </ModernShadows>
);

export const NeonGlow: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <ModernShadows variant="neon" animated hover className={className}>
    {children}
  </ModernShadows>
);

export const LayeredShadow: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <ModernShadows variant="layered" hover className={className}>
    {children}
  </ModernShadows>
);

export default ModernShadows;
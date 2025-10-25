import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/design-utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'golden' | 'scarab' | 'hieroglyph';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  variant = 'default',
  className 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  if (variant === 'scarab') {
    return (
      <motion.div
        className={cn('flex items-center justify-center', className)}
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className={cn('text-pharaonic-gold', sizes[size])}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <span className="font-hieroglyphic text-2xl">𓆣</span>
        </motion.div>
      </motion.div>
    );
  }

  if (variant === 'hieroglyph') {
    return (
      <div className={cn('flex items-center justify-center space-x-1', className)}>
        {['𓂀', '𓁹', '𓋹'].map((symbol, index) => (
          <motion.span
            key={index}
            className={cn('font-hieroglyphic text-pharaonic-gold', sizes[size])}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: index * 0.2 
            }}
          >
            {symbol}
          </motion.span>
        ))}
      </div>
    );
  }

  const spinnerClasses = cn(
    'animate-spin rounded-full border-2',
    sizes[size],
    variant === 'golden' 
      ? 'border-pharaonic-gold border-t-transparent' 
      : 'border-gray-300 border-t-gray-600',
    className
  );

  return (
    <motion.div
      className={spinnerClasses}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

export default LoadingSpinner;
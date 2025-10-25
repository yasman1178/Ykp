import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/design-utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'egyptian';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text',
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    variant = 'default',
    ...props 
  }, ref) => {
    const baseClasses = 'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none';
    
    const variants = {
      default: error 
        ? 'border-red-500 focus:border-red-500 bg-white' 
        : 'border-gray-200 focus:border-pharaonic-gold bg-white',
      egyptian: error
        ? 'border-red-500 focus:border-red-500 bg-gradient-to-r from-papyrus to-desert-sand bg-opacity-50'
        : 'border-pharaonic-gold border-opacity-30 focus:border-pharaonic-gold bg-gradient-to-r from-papyrus to-desert-sand bg-opacity-50',
    };

    const inputClasses = cn(
      baseClasses,
      variants[variant],
      leftIcon ? 'pl-12' : '',
      rightIcon ? 'pr-12' : '',
      className
    );

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-hieroglyph-black mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{leftIcon}</span>
            </div>
          )}
          
          <motion.input
            ref={ref}
            type={type}
            className={inputClasses}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{rightIcon}</span>
            </div>
          )}
        </div>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm mt-1"
          >
            {error}
          </motion.p>
        )}
        
        {helperText && !error && (
          <p className="text-gray-500 text-sm mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
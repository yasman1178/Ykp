import React from 'react';
import { cn } from '@/lib/design-utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'golden' | 'royal' | 'terracotta' | 'outline' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors duration-200';
    
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      golden: 'bg-gradient-to-r from-pharaonic-gold-light to-pharaonic-gold text-white shadow-golden',
      royal: 'bg-gradient-to-r from-deep-blue to-deep-blue-light text-white shadow-blue',
      terracotta: 'bg-gradient-to-r from-terracotta to-terracotta-dark text-white',
      outline: 'border-2 border-pharaonic-gold text-pharaonic-gold bg-transparent',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
    };
    
    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base',
    };

    const badgeClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      className
    );

    return (
      <span ref={ref} className={badgeClasses} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
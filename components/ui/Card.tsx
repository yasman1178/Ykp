import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/design-utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'golden' | 'floating' | 'crystal';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  hover?: boolean;
  clickable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md',
    children, 
    hover = true,
    clickable = false,
    ...props 
  }, ref) => {
    const baseClasses = 'rounded-2xl transition-all duration-300 border';
    
    const variants = {
      default: 'bg-white shadow-card border-gray-100 hover:shadow-card-hover',
      golden: 'bg-gradient-to-br from-papyrus to-desert-sand shadow-golden hover:shadow-golden-hover border-pharaonic-gold border-opacity-20',
      floating: 'bg-white shadow-floating hover:shadow-card-hover border-gray-100 hover:-translate-y-2',
      crystal: 'bg-white shadow-card hover:shadow-card-hover border-gray-100 clip-crystal-effect',
    };
    
    const paddings = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    const cardClasses = cn(
      baseClasses,
      variants[variant],
      paddings[padding],
      clickable && 'cursor-pointer',
      !hover && 'hover:shadow-card hover:-translate-y-0',
      className
    );

    const cardContent = (
      <div ref={ref} className={cardClasses} {...props}>
        {children}
      </div>
    );

    if (clickable) {
      return (
        <motion.div
          whileHover={{ 
            scale: 1.02,
            rotateX: 2,
            rotateY: 2,
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {cardContent}
        </motion.div>
      );
    }

    return cardContent;
  }
);

Card.displayName = 'Card';

// Card Header Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mb-4 pb-4 border-b border-gray-100', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// Card Title Component
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, level = 3, ...props }, ref) => {
    const headingClasses = cn(
      'font-pharaonic font-bold text-gradient-gold',
      level === 1 && 'text-3xl',
      level === 2 && 'text-2xl',
      level === 3 && 'text-xl',
      level === 4 && 'text-lg',
      level === 5 && 'text-base',
      level === 6 && 'text-sm',
      className
    );
    
    switch (level) {
      case 1:
        return <h1 ref={ref as any} className={headingClasses} {...props}>{children}</h1>;
      case 2:
        return <h2 ref={ref as any} className={headingClasses} {...props}>{children}</h2>;
      case 3:
        return <h3 ref={ref as any} className={headingClasses} {...props}>{children}</h3>;
      case 4:
        return <h4 ref={ref as any} className={headingClasses} {...props}>{children}</h4>;
      case 5:
        return <h5 ref={ref as any} className={headingClasses} {...props}>{children}</h5>;
      case 6:
        return <h6 ref={ref as any} className={headingClasses} {...props}>{children}</h6>;
      default:
        return <h3 ref={ref as any} className={headingClasses} {...props}>{children}</h3>;
    }
  }
);

CardTitle.displayName = 'CardTitle';

// Card Content Component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-hieroglyph-black leading-relaxed', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

// Card Footer Component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mt-4 pt-4 border-t border-gray-100 flex items-center justify-between', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export default Card;
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { cn } from '@/lib/design-utils';

export interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className,
  showHome = true,
}) => {
  const router = useRouter();
  
  // Auto-generate breadcrumbs from router if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = router.asPath.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    if (showHome) {
      breadcrumbs.push({
        label: 'Home',
        href: '/',
        icon: '🏠',
      });
    }
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Clean up segment for display
      const label = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      
      breadcrumbs.push({
        label,
        href: currentPath,
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();
  
  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav 
      className={cn(
        'flex items-center space-x-2 text-sm py-4',
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="mx-2 text-hieroglyph-light"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center"
              >
                {isLast ? (
                  <span className="flex items-center text-pharaonic-gold font-medium">
                    {item.icon && (
                      <span className="mr-1 text-xs">{item.icon}</span>
                    )}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center text-hieroglyph-light hover:text-pharaonic-gold transition-colors duration-200"
                  >
                    {item.icon && (
                      <span className="mr-1 text-xs">{item.icon}</span>
                    )}
                    {item.label}
                  </Link>
                )}
              </motion.div>
            </li>
          );
        })}
      </ol>
      
      {/* Egyptian decorative element */}
      <motion.div
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 0.3, rotate: 0 }}
        transition={{ delay: 0.5 }}
        className="ml-4 text-pharaonic-gold font-hieroglyphic text-lg"
      >
        𓂀
      </motion.div>
    </nav>
  );
};

export default Breadcrumbs;
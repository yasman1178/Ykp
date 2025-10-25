import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  arabicLabel?: string;
  href?: string;
}

interface EgyptianBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const EgyptianBreadcrumb: React.FC<EgyptianBreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`egyptian-breadcrumb ${className}`}
      aria-label="Breadcrumb navigation"
    >
      <ol className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-amber-600 select-none" aria-hidden="true">
                •
              </span>
            )}
            
            {item.href ? (
              <Link
                href={item.href}
                className="text-blue-700 hover:text-amber-600 transition-colors duration-300 flex items-center space-x-1 rtl:space-x-reverse"
              >
                {index === 0 && (
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )}
                <span>{item.arabicLabel || item.label}</span>
              </Link>
            ) : (
              <span className="text-amber-600 font-medium flex items-center space-x-1 rtl:space-x-reverse">
                <span className="text-lg">𓋹</span>
                <span>{item.arabicLabel || item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  );
};

export default EgyptianBreadcrumb;
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/design-utils';
import Button from './Button';

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  icon?: React.ReactNode;
  isExternal?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
  logo?: React.ReactNode;
  ctaButton?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ 
  items, 
  logo, 
  ctaButton, 
  className 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();

  const isActiveLink = (href: string) => {
    return router.pathname === href;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <nav className={cn('bg-white shadow-card border-b border-gray-100', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {logo || (
                <div className="flex items-center space-x-2">
                  {/* Egyptian Hieroglyph Icon */}
                  <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center">
                    <span className="text-white font-hieroglyphic text-lg">𓂀</span>
                  </div>
                  <span className="font-pharaonic font-bold text-xl text-gradient-gold">
                    Pharaonic Pillows
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {items.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    // Dropdown Menu
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={cn(
                          'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                          'text-hieroglyph-black hover:text-pharaonic-gold'
                        )}
                      >
                        {item.icon && <span className="mr-2">{item.icon}</span>}
                        {item.label}
                        <svg
                          className="ml-1 w-4 h-4 transition-transform duration-200"
                          style={{
                            transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)'
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-strong border border-gray-100 py-2 z-50"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className={cn(
                                  'block px-4 py-2 text-sm transition-colors duration-200',
                                  isActiveLink(child.href)
                                    ? 'text-pharaonic-gold bg-pharaonic-gold bg-opacity-10'
                                    : 'text-hieroglyph-black hover:text-pharaonic-gold hover:bg-gray-50'
                                )}
                              >
                                {child.icon && <span className="mr-2">{child.icon}</span>}
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    // Regular Link
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                        isActiveLink(item.href)
                          ? 'text-pharaonic-gold font-semibold'
                          : 'text-hieroglyph-black hover:text-pharaonic-gold'
                      )}
                      target={item.isExternal ? '_blank' : undefined}
                      rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {ctaButton && (
              <div className="hidden md:block">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={ctaButton.onClick}
                  className="whitespace-nowrap"
                >
                  {ctaButton.label}
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-hieroglyph-black hover:text-pharaonic-gold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pharaonic-gold"
              >
                <span className="sr-only">Open main menu</span>
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {items.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.label)}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                          'text-hieroglyph-black hover:text-pharaonic-gold hover:bg-gray-50'
                        )}
                      >
                        <span className="flex items-center">
                          {item.icon && <span className="mr-2">{item.icon}</span>}
                          {item.label}
                        </span>
                        <svg
                          className={cn(
                            'w-4 h-4 transition-transform duration-200',
                            activeDropdown === item.label ? 'rotate-180' : 'rotate-0'
                          )}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            className="ml-4 space-y-1"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className={cn(
                                  'block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                                  isActiveLink(child.href)
                                    ? 'text-pharaonic-gold bg-pharaonic-gold bg-opacity-10'
                                    : 'text-hieroglyph-black hover:text-pharaonic-gold hover:bg-gray-50'
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {child.icon && <span className="mr-2">{child.icon}</span>}
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
                        isActiveLink(item.href)
                          ? 'text-pharaonic-gold bg-pharaonic-gold bg-opacity-10'
                          : 'text-hieroglyph-black hover:text-pharaonic-gold hover:bg-gray-50'
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                      target={item.isExternal ? '_blank' : undefined}
                      rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA Button */}
              {ctaButton && (
                <div className="pt-4 pb-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      ctaButton.onClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    {ctaButton.label}
                  </Button>
                </div>
              )}
            </div>

            {/* Egyptian Decorative Border */}
            <div className="border-t border-gray-100">
              <div className="h-1 bg-gradient-to-r from-pharaonic-gold via-deep-blue to-terracotta"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/ui';
import type { NavigationItem } from '@/components/ui';

const Header: React.FC = () => {
  const navigationItems: NavigationItem[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Products',
      href: '/products',
      children: [
        {
          label: 'Classic Collection',
          href: '/products/',
          icon: '✨',
        },
        {
          label: 'Premium Collection',
          href: '/products/',
          icon: '🏛️',
        },
        {
          label: 'Heritage Collection',
          href: '/products/',
          icon: '👑',
        },
        {
          label: 'All Products',
          href: '/products',
          icon: '📦',
        },
      ],
    },
    {
      label: 'Egyptian Heritage',
      href: '/blog',
      children: [
        {
          label: 'Pharaonic Symbols',
          href: '/blog/symbols',
          icon: '𓂀',
        },
        {
          label: 'Egyptian Culture',
          href: '/blog/culture',
          icon: '🏺',
        },
        {
          label: 'All Articles',
          href: '/blog',
          icon: '📚',
        },
      ],
    },
    {
      label: 'B2B Partnership',
      href: '/partnership',
      children: [
        {
          label: 'Wholesale Inquiry',
          href: '/wholesale',
          icon: '🤝',
        },
        {
          label: 'Partnership Program',
          href: '/partnership',
          icon: '🌍',
        },
        {
          label: 'Distributor Portal',
          href: '/distributor',
          icon: '🏢',
        },
      ],
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ];

  const logo = (
    <div className="flex items-center space-x-3">
      {/* Egyptian Pharaonic Logo */}
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-pharaonic-gold to-pharaonic-gold-dark rounded-xl flex items-center justify-center shadow-golden">
          <span className="text-white font-hieroglyphic text-2xl">𓂀</span>
        </div>
        {/* Golden accent */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-pharaonic-gold-light rounded-full opacity-80"></div>
      </div>
      
      <div className="flex flex-col">
        <span className="font-pharaonic font-bold text-xl text-gradient-gold leading-tight">
          Pharaonic Pillows
        </span>
        <span className="text-xs text-hieroglyph-light font-medium tracking-wide">
          Egyptian Heritage Travel Comfort
        </span>
      </div>
    </div>
  );

  const ctaButton = {
    label: 'Get Wholesale Quote',
    href: '/wholesale',
    onClick: () => {
      // Track CTA click
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'click', {
          event_category: 'CTA',
          event_label: 'Header Wholesale Quote',
        });
      }
    },
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-card">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-pharaonic-gold via-deep-blue to-terracotta text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-sm font-medium">
            <span className="mr-2">🌟</span>
            <span>Premium Egyptian Travel Pillows - Wholesale Inquiries Welcome</span>
            <span className="ml-2">🌟</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <Navigation
        items={navigationItems}
        logo={logo}
        ctaButton={ctaButton}
        className="border-b-0"
      />

      {/* Egyptian decorative border */}
      <div className="h-1 bg-gradient-to-r from-pharaonic-gold via-deep-blue to-terracotta opacity-60"></div>
    </header>
  );
};

export default Header;
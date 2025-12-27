import React from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/ui';
import type { NavigationItem } from '@/components/ui';

interface HeaderProps {
  translations?: any;
  locale?: string;
}

const Header: React.FC<HeaderProps> = ({ translations: t, locale = 'en' }) => {
  const isRTL = locale === 'ar';

  // Use translations from t if available, otherwise fallback to hardcoded (though t should be available)
  const getNavLabel = (key: string, fallback: string) => {
    return t?.nav?.[key] || fallback;
  };

  const navigationItems: NavigationItem[] = [
    {
      label: getNavLabel('home', 'Home'),
      href: '/',
    },
    {
      label: getNavLabel('products', 'Products'),
      href: '/products',
      children: [
        {
          label: isRTL ? 'المجموعة الكلاسيكية' : 'Classic Collection',
          href: '/products/',
          icon: '✨',
        },
        {
          label: isRTL ? 'المجموعة الممتازة' : 'Premium Collection',
          href: '/products/',
          icon: '🏛️',
        },
        {
          label: isRTL ? 'مجموعة التراث' : 'Heritage Collection',
          href: '/products/',
          icon: '👑',
        },
        {
          label: isRTL ? 'جميع المنتجات' : 'All Products',
          href: '/products',
          icon: '📦',
        },
      ],
    },
    {
      label: getNavLabel('blog', 'Egyptian Heritage'),
      href: '/blog',
      children: [
        {
          label: isRTL ? 'الرموز الفرعونية' : 'Pharaonic Symbols',
          href: '/blog/symbols',
          icon: '𓂀',
        },
        {
          label: isRTL ? 'الثقافة المصرية' : 'Egyptian Culture',
          href: '/blog/culture',
          icon: '🏺',
        },
        {
          label: isRTL ? 'جميع المقالات' : 'All Articles',
          href: '/blog',
          icon: '📚',
        },
      ],
    },
    {
      label: getNavLabel('partnership', 'B2B Partnership'),
      href: '/partnership',
      children: [
        {
          label: isRTL ? 'طلب الجملة' : 'Wholesale Inquiry',
          href: '/wholesale',
          icon: '🤝',
        },
        {
          label: isRTL ? 'برنامج الشراكة' : 'Partnership Program',
          href: '/partnership',
          icon: '🌍',
        },
        {
          label: isRTL ? 'بوابة الموزعين' : 'Distributor Portal',
          href: '/distributor',
          icon: '🏢',
        },
      ],
    },
    {
      label: getNavLabel('about', 'About'),
      href: '/about',
    },
    {
      label: getNavLabel('contact', 'Contact'),
      href: '/contact',
    },
  ];

  const logo = (
    <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
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
          {isRTL ? 'واي كيه بي سابلايز - القاهرة الجديدة' : 'YKP Supplies - New Cairo'}
        </span>
        <span className="text-xs text-hieroglyph-light font-medium tracking-wide">
          {t?.footer?.tagline || (isRTL ? 'راحة السفر بعبق التراث المصري' : 'Egyptian Heritage Travel Comfort')}
        </span>
      </div>
    </div>
  );

  const ctaButton = {
    label: t?.hero?.wholesaleBtn || (isRTL ? 'طلب عرض سعر' : 'Get Wholesale Quote'),
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
            <span>{isRTL ? 'وسائد سفر مصرية فاخرة - نرحب بطلبات الجملة' : 'Premium Egyptian Travel Pillows - Wholesale Inquiries Welcome'}</span>
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
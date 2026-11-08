import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGlobe, FaWhatsapp } from 'react-icons/fa';

interface HeaderProps {
  translations?: any;
  locale?: string;
}

const Header: React.FC<HeaderProps> = ({ locale = 'en' }) => {
  const router = useRouter();
  const isRTL = locale === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLocale = isRTL ? 'en' : 'ar';
    router.push(router.pathname, router.asPath, { locale: nextLocale });
  };

  const navLinks = [
    { label: isRTL ? 'الرئيسية' : 'Home', href: '/' },
    { label: isRTL ? 'المجموعات' : 'Collections', href: '/products' },
    { label: isRTL ? 'طلبات الجملة (B2B)' : 'Wholesale B2B', href: '/wholesale' },
    { label: isRTL ? 'شراء للأفراد' : 'Retail Orders', href: '/retail' },
    { label: isRTL ? 'عن المصنع' : 'Atelier & Craft', href: '/about' },
    { label: isRTL ? 'تواصل معنا' : 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0D11]/95 backdrop-blur-md border-b border-amber-900/20 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-black font-serif font-black text-xl shadow-md shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform">
              𓂀
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                YKP Supplies
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]/80 font-mono -mt-1">
                {isRTL ? 'مصنع مخدات السفر الفاخرة' : 'Egyptian Travel Pillows Atelier'}
              </span>
            </div>
          </Link>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = router.pathname === link.href || (link.href !== '/' && router.pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium whitespace-nowrap transition-colors relative py-1 ${
                    isActive
                      ? 'text-[#D4AF37] font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D4AF37]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Language Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 hover:text-white border border-slate-800 hover:border-[#D4AF37]/40 bg-slate-900/60 transition-colors"
              title={isRTL ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <FaGlobe className="text-[#D4AF37] text-xs" />
              <span>{isRTL ? 'EN' : 'عربي'}</span>
            </button>

            {/* Primary Action Button */}
            <Link
              href="/wholesale"
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity whitespace-nowrap shadow-lg shadow-[#D4AF37]/15"
            >
              {isRTL ? 'اطلب عرض سعر (B2B)' : 'Request Quote'}
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-800/80 bg-[#0B0D11]/98 px-4 pt-4 pb-6 space-y-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 bg-slate-900 border border-slate-800"
              >
                <FaGlobe className="text-[#D4AF37]" />
                <span>{isRTL ? 'Switch to English' : 'التحويل إلى العربية'}</span>
              </button>

              <a
                href="https://wa.me/201002406013"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-800/50"
              >
                <FaWhatsapp />
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
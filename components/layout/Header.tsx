import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars, FaTimes, FaGlobe, FaWhatsapp, FaChevronDown } from 'react-icons/fa';

interface HeaderProps {
  translations?: any;
  locale?: string;
}

const Header: React.FC<HeaderProps> = ({ locale = 'en' }) => {
  const router = useRouter();
  const currentLocale = router.locale || locale;
  const isRTL = currentLocale === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = isRTL ? 'en' : 'ar';
    router.push(router.pathname, router.asPath, { locale: nextLocale });
  };

  const navItems = [
    {
      id: 'products',
      label: isRTL ? 'المنتجات' : 'Products',
      href: '/products',
      children: [
        { label: isRTL ? 'جميع المنتجات (كتالوج B2B)' : 'All Products (B2B Catalog)', href: '/products' },
        { label: isRTL ? 'المجموعة الفرعونية التراثية' : 'Egyptian Heritage Collection', href: '/products/tb' },
        { label: isRTL ? 'مجموعة ميموري فوم الفاخرة' : 'Premium Collection', href: '/products/b123' },
        { label: isRTL ? 'المجموعة الكلاسيكية' : 'Classic Collection', href: '/products/t' },
        { label: isRTL ? 'التصنيع المخصص والخاص' : 'Custom & OEM Products', href: '/custom-travel-pillows' },
        { label: isRTL ? 'دمية الجمل المحبوب التراثية' : 'The Beloved Camel (Heritage Plush)', href: '/products/souvenirs/camel-plush-22cm' }
      ]
    },
    {
      id: 'manufacturing',
      label: isRTL ? 'التصنيع' : 'Manufacturing',
      href: '/manufacturing',
      children: [
        { label: isRTL ? 'عملية التصنيع والإنتاج' : 'Manufacturing Process', href: '/manufacturing' },
        { label: isRTL ? 'جولة داخل مصنعنا' : 'Inside Our Factory', href: '/factory' },
        { label: isRTL ? 'معايير الجودة والمواد' : 'Materials & Quality', href: '/quality' },
        { label: isRTL ? 'الشحن والتصدير الدولي' : 'International Shipping', href: '/international-shipping' }
      ]
    },
    {
      id: 'custom',
      label: isRTL ? 'العلامات الخاصة' : 'Custom & Private Label',
      href: '/custom-travel-pillows'
    },
    {
      id: 'wholesale',
      label: isRTL ? 'الجملة والتصدير' : 'Wholesale',
      href: '/wholesale-travel-pillows'
    },
    {
      id: 'partnerships',
      label: isRTL ? 'الشراكات' : 'Partnerships',
      href: '/distributor',
      children: [
        { label: isRTL ? 'كن موزعاً معتمداً' : 'Become a Distributor', href: '/distributor' },
        { label: isRTL ? 'المتاحف والمتاجر السياحية' : 'Museum & Tourist Gifts', href: '/museum-tourist-gifts' },
        { label: isRTL ? 'هدايا الشركات والفعاليات' : 'Corporate Travel Gifts', href: '/corporate-travel-gifts' }
      ]
    },
    {
      id: 'resources',
      label: isRTL ? 'المصادر' : 'Resources',
      href: '/blog',
      children: [
        { label: isRTL ? 'مدونة التصنيع والتجارة' : 'Manufacturing & Industry Blog', href: '/blog' },
        { label: isRTL ? 'الأسئلة الشائعة (FAQ)' : 'Frequently Asked Questions', href: '/faq' },
        { label: isRTL ? 'سياسات الشحن والجمارك' : 'Shipping & Logistics Guide', href: '/international-shipping' }
      ]
    },
    {
      id: 'about',
      label: isRTL ? 'عن المصنع' : 'About',
      href: '/about'
    },
    {
      id: 'contact',
      label: isRTL ? 'اتصل بنا' : 'Contact',
      href: '/contact'
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-800 text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          
          {/* Zone 1: Brand Wordmark (Single clean element) */}
          <Link
            href="/"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-slate-950 font-serif font-black text-xl shadow-md shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform">
              𓂀
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                YKP Supplies
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono -mt-0.5">
                {isRTL ? 'مصنع مخدات السفر المصرية B2B' : 'Egyptian Travel Products Manufacturer'}
              </span>
            </div>
          </Link>

          {/* Zone 2: Navigation Links & Dropdowns */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium" ref={dropdownRef}>
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive = router.pathname === item.href || (item.href !== '/' && router.pathname.startsWith(item.href));

              if (hasChildren) {
                const isOpen = activeDropdown === item.id;
                return (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => setActiveDropdown(isOpen ? null : item.id)}
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      className={`flex items-center gap-1.5 py-2 px-1 whitespace-nowrap transition-colors ${
                        isActive || isOpen ? 'text-[#D4AF37]' : 'text-slate-200 hover:text-white'
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span>{item.label}</span>
                      <FaChevronDown className={`text-[10px] transition-transform ${isOpen ? 'rotate-180 text-[#D4AF37]' : 'text-slate-400'}`} />
                    </button>

                    {isOpen && (
                      <div
                        onMouseLeave={() => setActiveDropdown(null)}
                        className={`absolute top-full mt-1 w-64 bg-[#0F1D40] border border-slate-700/80 rounded-xl shadow-2xl py-2 z-50 ${
                          isRTL ? 'right-0' : 'left-0'
                        }`}
                      >
                        {item.children?.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-4 py-2.5 text-xs text-slate-200 hover:bg-[#1A2E62] hover:text-[#D4AF37] transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`py-2 px-1 whitespace-nowrap transition-colors relative ${
                    isActive ? 'text-[#D4AF37] font-semibold' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D4AF37] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: CTA & Language Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white border border-slate-700 hover:border-[#D4AF37]/50 bg-slate-900/60 transition-colors"
              title={isRTL ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <FaGlobe className="text-[#D4AF37] text-xs" />
              <span>{isRTL ? 'EN' : 'عربي'}</span>
            </button>

            {/* WhatsApp Quick Contact */}
            <a
              href="https://wa.me/201002406013?text=Hello%20YKP%20Supplies%2C%20I%20would%20like%20to%20inquire%20about%20wholesale%20travel%20pillows"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/40 transition-colors"
              title="Direct WhatsApp Inquiries"
            >
              <FaWhatsapp className="text-sm" />
              <span>WhatsApp</span>
            </a>

            {/* Primary Action Button (The single main CTA) */}
            <Link
              href="/request-a-quote"
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 transition-all whitespace-nowrap shadow-md shadow-[#D4AF37]/20"
            >
              {isRTL ? 'اطلب عرض أسعار' : 'Request a Quote'}
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-[#0B132B] px-4 pt-4 pb-8 space-y-4 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.id} className="space-y-1">
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-slate-800 hover:text-[#D4AF37]"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className={`${isRTL ? 'pr-4 border-r' : 'pl-4 border-l'} border-slate-800 space-y-1`}>
                  {item.children.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs text-slate-400 hover:text-[#D4AF37]"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 bg-slate-800 border border-slate-700"
            >
              <FaGlobe className="text-[#D4AF37]" />
              <span>{isRTL ? 'Switch to English' : 'التحويل إلى العربية'}</span>
            </button>

            <a
              href="https://wa.me/201002406013"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60"
            >
              <FaWhatsapp />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
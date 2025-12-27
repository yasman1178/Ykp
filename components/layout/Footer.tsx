import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { GradientBackground } from '@/components/effects';

interface FooterProps {
  translations?: any;
  locale?: string;
}

const Footer: React.FC<FooterProps> = ({ translations: t, locale = 'en' }) => {
  const isRTL = locale === 'ar';
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t?.footer?.sections?.products?.title || 'Products',
      links: [
        { label: t?.footer?.sections?.products?.premium || 'Premium Collection (B123)', href: '/products/' },
        { label: t?.footer?.sections?.products?.classic || 'Classic Collection (T)', href: '/products/' },
        { label: t?.footer?.sections?.products?.heritage || 'Heritage Collection (TB)', href: '/products/' },
        { label: t?.footer?.sections?.products?.all || 'All Products', href: '/products' },
      ],
    },
    {
      title: t?.footer?.sections?.b2b?.title || 'B2B Services',
      links: [
        { label: t?.footer?.sections?.b2b?.wholesale || 'Wholesale Inquiry', href: '/wholesale' },
        { label: t?.footer?.sections?.b2b?.partnership || 'Partnership Program', href: '/partnership' },
        { label: t?.footer?.sections?.b2b?.distributor || 'Distributor Portal', href: '/distributor' },
        { label: t?.footer?.sections?.b2b?.bulk || 'Bulk Pricing', href: '/wholesale#pricing' },
      ],
    },
    {
      title: t?.footer?.sections?.heritage?.title || 'Egyptian Heritage',
      links: [
        { label: t?.footer?.sections?.heritage?.articles || 'All Articles', href: '/blog' },
      ],
    },
    {
      title: t?.footer?.sections?.company?.title || 'Company',
      links: [
        { label: t?.footer?.sections?.company?.about || 'About Us', href: '/about' },
        { label: t?.footer?.sections?.company?.contact || 'Contact', href: '/contact' },
        { label: t?.footer?.sections?.company?.quality || 'Quality Standards', href: '/quality' },
        { label: t?.footer?.sections?.company?.certifications || 'Certifications', href: '/certifications' },
      ],
    },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ykp-eg-483b8a398',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/new.cairo.893792',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <GradientBackground variant="subtle" className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Company info */}
            <div className="lg:col-span-2">
              <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3 mb-6`}>
                <div className="w-12 h-12 bg-gradient-to-br from-pharaonic-gold to-pharaonic-gold-dark rounded-xl flex items-center justify-center shadow-golden shrink-0">
                  <span className="text-white font-hieroglyphic text-2xl">𓂀</span>
                </div>
                <div>
                  <h3 className="font-pharaonic font-bold text-xl text-gradient-gold">
                    {isRTL ? 'واي كيه بي سابلايز - القاهرة الجديدة' : 'YKP Supplies - New Cairo'}
                  </h3>
                  <p className="text-sm text-hieroglyph-light">
                    {t?.footer?.tagline || 'Egyptian Heritage Travel Comfort'}
                  </p>
                </div>
              </div>

              <p className="text-hieroglyph-black mb-6 leading-relaxed">
                {t?.footer?.aboutText || 'Premium Egyptian travel pillows inspired by ancient Pharaonic designs. Combining traditional Egyptian artistry with modern memory foam technology for the ultimate travel comfort experience.'}
              </p>

              <div className="mb-6">
                <h4 className="font-semibold text-hieroglyph-black mb-3">
                  {t?.footer?.partnershipTitle || 'Ready for Wholesale Partnership?'}
                </h4>
                <Link href="/wholesale">
                  <Button variant="primary" size="md" className="w-full sm:w-auto">
                    {t?.footer?.quoteBtn || 'Get Wholesale Quote'}
                  </Button>
                </Link>
              </div>

              {/* Social links */}
              <div className={`flex ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-hieroglyph-black hover:text-pharaonic-gold hover:bg-pharaonic-gold hover:bg-opacity-10 transition-all duration-200 shadow-soft hover:shadow-golden"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-hieroglyph-black mb-4 font-pharaonic">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-hieroglyph-light hover:text-pharaonic-gold transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter signup */}
          <div className="bg-white rounded-2xl p-8 mb-12 shadow-card border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-pharaonic font-bold text-2xl text-gradient-gold mb-2">
                  {t?.footer?.newsletter?.title || 'Stay Updated with Egyptian Heritage'}
                </h3>
                <p className="text-hieroglyph-black">
                  {t?.footer?.newsletter?.subtitle || 'Get the latest updates on new Pharaonic designs, wholesale opportunities, and Egyptian cultural insights delivered to your inbox.'}
                </p>
              </div>
              <div className={`flex flex-col sm:flex-row ${isRTL ? 'sm:space-x-reverse' : ''} gap-3`}>
                <input
                  type="email"
                  placeholder={t?.footer?.newsletter?.placeholder || 'Enter your email address'}
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pharaonic-gold focus:outline-none transition-colors duration-200"
                />
                <Button variant="primary" size="md" className="whitespace-nowrap">
                  {t?.footer?.newsletter?.subscribeBtn || 'Subscribe'}
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className={`flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 ${isRTL ? 'sm:space-x-reverse' : ''} sm:space-x-6 text-sm text-hieroglyph-light`}>
                <p>© {currentYear} {isRTL ? 'واي كيه بي سابلايز - القاهرة الجديدة. كل الحقوق محفوظة.' : 'YKP Supplies - New Cairo. All rights reserved.'}</p>
                <div className={`flex ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                  <Link href="/privacy" className="hover:text-pharaonic-gold transition-colors">
                    {t?.footer?.bottom?.privacy || 'Privacy Policy'}
                  </Link>
                  <Link href="/terms" className="hover:text-pharaonic-gold transition-colors">
                    {t?.footer?.bottom?.terms || 'Terms of Service'}
                  </Link>
                  <Link href="/cookies" className="hover:text-pharaonic-gold transition-colors">
                    {t?.footer?.bottom?.cookies || 'Cookie Policy'}
                  </Link>
                </div>
              </div>

              {/* Egyptian decorative elements */}
              <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 text-pharaonic-gold opacity-60`}>
                <span className="font-hieroglyphic text-lg">𓂀</span>
                <span className="text-xs font-medium">{t?.footer?.bottom?.pride || 'Made with Egyptian Pride'}</span>
                <span className="font-hieroglyphic text-lg">𓁹</span>
              </div>
            </div>
          </div>
        </div>

        {/* Egyptian pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="egyptianFooterPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <polygon points="5,0 10,5 5,10 0,5" fill="currentColor" opacity="0.3" />
                <circle cx="5" cy="5" r="2" fill="currentColor" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#egyptianFooterPattern)" />
          </svg>
        </div>
      </GradientBackground>
    </footer>
  );
};

export default Footer;
import React from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { pageTransitions } from '@/components/effects/EgyptianAnimations';

export interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  metaDescription?: string;
  egyptianTheme?: 'gold' | 'blue' | 'terracotta';
  showBreadcrumbs?: boolean;
  className?: string;
  translations?: any;
  locale?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  pageTitle = 'YKP Supplies - Egyptian Pharaonic Travel Pillows Manufacturer',
  metaDescription = 'Premium Egyptian travel pillows manufactured by YKP Supplies in New Cairo. High-density memory foam with authentic Pharaonic heritage for global wholesale and retail.',
  egyptianTheme = 'gold',
  showBreadcrumbs = false,
  className = '',
  translations,
  locale = 'en',
}) => {
  const themeClasses = {
    gold: 'bg-gradient-to-br from-papyrus to-desert-sand',
    blue: 'bg-gradient-to-br from-nile-blue-light to-deep-blue-light',
    terracotta: 'bg-gradient-to-br from-terracotta-light to-terracotta',
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content="/og-image.jpg" />

        {/* Additional SEO */}
        <meta name="keywords" content="Egyptian travel pillows, Pharaonic design, memory foam, wholesale, B2B, travel comfort, Egyptian heritage, YKP Supplies" />
        <meta name="author" content="YKP Supplies" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ykp-eg.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "YKP Supplies",
              "description": metaDescription,
              "url": "https://www.ykp-eg.com",
              "logo": "https://www.ykp-eg.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+20-100-240-6013",
                "contactType": "sales",
                "areaServed": "Worldwide",
                "availableLanguage": ["English", "Arabic"]
              },
              "sameAs": [
                "https://www.linkedin.com/in/ykp-eg-483b8a398",
                "https://www.facebook.com/new.cairo.893792"
              ]
            })
          }}
        />
      </Head>

      <div className={`min-h-screen flex flex-col ${className}`}>
        <Header translations={translations} locale={locale} />

        <main className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pageTitle}
              initial={pageTransitions.fadeInUp.initial}
              animate={pageTransitions.fadeInUp.animate}
              exit={pageTransitions.fadeInUp.exit}
              transition={pageTransitions.fadeInUp.transition}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer translations={translations} locale={locale} />
      </div>

      {/* Egyptian floating elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Floating hieroglyphs */}
        <motion.div
          className="absolute top-1/4 left-10 text-pharaonic-gold opacity-10 font-hieroglyphic text-6xl"
          animate={{
            y: [-20, 20, -20],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          𓂀
        </motion.div>

        <motion.div
          className="absolute top-3/4 right-10 text-pharaonic-gold opacity-10 font-hieroglyphic text-4xl"
          animate={{
            y: [20, -20, 20],
            rotate: [5, -5, 5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          𓁹
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/4 text-pharaonic-gold opacity-5 font-hieroglyphic text-8xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          𓋹
        </motion.div>
      </div>
    </>
  );
};

export default Layout;
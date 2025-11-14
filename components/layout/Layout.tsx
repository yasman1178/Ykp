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
}

const Layout: React.FC<LayoutProps> = ({
  children,
  pageTitle = 'Pharaonic Pillows - Egyptian Heritage Travel Comfort',
  metaDescription = 'Premium Egyptian travel pillows inspired by ancient Pharaonic designs. Wholesale opportunities available for international distributors.',
  egyptianTheme = 'gold',
  showBreadcrumbs = false,
  className = '',
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
        <meta name="keywords" content="Egyptian travel pillows, Pharaonic design, memory foam, wholesale, B2B, travel comfort, Egyptian heritage" />
        <meta name="author" content="Pharaonic Pillows" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Pharaonic Pillows",
              "description": metaDescription,
              "url": typeof window !== 'undefined' ? window.location.origin : '',
              "logo": "/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-XXX-XXX-XXXX",
                "contactType": "customer service",
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
        <Header />
        
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
        
        <Footer />
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
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

const LayoutContext = React.createContext<boolean>(false);

export interface LayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  showBreadcrumbs?: boolean;
  className?: string;
  translations?: any;
  locale?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  pageTitle = 'Egyptian Travel Pillow Manufacturer for Global Brands | YKP Supplies',
  metaDescription = 'YKP Supplies manufactures high-density memory foam travel pillows, custom OEM private label travel collections, and Egyptian heritage products in Cairo for global B2B distributors and retailers.',
  keywords = 'travel pillow manufacturer, wholesale travel pillows, Egyptian travel pillow manufacturer, custom travel pillows, private label travel pillows, memory foam neck pillow wholesale, YKP Supplies, Egypt manufacturing',
  canonicalUrl,
  ogImage = '/images/factory/factory-line.jpg',
  className = '',
  translations,
  locale = 'en',
}) => {
  const router = useRouter();
  const isNested = React.useContext(LayoutContext);
  if (isNested) {
    return <>{children}</>;
  }

  const currentLocale = router.locale || locale;
  const isRTL = currentLocale === 'ar';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ykp-eg.com';
  const currentCanonical = canonicalUrl || `${siteUrl}${router.asPath.split('?')[0]}`;

  return (
    <LayoutContext.Provider value={true}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="author" content="YKP Supplies" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={currentCanonical} />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="YKP Supplies" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
        <meta property="og:url" content={currentCanonical} />
        <meta property="og:locale" content={isRTL ? 'ar_EG' : 'en_US'} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />

        {/* Structured Data: Organization & Manufacturer */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "Manufacturer"],
              "name": "YKP Supplies",
              "alternateName": ["YKP Travel Products", "شركة واي كيه بي للمستلزمات"],
              "url": "https://www.ykp-eg.com",
              "logo": "https://www.ykp-eg.com/logo.png",
              "description": metaDescription,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New Cairo",
                "addressRegion": "Cairo Governorate",
                "addressCountry": "EG"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+20-100-240-6013",
                  "contactType": "sales",
                  "areaServed": "Worldwide",
                  "availableLanguage": ["English", "Arabic"]
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/in/ykp-eg-483b8a398",
                "https://www.facebook.com/new.cairo.893792"
              ]
            })
          }}
        />
      </Head>

      <div className={`min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-slate-950 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <Header translations={translations} locale={currentLocale} />

        <main className="flex-1 w-full relative">
          {children}
        </main>

        <Footer translations={translations} locale={currentLocale} />
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
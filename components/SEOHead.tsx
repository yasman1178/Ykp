import Head from 'next/head';
import { SEOConfig } from '@/lib/seo-config';

interface SEOHeadProps {
  seoConfig: SEOConfig;
  structuredData?: any;
  canonical?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ 
  seoConfig, 
  structuredData,
  canonical 
}) => {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoConfig.title}</title>
      <meta name="description" content={seoConfig.description} />
      <meta name="keywords" content={seoConfig.keywords.join(', ')} />
      <meta name="robots" content={seoConfig.robots || 'index, follow'} />
      <meta name="author" content="Pharaonic Pillows" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Language and Locale */}
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="language" content="English" />
      <link rel="alternate" hrefLang="en" href={seoConfig.openGraph.url} />
      <link rel="alternate" hrefLang="ar" href={`${seoConfig.openGraph.url}/ar`} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seoConfig.openGraph.title} />
      <meta property="og:description" content={seoConfig.openGraph.description} />
      <meta property="og:image" content={seoConfig.openGraph.image} />
      <meta property="og:url" content={seoConfig.openGraph.url} />
      <meta property="og:type" content={seoConfig.openGraph.type} />
      <meta property="og:site_name" content={seoConfig.openGraph.siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="ar_EG" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={seoConfig.twitter.card} />
      <meta name="twitter:title" content={seoConfig.twitter.title} />
      <meta name="twitter:description" content={seoConfig.twitter.description} />
      <meta name="twitter:image" content={seoConfig.twitter.image} />
      {seoConfig.twitter.creator && (
        <meta name="twitter:creator" content={seoConfig.twitter.creator} />
      )}
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="EG" />
      <meta name="geo.placename" content="Egypt" />
      <meta name="geo.position" content="26.8206;30.8025" />
      <meta name="ICBM" content="26.8206, 30.8025" />
      
      {/* Business Meta Tags */}
      <meta name="business:contact_data:street_address" content="Cairo, Egypt" />
      <meta name="business:contact_data:locality" content="Cairo" />
      <meta name="business:contact_data:region" content="Cairo Governorate" />
      <meta name="business:contact_data:postal_code" content="11511" />
      <meta name="business:contact_data:country_name" content="Egypt" />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Default Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Pharaonic Pillows',
            description: 'Premium Egyptian travel pillows inspired by ancient Pharaonic designs',
            url: 'https://pharaonicpillows.com',
            logo: 'https://pharaonicpillows.com/logo.png',
            foundingDate: '2020',
            foundingLocation: {
              '@type': 'Place',
              name: 'Cairo, Egypt'
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+20-XXX-XXX-XXXX',
              contactType: 'customer service',
              availableLanguage: ['English', 'Arabic'],
              areaServed: 'Worldwide'
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Cairo',
              addressRegion: 'Cairo Governorate',
              postalCode: '11511',
              addressCountry: 'EG'
            },
            sameAs: [
              'https://www.linkedin.com/in/ykp-eg-483b8a398',
              'https://www.facebook.com/new.cairo.893792'
            ],
            makesOffer: {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Egyptian Travel Pillows',
                category: 'Travel Accessories'
              },
              businessFunction: 'http://purl.org/goodrelations/v1#Sell',
              eligibleRegion: {
                '@type': 'Place',
                name: 'Worldwide'
              }
            }
          })
        }}
      />
    </Head>
  );
};

export default SEOHead;
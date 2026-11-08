import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | 'product';
    canonicalUrl?: string;
    translations?: any;
    locale?: string;
    schema?: string | object;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    ogImage = '/hero.png',
    ogType = 'website',
    canonicalUrl,
    translations: t,
    locale = 'en',
    schema,
}) => {
    const router = useRouter();
    const baseUrl = 'https://www.ykp-eg.com';
    const currentPath = router.asPath;
    const fullCanonicalUrl = canonicalUrl || `${baseUrl}${currentPath}`;

    // Use translations if provided, otherwise fallback to props or defaults
    const finalTitle = title || (t?.site?.title) || 'YKP Supplies | Egyptian Travel Pillows Manufacturer';
    const finalDescription = description || (t?.site?.description) || 'Premium Egyptian Pharaonic Travel Pillows manufactured in New Cairo by YKP Supplies';
    const finalKeywords = keywords || t?.keywords || 'egyptian travel pillows, pharaonic design, memory foam, YKP Supplies, wholesale travel pillows';

    return (
        <Head>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />

            {/* Viewport & Charset */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Canonical */}
            <link rel="canonical" href={fullCanonicalUrl} />

            {/* Open Graph */}
            <meta property="og:site_name" content="YKP Supplies" />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullCanonicalUrl} />
            <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`} />
            <meta property="og:locale" content={locale === 'ar' ? 'ar_EG' : 'en_US'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`} />

            {/* Language Alternates */}
            <link rel="alternate" hrefLang="en" href={`${baseUrl}/en${currentPath.replace(/^\/(en|ar)/, '')}`} />
            <link rel="alternate" hrefLang="ar" href={`${baseUrl}/ar${currentPath.replace(/^\/(en|ar)/, '')}`} />
            <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en${currentPath.replace(/^\/(en|ar)/, '')}`} />

            {/* JSON-LD Schema */}
            {schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: typeof schema === 'string' ? schema : JSON.stringify(schema),
                    }}
                />
            )}
        </Head>
    );
};

export default SEO;

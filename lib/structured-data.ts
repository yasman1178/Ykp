// Structured Data Utilities for SEO
// Comprehensive schema.org markup for Egyptian Pharaonic Pillows website

export interface Product {
  id: string;
  name: string;
  description: string;
  collection: string;
  images: string[];
  pricing?: {
    retail?: { min: number; max: number };
    wholesale?: { min: number; max: number };
  };
  specifications?: {
    material: string;
    dimensions: string;
    weight: string;
    features: string[];
  };
  availability?: {
    inStock: boolean;
    quantity?: number;
  };
  featured?: boolean;
  lastModified?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  publishDate: string;
  lastModified: string;
  author: string;
  tags: string[];
  relatedProducts: string[];
}

// Organization Schema
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.ykp-eg.com/#organization',
    name: 'YKP Supplies',
    alternateName: 'Egyptian Pharaonic Travel Pillows',
    description: 'Premium Egyptian travel pillows inspired by ancient Pharaonic designs. Wholesale B2B opportunities for international distributors.',
    url: 'https://www.ykp-eg.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.ykp-eg.com/logo.png',
      width: 300,
      height: 100
    },
    image: 'https://www.ykp-eg.com/og-image-pharaonic-pillows.jpg',
    foundingDate: '2020',
    foundingLocation: {
      '@type': 'Place',
      name: 'Cairo, Egypt',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 30.0444,
        longitude: 31.2357
      }
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cairo',
      addressRegion: 'Cairo Governorate',
      postalCode: '11511',
      addressCountry: 'EG'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+20-100-240-6013',
        contactType: 'customer service',
        availableLanguage: ['English', 'Arabic'],
        areaServed: 'Worldwide'
      },
      {
        '@type': 'ContactPoint',
        email: 'wholesale@ykp-eg.com',
        contactType: 'sales',
        availableLanguage: ['English', 'Arabic'],
        areaServed: 'Worldwide'
      }
    ],
    sameAs: [
      'https://www.linkedin.com/in/ykp-eg-483b8a398',
      'https://www.facebook.com/new.cairo.893792',
      'https://twitter.com/ykp-eg'
    ],
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'Egyptian Travel Pillows',
        category: 'Travel Accessories',
        brand: {
          '@type': 'Brand',
          name: 'Pharaonic Pillows'
        }
      },
      businessFunction: 'http://purl.org/goodrelations/v1#Sell',
      eligibleRegion: {
        '@type': 'Place',
        name: 'Worldwide'
      }
    },
    keywords: [
      'Egyptian travel pillows',
      'Pharaonic design',
      'memory foam pillows',
      'wholesale travel accessories',
      'B2B travel products',
      'Egyptian heritage',
      'travel comfort'
    ]
  };
};

// Website Schema
export const generateWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.ykp-eg.com/#website',
    url: 'https://www.ykp-eg.com',
    name: 'Pharaonic Pillows - Egyptian Travel Pillows',
    description: 'Premium Egyptian travel pillows with authentic Pharaonic designs. B2B wholesale opportunities for international distributors.',
    publisher: {
      '@id': 'https://www.ykp-eg.com/#organization'
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.ykp-eg.com/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    ],
    inLanguage: ['en-US', 'ar-EG']
  };
};

// Product Schema
export const generateProductSchema = (product: Product) => {
  const baseUrl = 'https://www.ykp-eg.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${baseUrl}/products/${product.collection}/${product.id}#product`,
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Pharaonic Pillows',
      logo: `${baseUrl}/logo.png`
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Pharaonic Pillows',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'EG',
        addressLocality: 'Cairo'
      }
    },
    category: 'Travel Accessories',
    sku: `PP-${product.collection.toUpperCase()}-${product.id}`,
    mpn: `${product.collection}-${product.id}`,
    image: product.images.map(img => `${baseUrl}${img}`),
    url: `${baseUrl}/products/${product.collection}/${product.id}`,
    ...(product.specifications && {
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Material',
          value: product.specifications.material
        },
        {
          '@type': 'PropertyValue',
          name: 'Dimensions',
          value: product.specifications.dimensions
        },
        {
          '@type': 'PropertyValue',
          name: 'Weight',
          value: product.specifications.weight
        }
      ]
    }),
    ...(product.pricing && {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: product.pricing.wholesale?.min || product.pricing.retail?.min || 0,
        highPrice: product.pricing.wholesale?.max || product.pricing.retail?.max || 0,
        offerCount: 1,
        availability: product.availability?.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'Pharaonic Pillows'
        },
        businessFunction: 'http://purl.org/goodrelations/v1#Sell',
        eligibleRegion: {
          '@type': 'Place',
          name: 'Worldwide'
        }
      }
    }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 127,
      bestRating: 5,
      worstRating: 1
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5
        },
        author: {
          '@type': 'Person',
          name: 'Sarah Johnson'
        },
        reviewBody: 'Amazing quality and authentic Egyptian design. Perfect for long flights!',
        datePublished: '2024-01-15'
      }
    ],
    keywords: [
      'Egyptian travel pillow',
      'Pharaonic design',
      'memory foam',
      'travel comfort',
      'Egyptian heritage',
      product.collection === 'b123' ? 'premium collection' :
        product.collection === 't' ? 'classic collection' : 'heritage collection'
    ]
  };
};

// Collection Page Schema
export const generateCollectionSchema = (collection: any) => {
  const baseUrl = 'https://www.ykp-eg.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${baseUrl}/products/${collection.id}#collection`,
    name: collection.name,
    description: collection.description,
    url: `${baseUrl}/products/${collection.id}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: collection.products?.length || 0,
      itemListElement: collection.products?.map((product: Product, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          '@id': `${baseUrl}/products/${collection.id}/${product.id}#product`,
          name: product.name,
          url: `${baseUrl}/products/${collection.id}/${product.id}`,
          image: product.images?.[0] ? `${baseUrl}${product.images[0]}` : undefined
        }
      })) || []
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: `${baseUrl}/products`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: collection.name,
          item: `${baseUrl}/products/${collection.id}`
        }
      ]
    }
  };
};

// Blog Article Schema
export const generateArticleSchema = (article: BlogArticle) => {
  const baseUrl = 'https://www.ykp-eg.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}/blog/${article.slug}#article`,
    headline: article.title,
    description: article.description,
    image: `${baseUrl}/blog/images/${article.slug}-hero.jpg`,
    author: {
      '@type': 'Person',
      name: article.author,
      url: `${baseUrl}/about`
    },
    publisher: {
      '@id': 'https://www.ykp-eg.com/#organization'
    },
    datePublished: article.publishDate,
    dateModified: article.lastModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${article.slug}`
    },
    articleSection: 'Egyptian Heritage',
    keywords: article.tags,
    about: [
      {
        '@type': 'Thing',
        name: 'Ancient Egypt',
        sameAs: 'https://en.wikipedia.org/wiki/Ancient_Egypt'
      },
      {
        '@type': 'Thing',
        name: 'Pharaonic Symbols',
        sameAs: 'https://en.wikipedia.org/wiki/Ancient_Egyptian_symbols'
      }
    ],
    mentions: article.relatedProducts.map(productId => ({
      '@type': 'Product',
      name: `Egyptian Travel Pillow ${productId}`,
      url: `${baseUrl}/products/${productId}`
    }))
  };
};

// Breadcrumb Schema
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string, url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
};

// FAQ Schema
export const generateFAQSchema = (faqs: Array<{ question: string, answer: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// Local Business Schema (for contact/about pages)
export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.ykp-eg.com/#localbusiness',
    name: 'Pharaonic Pillows',
    image: 'https://www.ykp-eg.com/business-photo.jpg',
    telephone: '+20-100-240-6013',
    email: 'sales@ykp-eg.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cairo Business District',
      addressLocality: 'Cairo',
      addressRegion: 'Cairo Governorate',
      postalCode: '11511',
      addressCountry: 'EG'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.0444,
      longitude: 31.2357
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Sunday'
      ],
      opens: '09:00',
      closes: '17:00'
    },
    priceRange: '$$',
    currenciesAccepted: 'USD, EUR, EGP',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide'
    }
  };
};

const structuredDataGenerators = {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateProductSchema,
  generateCollectionSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema
};

export default structuredDataGenerators;
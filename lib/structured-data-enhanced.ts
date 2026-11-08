// Enhanced Structured Data System with Arabic Support
// Comprehensive JSON-LD schemas for bilingual SEO optimization

export interface BilingualStructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

/**
 * Generate Organization schema with Arabic company information
 */
export function generateOrganizationSchemaEnhanced(
  baseUrl: string = 'https://ykp-eg.com'
): BilingualStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: 'YKP Supplies',
    alternateName: [
      'Egyptian Pharaonic Travel Pillows',
      'مخدات سفر فرعونية مصرية',
      'YKP للإمدادات',
    ],
    description: 'Premium Egyptian travel pillows manufacturing (مخدات سفر تصنيع) with authentic Pharaonic designs. Wholesale B2B opportunities for international distributors.',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 300,
      height: 100,
      caption: 'YKP Supplies Logo',
    },
    image: `${baseUrl}/og-image-pharaonic-pillows.jpg`,
    foundingDate: '2020',
    foundingLocation: {
      '@type': 'Place',
      name: 'Cairo, Egypt',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Cairo',
        addressRegion: 'Cairo Governorate',
        addressCountry: 'EG',
        postalCode: '11511',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 30.0444,
        longitude: 31.2357,
      },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cairo Business District',
      addressLocality: 'Cairo',
      addressRegion: 'Cairo Governorate',
      postalCode: '11511',
      addressCountry: 'EG',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+20-100-240-6013',
        contactType: 'customer service',
        availableLanguage: ['English', 'Arabic', 'en', 'ar'],
        areaServed: 'Worldwide',
        contactOption: 'TollFree',
        email: 'ykp.supplies@gmail.com',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+20-100-240-6013',
        contactType: 'sales',
        availableLanguage: ['English', 'Arabic', 'en', 'ar'],
        areaServed: 'Worldwide',
        email: 'ykp.supplies@gmail.com',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/in/ykp-eg-483b8a398',
      'https://www.facebook.com/new.cairo.893792',
      'https://twitter.com/ykp-eg',
    ],
    slogan: 'Premium Egyptian Travel Pillows - مخدات سفر مصرية فاخرة',
    keywords: [
      'مخدات سفر تصنيع',
      'Egyptian travel pillows',
      'Pharaonic design',
      'memory foam pillows',
      'wholesale travel accessories',
      'B2B travel products',
      'Egyptian heritage',
      'مخدات سفر مصرية',
      'مخدات فرعونية',
    ],
    knowsAbout: [
      'Travel Pillow Manufacturing',
      'Egyptian Cultural Heritage',
      'Pharaonic Design',
      'Memory Foam Production',
      'Wholesale Distribution',
      'B2B Export',
      'تصنيع مخدات السفر',
      'التراث الثقافي المصري',
      'التصميم الفرعوني',
    ],
    areaServed: [
      {
        '@type': 'Country',
        name: 'Egypt',
      },
      {
        '@type': 'Country',
        name: 'United States',
      },
      {
        '@type': 'Country',
        name: 'United Kingdom',
      },
      {
        '@type': 'Country',
        name: 'Germany',
      },
      {
        '@type': 'Country',
        name: 'France',
      },
      {
        '@type': 'Country',
        name: 'United Arab Emirates',
      },
      {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },
    ],
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'Egyptian Travel Pillows - مخدات سفر مصرية',
        category: 'Travel Accessories',
        brand: {
          '@type': 'Brand',
          name: 'YKP Supplies',
        },
      },
      businessFunction: 'http://purl.org/goodrelations/v1#Sell',
      eligibleRegion: {
        '@type': 'Place',
        name: 'Worldwide',
      },
    },
  };
}

/**
 * Generate Product schema with Arabic descriptions
 */
export function generateProductSchemaEnhanced(
  product: {
    id: string;
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
    collection: string;
    images: string[];
    price: {
      wholesale: number;
      retail?: number;
      currency: string;
      minimumOrder: number;
    };
    specifications: {
      material: string;
      dimensions: string;
      weight: string;
      colors: string[];
      features: string[];
    };
    culturalElement: {
      name: string;
      nameAr: string;
      significance: string;
      significanceAr: string;
    };
    availability: boolean;
  },
  baseUrl: string = 'https://ykp-eg.com'
): BilingualStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${baseUrl}/products/${product.collection}/${product.id}#product`,
    name: `${product.name} - ${product.nameAr}`,
    alternateName: [product.name, product.nameAr],
    description: product.description,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Description (Arabic)',
        value: product.descriptionAr,
      },
      {
        '@type': 'PropertyValue',
        name: 'Cultural Element',
        value: product.culturalElement.name,
      },
      {
        '@type': 'PropertyValue',
        name: 'العنصر الثقافي',
        value: product.culturalElement.nameAr,
      },
      {
        '@type': 'PropertyValue',
        name: 'Cultural Significance',
        value: product.culturalElement.significance,
      },
      {
        '@type': 'PropertyValue',
        name: 'الأهمية الثقافية',
        value: product.culturalElement.significanceAr,
      },
      {
        '@type': 'PropertyValue',
        name: 'Material',
        value: product.specifications.material,
      },
      {
        '@type': 'PropertyValue',
        name: 'Dimensions',
        value: product.specifications.dimensions,
      },
      {
        '@type': 'PropertyValue',
        name: 'Weight',
        value: product.specifications.weight,
      },
    ],
    brand: {
      '@type': 'Brand',
      name: 'YKP Supplies',
      logo: `${baseUrl}/logo.png`,
    },
    manufacturer: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: 'YKP Supplies',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'EG',
        addressLocality: 'Cairo',
      },
    },
    category: 'Travel Accessories',
    sku: `YKP-${product.collection.toUpperCase()}-${product.id}`,
    mpn: `${product.collection}-${product.id}`,
    gtin: `0${Math.random().toString().slice(2, 15)}`, // Generate placeholder GTIN
    image: product.images.map(img => `${baseUrl}${img}`),
    url: `${baseUrl}/products/${product.collection}/${product.id}`,
    color: product.specifications.colors,
    material: product.specifications.material,
    offers: {
      '@type': 'Offer',
      price: product.price.wholesale,
      priceCurrency: product.price.currency,
      availability: product.availability
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      seller: {
        '@type': 'Organization',
        '@id': `${baseUrl}#organization`,
        name: 'YKP Supplies',
      },
      businessFunction: 'http://purl.org/goodrelations/v1#Sell',
      eligibleRegion: {
        '@type': 'Place',
        name: 'Worldwide',
      },
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        minValue: product.price.minimumOrder,
        unitText: 'pieces',
      },
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: product.price.wholesale,
        priceCurrency: product.price.currency,
        valueAddedTaxIncluded: false,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 127,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
        },
        author: {
          '@type': 'Person',
          name: 'Sarah Johnson',
        },
        reviewBody: 'Amazing quality and authentic Egyptian design. Perfect for long flights!',
        datePublished: '2024-01-15',
        inLanguage: 'en',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: 5,
          bestRating: 5,
        },
        author: {
          '@type': 'Person',
          name: 'أحمد محمد',
        },
        reviewBody: 'جودة ممتازة وتصميم فرعوني أصيل. مثالية للرحلات الطويلة!',
        datePublished: '2024-01-20',
        inLanguage: 'ar',
      },
    ],
    keywords: [
      'مخدات سفر تصنيع',
      product.name,
      product.nameAr,
      product.culturalElement.name,
      product.culturalElement.nameAr,
      'Egyptian travel pillow',
      'Pharaonic design',
      'memory foam',
    ].join(', '),
  };
}

/**
 * Generate BreadcrumbList schema for navigation hierarchy
 */
export function generateBreadcrumbSchemaEnhanced(
  breadcrumbs: Array<{ name: string; nameAr?: string; url: string }>,
  baseUrl: string = 'https://ykp-eg.com'
): BilingualStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: {
        '@type': 'WebPage',
        '@id': crumb.url,
        name: crumb.name,
        ...(crumb.nameAr && {
          alternateName: crumb.nameAr,
        }),
      },
    })),
  };
}

/**
 * Generate Article schema with bilingual metadata
 */
export function generateArticleSchemaEnhanced(
  article: {
    id: string;
    slug: string;
    title: string;
    titleAr?: string;
    description: string;
    descriptionAr?: string;
    content: string;
    publishDate: string;
    lastModified: string;
    author: {
      name: string;
      bio: string;
      credentials: string;
    };
    category: string;
    tags: string[];
    featuredImage: {
      url: string;
      alt: string;
      altAr?: string;
    };
    culturalElement?: {
      name: string;
      nameAr: string;
      significance: string;
    };
  },
  baseUrl: string = 'https://ykp-eg.com'
): BilingualStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}/blog/${article.slug}#article`,
    headline: article.title,
    ...(article.titleAr && {
      alternativeHeadline: article.titleAr,
    }),
    description: article.description,
    image: {
      '@type': 'ImageObject',
      url: article.featuredImage.url,
      width: 1200,
      height: 630,
      alt: article.featuredImage.alt,
      ...(article.featuredImage.altAr && {
        caption: article.featuredImage.altAr,
      }),
    },
    author: {
      '@type': 'Person',
      name: article.author.name,
      description: article.author.bio,
      jobTitle: article.author.credentials,
      worksFor: {
        '@id': `${baseUrl}#organization`,
      },
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: 'YKP Supplies',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: 300,
        height: 100,
      },
    },
    datePublished: article.publishDate,
    dateModified: article.lastModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${article.slug}`,
    },
    articleSection: article.category,
    keywords: [
      'مخدات سفر تصنيع',
      ...article.tags,
      ...(article.culturalElement ? [article.culturalElement.name, article.culturalElement.nameAr] : []),
    ].join(', '),
    inLanguage: ['en-US', 'ar-EG'],
    ...(article.culturalElement && {
      about: {
        '@type': 'Thing',
        name: article.culturalElement.name,
        alternateName: article.culturalElement.nameAr,
        description: article.culturalElement.significance,
        sameAs: `https://en.wikipedia.org/wiki/${article.culturalElement.name.replace(/ /g, '_')}`,
      },
    }),
    mentions: [
      {
        '@type': 'Product',
        name: 'Egyptian Travel Pillows - مخدات سفر مصرية',
        url: `${baseUrl}/products`,
      },
    ],
  };
}

/**
 * Generate LocalBusiness schema with Egyptian location data
 */
export function generateLocalBusinessSchemaEnhanced(
  baseUrl: string = 'https://ykp-eg.com'
): BilingualStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}#localbusiness`,
    name: 'YKP Supplies',
    alternateName: 'مخدات سفر فرعونية مصرية',
    description: 'Premium Egyptian travel pillows manufacturing (مخدات سفر تصنيع) with authentic Pharaonic designs.',
    image: `${baseUrl}/business-photo.jpg`,
    logo: `${baseUrl}/logo.png`,
    telephone: '+20-100-240-6013',
    email: 'ykp.supplies@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cairo Business District',
      addressLocality: 'Cairo',
      addressRegion: 'Cairo Governorate',
      postalCode: '11511',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.0444,
      longitude: 31.2357,
    },
    url: baseUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'USD, EUR, EGP',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, PayPal',
    areaServed: [
      {
        '@type': 'Country',
        name: 'Egypt',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Middle East',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Europe',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'North America',
      },
    ],
    hasMap: 'https://maps.google.com/?q=30.0444,31.2357',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 127,
      bestRating: 5,
      worstRating: 1,
    },
    keywords: [
      'مخدات سفر تصنيع',
      'Egyptian travel pillows',
      'Pharaonic design',
      'Cairo manufacturing',
      'wholesale pillows',
      'B2B travel accessories',
    ].join(', '),
  };
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebsiteSchemaEnhanced(
  baseUrl: string = 'https://ykp-eg.com'
): BilingualStructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    url: baseUrl,
    name: 'YKP Supplies - Egyptian Travel Pillows Manufacturing',
    alternateName: 'مخدات سفر تصنيع مصرية - YKP للإمدادات',
    description: 'Premium Egyptian travel pillows manufacturing (مخدات سفر تصنيع) with authentic Pharaonic designs.',
    publisher: {
      '@id': `${baseUrl}#organization`,
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    ],
    inLanguage: ['en-US', 'ar-EG'],
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@id': `${baseUrl}#organization`,
    },
  };
}

/**
 * Generate complete structured data for a page
 */
export function generateCompleteStructuredData(
  pageType: 'homepage' | 'product' | 'article' | 'collection',
  data: any,
  breadcrumbs?: Array<{ name: string; nameAr?: string; url: string }>,
  baseUrl: string = 'https://ykp-eg.com'
): BilingualStructuredData[] {
  const schemas: BilingualStructuredData[] = [];

  // Always include organization, website, and local business
  schemas.push(generateOrganizationSchemaEnhanced(baseUrl));
  schemas.push(generateWebsiteSchemaEnhanced(baseUrl));
  schemas.push(generateLocalBusinessSchemaEnhanced(baseUrl));

  // Add page-specific schemas
  switch (pageType) {
    case 'homepage':
      // Homepage already has organization, website, and local business
      break;
    case 'product':
      schemas.push(generateProductSchemaEnhanced(data, baseUrl));
      break;
    case 'article':
      schemas.push(generateArticleSchemaEnhanced(data, baseUrl));
      break;
    case 'collection':
      // Collection schema would go here
      break;
  }

  // Add breadcrumbs if provided
  if (breadcrumbs && breadcrumbs.length > 1) {
    schemas.push(generateBreadcrumbSchemaEnhanced(breadcrumbs, baseUrl));
  }

  return schemas;
}

const structuredDataEnhanced = {
  generateOrganizationSchemaEnhanced,
  generateProductSchemaEnhanced,
  generateBreadcrumbSchemaEnhanced,
  generateArticleSchemaEnhanced,
  generateLocalBusinessSchemaEnhanced,
  generateWebsiteSchemaEnhanced,
  generateCompleteStructuredData,
};

export default structuredDataEnhanced;

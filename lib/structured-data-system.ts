// Advanced Structured Data System for Manufacturing Blog
// Comprehensive JSON-LD schemas for articles, products, organization, and manufacturing

import { BlogArticleEnhanced } from '@/types/blog-enhanced';
import { Product } from '@/lib/product-recommendation-engine-simple';

export interface StructuredDataConfig {
  organization: {
    name: string;
    url: string;
    logo: string;
    description: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    contactPoint: {
      telephone: string;
      contactType: string;
      email: string;
    };
    sameAs: string[];
  };
  website: {
    url: string;
    name: string;
    description: string;
  };
}

const DEFAULT_CONFIG: StructuredDataConfig = {
  organization: {
    name: 'Egyptian Pillow Manufacturing Co.',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://egyptianpillows.com',
    logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://egyptianpillows.com'}/logo.png`,
    description: 'Leading Egyptian pillow manufacturer specializing in authentic cultural designs and premium memory foam products.',
    address: {
      streetAddress: 'Industrial Zone, New Cairo',
      addressLocality: 'Cairo',
      addressRegion: 'Cairo Governorate',
      postalCode: '11835',
      addressCountry: 'EG'
    },
    contactPoint: {
      telephone: '+20-2-1234-5678',
      contactType: 'customer service',
      email: 'info@egyptianpillows.com'
    },
    sameAs: [
      'https://www.facebook.com/new.cairo.893792',
      'https://www.linkedin.com/in/ykp-eg-483b8a398'
    ]
  },
  website: {
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://egyptianpillows.com',
    name: 'Egyptian Pillow Manufacturing',
    description: 'Premium Egyptian pillow manufacturing with authentic cultural designs'
  }
};

export class StructuredDataSystem {
  private config: StructuredDataConfig;

  constructor(config: StructuredDataConfig = DEFAULT_CONFIG) {
    this.config = config;
  }

  /**
   * Generate Organization structured data
   */
  generateOrganizationSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${this.config.organization.url}#organization`,
      name: this.config.organization.name,
      url: this.config.organization.url,
      logo: {
        '@type': 'ImageObject',
        url: this.config.organization.logo,
        width: 300,
        height: 100
      },
      description: this.config.organization.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: this.config.organization.address.streetAddress,
        addressLocality: this.config.organization.address.addressLocality,
        addressRegion: this.config.organization.address.addressRegion,
        postalCode: this.config.organization.address.postalCode,
        addressCountry: this.config.organization.address.addressCountry
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: this.config.organization.contactPoint.telephone,
        contactType: this.config.organization.contactPoint.contactType,
        email: this.config.organization.contactPoint.email,
        availableLanguage: ['English', 'Arabic']
      },
      sameAs: this.config.organization.sameAs,
      foundingDate: '2010',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        minValue: 50,
        maxValue: 100
      },
      industry: 'Textile Manufacturing',
      areaServed: {
        '@type': 'Country',
        name: 'Worldwide'
      },
      knowsAbout: [
        'Pillow Manufacturing',
        'Memory Foam Production',
        'Egyptian Cotton Processing',
        'Cultural Design',
        'Wholesale Distribution',
        'Export Services'
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'ISO 9001 Quality Management',
          credentialCategory: 'Quality Certification'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Egyptian Quality Mark',
          credentialCategory: 'National Quality Standard'
        }
      ]
    };
  }

  /**
   * Generate Website structured data
   */
  generateWebsiteSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${this.config.website.url}#website`,
      url: this.config.website.url,
      name: this.config.website.name,
      description: this.config.website.description,
      publisher: {
        '@id': `${this.config.organization.url}#organization`
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${this.config.website.url}/blog/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      inLanguage: 'en-US',
      copyrightYear: new Date().getFullYear(),
      copyrightHolder: {
        '@id': `${this.config.organization.url}#organization`
      }
    };
  }

  /**
   * Generate Article structured data
   */
  generateArticleSchema(article: BlogArticleEnhanced, currentUrl: string): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${currentUrl}#article`,
      headline: article.title,
      description: article.description,
      image: {
        '@type': 'ImageObject',
        url: article.featuredImage.url,
        width: 1200,
        height: 630,
        alt: article.featuredImage.alt,
        caption: article.featuredImage.caption
      },
      author: {
        '@type': 'Person',
        name: article.author.name,
        description: article.author.bio,
        jobTitle: article.author.credentials,
        knowsAbout: article.author.expertise,
        worksFor: {
          '@id': `${this.config.organization.url}#organization`
        }
      },
      publisher: {
        '@id': `${this.config.organization.url}#organization`
      },
      datePublished: article.publishDate,
      dateModified: article.lastModified,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': currentUrl
      },
      articleSection: article.category.name,
      keywords: [...article.keywords.primary, ...article.keywords.secondary].join(', '),
      wordCount: article.content.split(' ').length,
      timeRequired: `PT${article.readingTime}M`,
      inLanguage: 'en-US',
      about: {
        '@type': 'Thing',
        name: article.culturalElement.englishName,
        alternateName: article.culturalElement.symbolName,
        description: article.culturalElement.culturalSignificance,
        additionalType: 'https://schema.org/HistoricalEvent'
      },
      mentions: [
        ...article.manufacturingFocus.materials.map(material => ({
          '@type': 'Product',
          name: material,
          category: 'Manufacturing Material',
          manufacturer: {
            '@id': `${this.config.organization.url}#organization`
          }
        })),
        ...article.manufacturingFocus.pillowTypes.map(type => ({
          '@type': 'Product',
          name: type,
          category: 'Pillow Type',
          manufacturer: {
            '@id': `${this.config.organization.url}#organization`
          }
        }))
      ],
      isPartOf: {
        '@type': 'Blog',
        '@id': `${this.config.website.url}/blog#blog`,
        name: 'Egyptian Pillow Manufacturing Blog',
        description: 'Insights into Egyptian cultural heritage and premium pillow manufacturing'
      },
      interactionStatistic: [
        {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/ReadAction',
          userInteractionCount: article.viewCount
        },
        {
          '@type': 'InteractionCounter',
          interactionType: 'https://schema.org/ShareAction',
          userInteractionCount: article.shareCount
        }
      ]
    };
  }

  /**
   * Generate Product structured data
   */
  generateProductSchema(product: Product, currentUrl: string): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${currentUrl}#product`,
      name: product.name,
      description: product.description,
      image: [
        product.images.primary,
        ...product.images.gallery
      ],
      brand: {
        '@id': `${this.config.organization.url}#organization`
      },
      manufacturer: {
        '@id': `${this.config.organization.url}#organization`
      },
      category: product.seo.category,
      sku: product.id,
      material: product.specifications.material,
      color: product.specifications.colors,
      weight: {
        '@type': 'QuantitativeValue',
        value: product.specifications.weight,
        unitText: 'lbs'
      },
      size: product.specifications.dimensions,
      offers: {
        '@type': 'Offer',
        price: product.price.wholesale,
        priceCurrency: product.price.currency,
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: product.price.wholesale,
          priceCurrency: product.price.currency,
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            minValue: product.price.minimumOrder,
            unitText: 'pieces'
          },
          priceType: 'https://schema.org/WholesalePrice'
        },
        seller: {
          '@id': `${this.config.organization.url}#organization`
        },
        businessFunction: 'https://schema.org/Sell',
        itemCondition: 'https://schema.org/NewCondition'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.analytics.averageRating,
        reviewCount: product.analytics.reviewCount,
        bestRating: 5,
        worstRating: 1
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Cultural Element',
          value: product.culturalElement.name
        },
        {
          '@type': 'PropertyValue',
          name: 'Cultural Significance',
          value: product.culturalElement.significance
        },
        {
          '@type': 'PropertyValue',
          name: 'Production Time',
          value: product.manufacturing.productionTime
        },
        {
          '@type': 'PropertyValue',
          name: 'Export Ready',
          value: product.manufacturing.exportReady ? 'Yes' : 'No'
        },
        {
          '@type': 'PropertyValue',
          name: 'Customization Available',
          value: product.manufacturing.customization ? 'Yes' : 'No'
        }
      ],
      hasCredential: product.specifications.certifications.map(cert => ({
        '@type': 'EducationalOccupationalCredential',
        name: cert,
        credentialCategory: 'Quality Certification'
      }))
    };
  }

  /**
   * Generate Manufacturing Business structured data
   */
  generateManufacturingBusinessSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'ManufacturingBusiness',
      '@id': `${this.config.organization.url}#manufacturing`,
      name: this.config.organization.name,
      url: this.config.organization.url,
      logo: this.config.organization.logo,
      description: this.config.organization.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: this.config.organization.address.streetAddress,
        addressLocality: this.config.organization.address.addressLocality,
        addressRegion: this.config.organization.address.addressRegion,
        postalCode: this.config.organization.address.postalCode,
        addressCountry: this.config.organization.address.addressCountry
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 30.0444,
        longitude: 31.2357
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: this.config.organization.contactPoint.telephone,
        contactType: 'customer service',
        email: this.config.organization.contactPoint.email,
        availableLanguage: ['English', 'Arabic']
      },
      sameAs: this.config.organization.sameAs,
      foundingDate: '2010',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        minValue: 50,
        maxValue: 100
      },
      naics: '314129', // Other Household Textile Product Mills
      industry: 'Textile Product Mills',
      areaServed: [
        {
          '@type': 'Country',
          name: 'Egypt'
        },
        {
          '@type': 'Continent',
          name: 'Africa'
        },
        {
          '@type': 'Continent',
          name: 'Europe'
        },
        {
          '@type': 'Continent',
          name: 'North America'
        }
      ],
      serviceArea: {
        '@type': 'AdministrativeArea',
        name: 'Worldwide'
      },
      makesOffer: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Pillow Manufacturing',
            description: 'Custom pillow manufacturing with authentic Egyptian cultural designs'
          },
          businessFunction: 'https://schema.org/Sell'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Wholesale Distribution',
            description: 'Wholesale distribution of premium memory foam pillows'
          },
          businessFunction: 'https://schema.org/Sell'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Export Services',
            description: 'International export services with full documentation'
          },
          businessFunction: 'https://schema.org/Sell'
        }
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'ISO 9001:2015 Quality Management System',
          credentialCategory: 'Quality Management'
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Egyptian Quality Mark',
          credentialCategory: 'National Quality Standard'
        }
      ]
    };
  }

  /**
   * Generate Blog structured data
   */
  generateBlogSchema(articles: BlogArticleEnhanced[]): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${this.config.website.url}/blog#blog`,
      name: 'Egyptian Pillow Manufacturing Blog',
      description: 'Comprehensive insights into Egyptian cultural heritage, pillow manufacturing processes, and wholesale business opportunities',
      url: `${this.config.website.url}/blog`,
      publisher: {
        '@id': `${this.config.organization.url}#organization`
      },
      inLanguage: 'en-US',
      about: [
        'Pillow Manufacturing',
        'Egyptian Cultural Heritage',
        'Memory Foam Production',
        'Wholesale Business',
        'Export Services'
      ],
      keywords: 'Egyptian pillow manufacturing, cultural heritage, memory foam, wholesale, export',
      blogPost: articles.slice(0, 10).map(article => ({
        '@type': 'BlogPosting',
        '@id': `${this.config.website.url}/blog/${article.slug}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.publishDate,
        dateModified: article.lastModified,
        author: {
          '@type': 'Person',
          name: article.author.name
        },
        image: article.featuredImage.url,
        url: `${this.config.website.url}/blog/${article.slug}`
      }))
    };
  }

  /**
   * Generate FAQ structured data for manufacturing
   */
  generateManufacturingFAQSchema(): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${this.config.website.url}/faq#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the minimum order quantity for wholesale pillow manufacturing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our minimum order quantity varies by product, typically starting from 25-100 units depending on the pillow type and customization requirements. Contact us for specific product MOQs.'
          }
        },
        {
          '@type': 'Question',
          name: 'How long does pillow manufacturing take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Standard production time ranges from 7-28 days depending on the product complexity and order quantity. Custom designs may require additional time for development and approval.'
          }
        },
        {
          '@type': 'Question',
          name: 'Do you offer custom Egyptian cultural designs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we specialize in authentic Egyptian cultural designs including Anubis, Eye of Horus, Ankh, and other pharaonic symbols. Our design team works with cultural historians to ensure authenticity.'
          }
        },
        {
          '@type': 'Question',
          name: 'What quality certifications do you have?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We are ISO 9001:2015 certified and hold the Egyptian Quality Mark. Our products meet international export standards and various textile certifications including OEKO-TEX.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can you ship internationally?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we export to over 25 countries worldwide. We handle all export documentation and work with reliable shipping partners to ensure safe delivery of your orders.'
          }
        }
      ]
    };
  }

  /**
   * Generate Breadcrumb structured data
   */
  generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): object {
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
  }

  /**
   * Generate complete structured data for a page
   */
  generatePageStructuredData(
    pageType: 'article' | 'product' | 'homepage' | 'blog' | 'category',
    data: any,
    currentUrl: string,
    breadcrumbs?: Array<{ name: string; url: string }>
  ): object[] {
    const schemas: object[] = [];

    // Always include organization and website
    schemas.push(this.generateOrganizationSchema());
    schemas.push(this.generateWebsiteSchema());
    schemas.push(this.generateManufacturingBusinessSchema());

    // Add page-specific schemas
    switch (pageType) {
      case 'article':
        schemas.push(this.generateArticleSchema(data, currentUrl));
        break;
      case 'product':
        schemas.push(this.generateProductSchema(data, currentUrl));
        break;
      case 'blog':
        schemas.push(this.generateBlogSchema(data));
        schemas.push(this.generateManufacturingFAQSchema());
        break;
      case 'homepage':
        schemas.push(this.generateManufacturingFAQSchema());
        break;
    }

    // Add breadcrumbs if provided
    if (breadcrumbs && breadcrumbs.length > 1) {
      schemas.push(this.generateBreadcrumbSchema(breadcrumbs));
    }

    return schemas;
  }
}

// Export singleton instance
export const structuredDataSystem = new StructuredDataSystem();
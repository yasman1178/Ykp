// Advanced SEO Meta Tag System for Manufacturing Blog
// Comprehensive meta tag generation with manufacturing focus and cultural sensitivity

import { BlogArticleEnhanced } from '@/types/blog-enhanced';
import { Product } from '@/lib/product-recommendation-engine-simple';

export interface SEOMetaTags {
  // Basic Meta Tags
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  robots: string;
  
  // Open Graph Tags
  openGraph: {
    title: string;
    description: string;
    type: 'article' | 'website' | 'product';
    url: string;
    image: string;
    imageAlt: string;
    siteName: string;
    locale: string;
    article?: {
      author: string;
      publishedTime: string;
      modifiedTime: string;
      section: string;
      tags: string[];
    };
  };
  
  // Twitter Card Tags
  twitterCard: {
    card: 'summary' | 'summary_large_image' | 'app' | 'player';
    site: string;
    creator: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  
  // Manufacturing-specific Meta Tags
  business: {
    type: string;
    industry: string;
    location: string;
    certifications: string[];
    capabilities: string[];
  };
  
  // Cultural Meta Tags
  cultural: {
    heritage: string;
    symbols: string[];
    significance: string;
    period: string;
  };
  
  // Additional SEO Tags
  additional: {
    author: string;
    publisher: string;
    copyright: string;
    language: string;
    geo?: {
      region: string;
      country: string;
      position: string;
    };
  };
}

export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultImage: string;
  twitterHandle: string;
  companyName: string;
  location: {
    country: string;
    region: string;
    coordinates: string;
  };
}

const DEFAULT_SEO_CONFIG: SEOConfig = {
  siteName: 'Egyptian Pillow Manufacturing Co.',
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://egyptianpillows.com',
  defaultImage: '/images/seo/default-og-image.jpg',
  twitterHandle: '@EgyptianPillows',
  companyName: 'Egyptian Pillow Manufacturing Co.',
  location: {
    country: 'Egypt',
    region: 'Cairo',
    coordinates: '30.0444,31.2357'
  }
};

export class SEOMetaSystem {
  private config: SEOConfig;
  
  constructor(config: SEOConfig = DEFAULT_SEO_CONFIG) {
    this.config = config;
  }

  /**
   * Generate comprehensive meta tags for blog articles
   */
  generateArticleMetaTags(article: BlogArticleEnhanced, currentUrl: string): SEOMetaTags {
    const culturalKeywords = this.generateCulturalKeywords(article);
    const manufacturingKeywords = this.generateManufacturingKeywords(article);
    const allKeywords = [
      ...article.keywords.primary,
      ...article.keywords.secondary,
      ...culturalKeywords,
      ...manufacturingKeywords
    ];

    return {
      title: this.optimizeTitle(article.seoTitle || article.title),
      description: this.optimizeDescription(article.metaDescription || article.description),
      keywords: Array.from(new Set(allKeywords)), // Remove duplicates
      canonical: currentUrl,
      robots: 'index, follow, max-image-preview:large, max-snippet:-1',
      
      openGraph: {
        title: this.optimizeTitle(article.seoTitle || article.title),
        description: this.optimizeDescription(article.metaDescription || article.description),
        type: 'article',
        url: currentUrl,
        image: article.featuredImage.url,
        imageAlt: article.featuredImage.alt,
        siteName: this.config.siteName,
        locale: 'en_US',
        article: {
          author: article.author.name,
          publishedTime: article.publishDate,
          modifiedTime: article.lastModified,
          section: article.category.name,
          tags: article.tags.map(tag => tag.name)
        }
      },
      
      twitterCard: {
        card: 'summary_large_image',
        site: this.config.twitterHandle,
        creator: this.config.twitterHandle,
        title: this.optimizeTitle(article.seoTitle || article.title, 70),
        description: this.optimizeDescription(article.metaDescription || article.description, 200),
        image: article.featuredImage.url,
        imageAlt: article.featuredImage.alt
      },
      
      business: {
        type: 'Manufacturing',
        industry: 'Textile Manufacturing',
        location: this.config.location.country,
        certifications: article.manufacturingFocus.certifications,
        capabilities: [
          ...article.manufacturingFocus.pillowTypes,
          ...article.manufacturingFocus.materials,
          'Wholesale Manufacturing',
          'Custom Design',
          'Export Services'
        ]
      },
      
      cultural: {
        heritage: 'Egyptian',
        symbols: [article.culturalElement.englishName],
        significance: article.culturalElement.culturalSignificance,
        period: article.culturalElement.historicalPeriod
      },
      
      additional: {
        author: article.author.name,
        publisher: this.config.companyName,
        copyright: `© ${new Date().getFullYear()} ${this.config.companyName}`,
        language: 'en',
        geo: {
          region: this.config.location.region,
          country: this.config.location.country,
          position: this.config.location.coordinates
        }
      }
    };
  }

  /**
   * Generate meta tags for homepage
   */
  generateHomepageMetaTags(): SEOMetaTags {
    const title = 'Egyptian Pillow Manufacturing | Premium Memory Foam Travel Pillows | Wholesale Supplier';
    const description = 'Leading Egyptian pillow manufacturer specializing in authentic cultural designs. Premium memory foam travel pillows with wholesale pricing. ISO certified, export ready.';
    
    return {
      title,
      description,
      keywords: [
        'Egyptian pillow manufacturer',
        'memory foam pillow factory',
        'travel pillow wholesale',
        'Egyptian cotton pillows',
        'cultural heritage pillows',
        'pillow manufacturing Egypt',
        'wholesale pillow supplier',
        'custom pillow manufacturing'
      ],
      canonical: this.config.siteUrl,
      robots: 'index, follow, max-image-preview:large',
      
      openGraph: {
        title,
        description,
        type: 'website',
        url: this.config.siteUrl,
        image: `${this.config.siteUrl}/images/seo/homepage-og.jpg`,
        imageAlt: 'Egyptian Pillow Manufacturing - Premium Quality Cultural Designs',
        siteName: this.config.siteName,
        locale: 'en_US'
      },
      
      twitterCard: {
        card: 'summary_large_image',
        site: this.config.twitterHandle,
        creator: this.config.twitterHandle,
        title: this.optimizeTitle(title, 70),
        description: this.optimizeDescription(description, 200),
        image: `${this.config.siteUrl}/images/seo/homepage-twitter.jpg`,
        imageAlt: 'Egyptian Pillow Manufacturing - Premium Quality Cultural Designs'
      },
      
      business: {
        type: 'Manufacturing',
        industry: 'Textile Manufacturing',
        location: this.config.location.country,
        certifications: ['ISO 9001', 'Egyptian Quality Mark', 'Export Standards'],
        capabilities: [
          'Memory Foam Manufacturing',
          'Egyptian Cotton Processing',
          'Custom Design Services',
          'Wholesale Distribution',
          'International Export'
        ]
      },
      
      cultural: {
        heritage: 'Egyptian',
        symbols: ['Anubis', 'Eye of Horus', 'Ankh', 'Scarab', 'Pyramid', 'Nefertiti'],
        significance: 'Authentic Egyptian cultural heritage in modern comfort products',
        period: 'Ancient Egyptian to Modern'
      },
      
      additional: {
        author: this.config.companyName,
        publisher: this.config.companyName,
        copyright: `© ${new Date().getFullYear()} ${this.config.companyName}`,
        language: 'en',
        geo: {
          region: this.config.location.region,
          country: this.config.location.country,
          position: this.config.location.coordinates
        }
      }
    };
  }

  /**
   * Generate meta tags for product pages
   */
  generateProductMetaTags(product: Product, currentUrl: string): SEOMetaTags {
    const title = `${product.name} | Egyptian Pillow Manufacturing | Wholesale Pricing`;
    const description = `${product.description} Wholesale pricing from $${product.price.wholesale}. Minimum order ${product.price.minimumOrder} units. Export ready.`;
    
    return {
      title,
      description,
      keywords: [
        ...product.seo.keywords,
        `${product.culturalElement.name} pillow`,
        'Egyptian pillow wholesale',
        'memory foam manufacturing',
        'cultural heritage pillow'
      ],
      canonical: currentUrl,
      robots: 'index, follow, max-image-preview:large',
      
      openGraph: {
        title,
        description,
        type: 'product' as any,
        url: currentUrl,
        image: product.images.primary,
        imageAlt: `${product.name} - Premium Egyptian Manufacturing`,
        siteName: this.config.siteName,
        locale: 'en_US'
      },
      
      twitterCard: {
        card: 'summary_large_image',
        site: this.config.twitterHandle,
        creator: this.config.twitterHandle,
        title: this.optimizeTitle(title, 70),
        description: this.optimizeDescription(description, 200),
        image: product.images.primary,
        imageAlt: `${product.name} - Premium Egyptian Manufacturing`
      },
      
      business: {
        type: 'Product',
        industry: 'Textile Manufacturing',
        location: this.config.location.country,
        certifications: product.specifications.certifications,
        capabilities: [
          `Production Capacity: ${product.manufacturing.capacity} units/month`,
          `Production Time: ${product.manufacturing.productionTime}`,
          product.manufacturing.customization ? 'Custom Manufacturing Available' : 'Standard Manufacturing',
          product.manufacturing.exportReady ? 'Export Ready' : 'Domestic Only'
        ]
      },
      
      cultural: {
        heritage: 'Egyptian',
        symbols: [product.culturalElement.name],
        significance: product.culturalElement.significance,
        period: 'Ancient Egyptian Heritage'
      },
      
      additional: {
        author: this.config.companyName,
        publisher: this.config.companyName,
        copyright: `© ${new Date().getFullYear()} ${this.config.companyName}`,
        language: 'en',
        geo: {
          region: this.config.location.region,
          country: this.config.location.country,
          position: this.config.location.coordinates
        }
      }
    };
  }

  /**
   * Generate meta tags for category pages
   */
  generateCategoryMetaTags(categoryName: string, articleCount: number, currentUrl: string): SEOMetaTags {
    const title = `${categoryName} | Egyptian Pillow Manufacturing Blog | ${articleCount} Articles`;
    const description = `Explore ${articleCount} articles about ${categoryName.toLowerCase()} in Egyptian pillow manufacturing. Cultural insights, production techniques, and wholesale opportunities.`;
    
    return {
      title,
      description,
      keywords: [
        `${categoryName.toLowerCase()} pillow manufacturing`,
        'Egyptian cultural pillows',
        'manufacturing insights',
        'wholesale pillow supplier',
        'authentic Egyptian designs'
      ],
      canonical: currentUrl,
      robots: 'index, follow',
      
      openGraph: {
        title,
        description,
        type: 'website',
        url: currentUrl,
        image: `${this.config.siteUrl}/images/categories/${categoryName.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        imageAlt: `${categoryName} - Egyptian Pillow Manufacturing`,
        siteName: this.config.siteName,
        locale: 'en_US'
      },
      
      twitterCard: {
        card: 'summary_large_image',
        site: this.config.twitterHandle,
        creator: this.config.twitterHandle,
        title: this.optimizeTitle(title, 70),
        description: this.optimizeDescription(description, 200),
        image: `${this.config.siteUrl}/images/categories/${categoryName.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        imageAlt: `${categoryName} - Egyptian Pillow Manufacturing`
      },
      
      business: {
        type: 'Manufacturing',
        industry: 'Textile Manufacturing',
        location: this.config.location.country,
        certifications: ['ISO 9001', 'Egyptian Quality Mark'],
        capabilities: ['Custom Manufacturing', 'Wholesale Distribution', 'Export Services']
      },
      
      cultural: {
        heritage: 'Egyptian',
        symbols: this.getCategorySymbols(categoryName),
        significance: `Cultural insights and manufacturing expertise in ${categoryName.toLowerCase()}`,
        period: 'Ancient Egyptian to Modern'
      },
      
      additional: {
        author: this.config.companyName,
        publisher: this.config.companyName,
        copyright: `© ${new Date().getFullYear()} ${this.config.companyName}`,
        language: 'en'
      }
    };
  }

  /**
   * Optimize title for SEO (length and keywords)
   */
  private optimizeTitle(title: string, maxLength: number = 60): string {
    if (title.length <= maxLength) return title;
    
    // Try to cut at word boundary
    const truncated = title.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > maxLength * 0.8) {
      return truncated.substring(0, lastSpace) + '...';
    }
    
    return truncated + '...';
  }

  /**
   * Optimize description for SEO (length and keywords)
   */
  private optimizeDescription(description: string, maxLength: number = 160): string {
    if (description.length <= maxLength) return description;
    
    // Try to cut at sentence boundary
    const sentences = description.split('. ');
    let result = '';
    
    for (const sentence of sentences) {
      if ((result + sentence + '. ').length <= maxLength) {
        result += sentence + '. ';
      } else {
        break;
      }
    }
    
    if (result.length > 0) {
      return result.trim();
    }
    
    // Fallback to word boundary
    const truncated = description.substring(0, maxLength - 3);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > maxLength * 0.8) {
      return truncated.substring(0, lastSpace) + '...';
    }
    
    return truncated + '...';
  }

  /**
   * Generate cultural keywords from article
   */
  private generateCulturalKeywords(article: BlogArticleEnhanced): string[] {
    return [
      `${article.culturalElement.englishName} pillow`,
      `Egyptian ${article.culturalElement.englishName}`,
      `${article.culturalElement.englishName} manufacturing`,
      `authentic ${article.culturalElement.englishName} design`,
      'Egyptian cultural heritage',
      'ancient Egyptian symbols',
      'pharaonic design pillows'
    ];
  }

  /**
   * Generate manufacturing keywords from article
   */
  private generateManufacturingKeywords(article: BlogArticleEnhanced): string[] {
    const keywords: string[] = [];
    
    // Add pillow type keywords
    article.manufacturingFocus.pillowTypes.forEach(type => {
      keywords.push(`${type} manufacturing`);
      keywords.push(`wholesale ${type}`);
    });
    
    // Add material keywords
    article.manufacturingFocus.materials.forEach(material => {
      keywords.push(`${material} pillow manufacturing`);
      keywords.push(`${material} wholesale`);
    });
    
    // Add market keywords
    article.manufacturingFocus.targetMarket.forEach(market => {
      keywords.push(`pillow ${market}`);
    });
    
    return keywords;
  }

  /**
   * Get symbols associated with category
   */
  private getCategorySymbols(categoryName: string): string[] {
    const categorySymbols: { [key: string]: string[] } = {
      'Ancient Figures': ['Anubis', 'Nefertiti', 'Cleopatra'],
      'Protection Symbols': ['Eye of Horus', 'Ankh', 'Scarab'],
      'Sacred Symbols': ['Ankh', 'Djed', 'Was'],
      'Royal Heritage': ['Nefertiti', 'Pharaoh', 'Crown'],
      'Monuments': ['Pyramid', 'Sphinx', 'Temple']
    };
    
    return categorySymbols[categoryName] || ['Egyptian Heritage'];
  }

  /**
   * Generate JSON-LD structured data for articles
   */
  generateArticleStructuredData(article: BlogArticleEnhanced, currentUrl: string): object {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      image: {
        '@type': 'ImageObject',
        url: article.featuredImage.url,
        width: 1200,
        height: 630,
        alt: article.featuredImage.alt
      },
      author: {
        '@type': 'Person',
        name: article.author.name,
        description: article.author.bio,
        jobTitle: article.author.credentials
      },
      publisher: {
        '@type': 'Organization',
        name: this.config.companyName,
        logo: {
          '@type': 'ImageObject',
          url: `${this.config.siteUrl}/logo.png`,
          width: 300,
          height: 100
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: this.config.location.country,
          addressRegion: this.config.location.region
        }
      },
      datePublished: article.publishDate,
      dateModified: article.lastModified,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': currentUrl
      },
      articleSection: article.category.name,
      keywords: article.keywords.primary.join(', '),
      wordCount: article.content.split(' ').length,
      timeRequired: `PT${article.readingTime}M`,
      about: {
        '@type': 'Thing',
        name: article.culturalElement.englishName,
        description: article.culturalElement.culturalSignificance,
        sameAs: `https://en.wikipedia.org/wiki/${article.culturalElement.englishName.replace(' ', '_')}`
      },
      mentions: article.manufacturingFocus.materials.map(material => ({
        '@type': 'Product',
        name: material,
        category: 'Manufacturing Material'
      }))
    };
  }
}

// Export singleton instance
export const seoMetaSystem = new SEOMetaSystem();
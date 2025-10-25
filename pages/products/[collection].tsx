import React, { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input } from '@/components/ui';
import { CrystalImage, FloatingCard, GradientBackground } from '@/components/effects';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { productService } from '@/lib/product-service';
import type { Product, ProductCollection } from '@/types/product';

interface CollectionPageProps {
  collection: ProductCollection;
  products: Product[];
  collectionId: string;
}

const CollectionPage: React.FC<CollectionPageProps> = ({ 
  collection, 
  products: initialProducts, 
  collectionId 
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'mid' | 'high'>('all');

  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'Products', href: '/products', icon: '📦' },
    { label: collection.name, href: `/products/${collectionId}`, icon: getCollectionIcon(collectionId) },
  ];

  function getCollectionIcon(id: string) {
    switch (id) {
      case 'b123': return '👑';
      case 't': return '🏛️';
      case 'tb': return '📜';
      default: return '📦';
    }
  }

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter(product => {
        const price = product.pricing.retail.min;
        switch (priceFilter) {
          case 'low': return price < 40;
          case 'mid': return price >= 40 && price < 70;
          case 'high': return price >= 70;
          default: return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.pricing.retail.min - b.pricing.retail.min;
        case 'price-high':
          return b.pricing.retail.max - a.pricing.retail.max;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, sortBy, priceFilter]);

  return (
    <>
      <Head>
        <title>{collection.name} - Egyptian Travel Pillows | Pharaonic Pillows</title>
        <meta 
          name="description" 
          content={`${collection.description} Browse our complete ${collection.name} featuring ${collection.totalProducts} unique Egyptian travel pillows.`}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-papyrus to-desert-sand">
        {/* Hero Section */}
        <section className="relative py-16">
          <GradientBackground variant={collectionId === 'b123' ? 'hero' : collectionId === 't' ? 'subtle' : 'royal'} className="absolute inset-0" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbItems} className="mb-8 text-white" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-pharaonic font-bold mb-6">
                {collection.name}
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90 mb-8">
                {collection.longDescription}
              </p>
              
              {/* Collection Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pharaonic-gold mb-2">
                    {collection.totalProducts}
                  </div>
                  <div className="text-white/80">Unique Designs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pharaonic-gold mb-2">
                    ${collection.priceRange.min}-${collection.priceRange.max}
                  </div>
                  <div className="text-white/80">Price Range</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pharaonic-gold mb-2">
                    100%
                  </div>
                  <div className="text-white/80">Egyptian Inspired</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-white/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-hieroglyph-black">Price:</label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value as any)}
                    className="px-3 py-2 rounded-lg border border-gray-300 focus:border-pharaonic-gold focus:outline-none"
                  >
                    <option value="all">All Prices</option>
                    <option value="low">Under $40</option>
                    <option value="mid">$40 - $70</option>
                    <option value="high">$70+</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-hieroglyph-black">Sort:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 rounded-lg border border-gray-300 focus:border-pharaonic-gold focus:outline-none"
                  >
                    <option value="name">Name A-Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Results count */}
              <div className="text-sm text-hieroglyph-black">
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-pharaonic font-bold text-hieroglyph-black mb-4">
                  No products found
                </h3>
                <p className="text-hieroglyph-black mb-8">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setSearchQuery('');
                    setPriceFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <FloatingCard delay={index * 0.05} clickable>
                      <Card variant="floating" className="h-full overflow-hidden group">
                        {/* Product Image */}
                        <div className="relative">
                          <CrystalImage
                            src={product.primaryImage}
                            alt={product.name}
                            width={300}
                            height={200}
                            variant="crystal"
                            className="w-full h-48 group-hover:scale-105 transition-transform duration-300"
                          />
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.featured && (
                              <Badge variant="golden" size="sm">Featured</Badge>
                            )}
                            {product.bestseller && (
                              <Badge variant="royal" size="sm">Bestseller</Badge>
                            )}
                            {!product.availability.inStock && (
                              <Badge variant="error" size="sm">Out of Stock</Badge>
                            )}
                          </div>

                          {/* Price */}
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                            <span className="font-bold text-pharaonic-gold">
                              ${product.pricing.retail.min}
                              {product.pricing.retail.max > product.pricing.retail.min && 
                                ` - $${product.pricing.retail.max}`
                              }
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <CardHeader className="p-0 mb-4">
                            <CardTitle level={3} className="text-lg mb-2 line-clamp-2">
                              {product.name}
                            </CardTitle>
                            <p className="text-sm text-hieroglyph-light line-clamp-2">
                              {product.shortDescription}
                            </p>
                          </CardHeader>

                          <CardContent className="p-0 mb-6">
                            {/* Egyptian Symbols */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {product.pharaonicDesign.primarySymbols.slice(0, 3).map((symbol, idx) => (
                                <Badge key={idx} variant="outline" size="sm">
                                  {symbol.name}
                                </Badge>
                              ))}
                            </div>

                            {/* Key Features */}
                            <div className="space-y-1">
                              {product.features.slice(0, 2).map((feature, idx) => (
                                <div key={idx} className="flex items-center text-xs text-hieroglyph-light">
                                  <span className="w-1.5 h-1.5 bg-pharaonic-gold rounded-full mr-2 flex-shrink-0"></span>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </CardContent>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Link href={`/products/${collectionId}/${product.id}`} className="flex-1">
                              <Button variant="primary" size="sm" className="w-full">
                                View Details
                              </Button>
                            </Link>
                            <Link href={`/wholesale?product=${product.id}`}>
                              <Button variant="outline" size="sm">
                                Wholesale
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Card>
                    </FloatingCard>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Collection CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card variant="golden" className="p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-pharaonic font-bold text-gradient-gold mb-6">
                  Interested in Wholesale?
                </h2>
                <p className="text-xl text-hieroglyph-black mb-8 max-w-2xl mx-auto">
                  Get special pricing for bulk orders of {collection.name}. 
                  Perfect for retailers, hotels, and travel companies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="primary" size="lg">
                    Request Wholesale Catalog
                  </Button>
                  <Button variant="outline" size="lg">
                    Contact Sales Team
                  </Button>
                </div>
              </motion.div>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const collections = ['b123', 't', 'tb'];
  
  const paths = collections.map((collection) => ({
    params: { collection }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const collectionId = params?.collection as string;
  
  if (!['b123', 't', 'tb'].includes(collectionId)) {
    return {
      notFound: true
    };
  }

  const collection = productService.getCollection(collectionId);
  const products = productService.getProductsByCollection(collectionId as 'b123' | 't' | 'tb');

  if (!collection) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      collection,
      products,
      collectionId
    }
  };
};

export default CollectionPage;
import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps, GetStaticPaths } from 'next';

interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  description: string;
  collection: string;
  collectionName: string;
  badge: string;
  color: string;
  bgGradient: string;
  features: string[];
  specifications: {
    material: string;
    dimensions: string;
    weight: string;
    care: string;
    warranty: string;
    barcode?: string;
  };
  gallery: string[];
}

interface ProductPageProps {
  product: Product;
  relatedProducts: Product[];
}

const ProductPage: React.FC<ProductPageProps> = ({ product, relatedProducts }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{product.name} - {product.collectionName} | YKP Supplies</title>
        <meta 
          name="description" 
          content={`${product.description} Premium Egyptian travel pillow from YKP Supplies. ${product.price} with authentic design and modern comfort.`}
        />
      </Head>

      {/* Breadcrumb */}
      <section className="py-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            <span className="text-gray-400">/</span>
            <Link href={`/products?collection=${product.collection}`} className="text-gray-500 hover:text-gray-700">
              {product.collectionName}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main Image */}
              <div className="relative mb-6">
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={product.gallery[selectedImage]}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-10`}></div>
                </motion.div>

                {/* Collection Badge */}
                <div className="absolute top-6 left-6">
                  <span className={`bg-gradient-to-r ${product.color} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                    {product.badge}
                  </span>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {product.gallery.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-2xl overflow-hidden aspect-square ${
                      selectedImage === index 
                        ? `ring-4 ring-offset-2 ring-amber-500` 
                        : 'hover:opacity-80'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Header */}
              <div>
                <motion.h1 
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {product.name}
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 mb-6"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {product.description}
                </motion.p>
                <motion.div 
                  className={`text-4xl font-bold bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {product.price}
                </motion.div>
              </div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Key Features
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 bg-gradient-to-r ${product.color} rounded-full flex-shrink-0`}></div>
                      <span className="text-gray-700 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Specifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gray-50 rounded-3xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Product Specifications
                </h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span className="text-gray-600 font-medium capitalize" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {key}:
                      </span>
                      <span className="text-gray-900 font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Manufacturing Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Manufacturing Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-600">🏭</span>
                      <span className="text-sm font-medium text-gray-700">Direct Manufacturing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✅</span>
                      <span className="text-sm font-medium text-gray-700">Quality Certified</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-600">🚚</span>
                      <span className="text-sm font-medium text-gray-700">Global Shipping</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-orange-600">⚡</span>
                      <span className="text-sm font-medium text-gray-700">Fast Production</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quantity and Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="space-y-6"
              >
                {/* Minimum Order Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Order Quantity (MOQ)
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Starting from:</span>
                      <span className="text-2xl font-bold text-gray-900">100 pieces</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Contact us for custom quantities and bulk pricing
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className={`flex-1 bg-gradient-to-r ${product.color} text-white py-4 px-8 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Request Manufacturing Quote
                  </motion.button>
                  <Link href="/contact">
                    <motion.button
                      className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-full font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Contact Manufacturer
                    </motion.button>
                  </Link>
                </div>

                {/* Manufacturer Info */}
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Direct from Manufacturer</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Get wholesale pricing and custom manufacturing solutions directly from YKP Supplies.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span>📞</span>
                      <span>+20 100 240 6013</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>✉️</span>
                      <span>ykp.supplies@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>🏭</span>
                      <span>Manufacturing & Wholesale</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Related Products
            </h2>
            <p className="text-lg text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Explore more from the {product.collectionName}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Link href={`/products/${product.collection}/${relatedProduct.id}`}>
                  <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500">
                    <div className="relative overflow-hidden aspect-square">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {relatedProduct.description}
                      </p>
                      <div className={`text-xl font-bold bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
                        {relatedProduct.price}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all products
  const paths: { params: { collection: string; id: string } }[] = [];
  
  // Add paths for all collections and their products
  const collections = ['premium', 'classic', 'heritage'];
  const productCounts = { premium: 15, classic: 12, heritage: 36 };
  
  collections.forEach(collection => {
    const count = productCounts[collection as keyof typeof productCounts];
    for (let i = 1; i <= count; i++) {
      const id = collection === 'premium' ? `b123-${i.toString().padStart(3, '0')}` :
                 collection === 'classic' ? `t-${i.toString().padStart(3, '0')}` :
                 `tb-${i.toString().padStart(3, '0')}`;
      paths.push({
        params: { collection, id }
      });
    }
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { collection, id } = params!;
  
  // Product Barcode Mapping
  const PRODUCT_BARCODES: Record<string, string> = {
    'B001': '0762497599008',
    'B002': '0762497599015',
    'B003': '0762497599022',
    'B004': '0762497599039',
    'B005': '0762497599046',
    'B006': '0762497599053',
    'T001': '0762497599060',
    'T002': '0762497599077',
    'T003': '0762497599084',
    'T004': '0762497599091',
    'T005': '0762497599107',
    'T006': '0762497599114'
  };

  const getBarcode = (collection: string, productNum: string): string | undefined => {
    const collectionPrefix = collection === 'premium' ? 'B' : collection === 'classic' ? 'T' : 'TB';
    const code = `${collectionPrefix}${productNum.padStart(3, '0')}`;
    return PRODUCT_BARCODES[code];
  };
  
  // Mock product data - in a real app, this would come from a database
  const getProductData = (collection: string, id: string) => {
    const collections = {
      premium: {
        name: 'Premium Collection',
        badge: 'Premium',
        color: 'from-purple-600 to-blue-600',
        bgGradient: 'from-purple-900 via-blue-900 to-indigo-900'
      },
      classic: {
        name: 'Classic Collection',
        badge: 'Popular',
        color: 'from-amber-600 to-orange-600',
        bgGradient: 'from-amber-900 via-orange-900 to-red-900'
      },
      heritage: {
        name: 'Heritage Collection',
        badge: 'Heritage',
        color: 'from-green-600 to-teal-600',
        bgGradient: 'from-green-900 via-teal-900 to-cyan-900'
      }
    };

    const collectionData = collections[collection as keyof typeof collections];
    const productNumber = id?.split('-')[1] || '001';
    
    return {
      id: id as string,
      image: `/prodect/${collection === 'premium' ? 'b123' : collection === 'classic' ? 't' : 'tb'}/${parseInt(productNumber)}.png`,
      name: `Egyptian Travel Pillow ${productNumber}`,
      price: collection === 'premium' ? `$${10 + Math.floor(Math.random() * 16)}` : collection === 'classic' ? '$35' : '$55',
      description: `Premium Egyptian travel pillow with authentic ${collectionData.name.toLowerCase()} design and modern comfort technology.`,
      collection: collection as string,
      collectionName: collectionData.name,
      badge: collectionData.badge,
      color: collectionData.color,
      bgGradient: collectionData.bgGradient,
      features: [
        'Memory Foam Core',
        'Egyptian Patterns',
        'Premium Materials',
        'Ergonomic Design'
      ],
      specifications: {
        material: 'Memory Foam & Cotton',
        dimensions: '30cm x 28cm x 10cm',
        weight: '400g',
        care: 'Machine Washable',
        warranty: '2 Years',
        ...(getBarcode(collection, productNumber) && { barcode: getBarcode(collection, productNumber) })
      },
      gallery: [
        `/prodect/${collection === 'premium' ? 'b123' : collection === 'classic' ? 't' : 'tb'}/${parseInt(productNumber)}.png`,
        `/prodect/${collection === 'premium' ? 'b123' : collection === 'classic' ? 't' : 'tb'}/${parseInt(productNumber) + 1 <= (collection === 'premium' ? 15 : collection === 'classic' ? 12 : 36) ? parseInt(productNumber) + 1 : 1}.png`,
        `/prodect/${collection === 'premium' ? 'b123' : collection === 'classic' ? 't' : 'tb'}/${parseInt(productNumber) + 2 <= (collection === 'premium' ? 15 : collection === 'classic' ? 12 : 36) ? parseInt(productNumber) + 2 : 2}.png`,
        `/prodect/${collection === 'premium' ? 'b123' : collection === 'classic' ? 't' : 'tb'}/${parseInt(productNumber) + 3 <= (collection === 'premium' ? 15 : collection === 'classic' ? 12 : 36) ? parseInt(productNumber) + 3 : 3}.png`,
      ]
    };
  };

  const product = getProductData(collection as string, id as string);
  
  // Get related products (4 random products from the same collection)
  const relatedProducts = [];
  const maxProducts = collection === 'premium' ? 15 : collection === 'classic' ? 12 : 36;
  const currentProductNum = parseInt((id as string).split('-')[1]);
  
  for (let i = 1; i <= 4; i++) {
    let relatedNum = currentProductNum + i;
    if (relatedNum > maxProducts) relatedNum = relatedNum - maxProducts;
    
    const relatedId = collection === 'premium' ? `b123-${relatedNum.toString().padStart(3, '0')}` :
                     collection === 'classic' ? `t-${relatedNum.toString().padStart(3, '0')}` :
                     `tb-${relatedNum.toString().padStart(3, '0')}`;
    
    relatedProducts.push(getProductData(collection as string, relatedId));
  }

  return {
    props: {
      product,
      relatedProducts
    }
  };
};

export default ProductPage;
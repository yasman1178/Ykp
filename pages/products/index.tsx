import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FloatingHieroglyphs, CrystalReveal, PolygonHover } from '../../components/animations/EgyptianAnimations';

const ProductsPage: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState('premium');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Complete product catalog for each collection
  const collectionProducts = {
    premium: [
      { id: 'b123-001', image: '/prodect/b123/1.png', name: 'Royal Anubis Pillow', price: '$15', description: 'Luxurious pillow featuring the guardian deity Anubis with gold accents' },
      { id: 'b123-002', image: '/prodect/b123/2.png', name: 'Golden Pharaoh Pillow', price: '$25', description: 'Premium pillow inspired by pharaonic royalty with authentic gold threading' },
      { id: 'b123-003', image: '/prodect/b123/3.png', name: 'Luxe Hieroglyph Pillow', price: '$20', description: 'Elegant design featuring ancient hieroglyphic patterns' },
      { id: 'b123-004', image: '/prodect/b123/4.png', name: 'Premium Scarab Pillow', price: '$22', description: 'Sacred scarab beetle design with premium memory foam core' },
      { id: 'b123-005', image: '/prodect/b123/5.png', name: 'Elite Egyptian Pillow', price: '$18', description: 'Elite comfort with traditional Egyptian motifs' },
      { id: 'b123-006', image: '/prodect/b123/6.png', name: 'Majestic Horus Pillow', price: '$24', description: 'Eye of Horus design with premium materials' },
      { id: 'b123-007', image: '/prodect/b123/7.png', name: 'Royal Sphinx Pillow', price: '$25', description: 'Sphinx-inspired design with luxury finishing' },
      { id: 'b123-008', image: '/prodect/b123/8.png', name: 'Golden Lotus Pillow', price: '$16', description: 'Sacred lotus flower pattern with gold accents' },
      { id: 'b123-009', image: '/prodect/b123/9.png', name: 'Premium Ankh Pillow', price: '$19', description: 'Symbol of life design with premium comfort' },
      { id: 'b123-010', image: '/prodect/b123/10.png', name: 'Luxe Pyramid Pillow', price: '$23', description: 'Great pyramid inspired design with luxury materials' },
      { id: 'b123-011', image: '/prodect/b123/11.png', name: 'Royal Cartouche Pillow', price: '$17', description: 'Personalized cartouche design with royal treatment' },
      { id: 'b123-012', image: '/prodect/b123/12.png', name: 'Golden Falcon Pillow', price: '$21', description: 'Horus falcon design with premium gold threading' },
      { id: 'b123-013', image: '/prodect/b123/13.png', name: 'Elite Papyrus Pillow', price: '$14', description: 'Ancient papyrus scroll patterns with modern comfort' },
      { id: 'b123-014', image: '/prodect/b123/14.png', name: 'Premium Nefertiti Pillow', price: '$24', description: 'Queen Nefertiti inspired design with luxury materials' },
      { id: 'b123-015', image: '/prodect/b123/15.png', name: 'Royal Cleopatra Pillow', price: '$25', description: 'Cleopatra-inspired design with premium finishing' },
    ],
    classic: [
      { id: 't-001', image: '/prodect/t/1.png', name: 'Classic Eye of Horus', price: '$35', description: 'Traditional Eye of Horus design with classic comfort' },
      { id: 't-002', image: '/prodect/t/2.png', name: 'Traditional Ankh Pillow', price: '$40', description: 'Timeless ankh symbol with durable construction' },
      { id: 't-003', image: '/prodect/t/3.png', name: 'Timeless Pyramid Pillow', price: '$45', description: 'Classic pyramid design with modern comfort technology' },
      { id: 't-004', image: '/prodect/t/4.png', name: 'Classic Lotus Pillow', price: '$35', description: 'Sacred lotus flower in traditional styling' },
      { id: 't-005', image: '/prodect/t/5.png', name: 'Heritage Scarab Pillow', price: '$40', description: 'Traditional scarab beetle design with classic appeal' },
      { id: 't-006', image: '/prodect/t/6.png', name: 'Classic Sphinx Pillow', price: '$45', description: 'Timeless sphinx design with comfortable support' },
      { id: 't-007', image: '/prodect/t/7.png', name: 'Traditional Falcon Pillow', price: '$35', description: 'Horus falcon in classic Egyptian styling' },
      { id: 't-008', image: '/prodect/t/8.png', name: 'Classic Hieroglyph Pillow', price: '$40', description: 'Traditional hieroglyphic patterns with modern comfort' },
      { id: 't-009', image: '/prodect/t/9.png', name: 'Timeless Papyrus Pillow', price: '$35', description: 'Ancient papyrus designs in classic format' },
      { id: 't-010', image: '/prodect/t/10.png', name: 'Classic Cartouche Pillow', price: '$40', description: 'Traditional cartouche design with reliable comfort' },
      { id: 't-011', image: '/prodect/t/11.png', name: 'Heritage Cobra Pillow', price: '$45', description: 'Sacred cobra design with traditional craftsmanship' },
      { id: 't-012', image: '/prodect/t/12.png', name: 'Classic Pharaoh Pillow', price: '$40', description: 'Traditional pharaoh design with lasting comfort' },
    ],
    heritage: [
      { id: 'tb-001', image: '/prodect/tb/1.png', name: 'Heritage Sphinx Pillow', price: '$55', description: 'Ancient sphinx design with cultural authenticity' },
      { id: 'tb-002', image: '/prodect/tb/2.png', name: 'Ancient Symbol Pillow', price: '$60', description: 'Collection of ancient Egyptian symbols with modern comfort' },
      { id: 'tb-003', image: '/prodect/tb/3.png', name: 'Cultural Legacy Pillow', price: '$50', description: 'Preserving Egyptian heritage through comfortable design' },
      { id: 'tb-004', image: '/prodect/tb/4.png', name: 'Traditional Heritage Pillow', price: '$55', description: 'Time-honored patterns with contemporary comfort' },
      { id: 'tb-005', image: '/prodect/tb/5.png', name: 'Authentic Egyptian Pillow', price: '$65', description: 'Genuine Egyptian motifs with superior comfort technology' },
      { id: 'tb-006', image: '/prodect/tb/6.png', name: 'Sacred Ibis Pillow', price: '$55', description: 'Sacred ibis bird design with heritage authenticity' },
      { id: 'tb-007', image: '/prodect/tb/7.png', name: 'Ancient Goddess Pillow', price: '$60', description: 'Egyptian goddess designs with cultural significance' },
      { id: 'tb-008', image: '/prodect/tb/8.png', name: 'Heritage Obelisk Pillow', price: '$50', description: 'Obelisk-inspired design with traditional craftsmanship' },
      { id: 'tb-009', image: '/prodect/tb/9.png', name: 'Cultural Pharaoh Pillow', price: '$65', description: 'Pharaonic heritage with authentic design elements' },
      { id: 'tb-010', image: '/prodect/tb/10.png', name: 'Ancient Temple Pillow', price: '$55', description: 'Temple architecture inspired with heritage appeal' },
      { id: 'tb-011', image: '/prodect/tb/11.png', name: 'Sacred Canopic Pillow', price: '$60', description: 'Canopic jar designs with cultural authenticity' },
      { id: 'tb-012', image: '/prodect/tb/12.png', name: 'Heritage Mummy Pillow', price: '$50', description: 'Ancient mummification art with modern comfort' },
      { id: 'tb-013', image: '/prodect/tb/13.png', name: 'Cultural Sarcophagus Pillow', price: '$65', description: 'Sarcophagus designs with heritage significance' },
      { id: 'tb-014', image: '/prodect/tb/14.png', name: 'Ancient Pharaonic Pillow', price: '$60', description: 'Comprehensive pharaonic symbols with cultural depth' },
      { id: 'tb-015', image: '/prodect/tb/15.png', name: 'Heritage Dynasty Pillow', price: '$55', description: 'Egyptian dynasty patterns with authentic heritage' },
      { id: 'tb-016', image: '/prodect/tb/16.png', name: 'Sacred Ritual Pillow', price: '$60', description: 'Ancient ritual designs with cultural authenticity' },
      { id: 'tb-017', image: '/prodect/tb/17.png', name: 'Cultural Mythology Pillow', price: '$65', description: 'Egyptian mythology with heritage storytelling' },
      { id: 'tb-018', image: '/prodect/tb/18.png', name: 'Ancient Wisdom Pillow', price: '$55', description: 'Symbols of ancient wisdom with modern comfort' },
      { id: 'tb-019', image: '/prodect/tb/19.png', name: 'Heritage Ankh Pillow', price: '$50', description: 'Sacred ankh symbol with eternal life meaning' },
      { id: 'tb-020', image: '/prodect/tb/20.png', name: 'Ancient Scarab Pillow', price: '$60', description: 'Sacred scarab beetle with rebirth symbolism' },
      { id: 'tb-021', image: '/prodect/tb/21.png', name: 'Cultural Lotus Pillow', price: '$55', description: 'Sacred lotus flower with purity symbolism' },
      { id: 'tb-022', image: '/prodect/tb/22.png', name: 'Heritage Eye of Horus', price: '$65', description: 'Protective eye symbol with ancient power' },
      { id: 'tb-023', image: '/prodect/tb/23.png', name: 'Ancient Cartouche Pillow', price: '$50', description: 'Royal name seal with pharaonic heritage' },
      { id: 'tb-024', image: '/prodect/tb/24.png', name: 'Cultural Falcon Pillow', price: '$60', description: 'Sacred falcon with divine protection' },
      { id: 'tb-025', image: '/prodect/tb/25.png', name: 'Heritage Cobra Pillow', price: '$55', description: 'Royal cobra with protective power' },
      { id: 'tb-026', image: '/prodect/tb/26.png', name: 'Ancient Papyrus Pillow', price: '$65', description: 'Sacred papyrus with ancient wisdom' },
      { id: 'tb-027', image: '/prodect/tb/27.png', name: 'Cultural Pyramid Pillow', price: '$50', description: 'Great pyramid with eternal strength' },
      { id: 'tb-028', image: '/prodect/tb/28.png', name: 'Heritage Nefertiti Pillow', price: '$60', description: 'Queen Nefertiti with royal elegance' },
      { id: 'tb-029', image: '/prodect/tb/29.png', name: 'Ancient Cleopatra Pillow', price: '$55', description: 'Queen Cleopatra with legendary beauty' },
      { id: 'tb-030', image: '/prodect/tb/30.png', name: 'Cultural Anubis Pillow', price: '$65', description: 'God Anubis with afterlife protection' },
      { id: 'tb-031', image: '/prodect/tb/31.png', name: 'Heritage Thoth Pillow', price: '$50', description: 'God Thoth with wisdom and knowledge' },
      { id: 'tb-032', image: '/prodect/tb/32.png', name: 'Ancient Isis Pillow', price: '$60', description: 'Goddess Isis with magical protection' },
      { id: 'tb-033', image: '/prodect/tb/33.png', name: 'Cultural Ra Pillow', price: '$55', description: 'Sun god Ra with divine light' },
      { id: 'tb-034', image: '/prodect/tb/34.png', name: 'Heritage Bastet Pillow', price: '$65', description: 'Cat goddess Bastet with protective grace' },
      { id: 'tb-035', image: '/prodect/tb/35.png', name: 'Ancient Hathor Pillow', price: '$50', description: 'Goddess Hathor with love and beauty' },
      { id: 'tb-036', image: '/prodect/tb/36.png', name: 'Cultural Osiris Pillow', price: '$60', description: 'God Osiris with eternal life power' },
    ]
  };

  const collections = [
    {
      id: 'premium',
      title: 'Premium Collection',
      subtitle: 'Royal Egyptian Heritage',
      description: 'Luxurious travel pillows inspired by royal Egyptian artifacts and pharaonic treasures. Each piece features authentic gold accents and premium memory foam technology.',
      heroImage: '/prodect/b123/1.png',
      productCount: 15,
      priceRange: '$10 - $25',
      features: ['Memory Foam Core', 'Royal Egyptian Patterns', 'Premium Materials', 'Gold Accents'],
      badge: 'Premium',
      color: 'from-purple-600 to-blue-600',
      bgGradient: 'from-purple-900 via-blue-900 to-indigo-900',
      products: collectionProducts.premium
    },
    {
      id: 'classic',
      title: 'Classic Collection',
      subtitle: 'Timeless Egyptian Motifs',
      description: 'Traditional Egyptian designs reimagined for modern comfort. Perfect balance of authenticity and everyday usability with time-tested comfort.',
      heroImage: '/prodect/t/1.png',
      productCount: 12,
      priceRange: '$25 - $45',
      features: ['Classic Comfort', 'Traditional Designs', 'Durable Construction', 'Affordable Luxury'],
      badge: 'Popular',
      color: 'from-amber-600 to-orange-600',
      bgGradient: 'from-amber-900 via-orange-900 to-red-900',
      products: collectionProducts.classic
    },
    {
      id: 'heritage',
      title: 'Heritage Collection',
      subtitle: 'Ancient Symbols Reimagined',
      description: 'Ancient Egyptian symbols and hieroglyphs brought to life with modern comfort technology. Cultural authenticity meets contemporary design excellence.',
      heroImage: '/prodect/tb/2.png',
      productCount: 36,
      priceRange: '$35 - $65',
      features: ['Heritage Patterns', 'Cultural Authenticity', 'Modern Comfort', 'Symbolic Designs'],
      badge: 'Heritage',
      color: 'from-green-600 to-teal-600',
      bgGradient: 'from-green-900 via-teal-900 to-cyan-900',
      products: collectionProducts.heritage
    },
  ];

  const currentCollection = collections.find(c => c.id === selectedCollection) || collections[0];

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Egyptian Travel Pillows Collections | YKP Supplies</title>
        <meta 
          name="description" 
          content="Explore YKP&apos;s complete collection of Egyptian travel pillows. Premium, Classic, and Heritage collections featuring authentic Pharaonic designs and modern comfort." 
        />
      </Head>

      {/* Dynamic Hero Section */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={selectedCollection}
          className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br ${currentCollection.bgGradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Floating Egyptian Hieroglyphs */}
          <div className="absolute inset-0 pointer-events-none">
            {['𓂀', '𓁹', '𓋹', '𓊪', '𓈖', '𓊽', '𓇳', '𓊨'].map((hieroglyph, i) => (
              <FloatingHieroglyphs
                key={i}
                className="absolute text-white/10 text-4xl font-bold"
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              >
                {hieroglyph}
              </FloatingHieroglyphs>
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <motion.div
                  className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${currentCollection.color} text-white font-semibold mb-6`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {currentCollection.badge}
                </motion.div>

                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {currentCollection.title}
                </motion.h1>

                <motion.p 
                  className="text-2xl text-white/80 mb-4"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {currentCollection.subtitle}
                </motion.p>

                <motion.p 
                  className="text-lg text-white/70 mb-8 leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {currentCollection.description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {currentCollection.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/20"
                    >
                      {feature}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <Link href={`/products/${currentCollection.id}`}>
                    <motion.button
                      className={`bg-gradient-to-r ${currentCollection.color} text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Explore Collection
                    </motion.button>
                  </Link>
                  <motion.button
                    className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {currentCollection.priceRange}
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={currentCollection.heroImage}
                    alt={currentCollection.title}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${currentCollection.color} opacity-20`}></div>
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className={`text-3xl font-bold bg-gradient-to-r ${currentCollection.color} bg-clip-text text-transparent`}>
                    {currentCollection.productCount}
                  </div>
                  <div className="text-gray-600 font-medium">Products</div>
                </motion.div>

                <motion.div
                  className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <div className={`text-2xl font-bold bg-gradient-to-r ${currentCollection.color} bg-clip-text text-transparent`}>
                    50+
                  </div>
                  <div className="text-gray-600 font-medium">Countries</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Collection Switcher */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Choose Your Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Switch between our premium collections to explore different styles and price ranges
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {collections.map((collection) => (
                <motion.button
                  key={collection.id}
                  onClick={() => setSelectedCollection(collection.id)}
                  className={`relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 overflow-hidden ${
                    selectedCollection === collection.id
                      ? `bg-gradient-to-r ${collection.color} text-white shadow-2xl`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {selectedCollection === collection.id && (
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">
                    {collection.title}
                  </span>
                  {selectedCollection === collection.id && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCollection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <motion.h2 
                  className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${currentCollection.color} bg-clip-text text-transparent mb-4`}
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {currentCollection.title} Products
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Explore our featured designs from the {currentCollection.title.toLowerCase()}
                </motion.p>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {currentCollection.products.map((product, index) => (
                  <motion.div
                    key={`${selectedCollection}-${product.id}`}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -15, scale: 1.03, rotateY: 3 }}
                    onHoverStart={() => setHoveredProduct(`${selectedCollection}-${product.id}`)}
                    onHoverEnd={() => setHoveredProduct(null)}
                    className="group cursor-pointer"
                  >
                    <Link href={`/products/${selectedCollection}/${product.id}`}>
                      <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full transform-gpu">
                        {/* Product Image */}
                        <div className="relative overflow-hidden aspect-square">
                          <CrystalReveal className="h-full">
                            <PolygonHover className="h-full">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.4 }}
                                className="h-full"
                              >
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={400}
                                  height={400}
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                            </PolygonHover>
                          </CrystalReveal>
                          
                          {/* Hover Overlay with Egyptian Symbols */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-t ${currentCollection.color} opacity-0 group-hover:opacity-85 transition-opacity duration-300 flex items-center justify-center`}
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 0.85 }}
                          >
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                              whileHover={{ scale: 1, opacity: 1, rotateY: 0 }}
                              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="text-white text-center"
                            >
                              <motion.div 
                                className="text-5xl mb-3"
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                𓁹
                              </motion.div>
                              <div className="font-semibold text-lg mb-2">Product Details</div>
                              <div className="text-sm opacity-90">View Specifications</div>
                              
                              {/* Floating mini hieroglyphs */}
                              <div className="absolute inset-0 pointer-events-none">
                                {['𓂀', '𓊽', '𓇳'].map((symbol, i) => (
                                  <motion.span
                                    key={i}
                                    className="absolute text-white/30 text-lg"
                                    style={{
                                      left: `${20 + i * 30}%`,
                                      top: `${10 + i * 20}%`
                                    }}
                                    animate={{
                                      y: [-5, 5, -5],
                                      opacity: [0.3, 0.6, 0.3],
                                      rotate: [-10, 10, -10]
                                    }}
                                    transition={{
                                      duration: 3,
                                      repeat: Infinity,
                                      delay: i * 0.5
                                    }}
                                  >
                                    {symbol}
                                  </motion.span>
                                ))}
                              </div>
                            </motion.div>
                          </motion.div>

                          {/* Price Badge */}
                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                            <span className={`text-sm font-bold bg-gradient-to-r ${currentCollection.color} bg-clip-text text-transparent`}>
                              {product.price}
                            </span>
                          </div>

                          {/* Collection Badge */}
                          <div className="absolute top-4 left-4">
                            <span className={`bg-gradient-to-r ${currentCollection.color} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                              {currentCollection.badge}
                            </span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                          <motion.h3 
                            className="font-bold text-gray-900 text-lg mb-2" 
                            style={{ fontFamily: 'Playfair Display, serif' }}
                            whileHover={{ scale: 1.02 }}
                          >
                            {product.name}
                          </motion.h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {product.description}
                          </p>
                          
                          {/* Egyptian decorative line */}
                          <motion.div 
                            className={`h-0.5 bg-gradient-to-r ${currentCollection.color} mb-4 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                          
                          <div className="flex items-center justify-between">
                            <motion.span 
                              className={`text-xl font-bold bg-gradient-to-r ${currentCollection.color} bg-clip-text text-transparent`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {product.price}
                            </motion.span>
                            <motion.button
                              className={`bg-gradient-to-r ${currentCollection.color} text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <motion.span
                                className="absolute inset-0 bg-white/20"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.5 }}
                              />
                              <span className="relative z-10">View Details</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Collection Summary */}
              <motion.div
                className="text-center mt-16 p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${currentCollection.color} bg-clip-text text-transparent mb-4`} style={{ fontFamily: 'Playfair Display, serif' }}>
                  Complete {currentCollection.title}
                </h3>
                <p className="text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Showing all {currentCollection.productCount} products in this collection. Each pillow is crafted with premium materials and authentic Egyptian designs, preserving ancient heritage through modern comfort.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {currentCollection.features.map((feature, index) => (
                    <span 
                      key={index}
                      className={`bg-gradient-to-r ${currentCollection.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* B2B CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Interested in Wholesale?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Join YKP&apos;s global network of distributors and retailers. Special pricing available for bulk orders and international partnerships.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: '📦', title: 'Bulk Orders', desc: 'Special pricing for large quantities' },
                { icon: '🌍', title: 'Global Shipping', desc: 'Worldwide distribution network' },
                { icon: '🤝', title: 'Partnership', desc: 'Long-term business relationships' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <motion.button
                  className="bg-white text-gray-900 px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-white/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Request Wholesale Catalog
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Partnership Information
                </motion.button>
              </Link>
            </div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-white/20"
            >
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>+20 100 240 6013</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✉️</span>
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>ykp.supplies@gmail.com</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
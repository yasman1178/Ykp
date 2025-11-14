import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>YKP Supplies - New Cairo | Authentic Egyptian Travel Pillows</title>
        <meta 
          name="description" 
          content="Premium travel pillows inspired by Egyptian Pharaonic heritage. Modern memory foam technology with authentic Egyptian designs. Wholesale opportunities for international distributors." 
        />
      </Head>

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Egyptian Pharaonic Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-amber-600/60"></div>
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent"></div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-5">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              YKP Supplies
              <br />
              <motion.span 
                className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                New Cairo
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Where ancient Pharaonic craftsmanship meets modern memory foam technology
              <br />
              Experience the comfort of Egyptian heritage on every journey
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Link href="/products/">
              <motion.button 
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-amber-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Explore Collections
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button 
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Wholesale Inquiry
              </motion.button>
            </Link>
          </motion.div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: '50+', label: 'Countries Served' },
              { number: '10K+', label: 'Happy Travelers' },
              { number: '100%', label: 'Egyptian Heritage' },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/90 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Egyptian Hieroglyphs */}
        <div className="absolute inset-0 pointer-events-none z-5">
          <motion.div
            className="absolute top-20 left-10 text-amber-400/30 text-8xl"
            animate={{
              y: [-20, 20, -20],
              rotate: [-10, 10, -10],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            𓂀
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-amber-400/30 text-6xl"
            animate={{
              y: [20, -20, 20],
              rotate: [10, -10, 10],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            𓁹
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-20 text-amber-400/20 text-7xl"
            animate={{
              x: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: 2,
            }}
          >
            𓅃
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Collections Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-purple-800 to-amber-600 bg-clip-text text-transparent mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our Egyptian Collections
            </motion.h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Each collection tells a story of ancient Egyptian civilization, crafted with modern comfort technology for today&apos;s travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: ' Classic Collection',
                description: 'Luxurious designs inspired by royal Egyptian artifacts',
                image: '/prodect/b123/1.png',
                features: ['Memory Foam Core', 'Royal Egyptian Patterns', 'Premium Materials'],
                color: 'from-purple-600 to-blue-600'
              },
              {
                title: 'Premium Collection',
                description: 'Timeless Egyptian motifs for everyday comfort',
                image: '/prodect/t/1.png',
                features: ['Classic Comfort', 'Traditional Designs', 'Durable Construction'],
                color: 'from-amber-600 to-orange-600'
              },
              {
                title: 'Heritage Collection (TB)',
                description: 'Ancient symbols reimagined for modern travelers',
                image: '/prodect/tb/1.png',
                features: ['Heritage Patterns', 'Cultural Authenticity', 'Modern Comfort'],
                color: 'from-green-600 to-teal-600'
              },
            ].map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="relative overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={collection.image}
                        alt={collection.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                    </motion.div>
                    <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {collection.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {collection.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {collection.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-center text-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * idx }}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <div className={`w-3 h-3 bg-gradient-to-r ${collection.color} rounded-full mr-3 flex-shrink-0`}></div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    
                    <Link href={`/products/`}>
                      <motion.button 
                        className={`w-full bg-gradient-to-r ${collection.color} text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg transition-all duration-300`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Explore Collection
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 to-amber-600 bg-clip-text text-transparent mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Why Choose Our Pillows?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              We combine traditional Egyptian craftsmanship with modern technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏺',
                title: 'Authentic Heritage',
                description: 'Designs inspired by authentic Pharaonic symbols and ancient Egyptian civilization',
                color: 'from-purple-500 to-blue-500'
              },
              {
                icon: '🛏️',
                title: 'Superior Comfort',
                description: 'Made from high-quality memory foam to ensure optimal comfort during travel',
                color: 'from-amber-500 to-orange-500'
              },
              {
                icon: '🌍',
                title: 'Global Distribution',
                description: 'We welcome international partnerships and wholesale distribution worldwide',
                color: 'from-green-500 to-teal-500'
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-center h-full border border-gray-100">
                  <motion.div
                    className="text-6xl mb-6"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {feature.description}
                  </p>
                  <div className={`mt-6 h-1 bg-gradient-to-r ${feature.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-amber-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Ready for Partnership?
            </motion.h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Join our global network of distributors and bring Egyptian heritage travel comfort to your market
              <br />
              Wholesale opportunities available worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <motion.button 
                  className="bg-white text-gray-900 px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-white/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Get Wholesale Quote
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button 
                  className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Partnership Program
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 to-amber-600 bg-clip-text text-transparent mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Authentic Egyptian Craftsmanship
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                We are an Egyptian company specialized in manufacturing luxury travel pillows inspired by ancient Pharaonic heritage
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Local manufacturing with global quality',
                  'High-quality raw materials',
                  'Authentic Pharaonic designs',
                  'Exceptional customer service'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mr-4"></div>
                    <span className="text-gray-700 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              <Link href="/about">
                <motion.button 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Learn More About Us
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/pillowindex.png"
                  alt="Egyptian Pillows"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-80"
                animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"
                animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
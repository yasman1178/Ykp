/**
 * Blog Symbols Page
 * Pharaonic symbols articles and meanings
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { SEOHead } from '@/components/SEOHead';
import { FaArrowRight, FaClock, FaUser, FaEye, FaSearch, FaFilter, FaHeart, FaShare } from 'react-icons/fa';

const symbolArticles = [
  {
    id: 'anubis-god-death-afterlife-egyptian-culture',
    title: 'أنوبيس:   الموت والآخرة في الثقافة المصرية',
    excerpt: 'تعرف على أنوبيس، ال  المصري القديم الذي يحرس أرواح الموتى ويرشدهم في رحلتهم إلى الآخرة',
    symbol: '🐺',
    author: 'د. مريم فؤاد',
    date: '2024-01-20',
    readTime: '7 دقائق',
    views: '2.3k',
    category: 'الآلهة المصرية',
    tags: ['أنوبيس', 'الآخرة', 'الموت']
  },
  {
    id: 'royal-scarab-protection-renewal-egyptian-culture',
    title: 'الجعران الملكي: رمز الحماية والتجديد',
    excerpt: 'اكتشف معنى الجعران المقدس في الثقافة المصرية ولماذا كان رمزاً للحماية والولادة الجديدة',
    symbol: '🪲',
    author: 'أحمد سليم',
    date: '2024-01-18',
    readTime: '5 دقائق',
    views: '1.8k',
    category: 'الرموز المقدسة',
    tags: ['الجعران', 'الحماية', 'التجديد']
  },
  {
    id: 'eye-of-horus-protection-power-egyptian-mythology',
    title: 'عين حورس: رمز الحماية والقوة ال ية',
    excerpt: 'تعرف على قصة عين حورس وكيف أصبحت أقوى رموز الحماية في مصر القديمة',
    symbol: '👁️',
    author: 'فاطمة النجار',
    date: '2024-01-15',
    readTime: '6 دقائق',
    views: '3.1k',
    category: 'الرموز المقدسة',
    tags: ['عين حورس', 'الحماية', 'القوة']
  },
  {
    id: 'ankh-symbol-eternal-life-egyptian-heritage',
    title: 'رمز العنخ: مفتاح الحياة الأبدية',
    excerpt: 'اكتشف معنى رمز العنخ المصري وكيف يمثل الحياة الأبدية والقوة ال ية',
    symbol: '☥',
    author: 'د. خالد محمود',
    date: '2024-01-12',
    readTime: '8 دقائق',
    views: '2.7k',
    category: 'الرموز المقدسة',
    tags: ['العنخ', 'الحياة الأبدية', 'القوة ال ية']
  }
];

const BlogSymbolsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [likedArticles, setLikedArticles] = useState<string[]>([]);

  const categories = ['الكل', 'الآلهة المصرية', 'الرموز المقدسة'];

  const filteredArticles = symbolArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (articleId: string) => {
    setLikedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  return (
    <>
      <SEOHead
        seoConfig={{
          title: "مقالات الرموز الفرعونية | Pharaonic Symbols Blog",
          description: "اكتشف معاني الرموز الفرعونية المقدسة من خلال مقالات مفصلة. تعرف على أنوبيس وعين حورس والجعران المقدس وغيرها من الرموز المصرية.",
          keywords: [
            'الرموز الفرعونية',
            'أنوبيس',
            'عين حورس',
            'الجعران المقدس',
            'العنخ',
            'pharaonic symbols blog',
            'egyptian symbols articles'
          ],
          openGraph: {
            title: "مقالات الرموز الفرعونية | Pharaonic Symbols Blog",
            description: "اكتشف معاني الرموز الفرعونية المقدسة من خلال مقالات مفصلة",
            image: "/blog-symbols-og.jpg",
            url: "/blog/symbols",
            type: "website",
            siteName: "Pharaonic Pillows"
          },
          twitter: {
            card: "summary_large_image",
            title: "مقالات الرموز الفرعونية | Pharaonic Symbols Blog",
            description: "اكتشف معاني الرموز الفرعونية المقدسة من خلال مقالات مفصلة",
            image: "/blog-symbols-og.jpg"
          }
        }}
        canonical="/blog/symbols"
      />

      <div className="min-h-screen bg-gradient-to-br from-papyrus via-desert-sand to-pharaonic-gold">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-10 text-6xl"
            >
              ☥
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 left-20 text-4xl"
            >
              👁️
            </motion.div>
            <motion.div
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/4 text-5xl"
            >
              🪲
            </motion.div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <motion.h1 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold text-hieroglyph-black mb-6 font-pharaonic"
              >
                🔱 مقالات الرموز الفرعونية
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto"
              >
                اكتشف المعاني العميقة للرموز المصرية المقدسة وكيف تؤثر على تصاميمنا المعاصرة
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex justify-center"
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center text-pharaonic-gold hover:text-deep-blue transition-colors group"
                >
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  العودة إلى المدونة الرئيسية
                </Link>
              </motion.div>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ابحث في المقالات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <FaFilter className="text-pharaonic-gold" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-transparent outline-none transition-all bg-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Results Count */}
                <div className="text-sm text-gray-600">
                  {filteredArticles.length} مقال
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12"
            >
              <div className="md:flex">
                <div className="md:w-1/2 bg-gradient-to-r from-pharaonic-gold to-deep-blue p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">{symbolArticles[0].symbol}</div>
                    <h3 className="text-2xl font-bold">مقال مميز</h3>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-pharaonic-gold/10 text-pharaonic-gold px-3 py-1 rounded-full text-sm font-medium">
                      {symbolArticles[0].category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaEye className="mr-1" />
                      {symbolArticles[0].views}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-hieroglyph-black mb-4">
                    {symbolArticles[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {symbolArticles[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaUser className="mr-2" />
                      <span>{symbolArticles[0].author}</span>
                      <span className="mx-2">•</span>
                      <FaClock className="mr-1" />
                      <span>{symbolArticles[0].readTime}</span>
                    </div>
                    <Link
                      href={`/blog/${symbolArticles[0].id}`}
                      className="bg-gradient-to-r from-pharaonic-gold to-deep-blue text-white py-2 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      اقرأ المقال
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${searchTerm}-${selectedCategory}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredArticles.slice(1).map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {/* Symbol Header */}
                  <div className="relative h-32 bg-gradient-to-r from-pharaonic-gold to-deep-blue flex items-center justify-center overflow-hidden">
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-white text-5xl"
                    >
                      {article.symbol}
                    </motion.div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleLike(article.id)}
                        className={`p-2 rounded-full transition-colors ${
                          likedArticles.includes(article.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <FaHeart className="text-sm" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                      >
                        <FaShare className="text-sm" />
                      </motion.button>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <div className="flex items-center text-white/80 text-sm bg-black/20 rounded-full px-2 py-1">
                        <FaEye className="mr-1" />
                        {article.views}
                      </div>
                    </div>

                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-2 left-2 text-2xl text-white"
                      >
                        ☥
                      </motion.div>
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-2 right-2 text-xl text-white"
                      >
                        👁️
                      </motion.div>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-pharaonic-gold/10 text-pharaonic-gold px-2 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">{article.date}</span>
                    </div>

                    <h2 className="text-lg font-bold text-hieroglyph-black mb-3 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {article.excerpt}
                    </p>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center">
                        <FaUser className="mr-1" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <Link
                      href={`/blog/${article.id}`}
                      className="inline-flex items-center text-pharaonic-gold hover:text-deep-blue font-semibold text-sm transition-colors"
                    >
                      اقرأ المزيد
                      <FaArrowRight className="mr-2" />
                    </Link>
                  </div>
                </motion.article>
              ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-hieroglyph-black mb-4">
                🎨 منتجات مستوحاة من الرموز المقدسة
              </h2>
              <p className="text-gray-700 mb-6">
                اكتشف وسائد السفر المزينة بالرموز الفرعونية الأصيلة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="bg-gradient-to-r from-pharaonic-gold to-deep-blue text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  تصفح المنتجات
                </Link>
                <Link
                  href="/pharaonic-symbols"
                  className="border-2 border-pharaonic-gold text-pharaonic-gold py-3 px-8 rounded-xl font-semibold hover:bg-pharaonic-gold hover:text-white transition-all duration-300"
                >
                  دليل الرموز
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogSymbolsPage;
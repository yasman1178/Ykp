/**
 * Pharaonic Symbols Page
 * Interactive guide to ancient Egyptian symbols with modern UX
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { SEOHead } from '@/components/SEOHead';
import { PHARAONIC_SYMBOLS_ARTICLES, BlogArticle } from '@/data/blog-articles';

interface Symbol {
  id: string;
  name: string;
  arabicName: string;
  icon: string;
  description: string;
  arabicDescription: string;
  meaning: string;
  arabicMeaning: string;
  historicalPeriod: string;
  color: string;
  article?: BlogArticle;
}

const PHARAONIC_SYMBOLS: Symbol[] = [
  {
    id: 'anubis',
    name: 'Anubis',
    arabicName: 'أنوبيس',
    icon: '𓃥',
    description: 'God of the afterlife and mummification',
    arabicDescription: '  الحياة الآخرة والتحنيط',
    meaning: 'Protection and guidance in the afterlife',
    arabicMeaning: 'الحماية والإرشاد في الحياة الآخرة',
    historicalPeriod: 'Old Kingdom',
    color: 'from-gray-800 to-black',
  },
  {
    id: 'scarab',
    name: 'Royal Scarab',
    arabicName: 'الجعران الملكي',
    icon: '𓆣',
    description: 'Symbol of rebirth and eternal life',
    arabicDescription: 'رمز الولادة الجديدة والحياة الأبدية',
    meaning: 'Transformation and renewal',
    arabicMeaning: 'التحول والتجديد',
    historicalPeriod: 'All Periods',
    color: 'from-emerald-600 to-teal-800',
  },
  {
    id: 'eye-of-horus',
    name: 'Eye of Horus',
    arabicName: 'عين حورس',
    icon: '𓂀',
    description: 'Symbol of protection and royal power',
    arabicDescription: 'رمز الحماية والقوة الملكية',
    meaning: 'Divine protection and healing',
    arabicMeaning: 'الحماية ال ية والشفاء',
    historicalPeriod: 'All Periods',
    color: 'from-blue-600 to-indigo-800',
  },
  {
    id: 'ankh',
    name: 'Ankh',
    arabicName: 'عنخ',
    icon: '𓋹',
    description: 'Key of life and eternal existence',
    arabicDescription: 'مفتاح الحياة والوجود الأبدي',
    meaning: 'Life, immortality, and divine power',
    arabicMeaning: 'الحياة والخلود والقوة ال ية',
    historicalPeriod: 'All Periods',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    id: 'lotus',
    name: 'Sacred Lotus',
    arabicName: 'اللوتس المقدس',
    icon: '𓆸',
    description: 'Symbol of creation and rebirth',
    arabicDescription: 'رمز الخلق والولادة الجديدة',
    meaning: 'Purity, creation, and the sun',
    arabicMeaning: 'النقاء والخلق والشمس',
    historicalPeriod: 'All Periods',
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'sphinx',
    name: 'Great Sphinx',
    arabicName: 'أبو الهول العظيم',
    icon: '𓎛',
    description: 'Guardian of sacred places',
    arabicDescription: 'حارس الأماكن المقدسة',
    meaning: 'Wisdom, strength, and protection',
    arabicMeaning: 'الحكمة والقوة والحماية',
    historicalPeriod: 'Old Kingdom',
    color: 'from-amber-600 to-yellow-700',
  },
  {
    id: 'nefertiti',
    name: 'Queen Nefertiti',
    arabicName: 'الملكة نفرتيتي',
    icon: '𓇳',
    description: 'Symbol of beauty and royal power',
    arabicDescription: 'رمز الجمال والقوة الملكية',
    meaning: 'Divine beauty and feminine power',
    arabicMeaning: 'الجمال ال ي والقوة الأنثوية',
    historicalPeriod: 'New Kingdom',
    color: 'from-purple-600 to-violet-800',
  },
  {
    id: 'pyramids',
    name: 'Great Pyramids',
    arabicName: 'الأهرامات العظيمة',
    icon: '𓉴',
    description: 'Eternal monuments to the pharaohs',
    arabicDescription: 'نصب أبدية للفراعنة',
    meaning: 'Eternity, divine ascension, and power',
    arabicMeaning: 'الأبدية والصعود ال ي والقوة',
    historicalPeriod: 'Old Kingdom',
    color: 'from-stone-600 to-gray-700',
  },
  {
    id: 'cleopatra',
    name: 'Queen Cleopatra',
    arabicName: 'الملكة كليوباترا',
    icon: '𓇯',
    description: 'Last pharaoh of ancient Egypt',
    arabicDescription: 'آخر فراعنة مصر القديمة',
    meaning: 'Intelligence, diplomacy, and leadership',
    arabicMeaning: 'الذكاء والدبلوماسية والقيادة',
    historicalPeriod: 'Ptolemaic Period',
    color: 'from-red-600 to-pink-700',
  },
  {
    id: 'crown',
    name: "Pharaoh's Crown",
    arabicName: 'تاج الفرعون',
    icon: '𓋑',
    description: 'Symbol of divine kingship',
    arabicDescription: 'رمز الملكية ال ية',
    meaning: 'Royal authority and divine mandate',
    arabicMeaning: 'السلطة الملكية والتفويض ال ي',
    historicalPeriod: 'All Periods',
    color: 'from-yellow-600 to-amber-700',
  },
];

interface PharaonicSymbolsProps {
  articles: BlogArticle[];
}

export default function PharaonicSymbols({ articles }: PharaonicSymbolsProps) {
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Link articles to symbols
  const symbolsWithArticles = PHARAONIC_SYMBOLS.map(symbol => ({
    ...symbol,
    article: articles.find(article => 
      article.symbol.name.toLowerCase().includes(symbol.name.toLowerCase()) ||
      symbol.name.toLowerCase().includes(article.symbol.name.toLowerCase())
    )
  }));

  const filteredSymbols = symbolsWithArticles.filter(symbol => {
    const matchesSearch = symbol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symbol.arabicName.includes(searchTerm);
    const matchesFilter = filter === 'all' || symbol.historicalPeriod.toLowerCase().includes(filter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const periods = ['all', 'Old Kingdom', 'New Kingdom', 'All Periods', 'Ptolemaic Period'];

  return (
    <Layout
      pageTitle="الرموز الفرعونية | Pharaonic Symbols - Ancient Egyptian Heritage | YKP Supplies"
      metaDescription="اكتشف الرموز الفرعونية المقدسة ومعانيها العميقة. من أنوبيس إلى عين حورس، تعرف على التراث المصري القديم وكيف يلهم تصاميم وسائد السفر المصرية الفاخرة."
      canonicalUrl="https://www.ykp-eg.com/pharaonic-symbols"
    >
      <div className="min-h-screen bg-gradient-to-br from-papyrus via-desert-sand to-pharaonic-gold">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-hieroglyph-black/10 to-deep-blue/10"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-8xl mb-6">𓂀</div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pharaonic-gold via-deep-blue to-pharaonic-gold bg-clip-text text-transparent mb-6 font-pharaonic">
                الرموز الفرعونية
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-hieroglyph-black mb-8">
                Pharaonic Symbols
              </h2>
              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                اكتشف عالم الرموز المصرية القديمة الساحر واستكشف معانيها العميقة وقوتها الروحية
              </p>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4 leading-relaxed">
                Discover the fascinating world of ancient Egyptian symbols and explore their deep meanings and spiritual power
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="ابحث عن رمز... Search symbol..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold text-right"
                    dir="rtl"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap gap-2">
                  {periods.map(period => (
                    <button
                      key={period}
                      onClick={() => setFilter(period)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        filter === period
                          ? 'bg-pharaonic-gold text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-pharaonic-gold/10'
                      }`}
                    >
                      {period === 'all' ? 'الكل' : period}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Symbols Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredSymbols.map((symbol, index) => (
                  <motion.div
                    key={symbol.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedSymbol(symbol)}
                  >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      {/* Symbol Icon */}
                      <div className={`h-32 bg-gradient-to-br ${symbol.color} flex items-center justify-center relative overflow-hidden`}>
                        <div className="text-6xl text-white/90 group-hover:scale-110 transition-transform duration-300">
                          {symbol.icon}
                        </div>
                        <div className="absolute top-2 right-2">
                          {symbol.article && (
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Symbol Info */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-hieroglyph-black mb-1 text-right">
                          {symbol.arabicName}
                        </h3>
                        <h4 className="text-lg font-semibold text-gray-700 mb-3">
                          {symbol.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 text-right">
                          {symbol.arabicDescription}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{symbol.historicalPeriod}</span>
                          <span className="bg-pharaonic-gold/10 text-pharaonic-gold px-2 py-1 rounded">
                            اضغط للتفاصيل
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredSymbols.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">
                  لم يتم العثور على رموز
                </h3>
                <p className="text-gray-500">
                  جرب البحث بكلمات مختلفة أو غير المرشح
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Symbol Detail Modal */}
        <AnimatePresence>
          {selectedSymbol && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedSymbol(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className={`h-40 bg-gradient-to-br ${selectedSymbol.color} flex items-center justify-center relative`}>
                  <div className="text-8xl text-white/90">
                    {selectedSymbol.icon}
                  </div>
                  <button
                    onClick={() => setSelectedSymbol(null)}
                    className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-hieroglyph-black mb-2 font-pharaonic">
                      {selectedSymbol.arabicName}
                    </h2>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                      {selectedSymbol.name}
                    </h3>
                    <div className="bg-pharaonic-gold/10 rounded-lg p-3 mb-4">
                      <span className="text-pharaonic-gold font-medium">
                        {selectedSymbol.historicalPeriod}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="text-right">
                      <h4 className="text-lg font-bold text-hieroglyph-black mb-2">الوصف</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedSymbol.arabicDescription}
                      </p>
                    </div>

                    <div className="text-right">
                      <h4 className="text-lg font-bold text-hieroglyph-black mb-2">المعنى والرمزية</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedSymbol.arabicMeaning}
                      </p>
                    </div>

                    {selectedSymbol.article && (
                      <div className="bg-gradient-to-r from-pharaonic-gold/10 to-deep-blue/10 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-hieroglyph-black mb-3 text-right">
                          اقرأ المقال المفصل
                        </h4>
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/blog/${selectedSymbol.article.slug}`}
                            className="bg-gradient-to-r from-pharaonic-gold to-deep-blue text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                          >
                            اقرأ المقال الكامل
                          </Link>
                          <div className="text-sm text-gray-600">
                            {selectedSymbol.article.readingTime} دقائق قراءة
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
            >
              <div className="text-6xl mb-6">𓆣</div>
              <h2 className="text-3xl font-bold text-hieroglyph-black mb-4 font-pharaonic">
                اكتشف مجموعة الوسائد المصرية
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                استمتع بالراحة الفائقة مع وسائد السفر المصرية المستوحاة من هذه الرموز الفرعونية الخالدة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="bg-gradient-to-r from-pharaonic-gold to-deep-blue text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  تسوق الآن
                </Link>
                <Link
                  href="/blog"
                  className="border-2 border-pharaonic-gold text-pharaonic-gold px-8 py-4 rounded-xl font-semibold hover:bg-pharaonic-gold hover:text-white transition-all duration-300"
                >
                  اقرأ المزيد من المقالات
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = PHARAONIC_SYMBOLS_ARTICLES;

  return {
    props: {
      articles,
    },
    revalidate: 86400,
  };
};
/**
 * Blog Culture Page
 * Egyptian culture articles and heritage content
 */

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SEOHead } from '@/components/SEOHead';
import { FaArrowRight, FaClock, FaUser, FaTag } from 'react-icons/fa';

const cultureArticles = [
  {
    id: 'ancient-egyptian-daily-life',
    title: 'الحياة اليومية في مصر القديمة',
    excerpt: 'اكتشف كيف كان يعيش المصريون القدماء وما هي تقاليدهم اليومية',
    image: '/blog/daily-life.jpg',
    author: 'د. أحمد المصري',
    date: '2024-01-15',
    readTime: '8 دقائق',
    category: 'التراث المصري',
    tags: ['الحياة اليومية', 'التراث', 'مصر القديمة']
  },
  {
    id: 'pharaonic-art-influence',
    title: 'تأثير الفن الفرعوني على التصميم الحديث',
    excerpt: 'كيف يؤثر الفن المصري القديم على تصاميم المنتجات المعاصرة',
    image: '/blog/pharaonic-art.jpg',
    author: 'سارة حسن',
    date: '2024-01-10',
    readTime: '6 دقائق',
    category: 'الفن والتصميم',
    tags: ['الفن الفرعوني', 'التصميم', 'ال ام']
  },
  {
    id: 'egyptian-mythology-modern-world',
    title: 'الأساطير المصرية في العالم الحديث',
    excerpt: 'كيف تستمر الأساطير المصرية في  ام الثقافة الشعبية اليوم',
    image: '/blog/mythology.jpg',
    author: 'محمد علي',
    date: '2024-01-05',
    readTime: '10 دقائق',
    category: 'الأساطير',
    tags: ['الأساطير', 'الثقافة الشعبية', 'التراث']
  }
];

const BlogCulturePage: React.FC = () => {
  return (
    <>
      <SEOHead
        seoConfig={{
          title: "مقالات الثقافة المصرية | Egyptian Culture Blog",
          description: "اكتشف مقالات شيقة عن الثقافة المصرية القديمة والتراث الفرعوني. تعرف على تأثير الحضارة المصرية على العالم الحديث.",
          keywords: [
            'مقالات الثقافة المصرية',
            'التراث الفرعوني',
            'الحضارة المصرية',
            'egyptian culture blog',
            'pharaonic heritage articles'
          ],
          openGraph: {
            title: "مقالات الثقافة المصرية | Egyptian Culture Blog",
            description: "اكتشف مقالات شيقة عن الثقافة المصرية القديمة والتراث الفرعوني",
            image: "/blog-culture-og.jpg",
            url: "/blog/culture",
            type: "website",
            siteName: "Pharaonic Pillows"
          },
          twitter: {
            card: "summary_large_image",
            title: "مقالات الثقافة المصرية | Egyptian Culture Blog",
            description: "اكتشف مقالات شيقة عن الثقافة المصرية القديمة والتراث الفرعوني",
            image: "/blog-culture-og.jpg"
          }
        }}
        canonical="/blog/culture"
      />

      <div className="min-h-screen bg-gradient-to-br from-papyrus via-desert-sand to-pharaonic-gold">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-hieroglyph-black mb-6 font-pharaonic">
                🏺 مقالات الثقافة المصرية
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                اكتشف عمق الحضارة المصرية من خلال مقالات شيقة تربط بين التراث القديم والحياة المعاصرة
              </p>
              <div className="flex justify-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-pharaonic-gold hover:text-deep-blue transition-colors"
                >
                  <FaArrowRight className="ml-2" />
                  العودة إلى المدونة الرئيسية
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cultureArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {/* Article Image */}
                  <div className="relative h-48 bg-gradient-to-r from-pharaonic-gold to-deep-blue">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-4xl">📜</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-pharaonic-gold px-3 py-1 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-hieroglyph-black mb-3 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <FaUser className="text-pharaonic-gold" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <FaClock className="text-pharaonic-gold" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-pharaonic-gold/10 text-pharaonic-gold px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <Link
                      href={`/blog/${article.id}`}
                      className="inline-flex items-center text-pharaonic-gold hover:text-deep-blue font-semibold transition-colors"
                    >
                      اقرأ المزيد
                      <FaArrowRight className="mr-2" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
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
                🎨 اكتشف منتجاتنا المستوحاة من التراث
              </h2>
              <p className="text-gray-700 mb-6">
                تصفح مجموعتنا من وسائد السفر المصممة بعناية والمستوحاة من الثقافة المصرية العريقة
              </p>
              <Link
                href="/products"
                className="bg-gradient-to-r from-pharaonic-gold to-deep-blue text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                تصفح المنتجات
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogCulturePage;
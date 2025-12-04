import { GetStaticProps } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PHARAONIC_SYMBOLS_ARTICLES, BlogArticle, getFeaturedArticles } from '@/data/blog-articles';
import { TARGET_KEYWORDS } from '@/lib/seo-content';
import { SEOHead } from '@/components/SEOHead';
import EgyptianTags from '@/components/EgyptianTags';
import ProgressiveReveal from '@/components/ProgressiveReveal';
import EgyptianCTA from '@/components/EgyptianCTA';
import BlogCategories from '@/components/blog/BlogCategories';
import BlogSearch from '@/components/blog/BlogSearch';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

interface Category {
  name: string;
  arabicName: string;
  slug: string;
}

interface BlogIndexProps {
  articles: BlogArticle[];
  featuredArticles: BlogArticle[];
  categories: Category[];
}

export default function BlogIndex({ articles, featuredArticles, categories }: BlogIndexProps) {
  const router = useRouter();
  const currentCategorySlug = router.query.category as string;

  const filteredArticles = currentCategorySlug
    ? articles.filter(article => article.symbol.name.toLowerCase().replace(/\s+/g, '-') === currentCategorySlug)
    : articles;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Egyptian Pharaonic Symbols Blog - Ancient Wisdom & Travel Pillows',
    description: 'Explore the fascinating world of ancient Egyptian symbols and their meanings. Discover how Pharaonic heritage inspires our premium Egyptian travel pillow designs.',
    url: 'https://pharaonicpillows.com/blog',
    blogPost: featuredArticles.map(article => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      url: `https://pharaonicpillows.com/blog/${article.slug}`,
      datePublished: article.publishDate,
      author: {
        '@type': 'Person',
        name: article.author
      }
    }))
  };

  return (
    <>
      <SEOHead
        seoConfig={{
          title: "Egyptian Pharaonic Symbols Blog | Ancient Wisdom & Travel Pillows",
          description: "Explore fascinating articles about ancient Egyptian symbols: Anubis, Scarab, Nefertiti, Pyramids, Eye of Horus, Ankh, Lotus, Sphinx, Cleopatra, and Pharaoh's Crown. Discover how these symbols inspire our premium Egyptian travel pillow designs.",
          keywords: [
            ...TARGET_KEYWORDS.primary.arabic,
            ...TARGET_KEYWORDS.primary.english,
            'Egyptian symbols blog',
            'Pharaonic heritage articles',
            'ancient Egyptian culture',
            'Egyptian travel pillow blog',
            'رموز فرعونية ومعانيها',
            'مدونة الثقافة المصرية القديمة'
          ],
          openGraph: {
            title: "Egyptian Pharaonic Symbols Blog | Ancient Wisdom & Travel Pillows",
            description: "Explore fascinating articles about ancient Egyptian symbols and discover how they inspire our premium Egyptian travel pillow designs.",
            image: "https://pharaonicpillows.com/blog-og-image.jpg",
            url: "https://pharaonicpillows.com/blog",
            type: "website",
            siteName: "Pharaonic Pillows"
          },
          twitter: {
            card: "summary_large_image",
            title: "Egyptian Pharaonic Symbols Blog | Ancient Wisdom & Travel Pillows",
            description: "Explore fascinating articles about ancient Egyptian symbols and discover how they inspire our premium Egyptian travel pillow designs.",
            image: "https://pharaonicpillows.com/blog-twitter-image.jpg"
          }
        }}
        structuredData={structuredData}
        canonical="https://pharaonicpillows.com/blog"
      />

      <div className="min-h-screen bg-white">
        {/* Newspaper-Style Header */}
        <section className="relative py-12 px-4 border-b-4 border-black bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Newspaper Masthead */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center border-b-2 border-black pb-6 mb-6"
            >
              {/* Date and Edition */}
              <div className="flex justify-between items-center text-xs uppercase tracking-wider mb-4 text-gray-600">
                <span>{new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span className="font-bold">CAIRO EDITION</span>
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>

              {/* Main Masthead */}
              <h1 
                className="text-6xl md:text-8xl font-bold text-black mb-2 tracking-tight" 
                style={{ fontFamily: 'Playfair Display, serif', fontWeight: 900 }}
              >
                THE PHARAONIC TIMES
              </h1>
              <div className="text-xl md:text-2xl text-black mb-3" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
                جريدة الأزمنة الفرعونية
              </div>
              
              {/* Tagline */}
              <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-widest text-gray-700">
                <span className="border-t border-black w-16"></span>
                <span>Ancient Wisdom • Modern Comfort • Egyptian Heritage</span>
                <span className="border-t border-black w-16"></span>
              </div>
            </motion.div>

            {/* Navigation Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center gap-8 text-sm uppercase tracking-wider font-semibold text-gray-800 pb-4"
            >
              <a href="#featured" className="hover:text-amber-600 transition-colors">Featured</a>
              <span className="text-gray-300">|</span>
              <a href="#all-articles" className="hover:text-amber-600 transition-colors">All Articles</a>
              <span className="text-gray-300">|</span>
              <Link href="/products" className="hover:text-amber-600 transition-colors">Products</Link>
              <span className="text-gray-300">|</span>
              <Link href="/contact" className="hover:text-amber-600 transition-colors">Contact</Link>
            </motion.div>
          </div>
        </section>

        {/* Blog Categories */}
        <BlogCategories categories={categories} />

        {/* Blog Search */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogSearch onSearch={(query) => {
            router.push({
              pathname: router.pathname,
              query: query ? { ...router.query, search: query } : { category: router.query.category },
            });
          }} />
        </div>

        {/* Newspaper-Style Featured Articles */}
        <section id="featured" className="py-12 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="border-b-4 border-black pb-3 mb-8">
              <h2 className="text-4xl font-bold text-black uppercase tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Today&apos;s Headlines
              </h2>
              <p className="text-lg text-gray-700 mt-1" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
                عناوين اليوم الرئيسية
              </p>
            </div>

            {/* Lead Story (First Article - Large) */}
            {featuredArticles[0] && (
              <Link href={`/blog/${featuredArticles[0].slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12 pb-12 border-b-2 border-gray-300 hover:bg-white transition-colors duration-300 p-6 -m-6 cursor-pointer group"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Lead Image */}
                    <div className="relative h-96 bg-gradient-to-br from-amber-100 to-blue-100 flex items-center justify-center border-4 border-black">
                      <div className="text-9xl">{getSymbolIcon(featuredArticles[0].symbol.name)}</div>
                      <div className="absolute top-4 left-4 bg-black text-white px-4 py-2 text-xs uppercase tracking-wider font-bold">
                        Featured Story
                      </div>
                    </div>

                    {/* Lead Content */}
                    <div className="flex flex-col justify-center">
                      <div className="text-xs uppercase tracking-widest text-gray-600 mb-3 font-semibold">
                        {featuredArticles[0].symbol.name} • {featuredArticles[0].readingTime} MIN READ
                      </div>
                      <h3 
                        className="text-5xl font-bold text-black mb-4 leading-tight group-hover:text-amber-700 transition-colors" 
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {featuredArticles[0].arabicTitle}
                      </h3>
                      <h4 className="text-2xl font-semibold text-gray-700 mb-4 leading-snug">
                        {featuredArticles[0].title}
                      </h4>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6 line-clamp-4">
                        {featuredArticles[0].description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>By {featuredArticles[0].author}</span>
                        <span>•</span>
                        <span>{new Date(featuredArticles[0].publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            )}

            {/* Secondary Stories (Grid Layout) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.slice(1).map((article, index) => (
                <Link key={article.id} href={`/blog/${article.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b-2 border-gray-300 pb-6 hover:bg-white transition-colors duration-300 p-4 -m-4 cursor-pointer group"
                  >
                    {/* Article Image */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-amber-50 flex items-center justify-center border-2 border-black mb-4">
                      <div className="text-6xl">{getSymbolIcon(article.symbol.name)}</div>
                      <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 text-xs font-bold">
                        {article.readingTime} MIN
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="text-xs uppercase tracking-widest text-gray-600 mb-2 font-semibold">
                      {article.symbol.name}
                    </div>
                    <h3 
                      className="text-2xl font-bold text-black mb-2 leading-tight group-hover:text-amber-700 transition-colors line-clamp-2" 
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {article.arabicTitle}
                    </h3>
                    <h4 className="text-lg font-semibold text-gray-700 mb-3 leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                      {article.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      {new Date(article.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>



        {/* All Articles Section - Newspaper Columns */}
        <section id="all-articles" className="py-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="border-b-4 border-black pb-3 mb-8">
              <h2 className="text-4xl font-bold text-black uppercase tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Complete Coverage
              </h2>
              <p className="text-lg text-gray-700 mt-1" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
                التغطية الكاملة للرموز الفرعونية
              </p>
            </div>

            {/* Newspaper Columns Layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredArticles.map((article, index) => ( // Use filteredArticles here
                <Link key={article.id} href={`/blog/${article.slug}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 4) * 0.1 }}
                    className="border-b border-gray-300 pb-4 hover:bg-gray-50 transition-colors duration-300 p-3 -m-3 cursor-pointer group"
                  >
                    {/* Small Icon */}
                    <div className="w-full h-32 bg-gray-100 flex items-center justify-center border border-gray-300 mb-3">
                      <div className="text-4xl">{getSymbolIcon(article.symbol.name)}</div>
                    </div>

                    {/* Article Info */}
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">
                      {article.symbol.name}
                    </div>
                    <h3 
                      className="text-lg font-bold text-black mb-2 leading-tight group-hover:text-amber-700 transition-colors line-clamp-3" 
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {article.arabicTitle}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-2">
                      {article.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      {article.readingTime} min read
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <EgyptianCTA
          arabicTitle="اكتشف مجموعة الوسائد المصرية الفاخرة"
          title="Discover Our Premium Egyptian Travel Pillow Collection"
          arabicDescription="استمتع بالراحة الفائقة مع وسائد السفر المصرية المصنوعة من الميموري فوم والمستوحاة من الرموز الفرعونية الخالدة"
          description="Experience ultimate comfort with our Egyptian travel pillows made from memory foam and inspired by timeless Pharaonic symbols"
          primaryButton={{
            arabicText: 'تسوق الآن',
            text: 'Shop Now',
            href: '/products',
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            )
          }}
          variant="gradient"
          symbolIcon="𓆣"
        />
      </div>
    </>
  );
}

function getSymbolIcon(symbolName: string): string {
  const icons: { [key: string]: string } = {
    'Anubis': '𓃥',
    'Royal Scarab': '𓆣',
    'Queen Nefertiti': '𓇳',
    'Great Pyramids': '𓉴',
    'Eye of Horus': '𓂀',
    'Ankh': '𓋹',
    'Sacred Lotus': '𓆸',
    'Great Sphinx': '𓎛',
    'Queen Cleopatra': '𓇯',
    "Pharaoh's Crown": '𓋑'
  };
  return icons[symbolName] || '𓀀';
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = PHARAONIC_SYMBOLS_ARTICLES;
  const featuredArticles = getFeaturedArticles();

  // Extract unique categories for navigation
  const uniqueCategories = Array.from(new Set(articles.map(article => article.symbol.name)))
    .map(name => {
      const article = articles.find(art => art.symbol.name === name);
      return {
        name: article?.symbol.name || name,
        arabicName: article?.symbol.arabicName || name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
      };
    });

  return {
    props: {
      articles,
      featuredArticles,
      categories: uniqueCategories,
    },
    revalidate: 86400, // Revalidate once per day
  };
};

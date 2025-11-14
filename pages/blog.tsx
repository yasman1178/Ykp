import { GetStaticProps } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PHARAONIC_SYMBOLS_ARTICLES, BlogArticle, getFeaturedArticles } from '@/data/blog-articles';
import { TARGET_KEYWORDS } from '@/lib/seo-content';
import { SEOHead } from '@/components/SEOHead';
import EgyptianTags from '@/components/EgyptianTags';
import ProgressiveReveal from '@/components/ProgressiveReveal';
import EgyptianCTA from '@/components/EgyptianCTA';

interface BlogIndexProps {
  articles: BlogArticle[];
  featuredArticles: BlogArticle[];
}

export default function BlogIndex({ articles, featuredArticles }: BlogIndexProps) {
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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-blue-50/30">
        {/* Enhanced Hero Section */}
        <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-amber-800">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 text-8xl text-amber-400 animate-float">𓀀</div>
            <div className="absolute top-40 right-20 text-6xl text-blue-300 animate-float-delayed">𓂀</div>
            <div className="absolute bottom-32 left-1/4 text-7xl text-amber-300 animate-float-slow">𓋹</div>
            <div className="absolute bottom-20 right-1/3 text-5xl text-blue-400 animate-float">𓆣</div>
          </div>
          
          <div className="relative max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8"
              >
                <span className="text-2xl">📚</span>
                <span className="text-white font-medium">مدونة التراث المصري | Egyptian Heritage Blog</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight" 
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                رموز فرعونية خالدة
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-2xl md:text-3xl text-amber-300 mb-6 font-semibold"
              >
                Eternal Pharaonic Symbols
              </motion.p>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="max-w-4xl mx-auto space-y-4"
              >
                <p className="text-xl md:text-2xl text-white leading-relaxed font-medium">
                  استكشف عالم الرموز المصرية القديمة الساحر واكتشف كيف تلهم هذه الرموز الخالدة تصاميم وسائد السفر المصرية الفاخرة لدينا
                </p>
                <p className="text-lg md:text-xl text-white/95 leading-relaxed">
                  Explore the fascinating world of ancient Egyptian symbols and discover how these timeless emblems inspire our premium Egyptian travel pillow designs
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
              >
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <span>استكشف المقالات</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <Link href="/products">
                  <button
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                  >
                    <span>تسوق المنتجات</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)" />
            </svg>
          </div>
        </section>

        {/* Featured Articles Section */}
        <section id="featured" className="py-20 px-4 -mt-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block text-amber-600 font-semibold text-sm uppercase tracking-wider mb-3">
                ✨ مختارات خاصة
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                المقالات المميزة
              </h2>
              <p className="text-xl text-gray-600 mb-6">Featured Articles</p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 via-blue-500 to-amber-500 mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {featuredArticles.map((article, index) => (
                <ProgressiveReveal key={article.id} delay={0.15 * index}>
                  <Link href={`/blog/${article.slug}`}>
                    <motion.article
                      className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer h-full flex flex-col border border-gray-100"
                      whileHover={{ y: -12, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Image/Icon Section */}
                      <div className="relative h-56 bg-gradient-to-br from-amber-400 via-amber-500 to-blue-600 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
                        <motion.div 
                          className="text-7xl text-white/90 relative z-10"
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          {getSymbolIcon(article.symbol.name)}
                        </motion.div>
                        
                        {/* Reading Time Badge */}
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 text-sm font-semibold">{article.readingTime} دقائق</span>
                          </div>
                        </div>

                        {/* Decorative Corner */}
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-tr-full"></div>
                      </div>
                      
                      {/* Content Section */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {article.arabicTitle}
                        </h3>
                        <h4 className="text-lg font-semibold text-gray-600 mb-3 leading-snug">
                          {article.title}
                        </h4>
                        <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed flex-1">
                          {article.description}
                        </p>
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <EgyptianTags 
                            tags={article.tags} 
                            maxTags={2} 
                            variant="default"
                          />
                          <div className="inline-flex items-center text-amber-600 group-hover:text-blue-600 font-semibold transition-colors">
                            <span className="text-sm">اقرأ المزيد</span>
                            <motion.svg 
                              className="w-5 h-5 ml-2" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </motion.svg>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </ProgressiveReveal>
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

  return {
    props: {
      articles,
      featuredArticles,
    },
    revalidate: 86400, // Revalidate once per day
  };
};
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BlogArticle } from '@/data/blog-articles';
import BlogSearchFilter from './BlogSearchFilter';
import BlogPagination, { calculatePagination } from './BlogPagination';
import BlogFeaturedCard, { BlogCompactCard } from './BlogFeaturedCard';

interface BlogListingLayoutProps {
  featuredArticles: BlogArticle[];
  allArticles: BlogArticle[];
  categories?: Array<{ name: string; arabicName: string; slug: string }>;
  itemsPerPage?: number;
}

interface FilterOptions {
  category?: string;
  sortBy?: 'date' | 'popularity' | 'relevance';
  dateRange?: 'all' | 'week' | 'month' | 'year';
}

export default function BlogListingLayout({ 
  featuredArticles, 
  allArticles,
  categories = [],
  itemsPerPage = 12
}: BlogListingLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'date',
    dateRange: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = [...allArticles];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.symbol.name.toLowerCase().includes(query) ||
        (article.arabicTitle && article.arabicTitle.includes(searchQuery))
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(article =>
        article.symbol.name.toLowerCase().replace(/\s+/g, '-') === filters.category
      );
    }

    // Apply date range filter
    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date();
      const ranges = {
        week: 7,
        month: 30,
        year: 365
      };
      const days = ranges[filters.dateRange];
      const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

      filtered = filtered.filter(article =>
        new Date(article.publishDate) >= cutoffDate
      );
    }

    // Apply sorting
    if (filters.sortBy === 'date') {
      filtered.sort((a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
    } else if (filters.sortBy === 'popularity') {
      // Sort by reading time as a proxy for popularity
      filtered.sort((a, b) => b.readingTime - a.readingTime);
    }

    return filtered;
  }, [allArticles, searchQuery, filters]);

  // Calculate pagination
  const pagination = calculatePagination(
    filteredArticles.length,
    itemsPerPage,
    currentPage
  );

  // Get articles for current page
  const paginatedArticles = filteredArticles.slice(
    pagination.startIndex,
    pagination.endIndex
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-white">
      {/* Newspaper-Style Masthead */}
      <NewspaperMasthead />

      {/* Category Navigation */}
      {categories.length > 0 && <CategoryBar categories={categories} />}

      {/* Search and Filter */}
      <BlogSearchFilter
        onSearch={setSearchQuery}
        onFilter={setFilters}
        categories={categories}
        totalResults={filteredArticles.length}
      />

      {/* Featured Section - Only show if no filters applied */}
      {!searchQuery && !filters.category && (
        <FeaturedSection articles={featuredArticles} />
      )}

      {/* All Articles Grid */}
      <AllArticlesSection 
        articles={paginatedArticles}
        showHeader={!searchQuery && !filters.category}
      />

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <BlogPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

// Newspaper Masthead Component
function NewspaperMasthead() {
  return (
    <section className="relative py-12 px-4 border-b-4 border-black bg-white">
      <div className="max-w-7xl mx-auto">
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
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-8 text-sm uppercase tracking-wider font-semibold text-gray-800 pb-4"
          aria-label="Blog navigation"
        >
          <a href="#featured" className="hover:text-amber-600 transition-colors">Featured</a>
          <span className="text-gray-300" aria-hidden="true">|</span>
          <a href="#all-articles" className="hover:text-amber-600 transition-colors">All Articles</a>
          <span className="text-gray-300" aria-hidden="true">|</span>
          <Link href="/products" className="hover:text-amber-600 transition-colors">Products</Link>
          <span className="text-gray-300" aria-hidden="true">|</span>
          <Link href="/contact" className="hover:text-amber-600 transition-colors">Contact</Link>
        </motion.nav>
      </div>
    </section>
  );
}

// Category Bar Component
function CategoryBar({ categories }: { categories: Array<{ name: string; arabicName: string; slug: string }> }) {
  return (
    <section className="bg-gray-100 border-b-2 border-gray-300 py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-sm font-bold uppercase tracking-wider text-gray-700 whitespace-nowrap">
            Categories:
          </span>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog?category=${category.slug}`}
              className="px-4 py-2 bg-white border border-gray-300 hover:bg-amber-50 hover:border-amber-600 transition-colors text-sm font-semibold whitespace-nowrap"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured Section Component
function FeaturedSection({ articles }: { articles: BlogArticle[] }) {
  if (!articles || articles.length === 0) return null;

  const leadArticle = articles[0];
  const secondaryArticles = articles.slice(1, 4);

  return (
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

        {/* Lead Story */}
        <LeadStory article={leadArticle} />

        {/* Secondary Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {secondaryArticles.map((article, index) => (
            <SecondaryStory key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Lead Story Component
function LeadStory({ article }: { article: BlogArticle }) {
  return <BlogFeaturedCard article={article} variant="large" />;
}

// Secondary Story Component
function SecondaryStory({ article, index }: { article: BlogArticle; index: number }) {
  return <BlogFeaturedCard article={article} variant="medium" index={index} />;
}

// All Articles Section Component
function AllArticlesSection({ 
  articles, 
  showHeader = true 
}: { 
  articles: BlogArticle[]; 
  showHeader?: boolean;
}) {
  if (articles.length === 0) {
    return (
      <section id="all-articles" className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-6xl mb-4">𓀀</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No Articles Found</h3>
          <p className="text-gray-600">لم يتم العثور على مقالات</p>
          <p className="text-gray-500 mt-4">Try adjusting your search or filters</p>
        </div>
      </section>
    );
  }

  return (
    <section id="all-articles" className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        {showHeader && (
          <div className="border-b-4 border-black pb-3 mb-8">
            <h2 className="text-4xl font-bold text-black uppercase tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Complete Coverage
            </h2>
            <p className="text-lg text-gray-700 mt-1" style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic' }}>
              التغطية الكاملة للرموز الفرعونية
            </p>
          </div>
        )}

        {/* Newspaper Columns Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <BlogCompactCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}



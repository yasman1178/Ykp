// Search Results Page for Manufacturing Blog
// Advanced search with filtering, analytics, and manufacturing focus

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { BlogArticleEnhanced } from '@/types/blog-enhanced';
import { ENHANCED_BLOG_ARTICLES, blogUtils } from '@/data/blog-articles-enhanced';
import SearchSystem from '@/components/blog/SearchSystem';
import FilterSystem from '@/components/blog/FilterSystem';
import ArticleGrid from '@/components/blog/ArticleGrid';

interface SearchPageProps {
  initialQuery?: string;
  allArticles: BlogArticleEnhanced[];
}

const SearchPage: React.FC<SearchPageProps> = ({
  initialQuery = '',
  allArticles
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<BlogArticleEnhanced[]>(allArticles);
  const [filteredResults, setFilteredResults] = useState<BlogArticleEnhanced[]>(allArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [searchStats, setSearchStats] = useState({
    totalResults: allArticles.length,
    searchTime: 0,
    suggestions: [] as string[]
  });

  // Update URL when search query changes
  useEffect(() => {
    if (searchQuery !== initialQuery) {
      const url = searchQuery 
        ? `/blog/search?q=${encodeURIComponent(searchQuery)}`
        : '/blog/search';
      
      router.replace(url, undefined, { shallow: true });
    }
  }, [searchQuery, initialQuery, router]);

  // Handle search results
  const handleSearchResults = (results: BlogArticleEnhanced[]) => {
    const startTime = performance.now();
    setSearchResults(results);
    setFilteredResults(results);
    
    const endTime = performance.now();
    const searchTime = Math.round(endTime - startTime);
    
    setSearchStats({
      totalResults: results.length,
      searchTime,
      suggestions: generateSearchSuggestions(searchQuery, results)
    });
  };

  // Handle filtered results
  const handleFilteredResults = (results: BlogArticleEnhanced[]) => {
    setFilteredResults(results);
  };

  // Handle search query change
  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  // Generate search suggestions
  const generateSearchSuggestions = (query: string, results: BlogArticleEnhanced[]): string[] => {
    if (!query || results.length > 5) return [];
    
    const suggestions: string[] = [];
    const lowerQuery = query.toLowerCase();
    
    // Suggest related cultural elements
    const culturalElements = ['Anubis', 'Eye of Horus', 'Ankh', 'Scarab', 'Nefertiti', 'Pyramid'];
    culturalElements.forEach(element => {
      if (!lowerQuery.includes(element.toLowerCase()) && 
          allArticles.some(a => a.culturalElement.englishName === element)) {
        suggestions.push(`${query} ${element}`);
      }
    });
    
    // Suggest manufacturing terms
    const manufacturingTerms = ['manufacturing', 'wholesale', 'pillow', 'memory foam', 'Egyptian cotton'];
    manufacturingTerms.forEach(term => {
      if (!lowerQuery.includes(term) && suggestions.length < 3) {
        suggestions.push(`${query} ${term}`);
      }
    });
    
    return suggestions.slice(0, 3);
  };

  // SEO metadata
  const pageTitle = searchQuery 
    ? `Search Results for "${searchQuery}" | Egyptian Pillow Manufacturing Blog`
    : 'Search | Egyptian Pillow Manufacturing Blog';
  
  const pageDescription = searchQuery
    ? `Find manufacturing insights and cultural articles about "${searchQuery}". Discover Egyptian pillow manufacturing, wholesale opportunities, and cultural heritage.`
    : 'Search our comprehensive collection of Egyptian pillow manufacturing insights, cultural heritage articles, and wholesale business information.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
        
        {/* Search-specific meta tags */}
        {searchQuery && (
          <>
            <meta name="keywords" content={`${searchQuery}, Egyptian pillow manufacturing, wholesale pillows, cultural heritage`} />
            <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/search?q=${encodeURIComponent(searchQuery)}`} />
          </>
        )}
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        
        {/* Structured Data for Search Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SearchResultsPage",
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": filteredResults.length,
                "itemListElement": filteredResults.slice(0, 10).map((article, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "item": {
                    "@type": "Article",
                    "headline": article.title,
                    "description": article.description,
                    "url": `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${article.slug}`,
                    "datePublished": article.publishDate,
                    "author": {
                      "@type": "Person",
                      "name": article.author.name
                    }
                  }
                }))
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <Link href="/" className="hover:text-amber-600 transition-colors duration-200">
                Home
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/blog" className="hover:text-amber-600 transition-colors duration-200">
                Blog
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-400">Search</span>
            </nav>

            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Search Manufacturing Insights'}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                {searchQuery 
                  ? `Find articles, manufacturing insights, and cultural information related to "${searchQuery}"`
                  : 'Discover comprehensive articles about Egyptian pillow manufacturing, cultural heritage, and wholesale opportunities'
                }
              </p>
            </div>

            {/* Search System */}
            <SearchSystem
              articles={allArticles}
              onSearchResults={handleSearchResults}
              onSearchQuery={handleSearchQuery}
              className="max-w-2xl"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Search Stats and Suggestions */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">
                      {filteredResults.length.toLocaleString()}
                    </span>
                    {' '}results found
                    {searchStats.searchTime > 0 && (
                      <span className="ml-2">
                        in {searchStats.searchTime}ms
                      </span>
                    )}
                  </div>
                  
                  {isLoading && (
                    <div className="flex items-center space-x-2 text-sm text-amber-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
                      <span>Searching...</span>
                    </div>
                  )}
                </div>

                {/* Search Suggestions */}
                {searchStats.suggestions.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Try:</span>
                    {searchStats.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(suggestion)}
                        className="text-sm text-amber-600 hover:text-amber-700 underline"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Filter System */}
          <FilterSystem
            articles={searchResults}
            onFilteredResults={handleFilteredResults}
            className="mb-8"
          />

          {/* Results */}
          {filteredResults.length > 0 ? (
            <ArticleGrid
              articles={filteredResults}
              loading={isLoading}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-6xl text-gray-300 mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {searchQuery ? `No results found for "${searchQuery}"` : 'Start Your Search'}
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {searchQuery 
                  ? "We couldn&apos;t find any articles matching your search. Try different keywords or browse our categories below."
                  : "Use the search bar above to find articles about Egyptian pillow manufacturing, cultural heritage, and wholesale opportunities."
                }
              </p>

              {/* Search Suggestions */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Popular Searches</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    'Anubis pillow manufacturing',
                    'Egyptian cotton memory foam',
                    'wholesale travel pillows',
                    'Eye of Horus design',
                    'premium pillow materials',
                    'cultural heritage pillows'
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setSearchQuery(suggestion)}
                      className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-amber-200 transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse Categories */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {[
                    { name: 'Ancient Figures', icon: '𓃥', count: 5 },
                    { name: 'Protection Symbols', icon: '𓂀', count: 4 },
                    { name: 'Manufacturing', icon: '🏭', count: 8 },
                    { name: 'Materials', icon: '🧵', count: 6 }
                  ].map((category) => (
                    <Link key={category.name} href={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer text-center">
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        <div className="text-xs text-gray-500">{category.count} articles</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Manufacturing CTA */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-blue-900 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Didn&apos;t Find What You&apos;re Looking For?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Contact our manufacturing experts directly for custom solutions, 
                wholesale pricing, and specialized Egyptian pillow designs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors duration-300 shadow-lg">
                    Contact Manufacturing Team
                  </button>
                </Link>
                <Link href="/wholesale">
                  <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                    Request Wholesale Catalog
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      initialQuery: '',
      allArticles: ENHANCED_BLOG_ARTICLES
    }
  };
};

export default SearchPage;
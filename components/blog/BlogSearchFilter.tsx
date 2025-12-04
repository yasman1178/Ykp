import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

interface BlogSearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  categories?: Array<{ name: string; arabicName: string; slug: string }>;
  totalResults?: number;
}

interface FilterOptions {
  category?: string;
  sortBy?: 'date' | 'popularity' | 'relevance';
  dateRange?: 'all' | 'week' | 'month' | 'year';
}

export default function BlogSearchFilter({
  onSearch,
  onFilter,
  categories = [],
  totalResults = 0
}: BlogSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'date',
    dateRange: 'all'
  });

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleFilterChange = (key: keyof FilterOptions, value: string | undefined) => {
    if (!value) return;
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({ sortBy: 'date', dateRange: 'all' });
    setSearchQuery('');
    onFilter({ sortBy: 'date', dateRange: 'all' });
    onSearch('');
  };

  const activeFiltersCount = Object.values(filters).filter(v => v && v !== 'all' && v !== 'date').length;

  return (
    <div className="bg-white border-b-2 border-gray-200 py-6 px-4 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="flex gap-4 items-center mb-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles... | ابحث عن المقالات..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 focus:border-amber-600 focus:outline-none rounded-none text-base"
              aria-label="Search blog articles"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <FiX className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors font-semibold relative"
            aria-label="Toggle filters"
            aria-expanded={showFilters}
          >
            <FiFilter className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            {totalResults} {totalResults === 1 ? 'article' : 'articles'} found
            {searchQuery && ` for "${searchQuery}"`}
          </span>
          {(activeFiltersCount > 0 || searchQuery) && (
            <button
              onClick={clearFilters}
              className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
            >
              <FiX className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-6 pt-6 border-t-2 border-gray-200 grid md:grid-cols-3 gap-6">
                {/* Category Filter */}
                {categories.length > 0 && (
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                      Category | الفئة
                    </label>
                    <select
                      value={filters.category || ''}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 focus:border-amber-600 focus:outline-none rounded-none"
                      aria-label="Filter by category"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                          {category.name} | {category.arabicName || category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Sort By Filter */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                    Sort By | ترتيب حسب
                  </label>
                  <select
                    value={filters.sortBy || 'date'}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value as FilterOptions['sortBy'])}
                    className="w-full px-4 py-2 border-2 border-gray-300 focus:border-amber-600 focus:outline-none rounded-none"
                    aria-label="Sort articles"
                  >
                    <option value="date">Latest First</option>
                    <option value="popularity">Most Popular</option>
                    <option value="relevance">Most Relevant</option>
                  </select>
                </div>

                {/* Date Range Filter */}
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                    Date Range | النطاق الزمني
                  </label>
                  <select
                    value={filters.dateRange || 'all'}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value as FilterOptions['dateRange'])}
                    className="w-full px-4 py-2 border-2 border-gray-300 focus:border-amber-600 focus:outline-none rounded-none"
                    aria-label="Filter by date range"
                  >
                    <option value="all">All Time</option>
                    <option value="week">Past Week</option>
                    <option value="month">Past Month</option>
                    <option value="year">Past Year</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Advanced Filtering and Sorting System for Manufacturing Blog
// Multi-criteria filtering with manufacturing focus and cultural elements

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogArticleEnhanced } from '@/types/blog-enhanced';

interface FilterSystemProps {
  articles: BlogArticleEnhanced[];
  onFilteredResults?: (results: BlogArticleEnhanced[]) => void;
  className?: string;
}

interface FilterState {
  categories: string[];
  culturalElements: string[];
  materials: string[];
  pillowTypes: string[];
  manufacturingRelevance: string[];
  readingTime: { min: number; max: number };
  dateRange: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface FilterOption {
  id: string;
  label: string;
  count: number;
  icon?: string;
}

export const FilterSystem: React.FC<FilterSystemProps> = ({
  articles,
  onFilteredResults,
  className = ''
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    categories: [],
    culturalElements: [],
    materials: [],
    pillowTypes: [],
    manufacturingRelevance: [],
    readingTime: { min: 0, max: 20 },
    dateRange: 'all',
    sortBy: 'relevance',
    sortOrder: 'desc'
  });

  const [filterOptions, setFilterOptions] = useState({
    categories: [] as FilterOption[],
    culturalElements: [] as FilterOption[],
    materials: [] as FilterOption[],
    pillowTypes: [] as FilterOption[],
    manufacturingRelevance: [] as FilterOption[]
  });

  // Initialize filter options
  useEffect(() => {
    const categories = Array.from(new Set(articles.map(a => a.category.name)))
      .map(name => ({
        id: name,
        label: name,
        count: articles.filter(a => a.category.name === name).length,
        icon: '📁'
      }));

    const culturalElements = Array.from(new Set(articles.map(a => a.culturalElement.englishName)))
      .map(name => ({
        id: name,
        label: name,
        count: articles.filter(a => a.culturalElement.englishName === name).length,
        icon: getCulturalIconByName(name)
      }));

    const materials = Array.from(new Set(articles.flatMap(a => a.manufacturingFocus.materials)))
      .map(material => ({
        id: material,
        label: material,
        count: articles.filter(a => a.manufacturingFocus.materials.includes(material)).length,
        icon: '🧵'
      }));

    const pillowTypes = Array.from(new Set(articles.flatMap(a => a.manufacturingFocus.pillowTypes)))
      .map(type => ({
        id: type,
        label: type,
        count: articles.filter(a => a.manufacturingFocus.pillowTypes.includes(type)).length,
        icon: '🛏️'
      }));

    const manufacturingRelevance = ['high', 'medium', 'low']
      .map(relevance => ({
        id: relevance,
        label: relevance.charAt(0).toUpperCase() + relevance.slice(1),
        count: articles.filter(a => a.category.manufacturingRelevance === relevance).length,
        icon: relevance === 'high' ? '🟢' : relevance === 'medium' ? '🟡' : '🔴'
      }));

    setFilterOptions({
      categories,
      culturalElements,
      materials,
      pillowTypes,
      manufacturingRelevance
    });
  }, [articles]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...articles];

    // Apply category filter
    if (activeFilters.categories.length > 0) {
      filtered = filtered.filter(article => 
        activeFilters.categories.includes(article.category.name)
      );
    }

    // Apply cultural elements filter
    if (activeFilters.culturalElements.length > 0) {
      filtered = filtered.filter(article => 
        activeFilters.culturalElements.includes(article.culturalElement.englishName)
      );
    }

    // Apply materials filter
    if (activeFilters.materials.length > 0) {
      filtered = filtered.filter(article => 
        article.manufacturingFocus.materials.some(material => 
          activeFilters.materials.includes(material)
        )
      );
    }

    // Apply pillow types filter
    if (activeFilters.pillowTypes.length > 0) {
      filtered = filtered.filter(article => 
        article.manufacturingFocus.pillowTypes.some(type => 
          activeFilters.pillowTypes.includes(type)
        )
      );
    }

    // Apply manufacturing relevance filter
    if (activeFilters.manufacturingRelevance.length > 0) {
      filtered = filtered.filter(article => 
        activeFilters.manufacturingRelevance.includes(article.category.manufacturingRelevance)
      );
    }

    // Apply reading time filter
    filtered = filtered.filter(article => 
      article.readingTime >= activeFilters.readingTime.min && 
      article.readingTime <= activeFilters.readingTime.max
    );

    // Apply date range filter
    if (activeFilters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (activeFilters.dateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(article => 
        new Date(article.publishDate) >= filterDate
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (activeFilters.sortBy) {
        case 'date':
          comparison = new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
          break;
        case 'views':
          comparison = a.viewCount - b.viewCount;
          break;
        case 'shares':
          comparison = a.shareCount - b.shareCount;
          break;
        case 'engagement':
          comparison = a.engagementScore - b.engagementScore;
          break;
        case 'readingTime':
          comparison = a.readingTime - b.readingTime;
          break;
        case 'relevance':
        default:
          // Sort by priority, then engagement, then views
          comparison = a.priority - b.priority || 
                      b.engagementScore - a.engagementScore || 
                      b.viewCount - a.viewCount;
          break;
      }
      
      return activeFilters.sortOrder === 'asc' ? comparison : -comparison;
    });

    if (onFilteredResults) {
      onFilteredResults(filtered);
    }
  }, [activeFilters, articles, onFilteredResults]);

  // Handle filter change
  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Handle multi-select filter change
  const handleMultiSelectChange = (filterType: keyof FilterState, value: string) => {
    setActiveFilters(prev => {
      const currentValues = prev[filterType] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [filterType]: newValues
      };
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      categories: [],
      culturalElements: [],
      materials: [],
      pillowTypes: [],
      manufacturingRelevance: [],
      readingTime: { min: 0, max: 20 },
      dateRange: 'all',
      sortBy: 'relevance',
      sortOrder: 'desc'
    });
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    return activeFilters.categories.length +
           activeFilters.culturalElements.length +
           activeFilters.materials.length +
           activeFilters.pillowTypes.length +
           activeFilters.manufacturingRelevance.length +
           (activeFilters.dateRange !== 'all' ? 1 : 0);
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className={`${className}`}>
      
      {/* Filter Toggle and Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        
        {/* Filter Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              showFilters 
                ? 'bg-amber-500 text-white shadow-lg' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={activeFilters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
            <option value="views">Views</option>
            <option value="shares">Shares</option>
            <option value="engagement">Engagement</option>
            <option value="readingTime">Reading Time</option>
          </select>
          
          <button
            onClick={() => handleFilterChange('sortOrder', activeFilters.sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            title={`Sort ${activeFilters.sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          >
            <svg className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
              activeFilters.sortOrder === 'desc' ? 'rotate-180' : ''
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Categories Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
                  </svg>
                  Categories
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filterOptions.categories.map(option => (
                    <label key={option.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                      <input
                        type="checkbox"
                        checked={activeFilters.categories.includes(option.id)}
                        onChange={() => handleMultiSelectChange('categories', option.id)}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 flex-1">
                        {option.label.split(' & ')[0]}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cultural Elements Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="text-amber-600 mr-2">𓊖</span>
                  Cultural Elements
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filterOptions.culturalElements.map(option => (
                    <label key={option.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                      <input
                        type="checkbox"
                        checked={activeFilters.culturalElements.includes(option.id)}
                        onChange={() => handleMultiSelectChange('culturalElements', option.id)}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 flex-1 flex items-center">
                        <span className="mr-2">{option.icon}</span>
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Manufacturing Relevance Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Manufacturing Priority
                </h3>
                <div className="space-y-2">
                  {filterOptions.manufacturingRelevance.map(option => (
                    <label key={option.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                      <input
                        type="checkbox"
                        checked={activeFilters.manufacturingRelevance.includes(option.id)}
                        onChange={() => handleMultiSelectChange('manufacturingRelevance', option.id)}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 flex-1 flex items-center">
                        <span className="mr-2">{option.icon}</span>
                        {option.label} Priority
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Materials Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">🧵</span>
                  Materials
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filterOptions.materials.map(option => (
                    <label key={option.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                      <input
                        type="checkbox"
                        checked={activeFilters.materials.includes(option.id)}
                        onChange={() => handleMultiSelectChange('materials', option.id)}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 flex-1 capitalize">
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pillow Types Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">🛏️</span>
                  Pillow Types
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filterOptions.pillowTypes.map(option => (
                    <label key={option.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                      <input
                        type="checkbox"
                        checked={activeFilters.pillowTypes.includes(option.id)}
                        onChange={() => handleMultiSelectChange('pillowTypes', option.id)}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 flex-1 capitalize">
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {option.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reading Time Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Reading Time
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{activeFilters.readingTime.min} min</span>
                    <span>{activeFilters.readingTime.max} min</span>
                  </div>
                  <div className="flex space-x-3">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={activeFilters.readingTime.min}
                      onChange={(e) => handleFilterChange('readingTime', {
                        ...activeFilters.readingTime,
                        min: parseInt(e.target.value)
                      })}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={activeFilters.readingTime.max}
                      onChange={(e) => handleFilterChange('readingTime', {
                        ...activeFilters.readingTime,
                        max: parseInt(e.target.value)
                      })}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Date Range
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'All Time' },
                  { value: 'week', label: 'Past Week' },
                  { value: 'month', label: 'Past Month' },
                  { value: 'quarter', label: 'Past 3 Months' },
                  { value: 'year', label: 'Past Year' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange('dateRange', option.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeFilters.dateRange === option.value
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper function
function getCulturalIconByName(name: string): string {
  const iconMap: { [key: string]: string } = {
    'Anubis': '𓃥',
    'Eye of Horus': '𓂀',
    'Ankh': '☥',
    'Scarab': '𓆣',
    'Pyramid': '𓉴',
    'Nefertiti': '𓈖'
  };
  return iconMap[name] || '𓊖';
}

export default FilterSystem;
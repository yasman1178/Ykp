// Advanced Search System for Manufacturing Blog
// Real-time search with autocomplete and manufacturing-focused suggestions

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogArticleEnhanced } from '@/types/blog-enhanced';
import { keywordManager } from '@/lib/keyword-management';
import { blogUtils } from '@/data/blog-articles-enhanced';

interface SearchSystemProps {
  articles: BlogArticleEnhanced[];
  onSearchResults?: (results: BlogArticleEnhanced[]) => void;
  onSearchQuery?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

interface SearchSuggestion {
  type: 'article' | 'keyword' | 'category' | 'material' | 'cultural';
  text: string;
  description?: string;
  icon?: string;
  count?: number;
}

export const SearchSystem: React.FC<SearchSystemProps> = ({
  articles,
  onSearchResults,
  onSearchQuery,
  placeholder = "Search manufacturing insights, cultural symbols, or pillow types...",
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState([
    'Anubis pillow manufacturing',
    'Egyptian cotton memory foam',
    'wholesale travel pillows',
    'Eye of Horus design',
    'premium pillow materials',
    'cultural heritage pillows'
  ]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('blog-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
        generateSuggestions(searchQuery);
      } else {
        if (onSearchResults) {
          onSearchResults(articles);
        }
        setSuggestions([]);
      }
      setIsSearching(false);
    }, 300),
    [articles, onSearchResults]
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    setIsSearching(true);
    
    if (onSearchQuery) {
      onSearchQuery(value);
    }

    if (value.trim()) {
      setShowSuggestions(true);
      debouncedSearch(value);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
      if (onSearchResults) {
        onSearchResults(articles);
      }
    }
  };

  // Perform search
  const performSearch = (searchQuery: string) => {
    const results = searchArticles(searchQuery, articles);
    if (onSearchResults) {
      onSearchResults(results);
    }
  };

  // Generate search suggestions
  const generateSuggestions = (searchQuery: string) => {
    const suggestions: SearchSuggestion[] = [];
    const lowerQuery = searchQuery.toLowerCase();

    // Article suggestions
    const articleMatches = articles
      .filter(article => 
        article.title.toLowerCase().includes(lowerQuery) ||
        article.description.toLowerCase().includes(lowerQuery) ||
        article.culturalElement.englishName.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 3);

    articleMatches.forEach(article => {
      suggestions.push({
        type: 'article',
        text: article.title,
        description: `${article.readingTime} min read • ${article.viewCount.toLocaleString()} views`,
        icon: getCulturalIcon(article.culturalElement.iconCode)
      });
    });

    // Manufacturing keyword suggestions
    const manufacturingKeywords = [
      ...keywordManager.generateContentKeywords('', 'pillow', ['memory foam']).primary,
      ...keywordManager.generateContentKeywords('', 'pillow', ['memory foam']).secondary
    ];

    manufacturingKeywords
      .filter(keyword => keyword.toLowerCase().includes(lowerQuery))
      .slice(0, 3)
      .forEach(keyword => {
        suggestions.push({
          type: 'keyword',
          text: keyword,
          description: 'Manufacturing keyword',
          icon: '🏭'
        });
      });

    // Cultural element suggestions
    const culturalElements = ['Anubis', 'Eye of Horus', 'Ankh', 'Scarab', 'Nefertiti', 'Pyramid'];
    culturalElements
      .filter(element => element.toLowerCase().includes(lowerQuery))
      .forEach(element => {
        const count = articles.filter(a => a.culturalElement.englishName === element).length;
        suggestions.push({
          type: 'cultural',
          text: element,
          description: `${count} articles about ${element}`,
          icon: getCulturalIconByName(element),
          count
        });
      });

    // Material suggestions
    const materials = ['memory foam', 'Egyptian cotton', 'bamboo fiber', 'organic cotton'];
    materials
      .filter(material => material.toLowerCase().includes(lowerQuery))
      .forEach(material => {
        const count = articles.filter(a => 
          a.manufacturingFocus.materials.some(m => m.toLowerCase().includes(material.toLowerCase()))
        ).length;
        suggestions.push({
          type: 'material',
          text: material,
          description: `${count} articles about ${material}`,
          icon: '🧵',
          count
        });
      });

    // Category suggestions
    const categories = Array.from(new Set(articles.map(a => a.category.name)));
    categories
      .filter(category => category.toLowerCase().includes(lowerQuery))
      .forEach(category => {
        const count = articles.filter(a => a.category.name === category).length;
        suggestions.push({
          type: 'category',
          text: category,
          description: `${count} articles in this category`,
          icon: '📁',
          count
        });
      });

    setSuggestions(suggestions.slice(0, 8));
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    // Add to recent searches
    const newRecentSearches = [suggestion.text, ...recentSearches.filter(s => s !== suggestion.text)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('blog-recent-searches', JSON.stringify(newRecentSearches));
    
    performSearch(suggestion.text);
    
    if (onSearchQuery) {
      onSearchQuery(suggestion.text);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? suggestions.length - 1 : prev - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        } else if (query.trim()) {
          setShowSuggestions(false);
          performSearch(query);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Handle clear search
  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
    if (onSearchResults) {
      onSearchResults(articles);
    }
    if (onSearchQuery) {
      onSearchQuery('');
    }
    searchInputRef.current?.focus();
  };

  // Handle focus
  const handleFocus = () => {
    if (query.trim()) {
      setShowSuggestions(true);
    }
  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
        setShowSuggestions(false);
      }
    }, 150);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isSearching ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-600"></div>
          ) : (
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
        
        <input
          ref={searchInputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="block w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-lg shadow-sm"
        />
        
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
          >
            {/* Current Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 px-3 py-2 uppercase tracking-wide">
                  Search Results
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.type}-${suggestion.text}`}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className={`w-full flex items-center px-3 py-3 rounded-lg text-left hover:bg-gray-50 transition-colors duration-150 ${
                      selectedIndex === index ? 'bg-amber-50 border-l-4 border-amber-500' : ''
                    }`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">
                      <span className="text-lg">
                        {suggestion.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {suggestion.text}
                      </div>
                      {suggestion.description && (
                        <div className="text-xs text-gray-500 truncate">
                          {suggestion.description}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        suggestion.type === 'article' ? 'bg-blue-100 text-blue-800' :
                        suggestion.type === 'keyword' ? 'bg-green-100 text-green-800' :
                        suggestion.type === 'cultural' ? 'bg-amber-100 text-amber-800' :
                        suggestion.type === 'material' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {suggestion.type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="p-2 border-t border-gray-100">
                <div className="text-xs font-medium text-gray-500 px-3 py-2 uppercase tracking-wide">
                  Recent Searches
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={search}
                    onClick={() => handleSuggestionSelect({ type: 'keyword', text: search })}
                    className="w-full flex items-center px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors duration-150"
                  >
                    <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-700">{search}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {!query && suggestions.length === 0 && (
              <div className="p-2 border-t border-gray-100">
                <div className="text-xs font-medium text-gray-500 px-3 py-2 uppercase tracking-wide">
                  Popular Searches
                </div>
                {popularSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleSuggestionSelect({ type: 'keyword', text: search })}
                    className="w-full flex items-center px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors duration-150"
                  >
                    <svg className="w-4 h-4 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-sm text-gray-700">{search}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper functions
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

function searchArticles(query: string, articles: BlogArticleEnhanced[]): BlogArticleEnhanced[] {
  if (!query.trim()) return articles;

  const lowerQuery = query.toLowerCase();
  const searchTerms = lowerQuery.split(' ').filter(term => term.length > 0);

  return articles
    .map(article => {
      let score = 0;
      
      // Title matches (highest weight)
      if (article.title.toLowerCase().includes(lowerQuery)) score += 10;
      searchTerms.forEach(term => {
        if (article.title.toLowerCase().includes(term)) score += 5;
      });
      
      // Cultural element matches
      if (article.culturalElement.englishName.toLowerCase().includes(lowerQuery)) score += 8;
      
      // Description matches
      if (article.description.toLowerCase().includes(lowerQuery)) score += 6;
      searchTerms.forEach(term => {
        if (article.description.toLowerCase().includes(term)) score += 3;
      });
      
      // Content matches
      if (article.content.toLowerCase().includes(lowerQuery)) score += 4;
      searchTerms.forEach(term => {
        if (article.content.toLowerCase().includes(term)) score += 2;
      });
      
      // Manufacturing focus matches
      article.manufacturingFocus.pillowTypes.forEach(type => {
        if (type.toLowerCase().includes(lowerQuery)) score += 7;
      });
      
      article.manufacturingFocus.materials.forEach(material => {
        if (material.toLowerCase().includes(lowerQuery)) score += 6;
      });
      
      // Keywords matches
      [...article.keywords.primary, ...article.keywords.secondary].forEach(keyword => {
        if (keyword.toLowerCase().includes(lowerQuery)) score += 5;
      });
      
      // Tags matches
      article.tags.forEach(tag => {
        if (tag.name.toLowerCase().includes(lowerQuery)) score += 4;
      });
      
      return { article, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ article }) => article);
}

function getCulturalIcon(iconCode: string): string {
  const iconMap: { [key: string]: string } = {
    'anubis-jackal-head': '𓃥',
    'wadjet-eye-symbol': '𓂀',
    'ankh-symbol': '☥',
    'scarab-beetle': '𓆣',
    'pyramid-symbol': '𓉴',
    'nefertiti-crown': '𓈖'
  };
  return iconMap[iconCode] || '𓊖';
}

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

export default SearchSystem;
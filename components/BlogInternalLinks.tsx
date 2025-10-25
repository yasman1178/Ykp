// Blog Internal Links Component
// Displays SEO-optimized internal links for blog articles

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface InternalLink {
  url: string;
  anchor: string;
  title: string;
  type: 'product' | 'blog' | 'collection' | 'page';
}

interface BlogInternalLinksProps {
  links: InternalLink[];
  title?: string;
  arabicTitle?: string;
  maxLinks?: number;
  variant?: 'default' | 'compact' | 'grid';
}

export default function BlogInternalLinks({ 
  links, 
  title = "Related Links",
  arabicTitle = "روابط ذات صلة",
  maxLinks = 6,
  variant = 'default'
}: BlogInternalLinksProps) {
  const displayLinks = links.slice(0, maxLinks);

  if (displayLinks.length === 0) {
    return null;
  }

  const getLinkIcon = (type: string): string => {
    const icons: { [key: string]: string } = {
      'product': '🏺',
      'collection': '📦',
      'blog': '📜',
      'page': '🔗'
    };
    return icons[type] || '🔗';
  };

  const getLinkColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      'product': 'from-amber-400 to-orange-400',
      'collection': 'from-blue-400 to-indigo-400',
      'blog': 'from-purple-400 to-pink-400',
      'page': 'from-green-400 to-teal-400'
    };
    return colors[type] || 'from-gray-400 to-gray-500';
  };

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-xl p-4 my-6"
      >
        <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center">
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          {arabicTitle} | {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {displayLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="inline-flex items-center px-3 py-1 bg-white rounded-full text-sm text-blue-900 hover:text-amber-600 transition-colors shadow-sm hover:shadow-md"
              title={link.title}
            >
              <span className="ml-1">{getLinkIcon(link.type)}</span>
              {link.anchor}
            </Link>
          ))}
        </div>
      </motion.div>
    );
  }

  if (variant === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-2xl p-6 my-8"
      >
        <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
          <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          {arabicTitle} | {title}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={link.url}
                className="flex items-center p-4 bg-white rounded-xl hover:bg-amber-50 transition-all duration-300 group shadow-sm hover:shadow-lg"
                title={link.title}
              >
                <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${getLinkColor(link.type)} rounded-full flex items-center justify-center text-white text-lg mr-4 group-hover:scale-110 transition-transform duration-300`}>
                  {getLinkIcon(link.type)}
                </div>
                <div className="flex-1">
                  <span className="text-blue-900 group-hover:text-amber-600 transition-colors font-medium">
                    {link.anchor}
                  </span>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {link.title}
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-2xl p-6 my-8 border border-amber-200"
    >
      <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        {arabicTitle} | {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-3">
        {displayLinks.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="flex items-center p-3 bg-white rounded-lg hover:bg-amber-50 transition-colors group"
            title={link.title}
          >
            <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-r ${getLinkColor(link.type)} rounded-full flex items-center justify-center text-white text-sm mr-3`}>
              {getLinkIcon(link.type)}
            </div>
            <span className="text-blue-900 group-hover:text-amber-600 transition-colors text-sm font-medium">
              {link.anchor}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
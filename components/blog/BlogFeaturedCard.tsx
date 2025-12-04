import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogArticle {
  id: string;
  title: string;
  arabicTitle?: string;
  slug: string;
  description: string;
  author: string;
  publishDate: string;
  readingTime: number;
  symbol: {
    name: string;
    arabicName?: string;
  };
}

interface BlogFeaturedCardProps {
  article: BlogArticle;
  variant?: 'large' | 'medium' | 'small';
  showImage?: boolean;
  showExcerpt?: boolean;
  index?: number;
}

export default function BlogFeaturedCard({
  article,
  variant = 'medium',
  showImage = true,
  showExcerpt = true,
  index = 0
}: BlogFeaturedCardProps) {
  const getSymbolIcon = (symbolName: string): string => {
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
  };

  const variantStyles = {
    large: {
      container: 'grid md:grid-cols-2 gap-8',
      image: 'h-96',
      icon: 'text-9xl',
      title: 'text-5xl',
      subtitle: 'text-2xl',
      excerpt: 'text-lg line-clamp-4',
      badge: 'top-4 left-4 px-4 py-2 text-xs'
    },
    medium: {
      container: 'block',
      image: 'h-48',
      icon: 'text-6xl',
      title: 'text-2xl',
      subtitle: 'text-lg',
      excerpt: 'text-base line-clamp-3',
      badge: 'top-2 right-2 px-3 py-1 text-xs'
    },
    small: {
      container: 'block',
      image: 'h-32',
      icon: 'text-4xl',
      title: 'text-lg',
      subtitle: 'text-base',
      excerpt: 'text-sm line-clamp-2',
      badge: 'top-2 right-2 px-2 py-1 text-xs'
    }
  };

  const styles = variantStyles[variant];

  return (
    <Link href={`/blog/${article.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className={`
          border-b-2 border-gray-300 pb-6 
          hover:bg-white transition-colors duration-300 
          p-4 -m-4 cursor-pointer group
          ${variant === 'large' ? 'mb-12 pb-12' : ''}
        `}
      >
        <div className={styles.container}>
          {/* Article Image */}
          {showImage && (
            <div
              className={`
                relative ${styles.image} 
                bg-gradient-to-br from-amber-100 to-blue-100 
                flex items-center justify-center 
                ${variant === 'large' ? 'border-4' : 'border-2'} border-black 
                mb-4
              `}
            >
              <div className={styles.icon}>{getSymbolIcon(article.symbol.name)}</div>
              <div
                className={`
                  absolute ${styles.badge}
                  bg-black text-white font-bold uppercase tracking-wider
                `}
              >
                {variant === 'large' ? 'Featured Story' : `${article.readingTime} MIN`}
              </div>
            </div>
          )}

          {/* Article Content */}
          <div className={variant === 'large' ? 'flex flex-col justify-center' : ''}>
            {/* Category and Reading Time */}
            <div className="text-xs uppercase tracking-widest text-gray-600 mb-2 font-semibold">
              {article.symbol.name}
              {variant !== 'small' && ` • ${article.readingTime} MIN READ`}
            </div>

            {/* Arabic Title */}
            {article.arabicTitle && (
              <h3
                className={`
                  ${styles.title} font-bold text-black mb-2 leading-tight 
                  group-hover:text-amber-700 transition-colors 
                  ${variant === 'small' ? 'line-clamp-3' : 'line-clamp-2'}
                `}
                style={{ fontFamily: 'Playfair Display, serif' }}
                dir="rtl"
                lang="ar"
              >
                {article.arabicTitle}
              </h3>
            )}

            {/* English Title */}
            <h4
              className={`
                ${styles.subtitle} font-semibold text-gray-700 mb-3 leading-snug 
                line-clamp-2
              `}
            >
              {article.title}
            </h4>

            {/* Excerpt */}
            {showExcerpt && (
              <p className={`${styles.excerpt} text-gray-600 leading-relaxed mb-4`}>
                {article.description}
              </p>
            )}

            {/* Metadata */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>By {article.author}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={article.publishDate}>
                {new Date(article.publishDate).toLocaleDateString('en-US', {
                  month: variant === 'small' ? 'short' : 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

// Compact Article Card for Grid Layouts
export function BlogCompactCard({ article, index = 0 }: { article: BlogArticle; index?: number }) {
  const getSymbolIcon = (symbolName: string): string => {
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
  };

  return (
    <Link href={`/blog/${article.slug}`}>
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

        {/* Arabic Title */}
        {article.arabicTitle && (
          <h3
            className="text-lg font-bold text-black mb-2 leading-tight group-hover:text-amber-700 transition-colors line-clamp-3"
            style={{ fontFamily: 'Playfair Display, serif' }}
            dir="rtl"
            lang="ar"
          >
            {article.arabicTitle}
          </h3>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-2">
          {article.description}
        </p>

        {/* Reading Time */}
        <div className="text-xs text-gray-500">{article.readingTime} min read</div>
      </motion.article>
    </Link>
  );
}

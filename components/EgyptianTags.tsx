import React from 'react';
import { motion } from 'framer-motion';

interface EgyptianTagsProps {
  tags: string[];
  maxTags?: number;
  className?: string;
  variant?: 'default' | 'outline' | 'gradient';
}

const EgyptianTags: React.FC<EgyptianTagsProps> = ({ 
  tags, 
  maxTags = 6, 
  className = '',
  variant = 'default'
}) => {
  const displayTags = tags.slice(0, maxTags);
  const remainingCount = tags.length - maxTags;

  const getTagClasses = (variant: string) => {
    switch (variant) {
      case 'outline':
        return 'border-2 border-amber-300 text-amber-700 bg-transparent hover:bg-amber-50';
      case 'gradient':
        return 'bg-gradient-to-r from-amber-100 to-blue-100 text-blue-800 border border-amber-200 hover:from-amber-200 hover:to-blue-200';
      default:
        return 'bg-gradient-to-r from-amber-100 to-blue-100 text-blue-800 border border-amber-200 hover:from-amber-200 hover:to-blue-200';
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayTags.map((tag, index) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={`
            px-3 py-1 text-sm font-medium rounded-full 
            transition-all duration-300 cursor-default
            hover:scale-105 hover:shadow-md
            ${getTagClasses(variant)}
          `}
        >
          {tag}
        </motion.span>
      ))}
      
      {remainingCount > 0 && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: displayTags.length * 0.1 }}
          className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-600 border border-gray-200"
        >
          +{remainingCount} more
        </motion.span>
      )}
    </div>
  );
};

export default EgyptianTags;
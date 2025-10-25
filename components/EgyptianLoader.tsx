import React from 'react';
import { motion } from 'framer-motion';

interface EgyptianLoaderProps {
  type?: 'scarab' | 'pyramid' | 'hieroglyph' | 'ankh';
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const EgyptianLoader: React.FC<EgyptianLoaderProps> = ({ 
  type = 'scarab', 
  size = 'md',
  message = 'جاري التحميل... Loading...'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-2xl',
    md: 'w-16 h-16 text-4xl',
    lg: 'w-24 h-24 text-6xl'
  };

  const containerSizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };

  const renderLoader = () => {
    switch (type) {
      case 'scarab':
        return (
          <motion.div
            className={`${sizeClasses[size]} flex items-center justify-center text-amber-600`}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            𓆣
          </motion.div>
        );

      case 'pyramid':
        return (
          <div className={`${containerSizeClasses[size]} relative flex items-center justify-center`}>
            <motion.div
              className="absolute bottom-0 w-full bg-gradient-to-t from-amber-600 to-amber-400"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: [0, 1, 0.8, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className={`${sizeClasses[size]} absolute text-blue-600 z-10`}
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              𓉴
            </motion.div>
          </div>
        );

      case 'hieroglyph':
        return (
          <div className={`${containerSizeClasses[size]} flex items-center justify-center`}>
            {['𓀀', '𓂀', '𓋹', '𓆣'].map((symbol, index) => (
              <motion.div
                key={symbol}
                className={`${sizeClasses[size]} absolute text-amber-600`}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut"
                }}
              >
                {symbol}
              </motion.div>
            ))}
          </div>
        );

      case 'ankh':
        return (
          <motion.div
            className={`${sizeClasses[size]} flex items-center justify-center text-blue-600`}
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            𓋹
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {renderLoader()}
        
        {/* Decorative Ring */}
        <motion.div
          className={`absolute inset-0 border-2 border-amber-300 rounded-full ${containerSizeClasses[size]}`}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Outer Glow */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r from-amber-400 to-blue-400 rounded-full ${containerSizeClasses[size]} opacity-20`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {message && (
        <motion.p
          className="text-center text-blue-900 font-medium"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default EgyptianLoader;
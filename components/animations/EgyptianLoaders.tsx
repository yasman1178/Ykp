/**
 * Egyptian-themed loading animations
 * Scarab beetle, pyramid construction, and hieroglyph writing animations
 */

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Scarab beetle flying animation for page loading
export const ScarabLoader: React.FC<{
  size?: 'small' | 'medium' | 'large';
  className?: string;
}> = ({ size = 'medium', className = "" }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className={`scarab-loader-container ${className}`}>
      <motion.div
        className={`scarab-loader ${sizeClasses[size]}`}
        animate={{
          x: [-100, 100, -100],
          rotate: [0, 360, 720],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="scarab-body">
          🪲
        </div>
      </motion.div>
      
      <motion.div
        className="scarab-trail"
        animate={{
          opacity: [0, 0.5, 0],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

// Pyramid construction animation for section reveals
export const PyramidLoader: React.FC<{
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onComplete?: () => void;
}> = ({ size = 'medium', className = "", onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`pyramid-loader-container ${sizeClasses[size]} ${className}`}>
      {/* Pyramid base */}
      <motion.div
        className="pyramid-base"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0, ease: "easeOut" }}
      />
      
      {/* Pyramid middle */}
      <motion.div
        className="pyramid-middle"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      />
      
      {/* Pyramid top */}
      <motion.div
        className="pyramid-top"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
      />
      
      {/* Golden capstone */}
      <motion.div
        className="pyramid-capstone"
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.4, delay: 1, ease: "backOut" }}
      />
      
      {/* Completion glow */}
      {isComplete && (
        <motion.div
          className="pyramid-glow"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}
    </div>
  );
};

// Hieroglyph writing animation for text appearances
export const HieroglyphWriter: React.FC<{
  text: string;
  className?: string;
  onComplete?: () => void;
}> = ({ text, className = "", onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text.length, isComplete, onComplete]);

  return (
    <div className={`hieroglyph-writer ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="hieroglyph-char"
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={{
            opacity: index <= currentIndex ? 1 : 0,
            y: index <= currentIndex ? 0 : 20,
            scale: index <= currentIndex ? 1 : 0.5
          }}
          transition={{
            duration: 0.3,
            delay: index * 0.05,
            ease: "easeOut"
          }}
        >
          {char}
        </motion.span>
      ))}
      
      {/* Writing cursor */}
      <motion.span
        className="writing-cursor"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        |
      </motion.span>
    </div>
  );
};

// Full page loading screen with Egyptian theme
export const EgyptianPageLoader: React.FC<{
  isLoading: boolean;
  loadingText?: string;
  onComplete?: () => void;
}> = ({ isLoading, loadingText = "جاري التحميل...", onComplete }) => {
  const [stage, setStage] = useState<'scarab' | 'pyramid' | 'text' | 'complete'>('scarab');

  useEffect(() => {
    if (!isLoading) return;

    const stageTimers = [
      setTimeout(() => setStage('pyramid'), 1000),
      setTimeout(() => setStage('text'), 2500),
      setTimeout(() => {
        setStage('complete');
        onComplete?.();
      }, 4000)
    ];

    return () => stageTimers.forEach(clearTimeout);
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <motion.div
      className="egyptian-page-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loader-background">
        <div className="egyptian-pattern-overlay" />
      </div>

      <div className="loader-content">
        {stage === 'scarab' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <ScarabLoader size="large" />
          </motion.div>
        )}

        {stage === 'pyramid' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <PyramidLoader 
              size="large" 
              onComplete={() => setStage('text')}
            />
          </motion.div>
        )}

        {stage === 'text' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="loader-text-container"
          >
            <HieroglyphWriter 
              text={loadingText}
              onComplete={() => setStage('complete')}
            />
          </motion.div>
        )}

        {/* Egyptian decorative elements */}
        <div className="loader-decorations">
          <motion.div
            className="decoration-left"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            𓂀
          </motion.div>
          <motion.div
            className="decoration-right"
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            𓅃
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Mini loader for buttons and small components
export const MiniEgyptianLoader: React.FC<{
  type?: 'scarab' | 'pyramid' | 'hieroglyph';
  className?: string;
}> = ({ type = 'scarab', className = "" }) => {
  switch (type) {
    case 'pyramid':
      return (
        <div className={`mini-pyramid-loader ${className}`}>
          <motion.div
            className="mini-pyramid"
            animate={{ rotateY: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            ⏃
          </motion.div>
        </div>
      );
    
    case 'hieroglyph':
      return (
        <div className={`mini-hieroglyph-loader ${className}`}>
          <motion.div
            animate={{ rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            𓋹
          </motion.div>
        </div>
      );
    
    default:
      return (
        <div className={`mini-scarab-loader ${className}`}>
          <motion.div
            animate={{ x: [-10, 10, -10], rotate: [0, 180, 360] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🪲
          </motion.div>
        </div>
      );
  }
};
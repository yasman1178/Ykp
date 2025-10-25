import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/design-utils';

export interface CrystalImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  variant?: 'polygon' | 'crystal' | 'diamond' | 'hexagon';
  hoverEffect?: boolean;
  priority?: boolean;
}

const CrystalImage: React.FC<CrystalImageProps> = ({
  src,
  alt,
  width = 400,
  height = 300,
  className,
  variant = 'crystal',
  hoverEffect = true,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const clipPaths = {
    polygon: 'polygon(30% 0%, 70% 30%, 100% 70%, 70% 100%, 30% 70%, 0% 30%)',
    crystal: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
    diamond: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
    hexagon: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
  };

  const hoverClipPaths = {
    polygon: 'polygon(25% 5%, 75% 25%, 95% 75%, 75% 95%, 25% 75%, 5% 25%)',
    crystal: 'polygon(15% 5%, 85% 5%, 95% 15%, 95% 85%, 85% 95%, 15% 95%, 5% 85%, 5% 15%)',
    diamond: 'polygon(50% 10%, 90% 50%, 50% 90%, 10% 50%)',
    hexagon: 'polygon(20% 10%, 80% 10%, 90% 50%, 80% 90%, 20% 90%, 10% 50%)',
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          scale: isLoaded ? 1 : 0.8 
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={hoverEffect ? {
          scale: 1.05,
          rotateY: 5,
          rotateX: 5,
        } : undefined}
        style={{
          clipPath: clipPaths[variant],
          filter: 'drop-shadow(0 10px 30px rgba(212, 175, 55, 0.3))',
        }}
      >
        <motion.div
          whileHover={hoverEffect ? {
            clipPath: hoverClipPaths[variant],
          } : undefined}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            clipPath: clipPaths[variant],
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="w-full h-full object-cover"
            onLoad={() => setIsLoaded(true)}
          />
        </motion.div>

        {/* Golden Border Effect */}
        <motion.div
          className="absolute inset-0 border-2 border-pharaonic-gold opacity-0"
          whileHover={hoverEffect ? { opacity: 0.6 } : undefined}
          transition={{ duration: 0.3 }}
          style={{
            clipPath: clipPaths[variant],
          }}
        />

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          style={{
            clipPath: clipPaths[variant],
          }}
        />
      </motion.div>

      {/* Loading Placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-papyrus to-desert-sand animate-pulse"
          style={{
            clipPath: clipPaths[variant],
          }}
        />
      )}
    </div>
  );
};

export default CrystalImage;
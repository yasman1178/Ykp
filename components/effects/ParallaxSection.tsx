import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/design-utils';

export interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  backgroundImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className,
  speed = 0.5,
  direction = 'up',
  backgroundImage,
  overlay = false,
  overlayOpacity = 0.3,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const distance = 100 * speed;
  const transform = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'down' || direction === 'right' 
      ? [-distance, distance] 
      : [distance, -distance]
  );

  const getMotionStyle = () => {
    if (direction === 'left' || direction === 'right') {
      return { x: transform };
    }
    return { y: transform };
  };

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {/* Background Image with Parallax */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            ...getMotionStyle(),
            scale: 1.1, // Prevent gaps during parallax
          }}
        />
      )}

      {/* Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <motion.div
        className="relative z-10"
        style={getMotionStyle()}
      >
        {children}
      </motion.div>

      {/* Egyptian Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 text-pharaonic-gold opacity-20 font-hieroglyphic text-4xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -50]),
          }}
        >
          𓂀
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-pharaonic-gold opacity-20 font-hieroglyphic text-4xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, 50]),
          }}
        >
          𓁹
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4 text-pharaonic-gold opacity-10 font-hieroglyphic text-6xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -30]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
          }}
        >
          𓋹
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxSection;
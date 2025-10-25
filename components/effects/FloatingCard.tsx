import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/design-utils';

export interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  intensity?: 'subtle' | 'medium' | 'strong';
  direction?: 'up' | 'down' | 'left' | 'right' | 'circular';
  clickable?: boolean;
  onClick?: () => void;
}

const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className,
  delay = 0,
  intensity = 'medium',
  direction = 'up',
  clickable = false,
  onClick,
}) => {
  const intensityValues = {
    subtle: { distance: 5, rotation: 1, scale: 0.02 },
    medium: { distance: 10, rotation: 2, scale: 0.05 },
    strong: { distance: 20, rotation: 4, scale: 0.1 },
  };

  const { distance, rotation, scale } = intensityValues[intensity];

  const getAnimationValues = () => {
    switch (direction) {
      case 'up':
        return { y: [-distance, distance, -distance], x: 0 };
      case 'down':
        return { y: [distance, -distance, distance], x: 0 };
      case 'left':
        return { x: [-distance, distance, -distance], y: 0 };
      case 'right':
        return { x: [distance, -distance, distance], y: 0 };
      case 'circular':
        return {
          x: [0, distance, 0, -distance, 0],
          y: [0, -distance, 0, distance, 0],
        };
      default:
        return { y: [-distance, distance, -distance], x: 0 };
    }
  };

  const animationValues = getAnimationValues();

  const floatingAnimation = {
    ...animationValues,
    rotate: [-rotation, rotation, -rotation],
    scale: [1, 1 + scale, 1],
  };

  const hoverAnimation = clickable ? {
    scale: 1.05,
    rotateX: 5,
    rotateY: 5,
    boxShadow: "0 25px 50px rgba(212, 175, 55, 0.3)",
  } : {};

  const tapAnimation = clickable ? {
    scale: 0.95,
  } : {};

  return (
    <motion.div
      className={cn(
        'relative',
        clickable && 'cursor-pointer',
        className
      )}
      animate={floatingAnimation}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      onClick={onClick}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
      
      {/* Floating Shadow */}
      <motion.div
        className="absolute inset-0 bg-pharaonic-gold rounded-2xl opacity-20 blur-xl -z-10"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.5,
        }}
      />
    </motion.div>
  );
};

export default FloatingCard;
/**
 * Egyptian-themed animation components
 * Reusable animation wrappers for consistent Egyptian visual effects
 */

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { EGYPTIAN_ANIMATIONS, ANIMATION_VARIANTS, EGYPTIAN_EASING } from '../../lib/egyptian-animations';

interface AnimationWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

// Crystal/Polygonal reveal animation wrapper
export const CrystalReveal: React.FC<AnimationWrapperProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      className={`pharaonic-crystal-effect ${className}`}
      initial={EGYPTIAN_ANIMATIONS.pharaonicCrystalReveal.initial}
      animate={EGYPTIAN_ANIMATIONS.pharaonicCrystalReveal.animate}
      transition={{ duration: 1.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Polygonal hover effect for product images
export const PolygonHover: React.FC<AnimationWrapperProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      className={`pharaonic-polygon-hover ${className}`}
      initial={EGYPTIAN_ANIMATIONS.pharaonicPolygonHover.initial}
      whileHover={EGYPTIAN_ANIMATIONS.pharaonicPolygonHover.hover}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Gradient background animation
export const GradientBackground: React.FC<AnimationWrapperProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      className={`egyptian-gradient-bg ${className}`}
      initial={EGYPTIAN_ANIMATIONS.egyptianGradientShift.initial}
      animate={EGYPTIAN_ANIMATIONS.egyptianGradientShift.animate}
      transition={{ duration: 6, repeat: Infinity }}
      style={{
        background: 'linear-gradient(135deg, #D4AF37 0%, #1E3A8A 50%, #CD853F 100%)',
        backgroundSize: '200% 200%'
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered content reveal container
export const StaggerContainer: React.FC<AnimationWrapperProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      className={`stagger-container ${className}`}
      initial={EGYPTIAN_ANIMATIONS.contentStaggerReveal.initial}
      animate={EGYPTIAN_ANIMATIONS.contentStaggerReveal.animate}
      transition={EGYPTIAN_ANIMATIONS.contentStaggerReveal.transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
export const StaggerItem: React.FC<AnimationWrapperProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      className={`stagger-item ${className}`}
      variants={EGYPTIAN_ANIMATIONS.staggerItem}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Interactive hover element
export const InteractiveHover: React.FC<AnimationWrapperProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      className={`interactive-hover ${className}`}
      initial={EGYPTIAN_ANIMATIONS.interactiveHover.initial}
      whileHover={EGYPTIAN_ANIMATIONS.interactiveHover.hover}
      whileTap={EGYPTIAN_ANIMATIONS.interactiveHover.tap}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Golden button animation
export const GoldenButton: React.FC<{
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}> = ({
  children,
  className = "",
  onClick,
  disabled = false
}) => {
    return (
      <motion.button
        className={`golden-button ${className} ${disabled ? 'disabled' : ''}`}
        initial={EGYPTIAN_ANIMATIONS.goldenButton.initial}
        whileHover={!disabled ? EGYPTIAN_ANIMATIONS.goldenButton.hover : {}}
        whileTap={!disabled ? EGYPTIAN_ANIMATIONS.goldenButton.tap : {}}
        transition={{ duration: 0.2 }}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </motion.button>
    );
  };

// Floating card animation
export const FloatingCard: React.FC<AnimationWrapperProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      className={`floating-card ${className}`}
      initial={EGYPTIAN_ANIMATIONS.floatingCard.initial}
      whileHover={EGYPTIAN_ANIMATIONS.floatingCard.hover}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Floating hieroglyphs decoration
export const FloatingHieroglyphs: React.FC<Partial<AnimationWrapperProps>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      className={`floating-hieroglyphs ${className}`}
      animate={EGYPTIAN_ANIMATIONS.floatingHieroglyphs.animate}
      transition={{ duration: 4, repeat: Infinity }}
      {...props}
    >
      {children || '𓂀'}
    </motion.div>
  );
};

// Card entrance animation
export const CardEntrance: React.FC<AnimationWrapperProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      className={`card-entrance ${className}`}
      initial={EGYPTIAN_ANIMATIONS.cardEntrance.initial}
      animate={EGYPTIAN_ANIMATIONS.cardEntrance.animate}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Egyptian pulse animation
export const EgyptianPulse: React.FC<AnimationWrapperProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      className={`egyptian-pulse ${className}`}
      animate={EGYPTIAN_ANIMATIONS.egyptianPulse.animate}
      transition={{ duration: 2, repeat: Infinity }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Page transition wrapper
export const PageTransition: React.FC<AnimationWrapperProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <motion.div
      className={`page-transition ${className}`}
      initial={ANIMATION_VARIANTS.pageContainer.initial}
      animate={ANIMATION_VARIANTS.pageContainer.animate}
      exit={ANIMATION_VARIANTS.pageContainer.exit}
      transition={ANIMATION_VARIANTS.pageContainer.transition}
      {...props}
    >
      {children}
    </motion.div>
  );
};
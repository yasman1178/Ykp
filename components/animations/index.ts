/**
 * Egyptian Animations - Export Index
 * Centralized exports for all animation components and utilities
 */

// Core animation components
export {
  CrystalReveal,
  PolygonHover,
  GradientBackground,
  StaggerContainer,
  StaggerItem,
  InteractiveHover,
  GoldenButton,
  FloatingCard,
  FloatingHieroglyphs,
  CardEntrance,
  EgyptianPulse,
  PageTransition
} from './EgyptianAnimations';

// Specialized components
export {
  AnimatedProductCard,
  AnimatedProductGrid
} from './AnimatedProductCard';

export {
  AnimatedHero,
  AnimatedSectionHeader
} from './AnimatedHero';

// Loading animations
export {
  ScarabLoader,
  PyramidLoader,
  HieroglyphWriter,
  EgyptianPageLoader,
  MiniEgyptianLoader
} from './EgyptianLoaders';

// Page transitions
export {
  EgyptianPageTransition,
  SlidingTransition,
  PyramidRevealTransition,
  ScarabFlightTransition,
  HieroglyphTransition,
  RouteTransition,
  LoadingTransition
} from './PageTransitions';

// Animation controller
export {
  EgyptianAnimationController,
  AnimationSettings,
  useAnimationController,
  usePageLoading
} from './EgyptianAnimationController';

// Animation provider and utilities
export {
  AnimationProvider,
  PageTransitionWrapper,
  ScrollReveal,
  useAnimation
} from './AnimationProvider';

// Animation constants and utilities
export {
  EGYPTIAN_ANIMATIONS,
  ANIMATION_VARIANTS,
  EGYPTIAN_EASING
} from '../../lib/egyptian-animations';
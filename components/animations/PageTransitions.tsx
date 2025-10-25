/**
 * Egyptian-themed page transitions
 * Smooth transitions with Egyptian motifs and animations
 */

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// Main page transition wrapper
export const EgyptianPageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "" 
}) => {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.asPath}
        className={`page-transition-container ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Egyptian transition overlay */}
        <motion.div
          className="egyptian-transition-overlay"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Sliding transition with Egyptian patterns
export const SlidingTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "" 
}) => {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.asPath}
        className={`sliding-transition ${className}`}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Egyptian pattern overlay during transition */}
        <motion.div
          className="pattern-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
        
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Pyramid reveal transition
export const PyramidRevealTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "" 
}) => {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.asPath}
        className={`pyramid-reveal-transition ${className}`}
        initial={{ clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" }}
        animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        exit={{ clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Scarab flight transition
export const ScarabFlightTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "" 
}) => {
  const router = useRouter();

  return (
    <div className={`scarab-flight-container ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.asPath}
          className="scarab-flight-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Flying scarab during transition */}
      <AnimatePresence>
        <motion.div
          className="flying-scarab"
          initial={{ x: -100, y: 50, rotate: 0, opacity: 0 }}
          animate={{ x: window.innerWidth + 100, y: 50, rotate: 360, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          🪲
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Hieroglyph writing transition
export const HieroglyphTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "" 
}) => {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.asPath}
        className={`hieroglyph-transition ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Hieroglyph writing overlay */}
        <motion.div
          className="hieroglyph-overlay"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 0, opacity: 0 }}
          exit={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <svg className="hieroglyph-svg" viewBox="0 0 100 100">
            <motion.path
              d="M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20"
              stroke="var(--pharaonic-gold)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
        
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Route-specific transition selector
export const RouteTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "" 
}) => {
  const router = useRouter();

  // Select transition based on route
  const getTransitionComponent = () => {
    if (router.pathname.includes('/products')) {
      return PyramidRevealTransition;
    } else if (router.pathname.includes('/blog')) {
      return HieroglyphTransition;
    } else if (router.pathname.includes('/about')) {
      return ScarabFlightTransition;
    } else {
      return SlidingTransition;
    }
  };

  const TransitionComponent = getTransitionComponent();

  return (
    <TransitionComponent className={className}>
      {children}
    </TransitionComponent>
  );
};

// Loading transition with Egyptian elements
export const LoadingTransition: React.FC<{
  isLoading: boolean;
  children: ReactNode;
  loadingComponent?: ReactNode;
  className?: string;
}> = ({ 
  isLoading, 
  children, 
  loadingComponent,
  className = "" 
}) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          className={`loading-transition ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {loadingComponent || (
            <div className="default-loading">
              <motion.div
                className="loading-scarab"
                animate={{ 
                  x: [-50, 50, -50],
                  rotate: [0, 360, 720]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🪲
              </motion.div>
              <motion.p
                className="loading-text"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                جاري التحميل...
              </motion.p>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          className={`content-transition ${className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
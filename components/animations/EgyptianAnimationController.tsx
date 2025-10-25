/**
 * Egyptian Animation Controller
 * Central controller for managing all Egyptian-themed animations
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { EgyptianPageLoader } from './EgyptianLoaders';
import { RouteTransition } from './PageTransitions';

interface AnimationControllerContextType {
  isPageLoading: boolean;
  setPageLoading: (loading: boolean) => void;
  animationPreset: 'minimal' | 'standard' | 'enhanced';
  setAnimationPreset: (preset: 'minimal' | 'standard' | 'enhanced') => void;
  enabledAnimations: {
    pageTransitions: boolean;
    loadingAnimations: boolean;
    hoverEffects: boolean;
    scrollAnimations: boolean;
  };
  toggleAnimation: (type: keyof AnimationControllerContextType['enabledAnimations']) => void;
}

const AnimationControllerContext = createContext<AnimationControllerContextType | undefined>(undefined);

export const useAnimationController = () => {
  const context = useContext(AnimationControllerContext);
  if (!context) {
    throw new Error('useAnimationController must be used within an EgyptianAnimationController');
  }
  return context;
};

interface EgyptianAnimationControllerProps {
  children: ReactNode;
  initialPreset?: 'minimal' | 'standard' | 'enhanced';
}

export const EgyptianAnimationController: React.FC<EgyptianAnimationControllerProps> = ({
  children,
  initialPreset = 'standard'
}) => {
  const [isPageLoading, setPageLoading] = useState(false);
  const [animationPreset, setAnimationPreset] = useState(initialPreset);
  const [enabledAnimations, setEnabledAnimations] = useState({
    pageTransitions: true,
    loadingAnimations: true,
    hoverEffects: true,
    scrollAnimations: true
  });

  // Apply animation preset
  useEffect(() => {
    switch (animationPreset) {
      case 'minimal':
        setEnabledAnimations({
          pageTransitions: false,
          loadingAnimations: true,
          hoverEffects: false,
          scrollAnimations: false
        });
        break;
      case 'enhanced':
        setEnabledAnimations({
          pageTransitions: true,
          loadingAnimations: true,
          hoverEffects: true,
          scrollAnimations: true
        });
        break;
      default: // standard
        setEnabledAnimations({
          pageTransitions: true,
          loadingAnimations: true,
          hoverEffects: true,
          scrollAnimations: false
        });
    }
  }, [animationPreset]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
      setAnimationPreset('minimal');
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setAnimationPreset('minimal');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleAnimation = (type: keyof typeof enabledAnimations) => {
    setEnabledAnimations(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const contextValue: AnimationControllerContextType = {
    isPageLoading,
    setPageLoading,
    animationPreset,
    setAnimationPreset,
    enabledAnimations,
    toggleAnimation
  };

  return (
    <AnimationControllerContext.Provider value={contextValue}>
      <div 
        className={`egyptian-animation-controller ${animationPreset}-preset`}
        data-page-transitions={enabledAnimations.pageTransitions}
        data-loading-animations={enabledAnimations.loadingAnimations}
        data-hover-effects={enabledAnimations.hoverEffects}
        data-scroll-animations={enabledAnimations.scrollAnimations}
      >
        {/* Page Loading Overlay */}
        <AnimatePresence>
          {isPageLoading && enabledAnimations.loadingAnimations && (
            <EgyptianPageLoader
              isLoading={isPageLoading}
              onComplete={() => setPageLoading(false)}
            />
          )}
        </AnimatePresence>

        {/* Page Transitions */}
        {enabledAnimations.pageTransitions ? (
          <RouteTransition>
            {children}
          </RouteTransition>
        ) : (
          children
        )}
      </div>
    </AnimationControllerContext.Provider>
  );
};

// Hook for triggering page loading
export const usePageLoading = () => {
  const { setPageLoading } = useAnimationController();
  
  const startLoading = () => setPageLoading(true);
  const stopLoading = () => setPageLoading(false);
  
  return { startLoading, stopLoading };
};

// Animation settings component
export const AnimationSettings: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const { 
    animationPreset, 
    setAnimationPreset, 
    enabledAnimations, 
    toggleAnimation 
  } = useAnimationController();

  return (
    <div className={`animation-settings ${className}`}>
      <h3>إعدادات الرسوم المتحركة</h3>
      
      <div className="preset-selection">
        <label>نمط الرسوم المتحركة:</label>
        <select 
          value={animationPreset} 
          onChange={(e) => setAnimationPreset(e.target.value as any)}
        >
          <option value="minimal">أساسي</option>
          <option value="standard">قياسي</option>
          <option value="enhanced">محسن</option>
        </select>
      </div>

      <div className="individual-toggles">
        <label>
          <input
            type="checkbox"
            checked={enabledAnimations.pageTransitions}
            onChange={() => toggleAnimation('pageTransitions')}
          />
          انتقالات الصفحات
        </label>
        
        <label>
          <input
            type="checkbox"
            checked={enabledAnimations.loadingAnimations}
            onChange={() => toggleAnimation('loadingAnimations')}
          />
          رسوم التحميل
        </label>
        
        <label>
          <input
            type="checkbox"
            checked={enabledAnimations.hoverEffects}
            onChange={() => toggleAnimation('hoverEffects')}
          />
          تأثيرات التمرير
        </label>
        
        <label>
          <input
            type="checkbox"
            checked={enabledAnimations.scrollAnimations}
            onChange={() => toggleAnimation('scrollAnimations')}
          />
          رسوم التمرير
        </label>
      </div>
    </div>
  );
};
/**
 * Animated Hero Section with Egyptian-themed animations
 * Features gradient backgrounds, staggered text reveals, and interactive elements
 */

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { 
  GradientBackground, 
  StaggerContainer, 
  StaggerItem, 
  GoldenButton,
  FloatingHieroglyphs,
  EgyptianPulse 
} from './EgyptianAnimations';

interface AnimatedHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaAction?: () => void;
  backgroundImage?: string;
  className?: string;
  children?: ReactNode;
}

export const AnimatedHero: React.FC<AnimatedHeroProps> = ({
  title,
  subtitle,
  description,
  ctaText,
  ctaAction,
  backgroundImage,
  className = "",
  children
}) => {
  return (
    <section className={`animated-hero ${className}`}>
      <GradientBackground className="hero-background">
        {backgroundImage && (
          <motion.div
            className="hero-background-image"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1
            }}
          />
        )}

        {/* Floating hieroglyphic decorations */}
        <FloatingHieroglyphs className="hero-decoration-1">
          𓂀
        </FloatingHieroglyphs>
        <FloatingHieroglyphs className="hero-decoration-2" style={{ right: '10%', top: '20%' }}>
          𓅃
        </FloatingHieroglyphs>
        <FloatingHieroglyphs className="hero-decoration-3" style={{ left: '15%', bottom: '30%' }}>
          𓋹
        </FloatingHieroglyphs>

        <div className="hero-content-container">
          <StaggerContainer className="hero-content">
            {subtitle && (
              <StaggerItem>
                <motion.div 
                  className="hero-subtitle"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {subtitle}
                </motion.div>
              </StaggerItem>
            )}

            <StaggerItem>
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {title.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    className="hero-title-word"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut" 
                    }}
                  >
                    {word}{' '}
                  </motion.span>
                ))}
              </motion.h1>
            </StaggerItem>

            {description && (
              <StaggerItem>
                <motion.p 
                  className="hero-description"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                >
                  {description}
                </motion.p>
              </StaggerItem>
            )}

            {ctaText && ctaAction && (
              <StaggerItem>
                <motion.div 
                  className="hero-cta"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                >
                  <EgyptianPulse>
                    <GoldenButton 
                      onClick={ctaAction}
                      className="hero-cta-button"
                    >
                      {ctaText}
                    </GoldenButton>
                  </EgyptianPulse>
                </motion.div>
              </StaggerItem>
            )}

            {children && (
              <StaggerItem>
                <motion.div 
                  className="hero-additional-content"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                >
                  {children}
                </motion.div>
              </StaggerItem>
            )}
          </StaggerContainer>
        </div>
      </GradientBackground>
    </section>
  );
};

// Animated section header component
export const AnimatedSectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  description?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}> = ({ 
  title, 
  subtitle, 
  description, 
  alignment = 'center',
  className = "" 
}) => {
  return (
    <StaggerContainer className={`animated-section-header text-${alignment} ${className}`}>
      {subtitle && (
        <StaggerItem>
          <motion.div 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {subtitle}
          </motion.div>
        </StaggerItem>
      )}

      <StaggerItem>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {title}
        </motion.h2>
      </StaggerItem>

      {description && (
        <StaggerItem>
          <motion.p 
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {description}
          </motion.p>
        </StaggerItem>
      )}
    </StaggerContainer>
  );
};
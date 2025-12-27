import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface EgyptianCTAProps {
  title: string;
  arabicTitle?: string;
  description: string;
  arabicDescription?: string;
  primaryButton: {
    text: string;
    arabicText?: string;
    href: string;
    icon?: React.ReactNode;
  };
  secondaryButton?: {
    text: string;
    arabicText?: string;
    href: string;
    icon?: React.ReactNode;
  };
  variant?: 'default' | 'gradient' | 'minimal';
  symbolIcon?: string;
  className?: string;
}

const EgyptianCTA: React.FC<EgyptianCTAProps> = ({
  title,
  arabicTitle,
  description,
  arabicDescription,
  primaryButton,
  secondaryButton,
  variant = 'default',
  symbolIcon = '𓋹',
  className = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-amber-100 to-amber-200 text-black border border-pharaonic-gold/30 shadow-lg';
      case 'minimal':
        return 'bg-white border-2 border-amber-200 text-black';
      default:
        return 'bg-gradient-to-br from-amber-50 to-blue-50 text-black border border-amber-200';
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`py-16 px-4 ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-3xl p-8 md:p-12 text-center relative overflow-hidden ${getVariantClasses()}`}>
          {/* Egyptian Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-500 via-blue-500 to-amber-500"></div>
          <div className="absolute top-4 right-4 text-3xl opacity-20">{symbolIcon}</div>
          <div className="absolute bottom-4 left-4 text-2xl opacity-20">𓂀</div>
          <div className="absolute top-1/2 left-4 text-xl opacity-10 transform -translate-y-1/2">𓆣</div>
          <div className="absolute top-1/2 right-4 text-xl opacity-10 transform -translate-y-1/2">𓀀</div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Symbol Icon */}
            <div className="mb-6 rotate-container">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-3xl shadow-lg ${variant === 'gradient' ? 'bg-pharaonic-gold text-black' : 'bg-gradient-to-br from-amber-400 to-blue-400 text-black'
                }`}>
                {symbolIcon}
              </div>
            </div>

            {/* Arabic Title */}
            {arabicTitle && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-pharaonic">
                {arabicTitle}
              </h2>
            )}

            {/* English Title */}
            <h3 className="text-2xl md:text-3xl font-semibold mb-6">
              {title}
            </h3>

            {/* Arabic Description */}
            {arabicDescription && (
              <p className="text-lg mb-4 opacity-90 leading-relaxed">
                {arabicDescription}
              </p>
            )}

            {/* English Description */}
            <p className={`text-lg mb-8 leading-relaxed ${variant === 'gradient' ? 'text-black/80' : 'opacity-80'}`}>
              {description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary Button */}
              <Link
                href={primaryButton.href}
                className={`inline-flex items-center px-8 py-4 font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg ${variant === 'gradient'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-600 hover:to-amber-700'
                    : 'bg-gradient-to-r from-pharaonic-gold to-pharaonic-gold-dark text-black hover:from-pharaonic-gold-dark hover:to-pharaonic-gold-darker'
                  }`}
              >
                {primaryButton.arabicText && (
                  <span className="ml-2">{primaryButton.arabicText}</span>
                )}
                {primaryButton.arabicText && primaryButton.text && (
                  <span className="mx-2">|</span>
                )}
                <span>{primaryButton.text}</span>
                {primaryButton.icon && (
                  <span className="mr-3">{primaryButton.icon}</span>
                )}
              </Link>

              {/* Secondary Button */}
              {secondaryButton && (
                <Link
                  href={secondaryButton.href}
                  className={`inline-flex items-center px-8 py-4 font-bold rounded-full transition-all duration-300 transform hover:scale-105 ${variant === 'gradient'
                      ? 'bg-black/10 text-black border-2 border-black/20 hover:bg-black/20'
                      : 'bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:from-amber-500 hover:to-amber-600 shadow-lg'
                    }`}
                >
                  {secondaryButton.arabicText && (
                    <span className="ml-2">{secondaryButton.arabicText}</span>
                  )}
                  {secondaryButton.arabicText && secondaryButton.text && (
                    <span className="mx-2">|</span>
                  )}
                  <span>{secondaryButton.text}</span>
                  {secondaryButton.icon && (
                    <span className="mr-3">{secondaryButton.icon}</span>
                  )}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default EgyptianCTA;
/**
 * Egyptian-themed Cookie Consent Banner
 * GDPR compliant with Pharaonic design elements
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCookie, FaCog, FaTimes } from 'react-icons/fa';
import CookieManager, { CookiePreferences } from '../lib/cookie-manager';

interface CookieConsentBannerProps {
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
  onCustomize?: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onAcceptAll,
  onRejectAll,
  onCustomize,
}) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Show banner if no consent given or consent needs update
    const hasConsent = CookieManager.hasConsent();
    const needsUpdate = CookieManager.needsConsentUpdate();
    
    if (!hasConsent || needsUpdate) {
      setShowBanner(true);
    }

    // Load current preferences
    setPreferences(CookieManager.getCookiePreferences());
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    CookieManager.setCookiePreferences(allAccepted);
    CookieManager.initializeAnalytics();
    setShowBanner(false);
    onAcceptAll?.();
  };

  const handleRejectAll = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    CookieManager.setCookiePreferences(essentialOnly);
    setShowBanner(false);
    onRejectAll?.();
  };

  const handleSavePreferences = () => {
    CookieManager.setCookiePreferences(preferences);
    if (preferences.analytics) {
      CookieManager.initializeAnalytics();
    }
    setShowBanner(false);
    setShowPreferences(false);
    onCustomize?.();
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const bannerAnimation = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const preferencesAnimation = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowPreferences(false)}
          />

          {/* Cookie Preferences Modal */}
          <AnimatePresence>
            {showPreferences && (
              <motion.div
                initial={preferencesAnimation.initial}
                animate={preferencesAnimation.animate}
                exit={preferencesAnimation.exit}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
              >
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  {/* Header with Egyptian styling */}
                  <div className="bg-gradient-to-r from-pharaonic-gold to-deep-blue p-6 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FaCog className="text-white text-2xl" />
                        <h2 className="text-2xl font-bold text-white font-pharaonic">
                          Cookie Preferences
                        </h2>
                      </div>
                      <button
                        onClick={() => setShowPreferences(false)}
                        className="text-white hover:text-pharaonic-gold transition-colors"
                      >
                        <FaTimes size={24} />
                      </button>
                    </div>
                    <p className="text-white/90 mt-2">
                      Customize your cookie preferences for the best Egyptian experience
                    </p>
                  </div>

                  {/* Cookie Categories */}
                  <div className="p-6 space-y-6">
                    {/* Essential Cookies */}
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-hieroglyph-black">
                          Essential Cookies
                        </h3>
                        <div className="bg-pharaonic-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                          Always Active
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">
                        These cookies are necessary for the website to function and cannot be disabled. 
                        They store your language preferences and ensure secure browsing.
                      </p>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-hieroglyph-black">
                          Analytics Cookies
                        </h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={() => togglePreference('analytics')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pharaonic-gold/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pharaonic-gold"></div>
                        </label>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Help us understand how visitors interact with our Egyptian heritage content 
                        and improve the website experience.
                      </p>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-hieroglyph-black">
                          Marketing Cookies
                        </h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.marketing}
                            onChange={() => togglePreference('marketing')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pharaonic-gold/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pharaonic-gold"></div>
                        </label>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Used to deliver personalized advertisements and track the effectiveness 
                        of our Pharaonic pillow marketing campaigns.
                      </p>
                    </div>

                    {/* Preference Cookies */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-hieroglyph-black">
                          Preference Cookies
                        </h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences.preferences}
                            onChange={() => togglePreference('preferences')}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pharaonic-gold/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pharaonic-gold"></div>
                        </label>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Remember your choices such as Egyptian theme colors and preferred 
                        language (Arabic/English) for a personalized experience.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleSavePreferences}
                      className="flex-1 bg-gradient-to-r from-pharaonic-gold to-deep-blue text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Save Preferences
                    </button>
                    <button
                      onClick={() => setShowPreferences(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Cookie Banner */}
          <motion.div
            initial={bannerAnimation.initial}
            animate={bannerAnimation.animate}
            exit={bannerAnimation.exit}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
          >
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl border border-pharaonic-gold/20 overflow-hidden">
                {/* Egyptian-themed header */}
                <div className="bg-gradient-to-r from-pharaonic-gold via-deep-blue to-terracotta h-2"></div>
                
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Cookie Icon with Egyptian styling */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-pharaonic-gold to-deep-blue rounded-full flex items-center justify-center">
                        <FaCookie className="text-white text-xl" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-hieroglyph-black mb-2 font-pharaonic">
                        🏺 Welcome to Our Egyptian Digital Experience
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        We use cookies to enhance your journey through our Pharaonic heritage content, 
                        analyze visitor behavior, and provide personalized experiences. Your privacy is 
                        as precious as ancient Egyptian treasures.
                      </p>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={handleAcceptAll}
                          className="bg-gradient-to-r from-pharaonic-gold to-deep-blue text-white py-2.5 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
                        >
                          Accept All Cookies
                        </button>
                        <button
                          onClick={handleRejectAll}
                          className="bg-gray-200 text-gray-700 py-2.5 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors text-sm"
                        >
                          Reject All
                        </button>
                        <button
                          onClick={() => setShowPreferences(true)}
                          className="border-2 border-pharaonic-gold text-pharaonic-gold py-2.5 px-6 rounded-xl font-semibold hover:bg-pharaonic-gold hover:text-white transition-all duration-300 text-sm"
                        >
                          Customize
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;
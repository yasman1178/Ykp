/**
 * Visitor Statistics Widget
 * Shows visitor demographics and geographic data
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaGlobe, 
  FaFlag, 
  FaLanguage,
  FaPalette,
  FaSync
} from 'react-icons/fa';

interface VisitorStats {
  totalVisitors: number;
  totalActivities: number;
  topCountries: Array<{
    country: string;
    visitors: number;
  }>;
}

const VisitorStatsWidget: React.FC = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics/database?type=stats&days=7');
      const result = await response.json();
      
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch visitor stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      'Egypt': '🇪🇬',
      'United States': '🇺🇸',
      'Germany': '🇩🇪',
      'United Kingdom': '🇬🇧',
      'France': '🇫🇷',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Saudi Arabia': '🇸🇦',
      'UAE': '🇦🇪',
      'Unknown': '🌍',
    };
    return flags[country] || '🌍';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats || stats.totalVisitors === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="text-center">
          <FaUsers className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            لا توجد بيانات زوار بعد
          </h3>
          <p className="text-sm text-gray-500">
            ستظهر الإحصائيات عندما يبدأ الزوار في زيارة الموقع
          </p>
        </div>
      </div>
    );
  }

  const getPercentage = (value: number, total: number) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="bg-gradient-to-r from-pharaonic-gold to-deep-blue rounded-full p-3">
            <FaUsers className="text-white text-xl" />
          </div>
          <div className="text-right">
            <h3 className="text-lg font-bold text-hieroglyph-black">
              إحصائيات الزوار
            </h3>
            <p className="text-sm text-gray-600">
              آخر 7 أيام
            </p>
          </div>
        </div>
        <button
          onClick={fetchStats}
          className="text-gray-400 hover:text-pharaonic-gold transition-colors"
          disabled={loading}
        >
          <FaSync className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-pharaonic-gold/10 to-deep-blue/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-hieroglyph-black mb-1">
            {stats.totalVisitors}
          </div>
          <div className="text-sm text-gray-600 flex items-center justify-center">
            <FaUsers className="mr-1" />
            إجمالي الزوار
          </div>
        </div>

        <div className="bg-gradient-to-r from-terracotta/10 to-pharaonic-gold/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-hieroglyph-black mb-1">
            {stats.totalActivities}
          </div>
          <div className="text-sm text-gray-600 flex items-center justify-center">
            <FaGlobe className="mr-1" />
            إجمالي الأنشطة
          </div>
        </div>
      </div>

      {/* Top Countries */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <FaFlag className="mr-2" />
          أهم البلدان
        </h4>
        
        {stats.topCountries.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            لا توجد بيانات جغرافية متاحة
          </p>
        ) : (
          <div className="space-y-3">
            {stats.topCountries.slice(0, 5).map((country, index) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-lg">
                    {getCountryFlag(country.country)}
                  </span>
                  <span className="text-sm text-gray-700">
                    {country.country}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-pharaonic-gold h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${getPercentage(country.visitors, stats.totalVisitors)}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-hieroglyph-black w-8 text-right">
                    {country.visitors}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Engagement Rate */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">معدل التفاعل</span>
          <span className="text-lg font-bold text-pharaonic-gold">
            {stats.totalVisitors > 0 
              ? Math.round((stats.totalActivities / stats.totalVisitors) * 100) / 100
              : 0
            }
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          متوسط الأنشطة لكل زائر
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          آخر تحديث: {new Date().toLocaleString('ar-EG')}
        </p>
      </div>
    </motion.div>
  );
};

export default VisitorStatsWidget;
/**
 * Cookie Statistics Widget
 * Shows real cookie consent data from local database
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCookie, FaCheck, FaTimes, FaCog, FaChartPie } from 'react-icons/fa';

interface ConsentStats {
  total: number;
  acceptedAll: number;
  rejectedAll: number;
  customized: number;
  analyticsRate: number;
  marketingRate: number;
  preferencesRate: number;
}

const CookieStatsWidget: React.FC = () => {
  const [stats, setStats] = useState<ConsentStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsentStats();
  }, []);

  const fetchConsentStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics/database?type=consent-stats');
      const result = await response.json();
      
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch consent stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats || stats.total === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="text-center">
          <FaCookie className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            لا توجد بيانات كوكيز بعد
          </h3>
          <p className="text-sm text-gray-500">
            ستظهر الإحصائيات عندما يبدأ الزوار في قبول أو رفض الكوكيز
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
            <FaCookie className="text-white text-xl" />
          </div>
          <div className="text-right">
            <h3 className="text-lg font-bold text-hieroglyph-black">
              إحصائيات الكوكيز
            </h3>
            <p className="text-sm text-gray-600">
              بيانات حقيقية من الزوار
            </p>
          </div>
        </div>
        <button
          onClick={fetchConsentStats}
          className="text-gray-400 hover:text-pharaonic-gold transition-colors"
        >
          <FaChartPie />
        </button>
      </div>

      {/* Total Consents */}
      <div className="bg-gradient-to-r from-pharaonic-gold/10 to-deep-blue/10 rounded-xl p-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-hieroglyph-black mb-1">
            {stats.total}
          </div>
          <div className="text-sm text-gray-600">
            إجمالي قرارات الكوكيز
          </div>
        </div>
      </div>

      {/* Consent Types */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <FaCheck className="text-green-600" />
          </div>
          <div className="text-lg font-bold text-green-600">
            {stats.acceptedAll}
          </div>
          <div className="text-xs text-gray-600">
            قبول الكل
          </div>
          <div className="text-xs text-green-600 font-medium">
            {getPercentage(stats.acceptedAll, stats.total)}%
          </div>
        </div>

        <div className="text-center">
          <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <FaTimes className="text-red-600" />
          </div>
          <div className="text-lg font-bold text-red-600">
            {stats.rejectedAll}
          </div>
          <div className="text-xs text-gray-600">
            رفض الكل
          </div>
          <div className="text-xs text-red-600 font-medium">
            {getPercentage(stats.rejectedAll, stats.total)}%
          </div>
        </div>

        <div className="text-center">
          <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
            <FaCog className="text-blue-600" />
          </div>
          <div className="text-lg font-bold text-blue-600">
            {stats.customized}
          </div>
          <div className="text-xs text-gray-600">
            مخصص
          </div>
          <div className="text-xs text-blue-600 font-medium">
            {getPercentage(stats.customized, stats.total)}%
          </div>
        </div>
      </div>

      {/* Cookie Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">كوكيز التحليلات</span>
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-pharaonic-gold h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.analyticsRate}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-pharaonic-gold">
              {Math.round(stats.analyticsRate)}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">كوكيز التسويق</span>
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-deep-blue h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.marketingRate}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-deep-blue">
              {Math.round(stats.marketingRate)}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">كوكيز التفضيلات</span>
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-terracotta h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.preferencesRate}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-terracotta">
              {Math.round(stats.preferencesRate)}%
            </span>
          </div>
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

export default CookieStatsWidget;
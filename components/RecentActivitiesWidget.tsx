/**
 * Recent Activities Widget
 * Shows real-time user activities from local database
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEye, 
  FaShoppingBag, 
  FaNewspaper, 
  FaEnvelope, 
  FaClock,
  FaSync,
  FaGlobe
} from 'react-icons/fa';

interface Activity {
  id: string;
  visitorId: string;
  sessionId: string;
  timestamp: string;
  type: 'page_view' | 'product_view' | 'blog_view' | 'contact_form' | 'download' | 'search';
  page: string;
  data?: Record<string, any>;
}

const RecentActivitiesWidget: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchActivities, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/analytics/database?type=stats&days=1');
      const result = await response.json();
      
      if (result.success) {
        setActivities(result.data.recentActivities || []);
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'page_view':
        return <FaEye className="text-blue-600" />;
      case 'product_view':
        return <FaShoppingBag className="text-green-600" />;
      case 'blog_view':
        return <FaNewspaper className="text-purple-600" />;
      case 'contact_form':
        return <FaEnvelope className="text-red-600" />;
      default:
        return <FaGlobe className="text-gray-600" />;
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'page_view':
        return 'مشاهدة صفحة';
      case 'product_view':
        return 'مشاهدة منتج';
      case 'blog_view':
        return 'قراءة مقال';
      case 'contact_form':
        return 'نموذج اتصال';
      default:
        return 'نشاط';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'الآن';
    if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    
    return date.toLocaleDateString('ar-EG');
  };

  const getPageName = (page: string) => {
    if (page === '/') return 'الصفحة الرئيسية';
    if (page.includes('/products')) return 'صفحة المنتجات';
    if (page.includes('/blog')) return 'المدونة';
    if (page.includes('/contact')) return 'اتصل بنا';
    if (page.includes('/about')) return 'من نحن';
    return page;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-1"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
            <FaClock className="text-white text-xl" />
          </div>
          <div className="text-right">
            <h3 className="text-lg font-bold text-hieroglyph-black">
              الأنشطة الحديثة
            </h3>
            <p className="text-sm text-gray-600">
              آخر {activities.length} نشاط
            </p>
          </div>
        </div>
        <button
          onClick={fetchActivities}
          className="text-gray-400 hover:text-pharaonic-gold transition-colors"
          disabled={loading}
        >
          <FaSync className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Activities List */}
      {activities.length === 0 ? (
        <div className="text-center py-8">
          <FaClock className="text-4xl text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-600 mb-2">
            لا توجد أنشطة حديثة
          </h4>
          <p className="text-sm text-gray-500">
            ستظهر الأنشطة عندما يبدأ الزوار في تصفح الموقع
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {/* Activity Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                {getActivityIcon(activity.type)}
              </div>

              {/* Activity Details */}
              <div className="flex-1 text-right">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-hieroglyph-black">
                    {getActivityLabel(activity.type)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(activity.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600">
                  {getPageName(activity.page)}
                </p>

                {/* Additional Data */}
                {activity.data && (
                  <div className="mt-1">
                    {activity.data.productName && (
                      <span className="text-xs bg-pharaonic-gold/10 text-pharaonic-gold px-2 py-1 rounded">
                        {activity.data.productName}
                      </span>
                    )}
                    {activity.data.pharaonicSymbol && (
                      <span className="text-xs bg-deep-blue/10 text-deep-blue px-2 py-1 rounded">
                        {activity.data.pharaonicSymbol}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Visitor ID (last 4 chars) */}
              <div className="flex-shrink-0">
                <span className="text-xs text-gray-400 font-mono">
                  #{activity.visitorId.slice(-4)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          يتم التحديث كل 30 ثانية • آخر تحديث: {new Date().toLocaleTimeString('ar-EG')}
        </p>
      </div>
    </motion.div>
  );
};

export default RecentActivitiesWidget;
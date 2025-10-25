/**
 * Analytics Dashboard Component
 * Displays real-time analytics and reporting data
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaChartLine, 
  FaUsers, 
  FaHandshake, 
  FaGlobe, 
  FaDownload,
  FaEye,
  FaClock,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import CookieStatsWidget from './CookieStatsWidget';
import RecentActivitiesWidget from './RecentActivitiesWidget';
import VisitorStatsWidget from './VisitorStatsWidget';

interface DashboardData {
  summary: {
    totalVisitors: number;
    b2bLeads: number;
    conversionRate: number;
    coreWebVitalsScore: string;
    seoScore: number;
  };
  weeklyTrends?: any;
  monthlyB2B?: any;
  performance?: any;
  seo?: any;
  alerts?: string[];
  dataSource?: string;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 ${color}`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-hieroglyph-black mt-1">{value}</p>
        {change !== undefined && (
          <div className={`flex items-center mt-2 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${color.replace('border-l-', 'bg-').replace('-500', '-100')}`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

const AnalyticsDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('week');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async (useRealData: boolean = false) => {
    try {
      setLoading(true);
      
      let url: string;
      if (useRealData) {
        // Fetch from local database
        url = '/api/analytics/database?type=dashboard&days=7';
      } else {
        // Fetch mock data
        url = '/api/analytics/reports?type=dashboard';
      }
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        // Ensure all required properties exist with safe defaults
        const safeData = {
          summary: {
            totalVisitors: 0,
            b2bLeads: 0,
            conversionRate: 0,
            coreWebVitalsScore: 'N/A',
            seoScore: 0,
            ...result.data?.summary
          },
          weeklyTrends: {
            metrics: {
              topProducts: [],
              topBlogArticles: [],
              ...result.data?.weeklyTrends?.metrics
            },
            ...result.data?.weeklyTrends
          },
          performance: {
            score: 'N/A',
            lcp: 0,
            cls: 0,
            ...result.data?.performance
          },
          alerts: result.data?.alerts || [],
          dataSource: result.data?.dataSource || (useRealData ? 'local_database' : 'mock_data'),
          ...result.data
        };
        
        setDashboardData(safeData);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Set fallback data on error
      setDashboardData({
        summary: {
          totalVisitors: 0,
          b2bLeads: 0,
          conversionRate: 0,
          coreWebVitalsScore: 'N/A',
          seoScore: 0
        },
        weeklyTrends: {
          metrics: {
            topProducts: [],
            topBlogArticles: []
          }
        },
        monthlyB2B: {},
        performance: {
          score: 'N/A',
          lcp: 0,
          cls: 0
        },
        seo: {},
        alerts: [],
        dataSource: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (type: string) => {
    try {
      const response = await fetch(`/api/analytics/reports?type=${type}`);
      const result = await response.json();
      
      if (result.success) {
        // Create and download JSON file
        const dataStr = JSON.stringify(result.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pharaonic-pillows-${type}-report-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to download report:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-papyrus to-desert-sand p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pharaonic-gold"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-papyrus to-desert-sand p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pharaonic-gold mx-auto mb-4"></div>
            <p className="text-gray-600">جاري تحميل البيانات...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-papyrus to-desert-sand p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-hieroglyph-black font-pharaonic">
                🏺 Pharaonic Pillows Analytics
              </h1>
              <div className="flex items-center mt-2 space-x-4">
                <p className="text-gray-600">
                  Real-time insights into your Egyptian heritage business
                </p>
                {dashboardData?.dataSource && (
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    dashboardData?.dataSource === 'local_database' 
                      ? 'bg-green-100 text-green-800' 
                      : dashboardData?.dataSource === 'google_analytics'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {dashboardData?.dataSource === 'local_database' 
                      ? '🗄️ بيانات محلية حقيقية' 
                      : dashboardData?.dataSource === 'google_analytics'
                      ? '📊 Google Analytics'
                      : '🎭 بيانات تجريبية'}
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => fetchDashboardData(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
                disabled={loading}
              >
                <span>🗄️</span>
                <span>بيانات محلية</span>
              </button>
              <button
                onClick={() => fetchDashboardData(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
                disabled={loading}
              >
                <span>🎭</span>
                <span>بيانات تجريبية</span>
              </button>
              <button
                onClick={() => downloadReport('weekly')}
                className="bg-pharaonic-gold text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
              >
                <FaDownload />
                <span>Weekly Report</span>
              </button>
              <button
                onClick={() => downloadReport('monthly')}
                className="bg-deep-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
              >
                <FaDownload />
                <span>Monthly Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Visitors"
            value={dashboardData.summary?.totalVisitors?.toLocaleString() || '0'}
            change={12.5}
            icon={<FaUsers className="text-blue-600 text-xl" />}
            color="border-l-blue-500"
          />
          <MetricCard
            title="B2B Leads"
            value={dashboardData.summary?.b2bLeads || 0}
            change={8.3}
            icon={<FaHandshake className="text-green-600 text-xl" />}
            color="border-l-green-500"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${(dashboardData.summary?.conversionRate || 0).toFixed(1)}%`}
            change={5.2}
            icon={<FaChartLine className="text-pharaonic-gold text-xl" />}
            color="border-l-yellow-500"
          />
          <MetricCard
            title="SEO Score"
            value={dashboardData.summary?.seoScore || 0}
            change={3.1}
            icon={<FaGlobe className="text-purple-600 text-xl" />}
            color="border-l-purple-500"
          />
        </div>

        {/* Alerts Section */}
        {dashboardData?.alerts && dashboardData.alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg mb-8"
          >
            <h2 className="text-xl font-bold text-hieroglyph-black mb-4 flex items-center">
              <span className="mr-2">🚨</span>
              Recent Alerts
            </h2>
            <div className="space-y-3">
              {dashboardData.alerts?.map((alert, index) => (
                <div
                  key={index}
                  className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg"
                >
                  <p className="text-yellow-800">{alert}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Charts and Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Cookie Statistics */}
          <CookieStatsWidget />
          
          {/* Recent Activities */}
          <RecentActivitiesWidget />
          
          {/* Visitor Statistics */}
          <VisitorStatsWidget />
          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold text-hieroglyph-black mb-4">
              🏆 Top Performing Products
            </h2>
            <div className="space-y-4">
              {dashboardData?.weeklyTrends?.metrics?.topProducts?.map((product: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-hieroglyph-black">{product.productName}</p>
                    <p className="text-sm text-gray-600">{product.category.toUpperCase()} Collection</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-pharaonic-gold">{product.views} views</p>
                    <p className="text-sm text-green-600">{product.conversionRate}% conversion</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Blog Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold text-hieroglyph-black mb-4">
              📚 Heritage Content Performance
            </h2>
            <div className="space-y-4">
              {dashboardData?.weeklyTrends?.metrics?.topBlogArticles?.map((article: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-hieroglyph-black">{article.pharaonicSymbol}</p>
                    <p className="text-sm text-gray-600">Symbol Article</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-deep-blue">{article.views} views</p>
                    <p className="text-sm text-green-600">{article.productConversions} conversions</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-bold text-hieroglyph-black mb-4">
            ⚡ Website Performance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {dashboardData?.performance?.score === 'good' ? '✅' : '⚠️'}
              </div>
              <p className="text-sm text-gray-600">Core Web Vitals</p>
              <p className="font-semibold capitalize">{dashboardData?.performance?.score || 'N/A'}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {dashboardData?.performance?.lcp || 0}s
              </div>
              <p className="text-sm text-gray-600">Largest Contentful Paint</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {dashboardData?.performance?.cls || 0}
              </div>
              <p className="text-sm text-gray-600">Cumulative Layout Shift</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
/**
 * Protected Analytics Dashboard Page
 * Admin interface for viewing analytics and reports with authentication
 */

import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaClock } from 'react-icons/fa';
import AnalyticsDashboard from '../../components/AnalyticsDashboard';
import AdminLogin from '../../components/AdminLogin';
import AuthManager from '../../lib/auth';

const AnalyticsPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);

  const handleLogout = useCallback(() => {
    AuthManager.logout();
    setIsAuthenticated(false);
    setSessionTime(0);
  }, []);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const authenticated = AuthManager.isUserAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
      
      if (authenticated) {
        setSessionTime(AuthManager.getSessionTimeRemaining());
      }
    };

    checkAuth();

    // Update session time every minute
    const interval = setInterval(() => {
      if (isAuthenticated) {
        const remaining = AuthManager.getSessionTimeRemaining();
        setSessionTime(remaining);
        
        // Auto-logout if session expired
        if (remaining <= 0) {
          handleLogout();
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated, handleLogout]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setSessionTime(AuthManager.getSessionTimeRemaining());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-papyrus to-desert-sand flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pharaonic-gold"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Login | Pharaonic Pillows</title>
          <meta name="description" content="Admin login for Pharaonic Pillows analytics dashboard" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Analytics Dashboard | Pharaonic Pillows</title>
        <meta name="description" content="Analytics dashboard for Pharaonic Pillows website performance and B2B metrics" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="relative">
        {/* Admin Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="bg-gradient-to-r from-pharaonic-gold to-deep-blue rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-white font-bold text-sm">👑</span>
              </div>
              <div className="text-right">
                <h2 className="text-lg font-semibold text-hieroglyph-black">
                  مرحباً بك في لوحة التحكم
                </h2>
                <p className="text-sm text-gray-600">
                  إدارة تحليلات الوسائد الفرعونية
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Session Timer */}
              <div className="flex items-center text-sm text-gray-600">
                <FaClock className="ml-2" />
                <span>الجلسة: {sessionTime} دقيقة</span>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 space-x-reverse bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                <FaSignOutAlt />
                <span>خروج</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Content */}
        <AnalyticsDashboard />
      </div>
    </>
  );
};

export default AnalyticsPage;
/**
 * Admin Login Component
 * Egyptian-themed login form for analytics dashboard
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaEye, FaEyeSlash, FaUserShield } from 'react-icons/fa';
import AuthManager from '../lib/auth';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Check if user is rate limited
    if (AuthManager.isRateLimited()) {
      const remainingTime = AuthManager.getRateLimitTimeRemaining();
      setError(`تم تجاوز عدد المحاولات المسموح. حاول مرة أخرى بعد ${remainingTime} دقيقة.`);
      setIsLoading(false);
      return;
    }

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const isAuthenticated = AuthManager.authenticate(password);
    
    if (isAuthenticated) {
      onLoginSuccess();
    } else {
      if (AuthManager.isRateLimited()) {
        const remainingTime = AuthManager.getRateLimitTimeRemaining();
        setError(`محاولات كثيرة خاطئة. حاول مرة أخرى بعد ${remainingTime} دقيقة.`);
      } else {
        setError('كلمة المرور غير صحيحة. حاول مرة أخرى.');
      }
      setPassword('');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-papyrus via-desert-sand to-pharaonic-gold flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-pharaonic-gold/20"
      >
        {/* Header with Egyptian styling */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-pharaonic-gold to-deep-blue rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <FaUserShield className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-hieroglyph-black font-pharaonic mb-2">
            🏺 دخول المدير
          </h1>
          <p className="text-gray-600">
            لوحة تحكم تحليلات الوسائد الفرعونية
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pharaonic-gold focus:border-pharaonic-gold text-right"
                placeholder="أدخل كلمة المرور"
                required
                disabled={isLoading}
                dir="rtl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-0 pl-3 flex items-center"
                disabled={isLoading}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !password.trim()}
            className="w-full bg-gradient-to-r from-pharaonic-gold to-deep-blue text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                جاري التحقق...
              </div>
            ) : (
              'دخول'
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800 text-center">
            🔒 هذه منطقة محمية للمديرين فقط
            <br />
            جلسة العمل صالحة لمدة 24 ساعة
          </p>
        </div>

        {/* Development Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800 text-center">
              🔧 وضع التطوير: كلمة المرور الافتراضية هي &quot;pharaonic2024!&quot;
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminLogin;
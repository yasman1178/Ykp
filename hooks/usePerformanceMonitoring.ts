/**
 * Performance Monitoring Hook
 * Provides access to performance metrics and alerts
 */

import { useEffect, useState, useCallback } from 'react';
import PerformanceMonitoringManager, {
  WebVitalsMetrics,
  APIPerformanceMetrics,
  PerformanceAlert,
} from '../lib/performance-monitoring';
import { useCookieConsent } from './useCookieConsent';

interface UsePerformanceMonitoringReturn {
  webVitals: Partial<WebVitalsMetrics>;
  apiMetrics: APIPerformanceMetrics[];
  alerts: PerformanceAlert[];
  clearAlerts: () => void;
  isMonitoring: boolean;
}

export const usePerformanceMonitoring = (): UsePerformanceMonitoringReturn => {
  const { preferences } = useCookieConsent();
  const [webVitals, setWebVitals] = useState<Partial<WebVitalsMetrics>>({});
  const [apiMetrics, setAPIMetrics] = useState<APIPerformanceMetrics[]>([]);
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  // Initialize performance monitoring
  useEffect(() => {
    if (preferences.analytics) {
      PerformanceMonitoringManager.initialize();
      setIsMonitoring(true);
    }
  }, [preferences.analytics]);

  // Update metrics periodically
  useEffect(() => {
    if (!preferences.analytics) return;

    const updateMetrics = () => {
      setWebVitals(PerformanceMonitoringManager.getWebVitals());
      setAPIMetrics(PerformanceMonitoringManager.getAPIMetrics());
      setAlerts(PerformanceMonitoringManager.getAlerts());
    };

    // Update immediately
    updateMetrics();

    // Update every 5 seconds
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, [preferences.analytics]);

  // Clear alerts
  const clearAlerts = useCallback(() => {
    PerformanceMonitoringManager.clearAlerts();
    setAlerts([]);
  }, []);

  return {
    webVitals,
    apiMetrics,
    alerts,
    clearAlerts,
    isMonitoring,
  };
};

export default usePerformanceMonitoring;

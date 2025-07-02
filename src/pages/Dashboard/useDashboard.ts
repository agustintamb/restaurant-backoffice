import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { selectorDashboard, clearError } from '@/features/dashboard/slice';
import { getDashboardStats } from '@/features/dashboard/asyncActions';

export const useDashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { dashboardData, isLoading, error } = useSelector(selectorDashboard);

  const loadDashboardStats = () => dispatch(getDashboardStats());

  const clearDashboardError = () => dispatch(clearError());

  useEffect(() => {
    loadDashboardStats();
  }, []);

  return {
    dashboardData,
    isLoading,
    error,
    loadDashboardStats,
    clearDashboardError,
  };
};

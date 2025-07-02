import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDashboardStats } from '@/interfaces/dashboard';
import { getDashboardStats } from './asyncActions';

interface DashboardState {
  dashboardData: IDashboardStats | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  dashboardData: null,
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearDashboardData: state => {
      state.dashboardData = null;
    },
  },
  extraReducers: builder => {
    // Get Dashboard Stats
    builder
      .addCase(getDashboardStats.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDashboardStats.fulfilled, (state, action: PayloadAction<IDashboardStats>) => {
        state.isLoading = false;
        state.dashboardData = action.payload;
        state.error = null;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar estadísticas del dashboard';
      });
  },
});

export const { clearError, clearDashboardData } = dashboardSlice.actions;

export const selectorDashboard = (state: RootState) => state.dashboard;

export const reducer = dashboardSlice.reducer;

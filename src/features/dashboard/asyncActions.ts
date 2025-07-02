import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import Dashboard from '@/service/dashboard';

export const getDashboardStats = createAsyncThunk(
  'dashboard/getDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await Dashboard.getDashboardStats();
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import { IUpdateUserProfileParams } from '@/interfaces/user';
import User from '@/service/user';

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await User.getCurrentUser();
      return data;
    } catch (error) {
      if (isAxiosError(error)) rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (payload: IUpdateUserProfileParams, { rejectWithValue }) => {
    try {
      const { data } = await User.updateUserProfile(payload);
      return data;
    } catch (error) {
      if (isAxiosError(error)) rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

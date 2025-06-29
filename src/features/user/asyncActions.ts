import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import { IUpdateUserProfile, GetUsersQuery, ICreateUser, IUpdateUser } from '@/interfaces/user';
import User from '@/service/user';

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (params: GetUsersQuery, { rejectWithValue }) => {
    try {
      const { data } = await User.getUsers(params);
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData: ICreateUser, { rejectWithValue }) => {
    try {
      const { data } = await User.createUser(userData);
      if (data) toast.success('Usuario creado');
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, userData }: { userId: string; userData: IUpdateUser }, { rejectWithValue }) => {
    try {
      const { data } = await User.updateUser(userId, userData);
      if (data) toast.success('Usuario actualizado');
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await User.deleteUser(userId);
      if (data) toast.success('Usuario eliminado');
      return userId;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await User.getCurrentUser();
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (payload: IUpdateUserProfile, { rejectWithValue }) => {
    try {
      const { data } = await User.updateUserProfile(payload);
      if (data) toast.success('Perfil actualizado');
      return data;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

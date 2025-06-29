import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import { GetCategoriesQuery, ICreateCategory, IUpdateCategory } from '@/interfaces/category';
import Category from '@/service/category';

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (params: GetCategoriesQuery, { rejectWithValue }) => {
    try {
      const { data } = await Category.getCategories(params);
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (categoryData: ICreateCategory, { rejectWithValue }) => {
    try {
      const { data } = await Category.createCategory(categoryData);
      if (data) toast.success('Categoría creada');
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async (
    { categoryId, categoryData }: { categoryId: string; categoryData: IUpdateCategory },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await Category.updateCategory(categoryId, categoryData);
      if (data) toast.success('Categoría actualizada');
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const { data } = await Category.deleteCategory(categoryId);
      if (data) toast.success('Categoría eliminada');
      return categoryId;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getCategoryById = createAsyncThunk(
  'category/getCategoryById',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const { data } = await Category.getCategoryById(categoryId);
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

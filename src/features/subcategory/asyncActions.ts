import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import {
  GetSubcategoriesQuery,
  ICreateSubcategory,
  IUpdateSubcategory,
} from '@/interfaces/subcategory';
import Subcategory from '@/service/subcategory';

export const getSubcategories = createAsyncThunk(
  'subcategory/getSubcategories',
  async (params: GetSubcategoriesQuery, { rejectWithValue }) => {
    try {
      const { data } = await Subcategory.getSubcategories(params);
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const createSubcategory = createAsyncThunk(
  'subcategory/createSubcategory',
  async (subcategoryData: ICreateSubcategory, { rejectWithValue }) => {
    try {
      const { data } = await Subcategory.createSubcategory(subcategoryData);
      if (data) toast.success('Subcategoría creada');
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateSubcategory = createAsyncThunk(
  'subcategory/updateSubcategory',
  async (
    {
      subcategoryId,
      subcategoryData,
    }: { subcategoryId: string; subcategoryData: IUpdateSubcategory },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await Subcategory.updateSubcategory(subcategoryId, subcategoryData);
      if (data) toast.success('Subcategoría actualizada');
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const deleteSubcategory = createAsyncThunk(
  'subcategory/deleteSubcategory',
  async (subcategoryId: string, { rejectWithValue }) => {
    try {
      const { data } = await Subcategory.deleteSubcategory(subcategoryId);
      if (data) toast.success('Subcategoría eliminada');
      return subcategoryId;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getSubcategoryById = createAsyncThunk(
  'subcategory/getSubcategoryById',
  async (subcategoryId: string, { rejectWithValue }) => {
    try {
      const { data } = await Subcategory.getSubcategoryById(subcategoryId);
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

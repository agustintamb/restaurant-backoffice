import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import { GetAllergensQuery, ICreateAllergen, IUpdateAllergen } from '@/interfaces/allergen';
import Allergen from '@/service/allergen';

export const getAllergens = createAsyncThunk(
  'allergen/getAllergens',
  async (params: GetAllergensQuery, { rejectWithValue }) => {
    try {
      const { data } = await Allergen.getAllergens(params);
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const createAllergen = createAsyncThunk(
  'allergen/createAllergen',
  async (allergenData: ICreateAllergen, { rejectWithValue }) => {
    try {
      const { data } = await Allergen.createAllergen(allergenData);
      if (data) toast.success('Alérgeno creado');
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateAllergen = createAsyncThunk(
  'allergen/updateAllergen',
  async (
    { allergenId, allergenData }: { allergenId: string; allergenData: IUpdateAllergen },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await Allergen.updateAllergen(allergenId, allergenData);
      if (data) toast.success('Alérgeno actualizado');
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const deleteAllergen = createAsyncThunk(
  'allergen/deleteAllergen',
  async (allergenId: string, { rejectWithValue }) => {
    try {
      const { data } = await Allergen.deleteAllergen(allergenId);
      if (data) toast.success('Alérgeno eliminado');
      return allergenId;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getAllergenById = createAsyncThunk(
  'allergen/getAllergenById',
  async (allergenId: string, { rejectWithValue }) => {
    try {
      const { data } = await Allergen.getAllergenById(allergenId);
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

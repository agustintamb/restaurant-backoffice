// src/features/dish/asyncActions.ts
import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import { GetDishesQuery, ICreateDish, IUpdateDish } from '@/interfaces/dish';
import Dish from '@/service/dish';
import { errorMessage } from '@/utils/errorMessage';

export const getDishes = createAsyncThunk(
  'dish/getDishes',
  async (params: GetDishesQuery, { rejectWithValue }) => {
    try {
      const { data } = await Dish.getDishes(params);
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const createDish = createAsyncThunk(
  'dish/createDish',
  async (dishData: ICreateDish & { image?: File }, { rejectWithValue }) => {
    try {
      const { data } = await Dish.createDish(dishData);
      if (data) toast.success('Plato creado exitosamente');
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(`Error: ${errorMessage(error)}`);
        return rejectWithValue(error.response?.data);
      }
      toast.error('Error inesperado al crear plato');
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateDish = createAsyncThunk(
  'dish/updateDish',
  async (
    { dishId, dishData }: { dishId: string; dishData: IUpdateDish & { image?: File } },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await Dish.updateDish(dishId, dishData);
      if (data) toast.success('Plato actualizado exitosamente');
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(`Error: ${errorMessage(error)}`);
        return rejectWithValue(error.response?.data);
      }
      toast.error('Error inesperado al actualizar plato');
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const deleteDish = createAsyncThunk(
  'dish/deleteDish',
  async (dishId: string, { rejectWithValue }) => {
    try {
      const { data } = await Dish.deleteDish(dishId);
      if (data) toast.success('Plato eliminado exitosamente');
      return dishId;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(`Error: ${errorMessage(error)}`);
        return rejectWithValue(error.response?.data);
      }
      toast.error('Error inesperado al eliminar plato');
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getDishById = createAsyncThunk(
  'dish/getDishById',
  async (dishId: string, { rejectWithValue }) => {
    try {
      const { data } = await Dish.getDishById(dishId);
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

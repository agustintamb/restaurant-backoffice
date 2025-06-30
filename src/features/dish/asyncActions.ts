import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import { errorMessage } from '@/utils/errorMessage';
import { GetDishesQuery, ICreateDish, IUpdateDish } from '@/interfaces/dish';
import Dish from '@/service/dish';

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
      toast.error(errorMessage(error));
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
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
      toast.error(errorMessage(error));
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
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
      toast.error(errorMessage(error));
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const restoreDish = createAsyncThunk(
  'dish/restoreDish',
  async (dishId: string, { rejectWithValue }) => {
    try {
      const { data } = await Dish.restoreDish(dishId);
      if (data) toast.success('Plato restaurado exitosamente');
      return data.result;
    } catch (error) {
      toast.error(errorMessage(error));
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
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

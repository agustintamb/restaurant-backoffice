import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import { errorMessage } from '@/utils/errorMessage';
import { GetIngredientsQuery, ICreateIngredient, IUpdateIngredient } from '@/interfaces/ingredient';
import Ingredient from '@/service/ingredient';

export const getIngredients = createAsyncThunk(
  'ingredient/getIngredients',
  async (params: GetIngredientsQuery, { rejectWithValue }) => {
    try {
      const { data } = await Ingredient.getIngredients(params);
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const createIngredient = createAsyncThunk(
  'ingredient/createIngredient',
  async (ingredientData: ICreateIngredient, { rejectWithValue }) => {
    try {
      const { data } = await Ingredient.createIngredient(ingredientData);
      if (data) toast.success('Ingrediente creado');
      return data.result;
    } catch (error) {
      toast.error(errorMessage(error));
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const updateIngredient = createAsyncThunk(
  'ingredient/updateIngredient',
  async (
    { ingredientId, ingredientData }: { ingredientId: string; ingredientData: IUpdateIngredient },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await Ingredient.updateIngredient(ingredientId, ingredientData);
      if (data) toast.success('Ingrediente actualizado');
      return data.result;
    } catch (error) {
      toast.error(errorMessage(error));
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const deleteIngredient = createAsyncThunk(
  'ingredient/deleteIngredient',
  async (ingredientId: string, { rejectWithValue }) => {
    try {
      const { data } = await Ingredient.deleteIngredient(ingredientId);
      if (data) toast.success('Ingrediente eliminado');
      return ingredientId;
    } catch (error) {
      toast.error(errorMessage(error));
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const restoreIngredient = createAsyncThunk(
  'ingredient/restoreIngredient',
  async (ingredientId: string, { rejectWithValue }) => {
    try {
      const { data } = await Ingredient.restoreIngredient(ingredientId);
      if (data) toast.success('Ingrediente restaurado exitosamente');
      return data.result;
    } catch (error) {
      toast.error(errorMessage(error));
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getIngredientById = createAsyncThunk(
  'ingredient/getIngredientById',
  async (ingredientId: string, { rejectWithValue }) => {
    try {
      const { data } = await Ingredient.getIngredientById(ingredientId);
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

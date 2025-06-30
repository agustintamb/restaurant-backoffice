import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIngredient, PaginatedIngredientsResult } from '@/interfaces/ingredient';
import {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getIngredientById,
  restoreIngredient,
} from './asyncActions';

interface IngredientState {
  ingredientsData: PaginatedIngredientsResult | null;
  selectedIngredient: IIngredient | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientState = {
  ingredientsData: null,
  selectedIngredient: null,
  isLoading: false,
  error: null,
};

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearIngredientsList: state => {
      state.ingredientsData = null;
    },
    clearSelectedIngredient: state => {
      state.selectedIngredient = null;
    },
  },
  extraReducers: builder => {
    // Get Ingredients
    builder
      .addCase(getIngredients.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<PaginatedIngredientsResult>) => {
          state.isLoading = false;
          state.ingredientsData = action.payload;
          state.error = null;
        }
      )
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar ingredientes';
      });

    // Create Ingredient
    builder
      .addCase(createIngredient.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createIngredient.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createIngredient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al crear ingrediente';
      });

    // Update Ingredient
    builder
      .addCase(updateIngredient.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateIngredient.fulfilled, (state, action: PayloadAction<IIngredient>) => {
        state.isLoading = false;
        // Actualizar en la lista si existe
        if (state.ingredientsData) {
          const index = state.ingredientsData.ingredients.findIndex(
            ingredient => ingredient._id === action.payload._id
          );
          if (index !== -1) {
            state.ingredientsData.ingredients[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateIngredient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al actualizar ingrediente';
      });

    // Delete Ingredient
    builder
      .addCase(deleteIngredient.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteIngredient.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        // Marcar como eliminado en la lista si existe
        if (state.ingredientsData) {
          const index = state.ingredientsData.ingredients.findIndex(
            ingredient => ingredient._id === action.payload
          );
          if (index !== -1) {
            state.ingredientsData.ingredients[index].isDeleted = true;
            state.ingredientsData.ingredients[index].deletedAt = new Date();
          }
        }
        state.error = null;
      })
      .addCase(deleteIngredient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al eliminar ingrediente';
      });

    // Restore Ingredient
    builder
      .addCase(restoreIngredient.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(restoreIngredient.fulfilled, (state, action: PayloadAction<IIngredient>) => {
        state.isLoading = false;
        // Actualizar en la lista si existe
        if (state.ingredientsData) {
          const index = state.ingredientsData.ingredients.findIndex(
            ingredient => ingredient._id === action.payload._id
          );
          if (index !== -1) {
            state.ingredientsData.ingredients[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(restoreIngredient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al restaurar ingrediente';
      });

    // Get Ingredient By Id
    builder
      .addCase(getIngredientById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredientById.fulfilled, (state, action: PayloadAction<IIngredient>) => {
        state.isLoading = false;
        state.selectedIngredient = action.payload;
        state.error = null;
      })
      .addCase(getIngredientById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar ingrediente';
      });
  },
});

export const { clearError, clearIngredientsList, clearSelectedIngredient } =
  ingredientSlice.actions;

export const selectorIngredient = (state: RootState) => state.ingredient;

export const reducer = ingredientSlice.reducer;

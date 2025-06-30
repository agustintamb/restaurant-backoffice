import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDish, PaginatedDishesResult } from '@/interfaces/dish';
import { getDishes, createDish, updateDish, deleteDish, getDishById, restoreDish } from './asyncActions';

interface DishState {
  dishesData: PaginatedDishesResult | null;
  selectedDish: IDish | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DishState = {
  dishesData: null,
  selectedDish: null,
  isLoading: false,
  error: null,
};

const dishSlice = createSlice({
  name: 'dish',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearDishesList: state => {
      state.dishesData = null;
    },
    clearSelectedDish: state => {
      state.selectedDish = null;
    },
  },
  extraReducers: builder => {
    // Get Dishes
    builder
      .addCase(getDishes.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDishes.fulfilled, (state, action: PayloadAction<PaginatedDishesResult>) => {
        state.isLoading = false;
        state.dishesData = action.payload;
        state.error = null;
      })
      .addCase(getDishes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar platos';
      });

    // Create Dish
    builder
      .addCase(createDish.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDish.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createDish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al crear plato';
      });

    // Update Dish
    builder
      .addCase(updateDish.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDish.fulfilled, (state, action: PayloadAction<IDish>) => {
        state.isLoading = false;
        // Actualizar en la lista si existe
        if (state.dishesData) {
          const index = state.dishesData.dishes.findIndex(dish => dish._id === action.payload._id);
          if (index !== -1) {
            state.dishesData.dishes[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateDish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al actualizar plato';
      });

    // Delete Dish
    builder
      .addCase(deleteDish.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDish.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        // Marcar como eliminado en la lista si existe
        if (state.dishesData) {
          const index = state.dishesData.dishes.findIndex(dish => dish._id === action.payload);
          if (index !== -1) {
            state.dishesData.dishes[index].isDeleted = true;
            state.dishesData.dishes[index].deletedAt = new Date();
          }
        }
        state.error = null;
      })
      .addCase(deleteDish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al eliminar plato';
      });

    // Restore Dish
    builder
      .addCase(restoreDish.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(restoreDish.fulfilled, (state, action: PayloadAction<IDish>) => {
        state.isLoading = false;
        // Actualizar en la lista si existe
        if (state.dishesData) {
          const index = state.dishesData.dishes.findIndex(dish => dish._id === action.payload._id);
          if (index !== -1) {
            state.dishesData.dishes[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(restoreDish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al restaurar plato';
      });

    // Get Dish By Id
    builder
      .addCase(getDishById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDishById.fulfilled, (state, action: PayloadAction<IDish>) => {
        state.isLoading = false;
        state.selectedDish = action.payload;
        state.error = null;
      })
      .addCase(getDishById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar plato';
      });
  },
});

export const { clearError, clearDishesList, clearSelectedDish } = dishSlice.actions;

export const selectorDish = (state: RootState) => state.dish;

export const reducer = dishSlice.reducer;

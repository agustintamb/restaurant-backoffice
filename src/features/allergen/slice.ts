import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAllergen, PaginatedAllergensResult } from '@/interfaces/allergen';
import {
  getAllergens,
  createAllergen,
  updateAllergen,
  deleteAllergen,
  getAllergenById,
} from './asyncActions';

interface AllergenState {
  allergensData: PaginatedAllergensResult | null;
  selectedAllergen: IAllergen | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AllergenState = {
  allergensData: null,
  selectedAllergen: null,
  isLoading: false,
  error: null,
};

const allergenSlice = createSlice({
  name: 'allergen',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearAllergensList: state => {
      state.allergensData = null;
    },
    clearSelectedAllergen: state => {
      state.selectedAllergen = null;
    },
  },
  extraReducers: builder => {
    // Get Allergens
    builder
      .addCase(getAllergens.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllergens.fulfilled, (state, action: PayloadAction<PaginatedAllergensResult>) => {
        state.isLoading = false;
        state.allergensData = action.payload;
        state.error = null;
      })
      .addCase(getAllergens.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar alérgenos';
      });

    // Create Allergen
    builder
      .addCase(createAllergen.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAllergen.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createAllergen.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al crear alérgeno';
      });

    // Update Allergen
    builder
      .addCase(updateAllergen.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAllergen.fulfilled, (state, action: PayloadAction<IAllergen>) => {
        state.isLoading = false;
        // Actualizar en la lista si existe
        if (state.allergensData) {
          const index = state.allergensData.allergens.findIndex(
            allergen => allergen._id === action.payload._id
          );
          if (index !== -1) {
            state.allergensData.allergens[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateAllergen.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al actualizar alérgeno';
      });

    // Delete Allergen
    builder
      .addCase(deleteAllergen.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteAllergen.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        // Marcar como eliminado en la lista si existe
        if (state.allergensData) {
          const index = state.allergensData.allergens.findIndex(
            allergen => allergen._id === action.payload
          );
          if (index !== -1) {
            state.allergensData.allergens[index].isDeleted = true;
            state.allergensData.allergens[index].deletedAt = new Date();
          }
        }
        state.error = null;
      })
      .addCase(deleteAllergen.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al eliminar alérgeno';
      });

    // Get Allergen By Id
    builder
      .addCase(getAllergenById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllergenById.fulfilled, (state, action: PayloadAction<IAllergen>) => {
        state.isLoading = false;
        state.selectedAllergen = action.payload;
        state.error = null;
      })
      .addCase(getAllergenById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar alérgeno';
      });
  },
});

export const { clearError, clearAllergensList, clearSelectedAllergen } = allergenSlice.actions;

export const selectorAllergen = (state: RootState) => state.allergen;

export const reducer = allergenSlice.reducer;

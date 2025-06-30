import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISubcategory, PaginatedSubcategoriesResult } from '@/interfaces/subcategory';
import {
  getSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getSubcategoryById,
  restoreSubcategory,
} from './asyncActions';

interface SubcategoryState {
  subcategoriesData: PaginatedSubcategoriesResult | null;
  selectedSubcategory: ISubcategory | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SubcategoryState = {
  subcategoriesData: null,
  selectedSubcategory: null,
  isLoading: false,
  error: null,
};

const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearSubcategoriesList: state => {
      state.subcategoriesData = null;
    },
    clearSelectedSubcategory: state => {
      state.selectedSubcategory = null;
    },
  },
  extraReducers: builder => {
    // Get Subcategories
    builder
      .addCase(getSubcategories.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getSubcategories.fulfilled,
        (state, action: PayloadAction<PaginatedSubcategoriesResult>) => {
          state.isLoading = false;
          state.subcategoriesData = action.payload;
          state.error = null;
        }
      )
      .addCase(getSubcategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar subcategorías';
      });

    // Create Subcategory
    builder
      .addCase(createSubcategory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSubcategory.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al crear subcategoría';
      });

    // Update Subcategory
    builder
      .addCase(updateSubcategory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSubcategory.fulfilled, (state, action: PayloadAction<ISubcategory>) => {
        state.isLoading = false;
        // Actualizar en la lista si existe
        if (state.subcategoriesData) {
          const index = state.subcategoriesData.subcategories.findIndex(
            subcategory => subcategory._id === action.payload._id
          );
          if (index !== -1) {
            state.subcategoriesData.subcategories[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al actualizar subcategoría';
      });

    // Delete Subcategory
    builder
      .addCase(deleteSubcategory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        // Marcar como eliminado en la lista si existe
        if (state.subcategoriesData) {
          const index = state.subcategoriesData.subcategories.findIndex(
            subcategory => subcategory._id === action.payload
          );
          if (index !== -1) {
            state.subcategoriesData.subcategories[index].isDeleted = true;
            state.subcategoriesData.subcategories[index].deletedAt = new Date();
          }
        }
        state.error = null;
      })
      .addCase(deleteSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al eliminar subcategoría';
      });

    // Restore Subcategory
    builder
      .addCase(restoreSubcategory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(restoreSubcategory.fulfilled, (state, action: PayloadAction<ISubcategory>) => {
        state.isLoading = false;
        // Actualizar en la lista si existe
        if (state.subcategoriesData) {
          const index = state.subcategoriesData.subcategories.findIndex(
            subcategory => subcategory._id === action.payload._id
          );
          if (index !== -1) {
            state.subcategoriesData.subcategories[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(restoreSubcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al restaurar subcategoría';
      });

    // Get Subcategory By Id
    builder
      .addCase(getSubcategoryById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSubcategoryById.fulfilled, (state, action: PayloadAction<ISubcategory>) => {
        state.isLoading = false;
        state.selectedSubcategory = action.payload;
        state.error = null;
      })
      .addCase(getSubcategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar subcategoría';
      });
  },
});

export const { clearError, clearSubcategoriesList, clearSelectedSubcategory } =
  subcategorySlice.actions;

export const selectorSubcategory = (state: RootState) => state.subcategory;

export const reducer = subcategorySlice.reducer;

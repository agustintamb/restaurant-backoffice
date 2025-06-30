import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, PaginatedCategoriesResult } from '@/interfaces/category';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  restoreCategory,
} from './asyncActions';

interface CategoryState {
  categoriesData: PaginatedCategoriesResult | null;
  selectedCategory: ICategory | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categoriesData: null,
  selectedCategory: null,
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearCategoriesList: state => {
      state.categoriesData = null;
    },
    clearSelectedCategory: state => {
      state.selectedCategory = null;
    },
  },
  extraReducers: builder => {
    // Get Categories
    builder
      .addCase(getCategories.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<PaginatedCategoriesResult>) => {
          state.isLoading = false;
          state.categoriesData = action.payload;
          state.error = null;
        }
      )
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar categorías';
      });

    // Create Category
    builder
      .addCase(createCategory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al crear categoría';
      });

    // Update Category
    builder
      .addCase(updateCategory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<ICategory>) => {
        state.isLoading = false;
        // Actualizar en la lista si existe
        if (state.categoriesData) {
          const index = state.categoriesData.categories.findIndex(
            category => category._id === action.payload._id
          );
          if (index !== -1) {
            state.categoriesData.categories[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al actualizar categoría';
      });

    // Delete Category
    builder
      .addCase(deleteCategory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        // Marcar como eliminado en la lista si existe
        if (state.categoriesData) {
          const index = state.categoriesData.categories.findIndex(
            category => category._id === action.payload
          );
          if (index !== -1) {
            state.categoriesData.categories[index].isDeleted = true;
            state.categoriesData.categories[index].deletedAt = new Date();
          }
        }
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al eliminar categoría';
      });

    // Restore Category
    builder
      .addCase(restoreCategory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(restoreCategory.fulfilled, (state, action: PayloadAction<ICategory>) => {
        state.isLoading = false;
        // Actualizar en la lista si existe
        if (state.categoriesData) {
          const index = state.categoriesData.categories.findIndex(
            category => category._id === action.payload._id
          );
          if (index !== -1) {
            state.categoriesData.categories[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(restoreCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al restaurar categoría';
      });

    // Get Category By Id
    builder
      .addCase(getCategoryById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action: PayloadAction<ICategory>) => {
        state.isLoading = false;
        state.selectedCategory = action.payload;
        state.error = null;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar categoría';
      });
  },
});

export const { clearError, clearCategoriesList, clearSelectedCategory } = categorySlice.actions;

export const selectorCategory = (state: RootState) => state.category;

export const reducer = categorySlice.reducer;

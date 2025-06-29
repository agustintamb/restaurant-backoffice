import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IUser,
  PaginatedResult,
  IGetCurrentUserResponse,
  IUpdateUserProfileResponse,
} from '@/interfaces/user';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser,
  updateUserProfile,
} from './asyncActions';

interface UserState {
  currentUser: IUser | null;
  usersData: PaginatedResult | null;
  isLoading: boolean;
  error: string | null;
  isUpdatingProfile: boolean;
  profileError: string | null;
}

const initialState: UserState = {
  currentUser: null,
  usersData: null,
  isLoading: false,
  error: null,
  isUpdatingProfile: false,
  profileError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
      state.profileError = null;
    },
    clearUsersList: state => {
      state.usersData = null;
    },
  },
  extraReducers: builder => {
    // Get Users
    builder
      .addCase(getUsers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<PaginatedResult>) => {
        state.isLoading = false;
        state.usersData = action.payload;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar usuarios';
      });

    // Create User
    builder
      .addCase(createUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al crear usuario';
      });

    // Update User
    builder
      .addCase(updateUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        // Actualizar en la lista si existe
        if (state.usersData) {
          const index = state.usersData.users.findIndex(user => user._id === action.payload._id);
          if (index !== -1) {
            state.usersData.users[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al actualizar usuario';
      });

    // Delete User
    builder
      .addCase(deleteUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        // Marcar como eliminado en la lista si existe
        if (state.usersData) {
          const index = state.usersData.users.findIndex(user => user._id === action.payload);
          if (index !== -1) {
            state.usersData.users[index].isDeleted = true;
            state.usersData.users[index].deletedAt = new Date();
          }
        }
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al eliminar usuario';
      });

    // Get Current User
    builder
      .addCase(getCurrentUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getCurrentUser.fulfilled,
        (state, action: PayloadAction<IGetCurrentUserResponse>) => {
          state.isLoading = false;
          state.currentUser = action.payload.result;
          state.error = null;
        }
      )
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.currentUser = null;
        state.error = (action.payload as string) || 'Error al cargar usuario actual';
      });

    // Update User Profile
    builder
      .addCase(updateUserProfile.pending, state => {
        state.isUpdatingProfile = true;
        state.profileError = null;
      })
      .addCase(
        updateUserProfile.fulfilled,
        (state, action: PayloadAction<IUpdateUserProfileResponse>) => {
          state.isUpdatingProfile = false;
          state.currentUser = action.payload.result;
          state.profileError = null;
        }
      )
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isUpdatingProfile = false;
        state.profileError = (action.payload as string) || 'Error al actualizar perfil';
      });
  },
});

export const { clearError, clearUsersList } = userSlice.actions;

export const selectorUser = (state: RootState) => state.user;

export const reducer = userSlice.reducer;

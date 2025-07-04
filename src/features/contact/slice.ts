import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContact, PaginatedContactsResult } from '@/interfaces/contact';
import {
  getContacts,
  getContactById,
  markAsReadContact,
  deleteContact,
  restoreContact,
} from './asyncActions';

interface ContactState {
  contactsData: PaginatedContactsResult | null;
  selectedContact: IContact | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  contactsData: null,
  selectedContact: null,
  isLoading: false,
  error: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearContactsList: state => {
      state.contactsData = null;
    },
    clearSelectedContact: state => {
      state.selectedContact = null;
    },
  },
  extraReducers: builder => {
    // Get Contacts
    builder
      .addCase(getContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getContacts.fulfilled, (state, action: PayloadAction<PaginatedContactsResult>) => {
        state.isLoading = false;
        state.contactsData = action.payload;
        state.error = null;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar mensajes';
      });

    // Get Contact By Id
    builder
      .addCase(getContactById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getContactById.fulfilled, (state, action: PayloadAction<IContact>) => {
        state.isLoading = false;
        state.selectedContact = action.payload;
        state.error = null;
      })
      .addCase(getContactById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al cargar mensaje';
      });

    // Mark As Read Contact
    builder
      .addCase(markAsReadContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(markAsReadContact.fulfilled, state => {
        state.isLoading = false;
        //// Actualizar en la lista si existe
        //if (state.contactsData) {
        //  const index = state.contactsData.contacts.findIndex(
        //    contact => contact._id === action.payload._id
        //  );
        //  if (index !== -1) {
        //    state.contactsData.contacts[index] = action.payload;
        //  }
        //}
        //// Actualizar el contacto seleccionado si coincide
        //if (state.selectedContact && state.selectedContact._id === action.payload._id) {
        //  state.selectedContact = action.payload;
        //}
        state.error = null;
      })
      .addCase(markAsReadContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al marcar como leído';
      });

    // Delete Contact
    builder
      .addCase(deleteContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        // Marcar como eliminado en la lista si existe
        if (state.contactsData) {
          const index = state.contactsData.contacts.findIndex(
            contact => contact._id === action.payload
          );
          if (index !== -1) {
            state.contactsData.contacts[index].isDeleted = true;
            state.contactsData.contacts[index].deletedAt = new Date();
          }
        }
        state.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al eliminar mensaje';
      });

    // Restore Contact
    builder
      .addCase(restoreContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(restoreContact.fulfilled, (state, action: PayloadAction<IContact>) => {
        state.isLoading = false;
        // Actualizar en la lista si existe
        if (state.contactsData) {
          const index = state.contactsData.contacts.findIndex(
            contact => contact._id === action.payload._id
          );
          if (index !== -1) {
            state.contactsData.contacts[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(restoreContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Error al restaurar mensaje';
      });
  },
});

export const { clearError, clearContactsList, clearSelectedContact } = contactSlice.actions;

export const selectorContact = (state: RootState) => state.contact;

export const reducer = contactSlice.reducer;

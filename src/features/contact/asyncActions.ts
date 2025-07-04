import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from '@/utils/isAxiosError';
import { errorMessage } from '@/utils/errorMessage';
import { GetContactsQuery } from '@/interfaces/contact';
import ContactService from '@/service/contact';

export const getContacts = createAsyncThunk(
  'contact/getContacts',
  async (params: GetContactsQuery, { rejectWithValue }) => {
    try {
      const { data } = await ContactService.getContacts(params);
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getContactById = createAsyncThunk(
  'contact/getContactById',
  async (contactId: string, { rejectWithValue }) => {
    try {
      const { data } = await ContactService.getContactById(contactId);
      return data.result;
    } catch (error) {
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const markAsReadContact = createAsyncThunk(
  'contact/markAsReadContact',
  async (contactId: string, { rejectWithValue }) => {
    try {
      const { data } = await ContactService.markAsReadContact(contactId);
      return data.result;
    } catch (error) {
      toast.error(errorMessage(error));
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (contactId: string, { rejectWithValue }) => {
    try {
      const { data } = await ContactService.deleteContact(contactId);
      if (data) toast.success('Mensaje eliminado');
      return contactId;
    } catch (error) {
      toast.error(errorMessage(error));
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const restoreContact = createAsyncThunk(
  'contact/restoreContact',
  async (contactId: string, { rejectWithValue }) => {
    try {
      const { data } = await ContactService.restoreContact(contactId);
      toast.success('Mensaje restaurado exitosamente');
      return data.result;
    } catch (error) {
      toast.error(errorMessage(error));
      if (isAxiosError(error)) return rejectWithValue(error.response?.data);
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

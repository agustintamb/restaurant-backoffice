import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from '@/features/auth';
import user from '@/features/user';
import allergen from '@/features/allergen';
import ingredient from '@/features/ingredient';
import category from '@/features/category';
import subcategory from '@/features/subcategory';
import dish from '@/features/dish';
import dashboard from '@/features/dashboard';

export const reducer = combineReducers({
  auth,
  user,
  allergen,
  ingredient,
  category,
  subcategory,
  dish,
  dashboard,
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

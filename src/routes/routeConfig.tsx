import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import PrivateRoute from '@/components/guards/PrivateRoute';
import MainLayout from '@/layouts/MainLayout';

import Login from '@/pages/auth/Login';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Users from '@/pages/Users';
import Ingredients from '@/pages/Ingredients';
import Allergens from '@/pages/Allergens';
import Categories from '@/pages/Categories';
import Subcategories from '@/pages/Subcategories';
//import Dishes from '@/pages/Dishes';

import LoadingSpinner from '@/components/ui/LoadingSpinner';

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

export const routeConfig: RouteObject[] = [
  // Public routes
  {
    path: '/iniciar-sesion',
    element: <Login />,
  },

  // Private routes
  {
    path: '/',
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: withSuspense(Dashboard) },
      { path: 'mi-perfil', element: withSuspense(Profile) },
      { path: 'usuarios', element: withSuspense(Users) },
      { path: 'ingredientes', element: withSuspense(Ingredients) },
      { path: 'alergenos', element: withSuspense(Allergens) },
      { path: 'categorias', element: withSuspense(Categories) },
      { path: 'subcategorias', element: withSuspense(Subcategories) },
      //{ path: 'platos', element: withSuspense(Dishes) },
    ],
  },

  // Catch all
  { path: '*', element: <NotFound /> },
];

import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import PrivateRoute from '@/components/guards/PrivateRoute';
import MainLayout from '@/layouts/MainLayout';

import Login from '@/pages/auth/Login';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';

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
      { index: true, path: 'dashboard', element: withSuspense(Dashboard) },
      { path: 'mi-perfil', element: withSuspense(Profile) },
    ],
  },

  // Catch all
  { path: '*', element: <NotFound /> },
];

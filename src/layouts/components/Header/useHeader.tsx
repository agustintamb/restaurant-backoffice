import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Home, Users, Settings, Utensils } from 'lucide-react';
import { ROUTES } from '@/utils/constants';
import { MenuItem } from './header.interface';

export const useHeader = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home size={20} />,
      path: ROUTES.DASHBOARD || '/dashboard',
    },
    {
      id: 'account',
      label: 'Mi Perfil',
      icon: <Settings size={20} />,
      path: ROUTES.PROFILE || '/mi-perfil',
    },
    {
      id: 'users',
      label: 'Usuarios',
      icon: <Users size={20} />,
      path: '/usuarios',
    },
    {
      id: 'categories',
      label: 'Categorías',
      icon: <Utensils size={20} />,
      path: '/categorias',
    },
    {
      id: 'categories',
      label: 'Categorías',
      icon: <Utensils size={20} />,
      path: '/categorias',
    },
  ];

  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleMobileMenuClose = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return {
    menuItems,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    handleMobileMenuToggle,
    handleMobileMenuClose,
  };
};

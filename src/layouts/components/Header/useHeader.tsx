import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { MenuItem } from './header.interface';
import {
  Home,
  Users,
  Settings,
  Utensils,
  UtensilsCrossed,
  WheatOff,
  Salad,
  Pizza,
} from 'lucide-react';

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
      id: 'ingredients',
      label: 'Ingredientes',
      icon: <Salad size={20} />,
      path: '/ingredientes',
    },
    {
      id: 'alergens',
      label: 'Alérgenos',
      icon: <WheatOff size={20} />,
      path: '/alergenos',
    },
    {
      id: 'categories',
      label: 'Categorías',
      icon: <Utensils size={20} />,
      path: '/categorias',
    },
    {
      id: 'subcategories',
      label: 'Subcategorías',
      icon: <UtensilsCrossed size={20} />,
      path: '/subcategorias',
    },
    {
      id: 'dishes',
      label: 'Platos',
      icon: <Pizza size={20} />,
      path: '/platos',
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

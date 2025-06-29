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
      path: ROUTES.DASHBOARD || '/',
    },
    {
      id: 'account',
      label: 'Mi Perfil',
      icon: <Settings size={20} />,
      path: ROUTES.PROFILE,
    },
    {
      id: 'users',
      label: 'Usuarios',
      icon: <Users size={20} />,
      path: ROUTES.USERS,
    },
    {
      id: 'ingredients',
      label: 'Ingredientes',
      icon: <Salad size={20} />,
      path: ROUTES.INGREDIENTS,
    },
    {
      id: 'alergens',
      label: 'Alérgenos',
      icon: <WheatOff size={20} />,
      path: ROUTES.ALLERGENS,
    },
    {
      id: 'categories',
      label: 'Categorías',
      icon: <Utensils size={20} />,
      path: ROUTES.CATEGORIES,
    },
    {
      id: 'subcategories',
      label: 'Subcategorías',
      icon: <UtensilsCrossed size={20} />,
      path: ROUTES.SUBCATEGORIES,
    },
    {
      id: 'dishes',
      label: 'Platos',
      icon: <Pizza size={20} />,
      path: ROUTES.DISHES,
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

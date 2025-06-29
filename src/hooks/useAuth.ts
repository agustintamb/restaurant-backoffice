import { useSelector } from 'react-redux';
import { selectorAuth } from '@/features/auth/slice';
import { selectorUser } from '@/features/user/slice';
import { getToken, removeToken } from '@/utils/storage';

export const useAuth = () => {
  const { isSessionExpired } = useSelector(selectorAuth);
  const { currentUser, isLoading, error } = useSelector(selectorUser);

  const isAuthenticated = getToken();

  const handleLogout = () => {
    removeToken();
    window.location.href = '/iniciar-sesion';
  };

  return {
    currentUser,
    error,
    isLoading,
    isSessionExpired,
    isAuthenticated,
    handleLogout,
  };
};

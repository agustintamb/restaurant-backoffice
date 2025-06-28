import { Link } from 'react-router-dom';
import { Menu, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';
import { useHeader } from './useHeader';
import MobileMenu from './MobileMenu';

const Header = () => {
  const { currentUser, handleLogout } = useAuth();
  const { isMobileMenuOpen, handleMobileMenuToggle, handleMobileMenuClose } = useHeader();

  return (
    <>
      <header className="bg-gray-50 fixed top-0 left-0 w-full z-50 border-b border-gray-200">
        <nav className="px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* Botón hamburguesa */}
              <button
                onClick={handleMobileMenuToggle}
                className="p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors mr-3"
                aria-label="Abrir menú"
              >
                <Menu size={24} />
              </button>

              {/* Logo */}
              <Link
                to={ROUTES.DASHBOARD || '/dashboard'}
                className="flex items-center text-primary-600 font-semibold gap-2"
              >
                <ChefHat size={24} />
                <span className="text-xl">Bodegón Argentino</span>
              </Link>
            </div>

            {/* Desktop - Solo saludo */}
            <div className="flex items-center">
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                Bienvenido, {currentUser?.firstName || 'Usuario'}
              </span>
            </div>
          </div>
        </nav>
      </header>

      {/* Overlay del menú móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleMobileMenuClose}
          />
        )}
      </AnimatePresence>

      {/* Menú hamburguesa deslizable */}
      <AnimatePresence>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          currentUser={currentUser}
          onClose={handleMobileMenuClose}
          onLogout={handleLogout}
        />
      </AnimatePresence>
    </>
  );
};

export default Header;

import { Link } from 'react-router-dom';
import { Menu, ChefHat } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '@/utils/constants';
import { useAuth } from '@/hooks/useAuth';
import { useHeader } from './useHeader';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  hasNewMessages?: boolean;
}

const Header = ({ hasNewMessages = false }: HeaderProps) => {
  const { currentUser, handleLogout } = useAuth();
  const { isMobileMenuOpen, handleMobileMenuToggle, handleMobileMenuClose } = useHeader();
  return (
    <>
      <header className="bg-gray-50 fixed top-0 left-0 w-full z-50 border-b border-gray-200">
        <nav className="px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Botón hamburguesa con notificación */}
            <div className="relative">
              <button
                onClick={handleMobileMenuToggle}
                className="p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors mr-3"
                aria-label="Abrir menú"
              >
                <Menu size={24} />
              </button>

              {/* Indicador de notificación */}
              {hasNewMessages && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 15,
                  }}
                  className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="h-2 w-2 bg-white rounded-full"
                  />
                </motion.div>
              )}
            </div>

            {/* Logo */}
            <Link
              to={ROUTES.DASHBOARD}
              className="flex items-center text-primary-600 font-semibold gap-2"
            >
              <span className="text-xl">Bodegón Argentino</span>
              <ChefHat size={24} />
            </Link>
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

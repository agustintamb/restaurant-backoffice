import { useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { IUser } from '@/interfaces/user';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import MobileMenuHeader from './MobileMenuHeader';
import MobileMenuItem from './MobileMenuItem';
import { useHeader } from '../useHeader';

interface MobileMenuProps {
  isOpen: boolean;
  currentUser: IUser | null;
  onClose: () => void;
  onLogout: () => void;
}

const MobileMenu = ({ isOpen, currentUser, onClose, onLogout }: MobileMenuProps) => {
  const location = useLocation();
  const mobileMenuRef = useOutsideClick<HTMLDivElement>(() => onClose());
  const { menuItems } = useHeader();

  const handleMenuItemClick = () => onClose();
  const handleLogout = () => onLogout();

  if (!isOpen) return null;

  return (
    <motion.div
      ref={mobileMenuRef}
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col"
    >
      {/* Header del menú */}
      <MobileMenuHeader currentUser={currentUser} onClose={onClose} />

      {/* Items del menú */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {menuItems.map(item => (
            <MobileMenuItem
              key={item.id}
              item={item}
              isActive={location.pathname === item.path}
              onClick={handleMenuItemClick}
            />
          ))}
        </ul>
      </nav>

      {/* Footer del menú */}
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </motion.div>
  );
};

export default MobileMenu;

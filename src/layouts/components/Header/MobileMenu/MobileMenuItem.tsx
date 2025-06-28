import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { MenuItem } from '../header.interface';

interface MobileMenuItemProps {
  item: MenuItem;
  isActive: boolean;
  onClick: () => void;
}

const MobileMenuItem = ({ item, isActive, onClick }: MobileMenuItemProps) => {
  return (
    <li>
      <Link
        to={item.path}
        onClick={onClick}
        className={`flex items-center justify-between px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors ${
          isActive ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          {item.icon}
          <span className="font-medium">{item.label}</span>
        </div>
        <div className="flex items-center gap-2">
          {item.badge && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
              {item.badge}
            </span>
          )}
          <ChevronRight size={16} className="text-gray-400" />
        </div>
      </Link>
    </li>
  );
};

export default MobileMenuItem;

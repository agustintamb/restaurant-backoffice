import { User, X } from 'lucide-react';
import { IUser } from '@/interfaces/user';

interface MobileMenuHeaderProps {
  currentUser: IUser | null;
  onClose: () => void;
}

const MobileMenuHeader = ({ currentUser, onClose }: MobileMenuHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-primary-100 text-primary-700 rounded-full">
          <User size={20} />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{currentUser?.firstName}</p>
          <p className="text-sm text-gray-500">{currentUser?.username}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default MobileMenuHeader;

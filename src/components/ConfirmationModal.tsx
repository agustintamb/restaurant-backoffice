import React from 'react';
import { AlertTriangle, Trash2, RotateCcw, Info } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = '¿Estás seguro?',
  message = 'Esta acción no se puede deshacer.',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger',
  isLoading = false,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <Trash2 className="h-6 w-6 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case 'info':
        return <RotateCcw className="h-6 w-6 text-primary-600" />;
      default:
        return <Info className="h-6 w-6 text-primary-600" />;
    }
  };

  const getButtonVariant = () => {
    switch (type) {
      case 'danger':
        return 'danger' as const;
      case 'warning':
        return 'primary' as const;
      case 'info':
        return 'primary' as const;
      default:
        return 'primary' as const;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-100';
      case 'warning':
        return 'bg-yellow-100';
      case 'info':
        return 'bg-primary-100';
      default:
        return 'bg-primary-100';
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="sm" showHeader={false}>
      <div className="text-center">
        <div
          className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${getBackgroundColor()} mb-4`}
        >
          {getIcon()}
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>

        <p className="text-sm text-gray-500 mb-6">{message}</p>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button variant={getButtonVariant()} onClick={onConfirm} isLoading={isLoading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;

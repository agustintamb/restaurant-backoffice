import React from 'react';
import Modal from '@/components/ui/Modal';

// Interface genérica para cualquier entidad con campos de auditoría
interface AuditableEntity {
  _id: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
  restoredAt?: Date | string;
  createdBy?: UserReference | string;
  updatedBy?: UserReference | string;
  deletedBy?: UserReference | string;
  restoredBy?: UserReference | string;
  isDeleted?: boolean;
}

// Interface para referencia de usuario (cuando viene populado)
interface UserReference {
  _id: string;
  firstName: string;
  lastName: string;
  username?: string;
}

interface ActivityModalProps {
  open: boolean;
  onClose: () => void;
  entity: AuditableEntity | null;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ open, onClose, entity }) => {
  if (!entity) return null;

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '-';
    return new Date(date).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getUserName = (userRef: UserReference | string | undefined) => {
    if (!userRef) return '-';
    if (typeof userRef === 'string') return userRef;
    return `por ${userRef.firstName} ${userRef.lastName}`;
  };

  const hasBeenModified =
    entity.updatedAt &&
    new Date(entity.updatedAt).getTime() !== new Date(entity.createdAt).getTime();

  return (
    <Modal open={open} onClose={onClose} title={`Registro de Actividad`} size="lg">
      <div className="space-y-6">
        <div className="space-y-4">
          {/* Creado */}
          <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-900">Creado:</div>
            <div className="text-sm text-gray-700">{formatDate(entity.createdAt)}</div>
            <div className="text-sm text-gray-500">{getUserName(entity.createdBy)}</div>
          </div>

          {/* Modificado */}
          <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-900">Actualizado:</div>
            <div className="text-sm text-gray-700">
              {hasBeenModified ? formatDate(entity.updatedAt) : '-'}
            </div>
            <div className="text-sm text-gray-500">
              {hasBeenModified ? getUserName(entity.updatedBy) : '-'}
            </div>
          </div>

          {/* Eliminado */}
          <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
            <div className="text-sm font-medium text-gray-900">Eliminado:</div>
            <div className="text-sm text-gray-700">{formatDate(entity.deletedAt)}</div>
            <div className="text-sm text-gray-500">
              {entity.deletedAt ? getUserName(entity.deletedBy) : '-'}
            </div>
          </div>

          {/* Restaurado */}
          <div className="grid grid-cols-3 gap-4 py-3">
            <div className="text-sm font-medium text-gray-900">Restaurado:</div>
            <div className="text-sm text-gray-700">{formatDate(entity.restoredAt)}</div>
            <div className="text-sm text-gray-500">
              {entity.restoredAt ? getUserName(entity.restoredBy) : '-'}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ActivityModal;

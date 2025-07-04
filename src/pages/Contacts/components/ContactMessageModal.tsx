import { Mail, Phone } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { IContact } from '@/interfaces/contact';
import { formatDate } from '@/utils/date';

interface ContactMessageModalProps {
  open: boolean;
  onClose: () => void;
  contact: IContact | null;
}

const ContactMessageModal = ({ open, onClose, contact }: ContactMessageModalProps) => {
  if (!contact) return null;
  return (
    <Modal open={open} onClose={onClose} title="Mensaje de Contacto" size="lg">
      <div className="space-y-6">
        {/* Header del remitente */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-start space-x-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
              <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail size={14} className="mr-1.5" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={14} className="mr-1.5" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            </div>
            {contact.isRead && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Leído
              </span>
            )}
          </div>
        </div>

        {/* Contenido del mensaje */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-6 border-l-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide">
              Mensaje
            </h4>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed break-words text-base">
                {contact.message}
              </p>
            </div>
          </div>
        </div>

        {/* Footer con información de fechas */}
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <span>Recibido el {formatDate(contact.createdAt)}</span>
          </div>

          {contact.isRead && contact.readAt && (
            <div className="text-sm text-gray-500">
              Leído el {formatDate(contact.readAt)}
              {typeof contact.readBy === 'object' &&
                contact.readBy &&
                ` por ${contact.readBy.firstName} ${contact.readBy.lastName}`}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ContactMessageModal;

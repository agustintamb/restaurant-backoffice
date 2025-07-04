import { Trash2, Search, Eye, RotateCcw, Mail, MailOpen, Filter } from 'lucide-react';
import { IContact } from '@/interfaces/contact';
import { useAuth } from '@/hooks/useAuth';
import { useContacts } from './useContacts';
import Table, { TableColumn, TableAction } from '@/components/ui/Table';
import Input from '@/components/ui/Input';
import Switch from '@/components/ui/Switch';
import ConfirmationModal from '@/components/ConfirmationModal';
import ContactMessageModal from './components/ContactMessageModal';
import { Tooltip } from '@/components/ui/Tooltip';
import Select, { SelectOption } from '@/components/ui/Select';

const Contacts = () => {
  const { currentUser } = useAuth();
  const {
    contacts,
    isLoading,
    paginationProps,
    searchQuery,
    includeDeleted,
    readFilter,
    handleSearch,
    handleIncludeDeletedChange,
    handleReadFilterChange,
    handleViewMessage,
    handleDeleteContact,
    handleRestoreContact,
    confirmDeleteContact,
    confirmRestoreContact,
    isMessageModalOpen,
    isDeleteModalOpen,
    isRestoreModalOpen,
    selectedContact,
    closeMessageModal,
    closeDeleteModal,
    closeRestoreModal,
  } = useContacts();

  if (!currentUser)
    return (
      <div className="text-center py-10">
        <p>Cargando perfil...</p>
      </div>
    );

  const unreadCount = contacts.filter(contact => !contact.isRead && !contact.isDeleted).length;

  const readFilterOptions: SelectOption[] = [
    { value: 'all', label: 'Todos los mensajes' },
    { value: 'unread', label: 'No leídos' },
    { value: 'read', label: 'Leídos' },
  ];

  // Define table columns
  const columns: TableColumn<IContact>[] = [
    {
      key: 'status',
      title: 'Estado',
      width: '80px',
      render: (_, record) => (
        <div className="flex justify-center">
          {record.isRead ? (
            <MailOpen size={16} className="text-green-600" />
          ) : (
            <Mail size={16} className="text-blue-600" />
          )}
        </div>
      ),
    },
    {
      key: 'name',
      title: 'Remitente',
      render: (value, record) => (
        <div className="flex flex-col">
          <span
            className={`text-sm font-medium ${!record.isRead ? 'text-gray-900' : 'text-gray-600'}`}
          >
            {value}
          </span>
          <span className="text-xs text-gray-500">{record.email}</span>
        </div>
      ),
    },
    {
      key: 'phone',
      title: 'Teléfono',
      render: value => <span className="text-sm text-gray-600">{value}</span>,
    },
    {
      key: 'message',
      title: 'Mensaje',
      render: value => (
        <div className="max-w-[100px]">
          <Tooltip text={value}>
            <span className="text-sm text-gray-600 line-clamp-2 truncate">{value}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      key: 'createdAt',
      title: 'Fecha',
      render: value => {
        if (!value) return '-';
        return new Date(value).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
    {
      key: 'isDeleted',
      title: 'Estado',
      render: value => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {value ? 'Eliminado' : 'Activo'}
        </span>
      ),
    },
  ];

  // Define table actions
  const actions: TableAction<IContact>[] = [
    {
      key: 'view',
      label: 'Ver mensaje',
      icon: <Eye size={16} />,
      onClick: handleViewMessage,
      variant: 'primary',
      show: record => !record.isDeleted,
    },
    {
      key: 'restore',
      label: 'Restaurar',
      icon: <RotateCcw size={16} />,
      onClick: handleRestoreContact,
      variant: 'success',
      show: record => record.isDeleted,
    },
    {
      key: 'delete',
      label: 'Eliminar',
      icon: <Trash2 size={16} />,
      onClick: handleDeleteContact,
      variant: 'danger',
      show: record => !record.isDeleted,
    },
  ];

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mensajes de Contacto</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-blue-600 mt-1">
                {unreadCount} mensaje{unreadCount !== 1 ? 's' : ''} sin leer
              </p>
            )}
          </div>
        </div>

        {/* Filters bar */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          {/* Search input */}
          <div className="lg:col-span-2">
            <Input
              type="text"
              placeholder="Buscar mensajes..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              icon={<Search size={18} />}
              fullWidth
            />
          </div>

          {/* Read filter */}
          <div>
            <Select
              options={readFilterOptions}
              value={readFilter}
              onChange={value => handleReadFilterChange(value as 'all' | 'read' | 'unread')}
              placeholder="Seleccionar filtro"
              icon={<Filter size={16} />}
            />
          </div>

          {/* Include deleted switch */}
          <div className="flex items-end">
            <Switch
              checked={includeDeleted}
              onChange={handleIncludeDeletedChange}
              label="Incluir eliminados"
              size="md"
            />
          </div>
        </div>

        {/* Contacts table */}
        <Table
          data={contacts}
          columns={columns}
          actions={actions}
          loading={isLoading}
          pagination={paginationProps}
          emptyMessage="No se encontraron mensajes"
          rowKey="_id"
        />
      </div>

      {/* Message Detail Modal */}
      <ContactMessageModal
        open={isMessageModalOpen}
        onClose={closeMessageModal}
        contact={selectedContact}
      />

      {/* Restore Confirmation Modal */}
      <ConfirmationModal
        open={isRestoreModalOpen}
        onClose={closeRestoreModal}
        onConfirm={confirmRestoreContact}
        title="¿Restaurar mensaje?"
        message={`¿Estás seguro de que querés restaurar este mensaje? El elemento volverá a estar disponible.`}
        confirmText="Restaurar"
        cancelText="Cancelar"
        type="info"
        isLoading={isLoading}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteContact}
        title="¿Eliminar mensaje?"
        message={`¿Estás seguro de que querés eliminar este mensaje? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Contacts;

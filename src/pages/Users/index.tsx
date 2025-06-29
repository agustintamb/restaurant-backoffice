import { Edit, Trash2, Plus, Search, Eye } from 'lucide-react';
import { IUser } from '@/interfaces/user';
import { useAuth } from '@/hooks/useAuth';
import { useUsers } from './useUsers';
import Table, { TableColumn, TableAction } from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Switch from '@/components/ui/Switch';
import UserCreateModal from './components/UserCreateModal';
import UserEditModal from './components/UserEditModal';
import ActivityModal from '@/components/ActivityModal';
import ConfirmationModal from '@/components/ConfirmationModal';

const Users = () => {
  const { currentUser } = useAuth();
  const {
    users,
    isLoading,
    paginationProps,
    searchQuery,
    includeDeleted,
    handleSearch,
    handleIncludeDeletedChange,
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    handleShowActivity,
    handleCreateUserSubmit,
    handleUpdateUser,
    confirmDeleteUser,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isActivityModalOpen,
    selectedUser,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    closeActivityModal,
  } = useUsers();

  if (!currentUser) {
    return (
      <div className="text-center py-10">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  // User table columns definition
  const columns: TableColumn<IUser>[] = [
    {
      key: 'firstName',
      title: 'Nombre',
      render: (_, record) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {record.firstName?.charAt(0)?.toUpperCase()}
                {record.lastName?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {record.firstName} {record.lastName}
            </div>
            <div className="text-sm text-gray-500">{record.username}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      title: 'Teléfono',
      render: value => value || '-',
    },
    {
      key: 'role',
      title: 'Rol',
      render: value => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value === 'admin' ? 'Administrador' : value}
        </span>
      ),
    },
    {
      key: 'lastActivity',
      title: 'Actividad',
      render: (_, record) => (
        <div className="flex justify-start">
          <button
            onClick={() => handleShowActivity(record)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="Ver detalles de actividad"
          >
            <Eye size={14} />
          </button>
        </div>
      ),
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

  // User table actions
  const actions: TableAction<IUser>[] = [
    {
      key: 'edit',
      label: 'Editar',
      icon: <Edit size={16} />,
      onClick: handleEditUser,
      variant: 'primary',
      show: record => !record.isDeleted,
    },
    {
      key: 'delete',
      label: 'Eliminar',
      icon: <Trash2 size={16} />,
      onClick: handleDeleteUser,
      variant: 'danger',
      show: record => !record.isDeleted,
    },
  ];

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Administración de usuarios</h1>
          <Button variant="primary" icon={<Plus size={20} />} onClick={handleCreateUser}>
            Nuevo Usuario
          </Button>
        </div>

        {/* Filters bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search input */}
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              icon={<Search size={18} />}
              fullWidth
            />
          </div>

          {/* Include deleted switch */}
          <div className="flex items-center">
            <Switch
              checked={includeDeleted}
              onChange={handleIncludeDeletedChange}
              label="Incluir eliminados"
              size="md"
            />
          </div>
        </div>

        {/* Users table */}
        <Table
          data={users}
          columns={columns}
          actions={actions}
          loading={isLoading}
          pagination={paginationProps}
          emptyMessage="No se encontraron usuarios"
          rowKey="_id"
        />
      </div>

      {/* Create User Modal */}
      <UserCreateModal
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreate={handleCreateUserSubmit}
        isLoading={isLoading}
      />

      {/* Edit User Modal */}
      <UserEditModal
        open={isEditModalOpen}
        onClose={closeEditModal}
        user={selectedUser}
        onUpdate={handleUpdateUser}
        isLoading={isLoading}
      />

      {/* User Activity Modal */}
      <ActivityModal
        open={isActivityModalOpen}
        onClose={closeActivityModal}
        entity={selectedUser}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteUser}
        title="¿Eliminar usuario?"
        message={`¿Estás seguro de que querés eliminar este usuario? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Users;

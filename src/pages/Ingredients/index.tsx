import { Edit, Trash2, Plus, Search, Eye, RotateCcw } from 'lucide-react';
import { IIngredient } from '@/interfaces/ingredient';
import { useAuth } from '@/hooks/useAuth';
import { useIngredients } from './useIngredients';
import Table, { TableColumn, TableAction } from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Switch from '@/components/ui/Switch';
import IngredientCreateModal from './components/IngredientCreateModal';
import IngredientEditModal from './components/IngredientEditModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import ActivityModal from '@/components/ActivityModal';

const Ingredients = () => {
  const { currentUser } = useAuth();
  const {
    ingredients,
    isLoading,
    paginationProps,
    searchQuery,
    includeDeleted,
    handleSearch,
    handleIncludeDeletedChange,
    handleCreateIngredient,
    handleEditIngredient,
    handleDeleteIngredient,
    handleRestoreIngredient,
    handleShowActivity,
    handleCreateIngredientSubmit,
    handleUpdateIngredient,
    confirmDeleteIngredient,
    confirmRestoreIngredient,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isRestoreModalOpen,
    isActivityModalOpen,
    selectedIngredient,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    closeRestoreModal,
    closeActivityModal,
  } = useIngredients();

  if (!currentUser) {
    return (
      <div className="text-center py-10">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  // Define table columns
  const columns: TableColumn<IIngredient>[] = [
    {
      key: 'name',
      title: 'Nombre',
      render: value => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-xs font-medium text-green-600">
              {value?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: 'createdAt',
      title: 'Fecha de Creación',
      render: value => {
        if (!value) return '-';
        return new Date(value).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      },
    },
    {
      key: 'lastActivity',
      title: 'Actividad',
      render: (_, record) => (
        <div className="flex justify-start">
          <button
            onClick={() => handleShowActivity(record)}
            className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
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

  // Define table actions
  const actions: TableAction<IIngredient>[] = [
    {
      key: 'edit',
      label: 'Editar',
      icon: <Edit size={16} />,
      onClick: handleEditIngredient,
      variant: 'primary',
      show: record => !record.isDeleted,
    },
    {
      key: 'restore',
      label: 'Restaurar',
      icon: <RotateCcw size={16} />,
      onClick: handleRestoreIngredient,
      variant: 'success',
      show: record => record.isDeleted,
    },
    {
      key: 'delete',
      label: 'Eliminar',
      icon: <Trash2 size={16} />,
      onClick: handleDeleteIngredient,
      variant: 'danger',
      show: record => !record.isDeleted,
    },
  ];

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Administración de ingredientes</h1>
          <Button variant="primary" icon={<Plus size={20} />} onClick={handleCreateIngredient}>
            Nuevo Ingrediente
          </Button>
        </div>

        {/* Filters bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search input */}
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Buscar ingredientes..."
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

        {/* Ingredients table */}
        <Table
          data={ingredients}
          columns={columns}
          actions={actions}
          loading={isLoading}
          pagination={paginationProps}
          emptyMessage="No se encontraron ingredientes"
          rowKey="_id"
        />
      </div>

      {/* Create Ingredient Modal */}
      <IngredientCreateModal
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreate={handleCreateIngredientSubmit}
        isLoading={isLoading}
      />

      {/* Edit Ingredient Modal */}
      <IngredientEditModal
        open={isEditModalOpen}
        onClose={closeEditModal}
        ingredient={selectedIngredient}
        onUpdate={handleUpdateIngredient}
        isLoading={isLoading}
      />

      {/* Ingredient Activity Modal */}
      <ActivityModal
        open={isActivityModalOpen}
        onClose={closeActivityModal}
        entity={selectedIngredient}
      />

      {/* Restore Confirmation Modal */}
      <ConfirmationModal
        open={isRestoreModalOpen}
        onClose={closeRestoreModal}
        onConfirm={confirmRestoreIngredient}
        title="¿Restaurar ingrediente?"
        message={`¿Estás seguro de que querés restaurar este ingrediente? El elemento volverá a estar disponible.`}
        confirmText="Restaurar"
        cancelText="Cancelar"
        type="info"
        isLoading={isLoading}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteIngredient}
        title="¿Eliminar ingrediente?"
        message={`¿Estás seguro de que querés eliminar este ingrediente? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Ingredients;

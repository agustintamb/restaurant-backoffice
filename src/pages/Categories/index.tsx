import { Edit, Trash2, Plus, Search, Eye, Grid, RotateCcw } from 'lucide-react';
import { ICategory } from '@/interfaces/category';
import { useAuth } from '@/hooks/useAuth';
import { useCategories } from './useCategories';
import Table, { TableColumn, TableAction } from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Switch from '@/components/ui/Switch';
import CategoryCreateModal from './components/CategoryCreateModal';
import CategoryEditModal from './components/CategoryEditModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import ActivityModal from '@/components/ActivityModal';

const Categories = () => {
  const { currentUser } = useAuth();
  const {
    categories,
    isLoading,
    paginationProps,
    searchQuery,
    includeDeleted,
    handleSearch,
    handleIncludeDeletedChange,
    handleCreateCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleRestoreCategory,
    handleShowActivity,
    handleCreateCategorySubmit,
    handleUpdateCategory,
    confirmDeleteCategory,
    confirmRestoreCategory,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isRestoreModalOpen,
    isActivityModalOpen,
    selectedCategory,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    closeRestoreModal,
    closeActivityModal,
  } = useCategories();

  if (!currentUser) {
    return (
      <div className="text-center py-10">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  // Define table columns
  const columns: TableColumn<ICategory>[] = [
    {
      key: 'name',
      title: 'Nombre',
      render: value => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
            <Grid size={16} className="text-purple-600" />
          </div>
          <span className="text-sm font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: 'subcategories',
      title: 'Subcategorías',
      render: value => {
        if (!value || !Array.isArray(value)) {
          return '-';
        }
        return (
          <span className="text-sm text-gray-600">
            {value.length > 0
              ? `${value.length} subcategoría${value.length > 1 ? 's' : ''}`
              : 'Sin subcategorías'}
          </span>
        );
      },
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

  // Define table actions
  const actions: TableAction<ICategory>[] = [
    {
      key: 'edit',
      label: 'Editar',
      icon: <Edit size={16} />,
      onClick: handleEditCategory,
      variant: 'primary',
      show: record => !record.isDeleted,
    },
    {
      key: 'restore',
      label: 'Restaurar',
      icon: <RotateCcw size={16} />,
      onClick: handleRestoreCategory,
      variant: 'success',
      show: record => record.isDeleted,
    },
    {
      key: 'delete',
      label: 'Eliminar',
      icon: <Trash2 size={16} />,
      onClick: handleDeleteCategory,
      variant: 'danger',
      show: record => !record.isDeleted,
    },
  ];

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Administración de categorías</h1>
          <Button variant="primary" icon={<Plus size={20} />} onClick={handleCreateCategory}>
            Nueva Categoría
          </Button>
        </div>

        {/* Filters bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search input */}
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Buscar categorías..."
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

        {/* Categories table */}
        <Table
          data={categories}
          columns={columns}
          actions={actions}
          loading={isLoading}
          pagination={paginationProps}
          emptyMessage="No se encontraron categorías"
          rowKey="_id"
        />
      </div>

      {/* Create Category Modal */}
      <CategoryCreateModal
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreate={handleCreateCategorySubmit}
        isLoading={isLoading}
      />

      {/* Edit Category Modal */}
      <CategoryEditModal
        open={isEditModalOpen}
        onClose={closeEditModal}
        category={selectedCategory}
        onUpdate={handleUpdateCategory}
        isLoading={isLoading}
      />

      {/* Category Activity Modal */}
      <ActivityModal
        open={isActivityModalOpen}
        onClose={closeActivityModal}
        entity={selectedCategory}
      />

      <ConfirmationModal
        open={isRestoreModalOpen}
        onClose={closeRestoreModal}
        onConfirm={confirmRestoreCategory}
        title="¿Restaurar categoría?"
        message={`¿Estás seguro de que querés restaurar esta categoría? El elemento volverá a estar disponible.`}
        confirmText="Restaurar"
        cancelText="Cancelar"
        type="info"
        isLoading={isLoading}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteCategory}
        title="¿Eliminar categoría?"
        message={`¿Estás seguro de que querés eliminar esta categoría? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Categories;

import { Edit, Trash2, Plus, Search, Eye, Grid3X3, Filter } from 'lucide-react';
import { ISubcategory } from '@/interfaces/subcategory';
import { useAuth } from '@/hooks/useAuth';
import { useSubcategories } from './useSubcategories';
import Table, { TableColumn, TableAction } from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Switch from '@/components/ui/Switch';
import Select from '@/components/ui/Select';
import SubcategoryCreateModal from './components/SubcategoryCreateModal';
import SubcategoryEditModal from './components/SubcategoryEditModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import ActivityModal from '@/components/ActivityModal';

const Subcategories = () => {
  const { currentUser } = useAuth();
  const {
    subcategories,
    categories,
    isLoading,
    paginationProps,
    searchQuery,
    categoryFilter,
    includeDeleted,
    handleSearch,
    handleCategoryFilter,
    handleIncludeDeletedChange,
    handleCreateSubcategory,
    handleEditSubcategory,
    handleDeleteSubcategory,
    handleShowActivity,
    handleCreateSubcategorySubmit,
    handleUpdateSubcategory,
    confirmDeleteSubcategory,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isActivityModalOpen,
    selectedSubcategory,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    closeActivityModal,
  } = useSubcategories();

  if (!currentUser) {
    return (
      <div className="text-center py-10">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  // Define table columns
  const columns: TableColumn<ISubcategory>[] = [
    {
      key: 'name',
      title: 'Nombre',
      render: value => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <Grid3X3 size={16} className="text-blue-600" />
          </div>
          <span className="text-sm font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: 'category',
      title: 'Categoría',
      render: value => {
        if (!value) return '-';
        const categoryName = typeof value === 'string' ? value : value.name;
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {categoryName}
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
  const actions: TableAction<ISubcategory>[] = [
    {
      key: 'edit',
      label: 'Editar',
      icon: <Edit size={16} />,
      onClick: handleEditSubcategory,
      variant: 'primary',
      show: record => !record.isDeleted,
    },
    {
      key: 'delete',
      label: 'Eliminar',
      icon: <Trash2 size={16} />,
      onClick: handleDeleteSubcategory,
      variant: 'danger',
      show: record => !record.isDeleted,
    },
  ];

  // Category options for filter
  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    ...categories.map(category => ({
      value: category._id,
      label: category.name,
    })),
  ];

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Administración de subcategorías</h1>
          <Button variant="primary" icon={<Plus size={20} />} onClick={handleCreateSubcategory}>
            Nueva Subcategoría
          </Button>
        </div>

        {/* Filters bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search input */}
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Buscar subcategorías..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              icon={<Search size={18} />}
              fullWidth
            />
          </div>

          {/* Category filter */}
          <div className="min-w-48">
            <Select
              options={categoryOptions}
              value={categoryFilter}
              onChange={handleCategoryFilter}
              placeholder="Filtrar por categoría"
              icon={<Filter size={18} />}
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

        {/* Subcategories table */}
        <Table
          data={subcategories}
          columns={columns}
          actions={actions}
          loading={isLoading}
          pagination={paginationProps}
          emptyMessage="No se encontraron subcategorías"
          rowKey="_id"
        />
      </div>

      {/* Create Subcategory Modal */}
      <SubcategoryCreateModal
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreate={handleCreateSubcategorySubmit}
        isLoading={isLoading}
      />

      {/* Edit Subcategory Modal */}
      <SubcategoryEditModal
        open={isEditModalOpen}
        onClose={closeEditModal}
        subcategory={selectedSubcategory}
        onUpdate={handleUpdateSubcategory}
        isLoading={isLoading}
      />

      {/* Subcategory Activity Modal */}
      <ActivityModal
        open={isActivityModalOpen}
        onClose={closeActivityModal}
        entity={selectedSubcategory}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteSubcategory}
        title="¿Eliminar subcategoría?"
        message={`¿Estás seguro de que querés eliminar esta subcategoría? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Subcategories;

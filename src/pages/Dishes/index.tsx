import {
  Edit,
  Trash2,
  Plus,
  Search,
  Eye,
  ChefHat,
  Filter,
  Tag,
  Utensils,
  RotateCcw,
} from 'lucide-react';
import { IDish } from '@/interfaces/dish';
import { useAuth } from '@/hooks/useAuth';
import { useDishes } from './useDishes';
import Table, { TableColumn, TableAction } from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Switch from '@/components/ui/Switch';
import Select from '@/components/ui/Select';
import { Tooltip } from '@/components/ui/Tooltip';
import DishCreateModal from './components/DishCreateModal';
import DishEditModal from './components/DishEditModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import ActivityModal from '@/components/ActivityModal';

const Dishes = () => {
  const { currentUser } = useAuth();
  const {
    dishes,
    categories,
    subcategories,
    isLoading,
    paginationProps,
    searchQuery,
    categoryFilter,
    subcategoryFilter,
    includeDeleted,
    handleSearch,
    handleCategoryFilter,
    handleSubcategoryFilter,
    handleIncludeDeletedChange,
    handleCreateDish,
    handleEditDish,
    handleDeleteDish,
    handleRestoreDish,
    handleShowActivity,
    handleCreateDishSubmit,
    handleUpdateDish,
    confirmDeleteDish,
    confirmRestoreDish,
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isRestoreModalOpen,
    isActivityModalOpen,
    selectedDish,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    closeRestoreModal,
    closeActivityModal,
  } = useDishes();

  if (!currentUser) {
    return (
      <div className="text-center py-10">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  // Helper function to truncate text with ellipsis
  const truncateText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Helper function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(price);
  };

  // Define table columns
  const columns: TableColumn<IDish>[] = [
    {
      key: 'name',
      title: 'Plato',
      render: (value, record) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 mr-3">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={record.image || 'https://placehold.co/40x40'}
              alt={value}
              onError={e => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/40x40';
              }}
            />
          </div>
          <div>
            <Tooltip text={value}>
              <div className="text-sm font-medium text-gray-900 cursor-help">
                {truncateText(value)}
              </div>
            </Tooltip>
            <Tooltip text={record.description}>
              <div className="text-xs text-gray-500 cursor-help">
                {truncateText(record.description, 15)}
              </div>
            </Tooltip>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      title: 'Precio',
      render: value => (
        <span className="text-xs font-semibold text-green-600">{formatPrice(value)}</span>
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
      key: 'ingredients',
      title: 'Ingredientes',
      render: value => {
        if (!value || value.length === 0) return '-';

        const ingredientNames = value.map((ingredient: { name: string }) =>
          typeof ingredient === 'string' ? ingredient : ingredient.name
        );

        const displayText = `${ingredientNames.length} ingrediente${
          ingredientNames.length !== 1 ? 's' : ''
        }`;
        const tooltipText = ingredientNames.join(', ');

        return (
          <Tooltip text={tooltipText}>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 cursor-help">
              <Utensils size={12} className="mr-1" />
              {displayText}
            </span>
          </Tooltip>
        );
      },
    },
    {
      key: 'allergens',
      title: 'Alérgenos',
      render: value => {
        if (!value || value.length === 0) return '-';

        const allergenNames = value.map((allergen: { name: string }) =>
          typeof allergen === 'string' ? allergen : allergen.name
        );

        const displayText = `${allergenNames.length} alérgeno${
          allergenNames.length !== 1 ? 's' : ''
        }`;
        const tooltipText = allergenNames.join(', ');

        return (
          <Tooltip text={tooltipText}>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 cursor-help">
              <Tag size={12} className="mr-1" />
              {displayText}
            </span>
          </Tooltip>
        );
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
  const actions: TableAction<IDish>[] = [
    {
      key: 'edit',
      label: 'Editar',
      icon: <Edit size={16} />,
      onClick: handleEditDish,
      variant: 'primary',
      show: record => !record.isDeleted,
    },
    {
      key: 'restore',
      label: 'Restaurar',
      icon: <RotateCcw size={16} />,
      onClick: handleRestoreDish,
      variant: 'success',
      show: record => record.isDeleted,
    },
    {
      key: 'delete',
      label: 'Eliminar',
      icon: <Trash2 size={16} />,
      onClick: handleDeleteDish,
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

  // Subcategory options for filter (filtered by selected category)
  const subcategoryOptions = [
    { value: '', label: 'Todas las subcategorías' },
    ...subcategories.map(subcategory => ({
      value: subcategory._id,
      label: subcategory.name,
    })),
  ];

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Administración de platos</h1>
          <Button variant="primary" icon={<Plus size={20} />} onClick={handleCreateDish}>
            Nuevo Plato
          </Button>
        </div>

        {/* Filters bar */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search input */}
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Buscar platos..."
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

          {/* Subcategory filter */}
          <div className="min-w-48">
            <Select
              options={subcategoryOptions}
              value={subcategoryFilter}
              onChange={handleSubcategoryFilter}
              placeholder="Filtrar por subcategoría"
              icon={<ChefHat size={18} />}
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

        {/* Dishes table */}
        <Table
          data={dishes}
          columns={columns}
          actions={actions}
          loading={isLoading}
          pagination={paginationProps}
          emptyMessage="No se encontraron platos"
          rowKey="_id"
        />
      </div>

      {/* Create Dish Modal */}
      <DishCreateModal
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        onCreate={handleCreateDishSubmit}
        isLoading={isLoading}
      />

      {/* Edit Dish Modal */}
      <DishEditModal
        open={isEditModalOpen}
        onClose={closeEditModal}
        dish={selectedDish}
        onUpdate={handleUpdateDish}
        isLoading={isLoading}
      />

      {/* Dish Activity Modal */}
      <ActivityModal
        open={isActivityModalOpen}
        onClose={closeActivityModal}
        entity={selectedDish}
      />

      {/* Restore Confirmation Modal */}
      <ConfirmationModal
        open={isRestoreModalOpen}
        onClose={closeRestoreModal}
        onConfirm={confirmRestoreDish}
        title="¿Restaurar plato?"
        message={`¿Estás seguro de que querés restaurar este plato? El elemento volverá a estar disponible.`}
        confirmText="Restaurar"
        cancelText="Cancelar"
        type="info"
        isLoading={isLoading}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteDish}
        title="¿Eliminar plato?"
        message={`¿Estás seguro de que querés eliminar este plato? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        type="danger"
        isLoading={isLoading}
      />
    </div>
  );
};

export default Dishes;

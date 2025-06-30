import { useState, useEffect } from 'react';
import { ChefHat, Grid, Utensils, Tag, DollarSign, ImageIcon, X, Search } from 'lucide-react';
import { Form, Formik, FormikProps } from 'formik';
import { validationSchema } from './validationSchema';
import { ICreateDish } from '@/interfaces/dish';
import { useSelector } from 'react-redux';
import { selectorCategory } from '@/features/category/slice';
import { selectorSubcategory } from '@/features/subcategory/slice';
import { useIngredientSearch } from '@/hooks/useIngredientSearch';
import { useAllergenSearch } from '@/hooks/useAllergenSearch';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

interface DishCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (dishData: ICreateDish) => void;
  isLoading?: boolean;
}

interface DishCreateFormValues {
  name: string;
  description: string;
  price: number;
  image: File | null;
  categoryId: string;
  subcategoryId: string;
}

const DishCreateModal = ({ open, onClose, onCreate, isLoading = false }: DishCreateModalProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { categoriesData } = useSelector(selectorCategory);
  const { subcategoriesData } = useSelector(selectorSubcategory);

  const categories = categoriesData?.categories || [];
  const subcategories = subcategoriesData?.subcategories || [];

  // Ingredient search hook
  const {
    searchTerm: ingredientSearchTerm,
    searchResults: ingredientResults,
    selectedIngredients,
    handleSearchChange: handleIngredientSearchChange,
    addIngredient,
    removeIngredient,
    clearSelection: clearIngredients,
    getSelectedIngredientIds,
  } = useIngredientSearch();

  // Allergen search hook
  const {
    searchTerm: allergenSearchTerm,
    searchResults: allergenResults,
    selectedAllergens,
    handleSearchChange: handleAllergenSearchChange,
    addAllergen,
    removeAllergen,
    clearSelection: clearAllergens,
    getSelectedAllergenIds,
  } = useAllergenSearch();

  const initialValues: DishCreateFormValues = {
    name: '',
    description: '',
    price: 0,
    image: null,
    categoryId: '',
    subcategoryId: '',
  };

  // Filter subcategories based on selected category
  const filteredSubcategories = selectedCategoryId
    ? subcategories.filter(sub => {
        const subCategory = typeof sub.category === 'string' ? sub.category : sub.category?._id;
        return subCategory === selectedCategoryId;
      })
    : [];

  const handleSubmit = async (
    values: DishCreateFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const createData: ICreateDish & { image?: File } = {
      name: values.name.trim(),
      description: values.description.trim(),
      price: values.price,
      categoryId: values.categoryId,
      subcategoryId: values.subcategoryId || undefined,
      ingredientIds: getSelectedIngredientIds(),
      allergenIds: getSelectedAllergenIds(),
    };

    // Add image if present
    if (values.image) createData.image = values.image;

    onCreate(createData);
    resetForm();
    clearIngredients();
    clearAllergens();
    setImagePreview(null);
    setSelectedCategoryId('');
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File | null) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue('image', file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (setFieldValue: (field: string, value: File | null) => void) => {
    setFieldValue('image', null);
    setImagePreview(null);
  };

  const handleCategoryChange = (
    categoryId: string,
    setFieldValue: (field: string, value: string) => void
  ) => {
    setSelectedCategoryId(categoryId);
    setFieldValue('categoryId', categoryId);
    setFieldValue('subcategoryId', ''); // Reset subcategory when category changes
  };

  // Clear selections when modal closes
  useEffect(() => {
    if (!open) {
      clearIngredients();
      clearAllergens();
      setImagePreview(null);
      setSelectedCategoryId('');
    }
  }, [open]); // Removed clearIngredients and clearAllergens from dependencies

  // Category options for select
  const categoryOptions = categories
    .filter(category => !category.isDeleted)
    .map(category => ({
      value: category._id,
      label: category.name,
    }));

  // Subcategory options for select
  const subcategoryOptions = [
    { value: '', label: 'Sin subcategoría' },
    ...filteredSubcategories
      .filter(subcategory => !subcategory.isDeleted)
      .map(subcategory => ({
        value: subcategory._id,
        label: subcategory.name,
      })),
  ];

  return (
    <Modal open={open} onClose={onClose} title="Crear Nuevo Plato" size="xl">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<DishCreateFormValues>) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                {/* Name */}
                <Input
                  type="text"
                  label="Nombre del Plato"
                  icon={<ChefHat size={18} />}
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                  placeholder="Ej: Empanadas de Carne"
                  required
                  fullWidth
                />

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={2}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                      formik.touched.description && formik.errors.description
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="Descripción detallada del plato..."
                  />
                  {formik.touched.description && formik.errors.description && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
                  )}
                </div>

                {/* Price */}
                <Input
                  type="number"
                  label="Precio"
                  icon={<DollarSign size={18} />}
                  id="price"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.price && formik.errors.price ? formik.errors.price : undefined
                  }
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                  fullWidth
                />

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={categoryOptions}
                    value={formik.values.categoryId}
                    onChange={value => handleCategoryChange(value, formik.setFieldValue)}
                    placeholder="Seleccionar categoría"
                    icon={<Grid size={18} />}
                    error={
                      formik.touched.categoryId && formik.errors.categoryId
                        ? formik.errors.categoryId
                        : undefined
                    }
                  />
                </div>

                {/* Subcategory */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategoría
                  </label>
                  <Select
                    options={subcategoryOptions}
                    value={formik.values.subcategoryId}
                    onChange={value => formik.setFieldValue('subcategoryId', value)}
                    placeholder="Seleccionar subcategoría (opcional)"
                    icon={<ChefHat size={18} />}
                    disabled={!selectedCategoryId}
                  />
                </div>
              </div>

              {/* Right Column - Image, Ingredients, Allergens */}
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagen del Plato
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(formik.setFieldValue)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block text-center">
                        <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">
                          Haz clic para seleccionar una imagen
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handleImageChange(e, formik.setFieldValue)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Ingredients Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ingredientes
                  </label>

                  {/* Ingredient Search */}
                  <div className="relative mb-3">
                    <Input
                      type="text"
                      placeholder="Buscar ingredientes..."
                      value={ingredientSearchTerm}
                      onChange={e => handleIngredientSearchChange(e.target.value)}
                      icon={<Search size={18} />}
                      fullWidth
                    />

                    {/* Search Results */}
                    {ingredientResults.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                        {ingredientResults.map(ingredient => (
                          <button
                            key={ingredient._id}
                            type="button"
                            onClick={() => addIngredient(ingredient)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          >
                            {ingredient.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selected Ingredients */}
                  <div className="flex flex-wrap gap-2">
                    {selectedIngredients.map(ingredient => (
                      <span
                        key={ingredient._id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                      >
                        <Utensils size={12} className="mr-1" />
                        {ingredient.name}
                        <button
                          type="button"
                          onClick={() => removeIngredient(ingredient._id)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Allergens Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alérgenos</label>

                  {/* Allergen Search */}
                  <div className="relative mb-3">
                    <Input
                      type="text"
                      placeholder="Buscar alérgenos..."
                      value={allergenSearchTerm}
                      onChange={e => handleAllergenSearchChange(e.target.value)}
                      icon={<Search size={18} />}
                      fullWidth
                    />

                    {/* Search Results */}
                    {allergenResults.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                        {allergenResults.map(allergen => (
                          <button
                            key={allergen._id}
                            type="button"
                            onClick={() => addAllergen(allergen)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                          >
                            {allergen.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selected Allergens */}
                  <div className="flex flex-wrap gap-2">
                    {selectedAllergens.map(allergen => (
                      <span
                        key={allergen._id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                      >
                        <Tag size={12} className="mr-1" />
                        {allergen.name}
                        <button
                          type="button"
                          onClick={() => removeAllergen(allergen._id)}
                          className="ml-2 text-orange-600 hover:text-orange-800"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Crear Plato
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default DishCreateModal;

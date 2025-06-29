import { Grid3X3, Grid } from 'lucide-react';
import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { ISubcategory, IUpdateSubcategory } from '@/interfaces/subcategory';
import { useCategories } from '@/pages/Categories/useCategories';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

interface SubcategoryEditModalProps {
  open: boolean;
  onClose: () => void;
  subcategory: ISubcategory | null;
  onUpdate: (subcategoryId: string, subcategoryData: IUpdateSubcategory) => void;
  isLoading?: boolean;
}

interface SubcategoryFormValues {
  name: string;
  categoryId: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'No puede exceder los 50 caracteres')
    .trim(),
  categoryId: Yup.string().required('Debe seleccionar una categoría'),
});

const SubcategoryEditModal = ({
  open,
  onClose,
  subcategory,
  onUpdate,
  isLoading = false,
}: SubcategoryEditModalProps) => {
  const { categories } = useCategories();

  const initialValues: SubcategoryFormValues = {
    name: subcategory?.name || '',
    categoryId:
      typeof subcategory?.category === 'string'
        ? subcategory.category
        : subcategory?.category?._id || '',
  };

  const handleSubmit = (values: SubcategoryFormValues) => {
    if (!subcategory) return;
    const updateData: IUpdateSubcategory = {
      name: values.name.trim(),
      categoryId: values.categoryId,
    };
    onUpdate(subcategory._id, updateData);
  };

  // Category options for select
  const categoryOptions = categories
    .filter(category => !category.isDeleted)
    .map(category => ({
      value: category._id,
      label: category.name,
    }));

  return (
    <Modal open={open} onClose={onClose} title="Editar Subcategoría" size="sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<SubcategoryFormValues>) => (
          <Form className="space-y-6">
            <div>
              <Input
                type="text"
                label="Nombre de la Subcategoría"
                icon={<Grid3X3 size={18} />}
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                placeholder="Ej: Carnes Rojas, Carnes Blancas, etc."
                required
                fullWidth
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría <span className="text-red-500">*</span>
              </label>
              <Select
                options={categoryOptions}
                value={formik.values.categoryId}
                onChange={value => formik.setFieldValue('categoryId', value)}
                placeholder="Seleccionar categoría"
                icon={<Grid size={18} />}
                error={
                  formik.touched.categoryId && formik.errors.categoryId
                    ? formik.errors.categoryId
                    : undefined
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={formik.isSubmitting || !formik.dirty}
              >
                Guardar Cambios
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SubcategoryEditModal;

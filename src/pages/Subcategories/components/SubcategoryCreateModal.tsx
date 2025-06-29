import { Grid3X3, Grid } from 'lucide-react';
import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { ICreateSubcategory } from '@/interfaces/subcategory';
import { useCategories } from '@/pages/Categories/useCategories';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

interface SubcategoryCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (subcategoryData: ICreateSubcategory) => void;
  isLoading?: boolean;
}

interface SubcategoryCreateFormValues {
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

const SubcategoryCreateModal = ({
  open,
  onClose,
  onCreate,
  isLoading = false,
}: SubcategoryCreateModalProps) => {
  const { categories } = useCategories();

  const initialValues: SubcategoryCreateFormValues = {
    name: '',
    categoryId: '',
  };

  const handleSubmit = (
    values: SubcategoryCreateFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const createData: ICreateSubcategory = {
      name: values.name.trim(),
      categoryId: values.categoryId,
    };
    onCreate(createData);
    resetForm();
  };

  // Category options for select
  const categoryOptions = categories
    .filter(category => !category.isDeleted)
    .map(category => ({
      value: category._id,
      label: category.name,
    }));

  return (
    <Modal open={open} onClose={onClose} title="Crear Nueva Subcategoría" size="sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<SubcategoryCreateFormValues>) => (
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
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Crear Subcategoría
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SubcategoryCreateModal;

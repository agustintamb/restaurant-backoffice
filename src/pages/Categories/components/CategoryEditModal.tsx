import { Grid } from 'lucide-react';
import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { ICategory, IUpdateCategory } from '@/interfaces/category';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface CategoryEditModalProps {
  open: boolean;
  onClose: () => void;
  category: ICategory | null;
  onUpdate: (categoryId: string, categoryData: IUpdateCategory) => void;
  isLoading?: boolean;
}

interface CategoryFormValues {
  name: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'No puede exceder los 50 caracteres')
    .trim(),
});

const CategoryEditModal = ({
  open,
  onClose,
  category,
  onUpdate,
  isLoading = false,
}: CategoryEditModalProps) => {
  const initialValues: CategoryFormValues = {
    name: category?.name || '',
  };

  const handleSubmit = (values: CategoryFormValues) => {
    if (!category) return;
    const updateData: IUpdateCategory = {
      name: values.name.trim(),
    };
    onUpdate(category._id, updateData);
  };

  return (
    <Modal open={open} onClose={onClose} title="Editar Categoría" size="sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<CategoryFormValues>) => (
          <Form className="space-y-6">
            <div>
              <Input
                type="text"
                label="Nombre de la Categoría"
                icon={<Grid size={18} />}
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                placeholder="Ej: Entrantes, Platos Principales, Postres..."
                required
                fullWidth
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

export default CategoryEditModal;

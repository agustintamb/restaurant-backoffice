import { Grid } from 'lucide-react';
import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { ICreateCategory } from '@/interfaces/category';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface CategoryCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (categoryData: ICreateCategory) => void;
  isLoading?: boolean;
}

interface CategoryCreateFormValues {
  name: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'No puede exceder los 50 caracteres')
    .trim(),
});

const CategoryCreateModal = ({
  open,
  onClose,
  onCreate,
  isLoading = false,
}: CategoryCreateModalProps) => {
  const initialValues: CategoryCreateFormValues = {
    name: '',
  };

  const handleSubmit = (
    values: CategoryCreateFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const createData: ICreateCategory = {
      name: values.name.trim(),
    };
    onCreate(createData);
    resetForm();
  };

  return (
    <Modal open={open} onClose={onClose} title="Crear Nueva Categoría" size="sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<CategoryCreateFormValues>) => (
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
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Crear Categoría
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CategoryCreateModal;

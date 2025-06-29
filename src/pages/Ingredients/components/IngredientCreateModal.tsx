import { Salad } from 'lucide-react';
import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { ICreateIngredient } from '@/interfaces/ingredient';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface IngredientCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (ingredientData: ICreateIngredient) => void;
  isLoading?: boolean;
}

interface IngredientCreateFormValues {
  name: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'No puede exceder los 50 caracteres')
    .trim(),
});

const IngredientCreateModal = ({
  open,
  onClose,
  onCreate,
  isLoading = false,
}: IngredientCreateModalProps) => {
  const initialValues: IngredientCreateFormValues = {
    name: '',
  };

  const handleSubmit = (
    values: IngredientCreateFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const createData: ICreateIngredient = {
      name: values.name.trim(),
    };
    onCreate(createData);
    resetForm();
  };

  return (
    <Modal open={open} onClose={onClose} title="Crear Nuevo Ingrediente" size="sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<IngredientCreateFormValues>) => (
          <Form className="space-y-6">
            <div>
              <Input
                type="text"
                label="Nombre del Ingrediente"
                icon={<Salad size={18} />}
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                placeholder="Ej: Tomate, Queso, Albahaca..."
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
                Crear Ingrediente
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default IngredientCreateModal;

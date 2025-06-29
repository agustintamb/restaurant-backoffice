import { Salad } from 'lucide-react';
import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { IIngredient, IUpdateIngredient } from '@/interfaces/ingredient';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface IngredientEditModalProps {
  open: boolean;
  onClose: () => void;
  ingredient: IIngredient | null;
  onUpdate: (ingredientId: string, ingredientData: IUpdateIngredient) => void;
  isLoading?: boolean;
}

interface IngredientFormValues {
  name: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'No puede exceder los 50 caracteres')
    .trim(),
});

const IngredientEditModal = ({
  open,
  onClose,
  ingredient,
  onUpdate,
  isLoading = false,
}: IngredientEditModalProps) => {
  const initialValues: IngredientFormValues = {
    name: ingredient?.name || '',
  };

  const handleSubmit = (values: IngredientFormValues) => {
    if (!ingredient) return;
    const updateData: IUpdateIngredient = {
      name: values.name.trim(),
    };
    onUpdate(ingredient._id, updateData);
  };

  return (
    <Modal open={open} onClose={onClose} title="Editar Ingrediente" size="sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<IngredientFormValues>) => (
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

export default IngredientEditModal;

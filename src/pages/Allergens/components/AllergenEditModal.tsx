import { WheatOff } from 'lucide-react';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { IAllergen, IUpdateAllergen } from '@/interfaces/allergen';

interface AllergenEditModalProps {
  open: boolean;
  onClose: () => void;
  allergen: IAllergen | null;
  onUpdate: (allergenId: string, allergenData: IUpdateAllergen) => void;
  isLoading?: boolean;
}

interface AllergenFormValues {
  name: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'No puede exceder los 50 caracteres')
    .trim(),
});

const AllergenEditModal = ({
  open,
  onClose,
  allergen,
  onUpdate,
  isLoading = false,
}: AllergenEditModalProps) => {
  const initialValues: AllergenFormValues = {
    name: allergen?.name || '',
  };

  const handleSubmit = (values: AllergenFormValues) => {
    if (!allergen) return;
    const updateData: IUpdateAllergen = {
      name: values.name.trim(),
    };
    onUpdate(allergen._id, updateData);
  };

  return (
    <Modal open={open} onClose={onClose} title="Editar Alérgeno" size="sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<AllergenFormValues>) => (
          <Form className="space-y-6">
            <div>
              <Input
                type="text"
                label="Nombre del Alérgeno"
                icon={<WheatOff size={18} />}
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                placeholder="Ej: Gluten, Lactosa, Frutos secos..."
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

export default AllergenEditModal;

import { WheatOff } from 'lucide-react';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ICreateAllergen } from '@/interfaces/allergen';

interface AllergenCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (allergenData: ICreateAllergen) => void;
  isLoading?: boolean;
}

interface AllergenCreateFormValues {
  name: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'No puede exceder los 50 caracteres')
    .trim(),
});

const AllergenCreateModal = ({
  open,
  onClose,
  onCreate,
  isLoading = false,
}: AllergenCreateModalProps) => {
  const initialValues: AllergenCreateFormValues = {
    name: '',
  };

  const handleSubmit = (
    values: AllergenCreateFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const createData: ICreateAllergen = {
      name: values.name.trim(),
    };
    onCreate(createData);
    resetForm();
  };

  return (
    <Modal open={open} onClose={onClose} title="Crear Nuevo Alérgeno" size="sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<AllergenCreateFormValues>) => (
          <Form className="space-y-6">
            <div>
              <Input
                icon={<WheatOff size={18} />}
                type="text"
                label="Nombre del Alérgeno"
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
                disabled={formik.isSubmitting || !formik.isValid}
              >
                Crear Alérgeno
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AllergenCreateModal;

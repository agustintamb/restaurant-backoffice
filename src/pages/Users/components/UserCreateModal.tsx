import { User, Mail, Phone, Lock } from 'lucide-react';
import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import { ICreateUser } from '@/interfaces/user';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface UserCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (userData: ICreateUser) => void;
  isLoading?: boolean;
}

interface UserCreateFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'No puede exceder los 50 caracteres'),

  lastName: Yup.string()
    .required('El apellido es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(50, 'No puede exceder los 50 caracteres'),

  phone: Yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^[+]?[\d\s\-()]+$/, 'Formato de teléfono inválido')
    .min(10, 'Debe tener al menos 10 dígitos'),

  username: Yup.string()
    .required('El correo electrónico es obligatorio')
    .email('Formato de correo electrónico inválido'),

  password: Yup.string()
    .required('La contraseña es obligatoria')
    .min(6, 'Debe tener al menos 6 caracteres')
    .max(50, 'No puede exceder los 50 caracteres'),

  confirmPassword: Yup.string()
    .required('Confirmar contraseña es obligatorio')
    .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
});

const UserCreateModal = ({ open, onClose, onCreate, isLoading = false }: UserCreateModalProps) => {
  const initialValues: UserCreateFormValues = {
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values: UserCreateFormValues, { resetForm }: { resetForm: () => void }) => {
    const createData: ICreateUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      username: values.username,
      password: values.password,
      role: 'admin', // Por defecto admin
    };
    onCreate(createData);
    resetForm();
  };

  return (
    <Modal open={open} onClose={onClose} title="Crear Nuevo Usuario" size="lg">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik: FormikProps<UserCreateFormValues>) => (
          <Form className="space-y-6">
            {/* Información Personal */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  label="Nombre"
                  id="firstName"
                  name="firstName"
                  icon={<User size={18} />}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && formik.errors.firstName
                      ? formik.errors.firstName
                      : undefined
                  }
                  placeholder="Juan"
                  required
                  fullWidth
                />

                <Input
                  type="text"
                  label="Apellido"
                  id="lastName"
                  name="lastName"
                  icon={<User size={18} />}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && formik.errors.lastName
                      ? formik.errors.lastName
                      : undefined
                  }
                  placeholder="Pérez"
                  required
                  fullWidth
                />
              </div>
            </div>

            {/* Información de Contacto */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="email"
                  label="Correo electrónico"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && formik.errors.username
                      ? formik.errors.username
                      : undefined
                  }
                  placeholder="usuario@ejemplo.com"
                  required
                  fullWidth
                  icon={<Mail size={18} />}
                />

                <Input
                  type="tel"
                  label="Teléfono"
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phone && formik.errors.phone ? formik.errors.phone : undefined
                  }
                  required
                  placeholder="1112345678"
                  fullWidth
                  icon={<Phone size={18} />}
                />
              </div>
            </div>

            {/* Información de Seguridad */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Información de Seguridad</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="password"
                  label="Contraseña"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : undefined
                  }
                  placeholder="••••••••"
                  required
                  fullWidth
                  icon={<Lock size={18} />}
                />

                <Input
                  type="password"
                  label="Confirmar Contraseña"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword && formik.errors.confirmPassword
                      ? formik.errors.confirmPassword
                      : undefined
                  }
                  placeholder="••••••••"
                  required
                  fullWidth
                  icon={<Lock size={18} />}
                />
              </div>
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
                Crear Usuario
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UserCreateModal;

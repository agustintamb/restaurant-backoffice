import { User, Mail, Phone } from 'lucide-react';
import { Form, Formik, FormikProps } from 'formik';
import { validationSchema } from './schema';
import { useAuth } from '@/hooks/useAuth';
import { useAdminProfile } from './useAdminProfile';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface IAdminProfileValues {
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
}

const AdminProfile = () => {
  const { currentUser } = useAuth();
  const { initialValues, isLoading, error, handleUpdateProfile } = useAdminProfile();

  if (!currentUser) {
    return (
      <div className="text-center py-10">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-800 rounded-md text-center">{error}</div>
        )}

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-primary-100 flex items-center justify-center text-primary-600">
              <User size={64} />
            </div>
          </div>

          <div className="flex-1 w-full">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={(values, { setSubmitting }) => {
                handleUpdateProfile(values);
                setSubmitting(false);
              }}
            >
              {(formik: FormikProps<IAdminProfileValues>) => (
                <>
                  <Form className="space-y-6">
                    {/* Información Personal */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Información Personal
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          type="text"
                          label="Nombre"
                          id="firstName"
                          name="firstName"
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
                          icon={<User size={18} />}
                        />

                        <Input
                          type="text"
                          label="Apellido"
                          id="lastName"
                          name="lastName"
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
                          icon={<User size={18} />}
                        />
                      </div>
                    </div>

                    {/* Información de Contacto */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Información de Contacto
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          type="email"
                          label="Correo electrónico"
                          id="username"
                          name="username"
                          value={formik.values.username}
                          disabled
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
                            formik.touched.phone && formik.errors.phone
                              ? formik.errors.phone
                              : undefined
                          }
                          required
                          placeholder="1112345678"
                          fullWidth
                          icon={<Phone size={18} />}
                        />
                      </div>
                    </div>
                    <div className="pt-4 text-end">
                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        disabled={formik.isSubmitting || !formik.dirty}
                        className="w-full md:w-auto"
                      >
                        Guardar Cambios
                      </Button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

import { User, KeyRound } from 'lucide-react';
import { Form, Formik } from 'formik';
import { validationSchema } from './schema';
import { useLogin } from './useLogin';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AuthLayout from '@/layouts/AuthLayout';

const Login = () => {
  const { initialValues, rememberMe, isLoading, error, handleLogin, handleCheckRememberMe } =
    useLogin();

  return (
    <AuthLayout title="Bienvenido" subtitle="Ingresá tus credenciales de administrador">
      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-md">
          <div className="text-red-700 text-sm font-medium">{error}</div>
        </div>
      )}

      {/* Formulario */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values.username, values.password, rememberMe);
          setSubmitting(false);
        }}
      >
        {formik => (
          <Form className="space-y-6">
            <Input
              required
              fullWidth
              id="username"
              name="username"
              type="email"
              label="Correo electrónico"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors.username}
              placeholder="tu@email.com"
              icon={<User size={18} />}
            />

            <Input
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              label="Contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
              placeholder="••••••••"
              icon={<KeyRound size={18} />}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  checked={rememberMe}
                  onChange={handleCheckRememberMe}
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 cursor-pointer"
                >
                  Recordar correo
                </label>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="button"
                onClick={() => formik.handleSubmit()}
                variant="primary"
                fullWidth
                isLoading={isLoading}
                disabled={!formik.isValid}
                className="h-12 text-base font-semibold"
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;

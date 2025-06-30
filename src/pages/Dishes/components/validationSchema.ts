import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'Debe tener al menos 2 caracteres')
    .max(30, 'No puede exceder los 30 caracteres')
    .trim(),
  description: Yup.string()
    .required('La descripción es obligatoria')
    .min(5, 'Debe tener al menos 5 caracteres')
    .max(100, 'No puede exceder los 100 caracteres')
    .trim(),
  price: Yup.number()
    .required('El precio es obligatorio')
    .min(0.01, 'El precio debe ser mayor a 0')
    .max(999999, 'El precio es demasiado alto'),
  categoryId: Yup.string().required('Debe seleccionar una categoría'),
  subcategoryId: Yup.string().optional(),
});

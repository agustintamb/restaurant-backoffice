export const VITE_API_URL = import.meta.env.VITE_API_URL;
export const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export enum ROUTES {
  LOGIN = '/iniciar-sesion',
  DASHBOARD = '/',
  PROFILE = '/mi-perfil',
  USERS = '/usuarios',
  INGREDIENTS = '/ingredientes',
  ALLERGENS = '/alergenos',
  CATEGORIES = '/categorias',
  SUBCATEGORIES = '/subcategorias',
  DISHES = '/platos',
  NOT_FOUND = '/*',
}

export const VITE_API_URL = import.meta.env.VITE_API_URL;
export const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export enum ROUTES {
  LOGIN = '/iniciar-sesion',
  DASHBOARD = '/dashboard',
  PROFILE = '/mi-perfil',
  USERS = '/usuarios',
  USER_DETAILS = '/usuarios/:id',
  NOT_FOUND = '/*',
}

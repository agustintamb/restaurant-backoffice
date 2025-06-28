import { UserRole } from '@/interfaces/user';

export interface ILoginParams {
  username: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  result: {
    id: string;
    username: string;
    role: UserRole;
    token: string;
  };
}

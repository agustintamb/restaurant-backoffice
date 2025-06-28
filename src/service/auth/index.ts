import { AxiosResponse } from 'axios';
import ServiceBase from '@/service//ServiceBase';
import { ILoginParams, ILoginResponse } from '@/interfaces/auth';

class AuthService extends ServiceBase {
  login = (params: ILoginParams) =>
    this.client.post<ResponseType, AxiosResponse<ILoginResponse>>('auth/login', params, {});
  validateToken = (params: { token: string }) =>
    this.client.get<ResponseType, AxiosResponse<{ valid: boolean }>>(
      `auth/validateToken?token=${params.token}`
    );
}

export default new AuthService();

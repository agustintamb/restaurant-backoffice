import { AxiosResponse } from 'axios';
import {
  IGetCurrentUserResponse,
  IUpdateUserProfileParams,
  IUpdateUserProfileResponse,
} from '@/interfaces/user';
import ServiceBase from '@/service//ServiceBase';

class UserService extends ServiceBase {
  getCurrentUser = () =>
    this.client.get<ResponseType, AxiosResponse<IGetCurrentUserResponse>>('users/current', {});

  updateUserProfile = (params: IUpdateUserProfileParams) =>
    this.client.put<ResponseType, AxiosResponse<IUpdateUserProfileResponse>>(
      `users/profile/${params.id}`,
      params,
      {}
    );
}

export default new UserService();

import { AxiosResponse } from 'axios';
import ServiceBase from '@/service/ServiceBase';
import {
  IGetCurrentUserResponse,
  IUpdateUserProfile,
  IUpdateUserProfileResponse,
  GetUsersQuery,
  ICreateUser,
  IUpdateUser,
  ICreateUserResponse,
  IUpdateUserResponse,
  IDeleteUserResponse,
  IGetUsersResponse,
} from '@/interfaces/user';

class UserService extends ServiceBase {
  getUsers = (params?: GetUsersQuery) =>
    this.client.get<ResponseType, AxiosResponse<IGetUsersResponse>>('users', { params });

  createUser = (data: ICreateUser) =>
    this.client.post<ResponseType, AxiosResponse<ICreateUserResponse>>('users', data);

  updateUser = (userId: string, data: IUpdateUser) =>
    this.client.put<ResponseType, AxiosResponse<IUpdateUserResponse>>(`users/${userId}`, data);

  deleteUser = (userId: string) =>
    this.client.delete<ResponseType, AxiosResponse<IDeleteUserResponse>>(`users/${userId}`);

  getCurrentUser = () =>
    this.client.get<ResponseType, AxiosResponse<IGetCurrentUserResponse>>('users/current', {});

  updateUserProfile = (params: IUpdateUserProfile) =>
    this.client.put<ResponseType, AxiosResponse<IUpdateUserProfileResponse>>(
      `users/profile/${params.id}`,
      params,
      {}
    );
}

export default new UserService();

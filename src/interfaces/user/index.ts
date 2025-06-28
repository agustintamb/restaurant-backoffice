export type UserRole = 'admin';

export interface IUser {
  _id: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'admin';
  createdBy?: IUser | string;
  createdAt: Date;
  modifiedBy?: IUser | string;
  modifiedAt: Date;
  deletedBy?: IUser | string;
  deletedAt?: Date;
  isDeleted: boolean;
}

export interface IGetCurrentUserResponse {
  message: string;
  result: IUser;
}

export interface IUpdateUserProfileParams {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IUpdateUserProfileResponse {
  message: string;
  result: IUser;
}

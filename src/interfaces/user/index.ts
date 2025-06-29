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
  updatedBy?: IUser | string;
  updatedAt: Date;
  deletedBy?: IUser | string;
  deletedAt?: Date;
  isDeleted: boolean;
}

export interface IGetCurrentUserResponse {
  message: string;
  result: IUser;
}

export interface IUpdateUserProfileResponse {
  message: string;
  result: IUser;
}

export interface IGetUsersResponse {
  message: string;
  result: PaginatedResult;
}

export interface ICreateUserResponse {
  message: string;
  result: IUser;
}

export interface IUpdateUserResponse {
  message: string;
  result: IUser;
}

export interface IDeleteUserResponse {
  message: string;
}

export interface ICreateUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: 'admin';
}

export interface IUpdateUser {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: 'admin';
}

export interface IUpdateUserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface GetUsersQuery {
  page?: string;
  limit?: string;
  search?: string;
  includeDeleted?: string;
}

export interface PaginatedResult {
  users: IUser[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

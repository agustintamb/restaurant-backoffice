import { IUser } from '@/interfaces/user';

export interface IAllergen {
  _id: string;
  name: string;
  createdBy?: IUser | string;
  createdAt: Date;
  updatedBy?: IUser | string;
  updatedAt: Date;
  deletedBy?: IUser | string;
  deletedAt?: Date;
  isDeleted: boolean;
}

export interface IGetAllergensResponse {
  message: string;
  result: PaginatedAllergensResult;
}

export interface IAllergenResponse {
  message: string;
  result: IAllergen;
}

export interface ICreateAllergen {
  name: string;
}

export interface IUpdateAllergen {
  name?: string;
}

export interface GetAllergensQuery {
  page?: string;
  limit?: string;
  search?: string;
  includeDeleted?: string;
}

export interface PaginatedAllergensResult {
  allergens: IAllergen[];
  totalAllergens: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IDeleteAllergenResponse {
  message: string;
}

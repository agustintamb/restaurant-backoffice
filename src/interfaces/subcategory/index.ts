import { IUser } from '@/interfaces/user';
import { ICategory } from '@/interfaces/category';

export interface ISubcategory {
  _id: string;
  name: string;
  category: ICategory | string;
  createdBy?: IUser | string;
  createdAt: Date;
  updatedBy?: IUser | string;
  updatedAt: Date;
  deletedBy?: IUser | string;
  deletedAt?: Date;
  restoredBy?: IUser | string;
  restoredAt?: Date;
  isDeleted: boolean;
}

export interface IGetSubcategoriesResponse {
  message: string;
  result: PaginatedSubcategoriesResult;
}

export interface ISubcategoryResponse {
  message: string;
  result: ISubcategory;
}

export interface ICreateSubcategory {
  name: string;
  categoryId: string;
}

export interface IUpdateSubcategory {
  name?: string;
  categoryId?: string;
}

export interface GetSubcategoriesQuery {
  page?: string;
  limit?: string;
  search?: string;
  categoryId?: string;
  includeDeleted?: string;
  includeCategory?: string;
}

export interface PaginatedSubcategoriesResult {
  subcategories: ISubcategory[];
  totalSubcategories: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IDeleteSubcategoryResponse {
  message: string;
}

export interface IRestoreSubcategoryResponse {
  message: string;
  result: ISubcategory;
}

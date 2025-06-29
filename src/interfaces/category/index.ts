import { IUser } from '@/interfaces/user';
import { ISubcategory } from '@/interfaces/subcategory';

export interface ICategory {
  _id: string;
  name: string;
  subcategories?: ISubcategory[];
  createdBy?: IUser | string;
  createdAt: Date;
  updatedBy?: IUser | string;
  updatedAt: Date;
  deletedBy?: IUser | string;
  deletedAt?: Date;
  isDeleted: boolean;
}

export interface IGetCategoriesResponse {
  message: string;
  result: PaginatedCategoriesResult;
}

export interface ICategoryResponse {
  message: string;
  result: ICategory;
}

export interface ICreateCategory {
  name: string;
}

export interface IUpdateCategory {
  name?: string;
}

export interface GetCategoriesQuery {
  page?: string;
  limit?: string;
  search?: string;
  includeDeleted?: string;
  includeSubcategories?: string;
}

export interface PaginatedCategoriesResult {
  categories: ICategory[];
  totalCategories: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IDeleteCategoryResponse {
  message: string;
}

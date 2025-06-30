import { IUser } from '@/interfaces/user';

export interface IIngredient {
  _id: string;
  name: string;
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

export interface IGetIngredientsResponse {
  message: string;
  result: PaginatedIngredientsResult;
}

export interface IIngredientResponse {
  message: string;
  result: IIngredient;
}

export interface ICreateIngredient {
  name: string;
}

export interface IUpdateIngredient {
  name?: string;
}

export interface GetIngredientsQuery {
  page?: string;
  limit?: string;
  search?: string;
  includeDeleted?: string;
}

export interface PaginatedIngredientsResult {
  ingredients: IIngredient[];
  totalIngredients: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IDeleteIngredientResponse {
  message: string;
}

export interface IRestoreIngredientResponse {
  message: string;
  result: IIngredient;
}

import { IUser } from '@/interfaces/user';
import { ICategory } from '@/interfaces/category';
import { ISubcategory } from '@/interfaces/subcategory';
import { IIngredient } from '@/interfaces/ingredient';
import { IAllergen } from '@/interfaces/allergen';

export interface IDish {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ICategory | string;
  subcategory?: ISubcategory | string;
  ingredients: IIngredient[] | string[];
  allergens: IAllergen[] | string[];
  createdBy?: IUser | string;
  createdAt: Date;
  updatedBy?: IUser | string;
  updatedAt: Date;
  deletedBy?: IUser | string;
  deletedAt?: Date;
  isDeleted: boolean;
}

export interface IGetDishesResponse {
  message: string;
  result: PaginatedDishesResult;
}

export interface IDishResponse {
  message: string;
  result: IDish;
}

export interface ICreateDish {
  name: string;
  description: string;
  price: number;
  image?: string | File;
  categoryId: string;
  subcategoryId?: string;
  ingredientIds: string[];
  allergenIds: string[];
}

export interface IUpdateDish {
  name?: string;
  description?: string;
  price?: number;
  image?: string | File;
  categoryId?: string;
  subcategoryId?: string;
  ingredientIds?: string[];
  allergenIds?: string[];
}

export interface GetDishesQuery {
  page?: string;
  limit?: string;
  search?: string;
  categoryId?: string;
  subcategoryId?: string;
  includeDeleted?: string;
  includeRelations?: string;
}

export interface PaginatedDishesResult {
  dishes: IDish[];
  totalDishes: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IDeleteDishResponse {
  message: string;
}

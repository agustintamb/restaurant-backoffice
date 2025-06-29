import { AxiosResponse } from 'axios';
import ServiceBase from '@/service/ServiceBase';
import {
  IGetCategoriesResponse,
  IDeleteCategoryResponse,
  ICategoryResponse,
  GetCategoriesQuery,
  ICreateCategory,
  IUpdateCategory,
} from '@/interfaces/category';

class CategoryService extends ServiceBase {
  getCategories = (params?: GetCategoriesQuery) =>
    this.client.get<ResponseType, AxiosResponse<IGetCategoriesResponse>>('categories', {
      params,
    });

  createCategory = (data: ICreateCategory) =>
    this.client.post<ResponseType, AxiosResponse<ICategoryResponse>>('categories', data);

  updateCategory = (categoryId: string, data: IUpdateCategory) =>
    this.client.put<ResponseType, AxiosResponse<ICategoryResponse>>(
      `categories/${categoryId}`,
      data
    );

  deleteCategory = (categoryId: string) =>
    this.client.delete<ResponseType, AxiosResponse<IDeleteCategoryResponse>>(
      `categories/${categoryId}`
    );

  getCategoryById = (categoryId: string) =>
    this.client.get<ResponseType, AxiosResponse<ICategoryResponse>>(`categories/${categoryId}`);
}

export default new CategoryService();

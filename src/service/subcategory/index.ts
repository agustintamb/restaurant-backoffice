import { AxiosResponse } from 'axios';
import ServiceBase from '@/service/ServiceBase';
import {
  IGetSubcategoriesResponse,
  IDeleteSubcategoryResponse,
  ISubcategoryResponse,
  IRestoreSubcategoryResponse,
  GetSubcategoriesQuery,
  ICreateSubcategory,
  IUpdateSubcategory,
} from '@/interfaces/subcategory';

class SubcategoryService extends ServiceBase {
  getSubcategories = (params?: GetSubcategoriesQuery) =>
    this.client.get<ResponseType, AxiosResponse<IGetSubcategoriesResponse>>('subcategories', {
      params,
    });

  createSubcategory = (data: ICreateSubcategory) =>
    this.client.post<ResponseType, AxiosResponse<ISubcategoryResponse>>('subcategories', data);

  updateSubcategory = (subcategoryId: string, data: IUpdateSubcategory) =>
    this.client.put<ResponseType, AxiosResponse<ISubcategoryResponse>>(
      `subcategories/${subcategoryId}`,
      data
    );

  deleteSubcategory = (subcategoryId: string) =>
    this.client.delete<ResponseType, AxiosResponse<IDeleteSubcategoryResponse>>(
      `subcategories/${subcategoryId}`
    );

  restoreSubcategory = (subcategoryId: string) =>
    this.client.patch<ResponseType, AxiosResponse<IRestoreSubcategoryResponse>>(
      `subcategories/${subcategoryId}/restore`
    );

  getSubcategoryById = (subcategoryId: string) =>
    this.client.get<ResponseType, AxiosResponse<ISubcategoryResponse>>(
      `subcategories/${subcategoryId}`
    );
}

export default new SubcategoryService();

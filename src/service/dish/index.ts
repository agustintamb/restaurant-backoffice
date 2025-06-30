// src/service/dish/index.ts
import { AxiosResponse } from 'axios';
import ServiceBase from '@/service/ServiceBase';
import {
  IGetDishesResponse,
  IDeleteDishResponse,
  IDishResponse,
  GetDishesQuery,
  ICreateDish,
  IUpdateDish,
} from '@/interfaces/dish';

class DishService extends ServiceBase {
  getDishes = (params?: GetDishesQuery) =>
    this.client.get<ResponseType, AxiosResponse<IGetDishesResponse>>('dishes', {
      params,
    });

  createDish = (data: ICreateDish & { image?: File }) => {
    const formData = new FormData();

    // Append form fields
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('categoryId', data.categoryId);

    if (data.subcategoryId) {
      formData.append('subcategoryId', data.subcategoryId);
    }

    // Append array fields as JSON strings
    formData.append('ingredientIds', JSON.stringify(data.ingredientIds));
    formData.append('allergenIds', JSON.stringify(data.allergenIds));

    // Append image if present
    if (data.image) {
      formData.append('image', data.image);
    }

    return this.client.post<ResponseType, AxiosResponse<IDishResponse>>('dishes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  updateDish = (dishId: string, data: IUpdateDish & { image?: File }) => {
    const formData = new FormData();

    // Append form fields only if they are defined
    if (data.name !== undefined) formData.append('name', data.name);
    if (data.description !== undefined) formData.append('description', data.description);
    if (data.price !== undefined) formData.append('price', data.price.toString());
    if (data.categoryId !== undefined) formData.append('categoryId', data.categoryId);
    if (data.subcategoryId !== undefined) formData.append('subcategoryId', data.subcategoryId);

    // Append array fields as JSON strings only if they are defined
    if (data.ingredientIds !== undefined) {
      formData.append('ingredientIds', JSON.stringify(data.ingredientIds));
    }

    if (data.allergenIds !== undefined) {
      formData.append('allergenIds', JSON.stringify(data.allergenIds));
    }

    // Append image if present
    if (data.image !== undefined && data.image !== null) {
      formData.append('image', data.image);
    }

    return this.client.put<ResponseType, AxiosResponse<IDishResponse>>(
      `dishes/${dishId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  };

  deleteDish = (dishId: string) =>
    this.client.delete<ResponseType, AxiosResponse<IDeleteDishResponse>>(`dishes/${dishId}`);

  getDishById = (dishId: string) =>
    this.client.get<ResponseType, AxiosResponse<IDishResponse>>(`dishes/${dishId}`);
}

export default new DishService();

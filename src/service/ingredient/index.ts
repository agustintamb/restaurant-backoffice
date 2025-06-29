import { AxiosResponse } from 'axios';
import ServiceBase from '@/service/ServiceBase';
import {
  IGetIngredientsResponse,
  IDeleteIngredientResponse,
  IIngredientResponse,
  GetIngredientsQuery,
  ICreateIngredient,
  IUpdateIngredient,
} from '@/interfaces/ingredient';

class IngredientService extends ServiceBase {
  getIngredients = (params?: GetIngredientsQuery) =>
    this.client.get<ResponseType, AxiosResponse<IGetIngredientsResponse>>('ingredients', {
      params,
    });

  createIngredient = (data: ICreateIngredient) =>
    this.client.post<ResponseType, AxiosResponse<IIngredientResponse>>('ingredients', data);

  updateIngredient = (ingredientId: string, data: IUpdateIngredient) =>
    this.client.put<ResponseType, AxiosResponse<IIngredientResponse>>(
      `ingredients/${ingredientId}`,
      data
    );

  deleteIngredient = (ingredientId: string) =>
    this.client.delete<ResponseType, AxiosResponse<IDeleteIngredientResponse>>(
      `ingredients/${ingredientId}`
    );

  getIngredientById = (ingredientId: string) =>
    this.client.get<ResponseType, AxiosResponse<IIngredientResponse>>(
      `ingredients/${ingredientId}`
    );
}

export default new IngredientService();

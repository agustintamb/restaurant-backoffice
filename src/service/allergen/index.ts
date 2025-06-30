import { AxiosResponse } from 'axios';
import ServiceBase from '@/service/ServiceBase';
import {
  IGetAllergensResponse,
  IDeleteAllergenResponse,
  IAllergenResponse,
  IRestoreAllergenResponse,
  GetAllergensQuery,
  ICreateAllergen,
  IUpdateAllergen,
} from '@/interfaces/allergen';

class AllergenService extends ServiceBase {
  getAllergens = (params?: GetAllergensQuery) =>
    this.client.get<ResponseType, AxiosResponse<IGetAllergensResponse>>('allergens', { params });

  createAllergen = (data: ICreateAllergen) =>
    this.client.post<ResponseType, AxiosResponse<IAllergenResponse>>('allergens', data);

  updateAllergen = (allergenId: string, data: IUpdateAllergen) =>
    this.client.put<ResponseType, AxiosResponse<IAllergenResponse>>(
      `allergens/${allergenId}`,
      data
    );

  deleteAllergen = (allergenId: string) =>
    this.client.delete<ResponseType, AxiosResponse<IDeleteAllergenResponse>>(
      `allergens/${allergenId}`
    );

  restoreAllergen = (allergenId: string) =>
    this.client.patch<ResponseType, AxiosResponse<IRestoreAllergenResponse>>(
      `allergens/${allergenId}/restore`
    );

  getAllergenById = (allergenId: string) =>
    this.client.get<ResponseType, AxiosResponse<IAllergenResponse>>(`allergens/${allergenId}`);
}

export default new AllergenService();

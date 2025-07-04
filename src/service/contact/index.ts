import { AxiosResponse } from 'axios';
import ServiceBase from '@/service/ServiceBase';
import {
  IGetContactsResponse,
  IContactResponse,
  IDeleteContactResponse,
  IMarkAsReadContactResponse,
  IRestoreContactResponse,
  GetContactsQuery,
} from '@/interfaces/contact';

class ContactService extends ServiceBase {
  getContacts = (params?: GetContactsQuery) =>
    this.client.get<ResponseType, AxiosResponse<IGetContactsResponse>>('contacts', {
      params: {
        includeDeleted: 'false',
        limit: '10',
        ...params,
      },
    });

  getContactById = (contactId: string) =>
    this.client.get<ResponseType, AxiosResponse<IContactResponse>>(`contacts/${contactId}`);

  markAsReadContact = (contactId: string) =>
    this.client.patch<ResponseType, AxiosResponse<IMarkAsReadContactResponse>>(
      `contacts/${contactId}/mark-as-read`
    );

  deleteContact = (contactId: string) =>
    this.client.delete<ResponseType, AxiosResponse<IDeleteContactResponse>>(
      `contacts/${contactId}`
    );

  restoreContact = (contactId: string) =>
    this.client.patch<ResponseType, AxiosResponse<IRestoreContactResponse>>(
      `contacts/${contactId}/restore`
    );
}

export default new ContactService();

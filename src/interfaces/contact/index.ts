import { IUser } from '@/interfaces/user';

export interface IContact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  readBy?: IUser | string;
  readAt?: Date;
  createdAt: Date;
  deletedBy?: IUser | string;
  deletedAt?: Date;
  restoredBy?: IUser | string;
  restoredAt?: Date;
  isDeleted: boolean;
}

export interface IGetContactsResponse {
  message: string;
  result: PaginatedContactsResult;
}

export interface IContactResponse {
  message: string;
  result: IContact;
}

export interface GetContactsQuery {
  page?: string;
  limit?: string;
  search?: string;
  includeDeleted?: string;
  isRead?: string;
}

export interface PaginatedContactsResult {
  contacts: IContact[];
  totalContacts: number;
  totalUnread: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IDeleteContactResponse {
  message: string;
}

export interface IMarkAsReadContactResponse {
  message: string;
  result: IContact;
}

export interface IRestoreContactResponse {
  message: string;
  result: IContact;
}

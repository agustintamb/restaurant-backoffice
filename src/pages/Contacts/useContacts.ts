import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import {
  getContacts,
  markAsReadContact,
  deleteContact,
  restoreContact,
} from '@/features/contact/asyncActions';
import { GetContactsQuery, IContact } from '@/interfaces/contact';
import { selectorContact } from '@/features/contact/slice';

export const useContacts = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [readFilter, setReadFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);

  const { contactsData, isLoading = false } = useSelector(selectorContact);

  const {
    contacts = [],
    totalContacts = 0,
    totalPages = 0,
    hasNextPage = false,
    hasPrevPage = false,
  } = contactsData || {};

  const limit = 10;

  const fetchContacts = (params?: Partial<GetContactsQuery>) => {
    const queryParams: GetContactsQuery = {
      page: currentPage.toString(),
      limit: limit.toString(),
      search: searchQuery,
      includeDeleted: includeDeleted.toString(),
      ...(readFilter !== 'all' && { isRead: (readFilter === 'read').toString() }),
      ...params,
    };

    dispatch(getContacts(queryParams));
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleIncludeDeletedChange = (include: boolean) => {
    setIncludeDeleted(include);
    setCurrentPage(1);
  };

  const handleReadFilterChange = (filter: 'all' | 'read' | 'unread') => {
    setReadFilter(filter);
    setCurrentPage(1);
  };

  const handleViewMessage = async (contact: IContact) => {
    setSelectedContact(contact);
    setIsMessageModalOpen(true);
    if (!contact.isRead) await dispatch(markAsReadContact(contact._id)).then(() => fetchContacts());
  };

  const handleDeleteContact = (contact: IContact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleRestoreContact = (contact: IContact) => {
    setSelectedContact(contact);
    setIsRestoreModalOpen(true);
  };

  const confirmDeleteContact = async () => {
    if (!selectedContact) return;
    await dispatch(deleteContact(selectedContact._id)).unwrap();
    setIsDeleteModalOpen(false);
    setSelectedContact(null);
    fetchContacts();
  };

  const confirmRestoreContact = async () => {
    if (!selectedContact) return;
    await dispatch(restoreContact(selectedContact._id)).unwrap();
    setIsRestoreModalOpen(false);
    setSelectedContact(null);
    fetchContacts();
  };

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
    setSelectedContact(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedContact(null);
  };

  const closeRestoreModal = () => {
    setIsRestoreModalOpen(false);
    setSelectedContact(null);
  };

  const refreshContacts = () => fetchContacts();

  useEffect(() => {
    fetchContacts();
  }, [currentPage, searchQuery, includeDeleted, readFilter]);

  // Pagination props for the table
  const paginationProps = {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    totalItems: totalContacts,
    itemsPerPage: limit,
    onPageChange: handlePageChange,
  };

  return {
    // Data
    contacts,
    isLoading,

    // Filters
    searchQuery,
    includeDeleted,
    readFilter,
    handleSearch,
    handleIncludeDeletedChange,
    handleReadFilterChange,

    // Pagination
    paginationProps,

    // Actions
    handleViewMessage,
    handleDeleteContact,
    handleRestoreContact,
    confirmDeleteContact,
    confirmRestoreContact,
    refreshContacts,

    // Modal states
    isMessageModalOpen,
    isDeleteModalOpen,
    isRestoreModalOpen,
    selectedContact,
    closeMessageModal,
    closeDeleteModal,
    closeRestoreModal,
  };
};

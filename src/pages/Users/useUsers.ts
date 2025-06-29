import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUser,
} from '@/features/user/asyncActions';
import { GetUsersQuery, ICreateUser, IUpdateUser, IUser } from '@/interfaces/user';
import { selectorUser } from '@/features/user/slice';

export const useUsers = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false); // Por defecto excluir eliminados
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const { usersData, isLoading = false, currentUser } = useSelector(selectorUser);

  const {
    users = [],
    totalUsers = 0,
    totalPages = 0,
    hasNextPage = false,
    hasPrevPage = false,
  } = usersData || {};

  const limit = 5;

  const fetchUsers = (params?: Partial<GetUsersQuery>) => {
    const queryParams: GetUsersQuery = {
      page: currentPage.toString(),
      limit: limit.toString(),
      search: searchQuery,
      includeDeleted: includeDeleted.toString(),
      ...params,
    };

    dispatch(getUsers(queryParams));
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleIncludeDeletedChange = (include: boolean) => {
    setIncludeDeleted(include);
    setCurrentPage(1); // Reset to first page when changing filter
  };

  const handleCreateUser = () => setIsCreateModalOpen(true);

  const handleEditUser = (user: IUser) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user: IUser) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleShowActivity = (user: IUser) => {
    setSelectedUser(user);
    setIsActivityModalOpen(true);
  };

  const handleCreateUserSubmit = async (userData: ICreateUser) => {
    await dispatch(createUser(userData)).unwrap();
    setIsCreateModalOpen(false);
    fetchUsers();
  };

  const handleUpdateUser = async (userId: string, userData: IUpdateUser) => {
    await dispatch(updateUser({ userId, userData })).unwrap();
    setIsEditModalOpen(false);
    setSelectedUser(null);
    if (currentUser && currentUser._id === userId) dispatch(getCurrentUser());
    fetchUsers();
  };

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;
    await dispatch(deleteUser(selectedUser._id)).unwrap();
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
    fetchUsers();
  };

  const closeCreateModal = () => setIsCreateModalOpen(false);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const closeActivityModal = () => {
    setIsActivityModalOpen(false);
    setSelectedUser(null);
  };

  const refreshUsers = () => fetchUsers();

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchQuery, includeDeleted]);

  // Pagination props for the table
  const paginationProps = {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    totalItems: totalUsers,
    itemsPerPage: limit,
    onPageChange: handlePageChange,
  };

  return {
    // Data
    users,
    isLoading,

    // Filters
    searchQuery,
    includeDeleted,
    handleSearch,
    handleIncludeDeletedChange,

    // Pagination
    paginationProps,

    // Actions
    handleCreateUser,
    handleEditUser,
    handleDeleteUser,
    handleShowActivity,
    handleCreateUserSubmit,
    handleUpdateUser,
    confirmDeleteUser,
    refreshUsers,

    // Modal states
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isActivityModalOpen,
    selectedUser,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    closeActivityModal,
  };
};

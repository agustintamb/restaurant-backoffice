import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { selectorAllergen } from '@/features/allergen/slice';
import {
  getAllergens,
  createAllergen,
  updateAllergen,
  deleteAllergen,
} from '@/features/allergen/asyncActions';
import {
  GetAllergensQuery,
  ICreateAllergen,
  IUpdateAllergen,
  IAllergen,
} from '@/interfaces/allergen';

export const useAllergens = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState<IAllergen | null>(null);

  const { allergensData, isLoading = false } = useSelector(selectorAllergen);

  const {
    allergens = [],
    totalAllergens = 0,
    totalPages = 0,
    hasNextPage = false,
    hasPrevPage = false,
  } = allergensData || {};

  const limit = 5;

  const fetchAllergens = (params?: Partial<GetAllergensQuery>) => {
    const queryParams: GetAllergensQuery = {
      page: currentPage.toString(),
      limit: limit.toString(),
      search: searchQuery,
      includeDeleted: includeDeleted.toString(),
      ...params,
    };

    dispatch(getAllergens(queryParams));
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

  const handleCreateAllergen = () => setIsCreateModalOpen(true);

  const handleEditAllergen = (allergen: IAllergen) => {
    setSelectedAllergen(allergen);
    setIsEditModalOpen(true);
  };

  const handleDeleteAllergen = (allergen: IAllergen) => {
    setSelectedAllergen(allergen);
    setIsDeleteModalOpen(true);
  };

  const handleShowActivity = (allergen: IAllergen) => {
    setSelectedAllergen(allergen);
    setIsActivityModalOpen(true);
  };

  const handleCreateAllergenSubmit = async (allergenData: ICreateAllergen) => {
    await dispatch(createAllergen(allergenData)).unwrap();
    setIsCreateModalOpen(false);
    fetchAllergens();
  };

  const handleUpdateAllergen = async (allergenId: string, allergenData: IUpdateAllergen) => {
    await dispatch(updateAllergen({ allergenId, allergenData })).unwrap();
    setIsEditModalOpen(false);
    setSelectedAllergen(null);
    fetchAllergens();
  };

  const confirmDeleteAllergen = async () => {
    if (!selectedAllergen) return;
    await dispatch(deleteAllergen(selectedAllergen._id)).unwrap();
    setIsDeleteModalOpen(false);
    setSelectedAllergen(null);
    fetchAllergens();
  };

  const closeCreateModal = () => setIsCreateModalOpen(false);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAllergen(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAllergen(null);
  };

  const closeActivityModal = () => {
    setIsActivityModalOpen(false);
    setSelectedAllergen(null);
  };

  const refreshAllergens = () => fetchAllergens();

  // Fetch allergens on component mount and when dependencies change
  useEffect(() => {
    fetchAllergens();
  }, [currentPage, searchQuery, includeDeleted]);

  // Pagination props for the table
  const paginationProps = {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    totalItems: totalAllergens,
    itemsPerPage: limit,
    onPageChange: handlePageChange,
  };

  return {
    // Data
    allergens,
    isLoading,

    // Filters
    searchQuery,
    includeDeleted,
    handleSearch,
    handleIncludeDeletedChange,

    // Pagination
    paginationProps,

    // Actions
    handleCreateAllergen,
    handleEditAllergen,
    handleDeleteAllergen,
    handleShowActivity,
    handleCreateAllergenSubmit,
    handleUpdateAllergen,
    confirmDeleteAllergen,
    refreshAllergens,

    // Modal states
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isActivityModalOpen,
    selectedAllergen,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    closeActivityModal,
  };
};

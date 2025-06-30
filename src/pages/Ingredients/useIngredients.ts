import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  restoreIngredient,
} from '@/features/ingredient/asyncActions';
import {
  GetIngredientsQuery,
  ICreateIngredient,
  IUpdateIngredient,
  IIngredient,
} from '@/interfaces/ingredient';
import { selectorIngredient } from '@/features/ingredient/slice';

export const useIngredients = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<IIngredient | null>(null);

  const { ingredientsData, isLoading = false } = useSelector(selectorIngredient);

  const {
    ingredients = [],
    totalIngredients = 0,
    totalPages = 0,
    hasNextPage = false,
    hasPrevPage = false,
  } = ingredientsData || {};

  const limit = 5;

  const fetchIngredients = (params?: Partial<GetIngredientsQuery>) => {
    const queryParams: GetIngredientsQuery = {
      page: currentPage.toString(),
      limit: limit.toString(),
      search: searchQuery,
      includeDeleted: includeDeleted.toString(),
      ...params,
    };

    dispatch(getIngredients(queryParams));
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

  const handleCreateIngredient = () => setIsCreateModalOpen(true);

  const handleEditIngredient = (ingredient: IIngredient) => {
    setSelectedIngredient(ingredient);
    setIsEditModalOpen(true);
  };

  const handleDeleteIngredient = (ingredient: IIngredient) => {
    setSelectedIngredient(ingredient);
    setIsDeleteModalOpen(true);
  };

  const handleShowActivity = (ingredient: IIngredient) => {
    setSelectedIngredient(ingredient);
    setIsActivityModalOpen(true);
  };

  const handleCreateIngredientSubmit = async (ingredientData: ICreateIngredient) => {
    await dispatch(createIngredient(ingredientData)).unwrap();
    setIsCreateModalOpen(false);
    fetchIngredients();
  };

  const handleUpdateIngredient = async (
    ingredientId: string,
    ingredientData: IUpdateIngredient
  ) => {
    await dispatch(updateIngredient({ ingredientId, ingredientData })).unwrap();
    setIsEditModalOpen(false);
    setSelectedIngredient(null);
    fetchIngredients();
  };

  const confirmDeleteIngredient = async () => {
    if (!selectedIngredient) return;
    await dispatch(deleteIngredient(selectedIngredient._id)).unwrap();
    setIsDeleteModalOpen(false);
    setSelectedIngredient(null);
    fetchIngredients();
  };

  const closeCreateModal = () => setIsCreateModalOpen(false);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedIngredient(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedIngredient(null);
  };

  const closeActivityModal = () => {
    setIsActivityModalOpen(false);
    setSelectedIngredient(null);
  };

  const handleRestoreIngredient = (ingredient: IIngredient) => {
    setSelectedIngredient(ingredient);
    setIsRestoreModalOpen(true);
  };

  const confirmRestoreIngredient = async () => {
    if (!selectedIngredient) return;
    await dispatch(restoreIngredient(selectedIngredient._id)).unwrap();
    setIsRestoreModalOpen(false);
    setSelectedIngredient(null);
    fetchIngredients();
  };

  const closeRestoreModal = () => {
    setIsRestoreModalOpen(false);
    setSelectedIngredient(null);
  };

  const refreshIngredients = () => fetchIngredients();

  useEffect(() => {
    fetchIngredients();
  }, [currentPage, searchQuery, includeDeleted]);

  // Pagination props for the table
  const paginationProps = {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    totalItems: totalIngredients,
    itemsPerPage: limit,
    onPageChange: handlePageChange,
  };

  return {
    // Data
    ingredients,
    isLoading,

    // Filters
    searchQuery,
    includeDeleted,
    handleSearch,
    handleIncludeDeletedChange,

    // Pagination
    paginationProps,

    // Actions
    handleCreateIngredient,
    handleEditIngredient,
    handleDeleteIngredient,
    handleRestoreIngredient,
    handleShowActivity,
    handleCreateIngredientSubmit,
    handleUpdateIngredient,
    confirmDeleteIngredient,
    confirmRestoreIngredient,
    refreshIngredients,

    // Modal states
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isRestoreModalOpen,
    isActivityModalOpen,
    selectedIngredient,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    closeRestoreModal,
    closeActivityModal,
  };
};

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  restoreCategory,
} from '@/features/category/asyncActions';
import {
  GetCategoriesQuery,
  ICreateCategory,
  IUpdateCategory,
  ICategory,
} from '@/interfaces/category';
import { selectorCategory } from '@/features/category/slice';

export const useCategories = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  const { categoriesData, isLoading = false } = useSelector(selectorCategory);

  const {
    categories = [],
    totalCategories = 0,
    totalPages = 0,
    hasNextPage = false,
    hasPrevPage = false,
  } = categoriesData || {};

  const limit = 5;

  const fetchCategories = (params?: Partial<GetCategoriesQuery>) => {
    const queryParams: GetCategoriesQuery = {
      page: currentPage.toString(),
      limit: limit.toString(),
      search: searchQuery,
      includeDeleted: includeDeleted.toString(),
      includeSubcategories: 'true', // Always include subcategories
      ...params,
    };

    dispatch(getCategories(queryParams));
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

  const handleCreateCategory = () => setIsCreateModalOpen(true);

  const handleEditCategory = (category: ICategory) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteCategory = (category: ICategory) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleShowActivity = (category: ICategory) => {
    setSelectedCategory(category);
    setIsActivityModalOpen(true);
  };

  const handleCreateCategorySubmit = async (categoryData: ICreateCategory) => {
    await dispatch(createCategory(categoryData)).unwrap();
    setIsCreateModalOpen(false);
    fetchCategories();
  };

  const handleUpdateCategory = async (categoryId: string, categoryData: IUpdateCategory) => {
    await dispatch(updateCategory({ categoryId, categoryData })).unwrap();
    setIsEditModalOpen(false);
    setSelectedCategory(null);
    fetchCategories();
  };

  const confirmDeleteCategory = async () => {
    if (!selectedCategory) return;
    await dispatch(deleteCategory(selectedCategory._id)).unwrap();
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
    fetchCategories();
  };

  const closeCreateModal = () => setIsCreateModalOpen(false);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  const closeActivityModal = () => {
    setIsActivityModalOpen(false);
    setSelectedCategory(null);
  };

  const handleRestoreCategory = (category: ICategory) => {
    setSelectedCategory(category);
    setIsRestoreModalOpen(true);
  };

  const confirmRestoreCategory = async () => {
    if (!selectedCategory) return;
    await dispatch(restoreCategory(selectedCategory._id)).unwrap();
    setIsRestoreModalOpen(false);
    setSelectedCategory(null);
    fetchCategories();
  };

  const closeRestoreModal = () => {
    setIsRestoreModalOpen(false);
    setSelectedCategory(null);
  };

  const refreshCategories = () => fetchCategories();

  useEffect(() => {
    fetchCategories();
  }, [currentPage, searchQuery, includeDeleted]);

  // Pagination props for the table
  const paginationProps = {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    totalItems: totalCategories,
    itemsPerPage: limit,
    onPageChange: handlePageChange,
  };

  return {
    // Data
    categories,
    isLoading,

    // Filters
    searchQuery,
    includeDeleted,
    handleSearch,
    handleIncludeDeletedChange,

    // Pagination
    paginationProps,

    // Actions
    handleCreateCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleRestoreCategory,
    handleShowActivity,
    handleCreateCategorySubmit,
    handleUpdateCategory,
    confirmDeleteCategory,
    confirmRestoreCategory,
    refreshCategories,

    // Modal states
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isRestoreModalOpen,
    isActivityModalOpen,
    selectedCategory,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    closeRestoreModal,
    closeActivityModal,
  };
};

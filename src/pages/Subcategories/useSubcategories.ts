import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import {
  getSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  restoreSubcategory,
} from '@/features/subcategory/asyncActions';
import { getCategories } from '@/features/category/asyncActions';
import {
  GetSubcategoriesQuery,
  ICreateSubcategory,
  IUpdateSubcategory,
  ISubcategory,
} from '@/interfaces/subcategory';
import { selectorSubcategory } from '@/features/subcategory/slice';
import { selectorCategory } from '@/features/category/slice';

export const useSubcategories = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<ISubcategory | null>(null);

  // Selectors
  const { subcategoriesData, isLoading = false } = useSelector(selectorSubcategory);
  const { categoriesData } = useSelector(selectorCategory);

  const {
    subcategories = [],
    totalSubcategories = 0,
    totalPages = 0,
    hasNextPage = false,
    hasPrevPage = false,
  } = subcategoriesData || {};

  // Extract categories from selector
  const categories = categoriesData?.categories || [];

  const limit = 5;

  // Fetch categories on mount
  useEffect(() => {
    dispatch(
      getCategories({
        page: '1',
        limit: '100',
        includeDeleted: 'false',
        includeSubcategories: 'false',
      })
    );
  }, [dispatch]);

  const fetchSubcategories = (params?: Partial<GetSubcategoriesQuery>) => {
    const queryParams: GetSubcategoriesQuery = {
      page: currentPage.toString(),
      limit: limit.toString(),
      search: searchQuery,
      categoryId: categoryFilter || undefined,
      includeDeleted: includeDeleted.toString(),
      includeCategory: 'true', // Always include category info
      ...params,
    };

    dispatch(getSubcategories(queryParams));
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (categoryId: string) => {
    setCategoryFilter(categoryId);
    setCurrentPage(1);
  };

  const handleIncludeDeletedChange = (include: boolean) => {
    setIncludeDeleted(include);
    setCurrentPage(1);
  };

  const handleCreateSubcategory = () => setIsCreateModalOpen(true);

  const handleEditSubcategory = (subcategory: ISubcategory) => {
    setSelectedSubcategory(subcategory);
    setIsEditModalOpen(true);
  };

  const handleDeleteSubcategory = (subcategory: ISubcategory) => {
    setSelectedSubcategory(subcategory);
    setIsDeleteModalOpen(true);
  };

  const handleShowActivity = (subcategory: ISubcategory) => {
    setSelectedSubcategory(subcategory);
    setIsActivityModalOpen(true);
  };

  const handleCreateSubcategorySubmit = async (subcategoryData: ICreateSubcategory) => {
    await dispatch(createSubcategory(subcategoryData)).unwrap();
    setIsCreateModalOpen(false);
    fetchSubcategories();
  };

  const handleUpdateSubcategory = async (
    subcategoryId: string,
    subcategoryData: IUpdateSubcategory
  ) => {
    await dispatch(updateSubcategory({ subcategoryId, subcategoryData })).unwrap();
    setIsEditModalOpen(false);
    setSelectedSubcategory(null);
    fetchSubcategories();
  };

  const confirmDeleteSubcategory = async () => {
    if (!selectedSubcategory) return;
    await dispatch(deleteSubcategory(selectedSubcategory._id)).unwrap();
    setIsDeleteModalOpen(false);
    setSelectedSubcategory(null);
    fetchSubcategories();
  };

  const closeCreateModal = () => setIsCreateModalOpen(false);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedSubcategory(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedSubcategory(null);
  };

  const closeActivityModal = () => {
    setIsActivityModalOpen(false);
    setSelectedSubcategory(null);
  };

  const handleRestoreSubcategory = (subcategory: ISubcategory) => {
    setSelectedSubcategory(subcategory);
    setIsRestoreModalOpen(true);
  };

  const confirmRestoreSubcategory = async () => {
    if (!selectedSubcategory) return;
    await dispatch(restoreSubcategory(selectedSubcategory._id)).unwrap();
    setIsRestoreModalOpen(false);
    setSelectedSubcategory(null);
    fetchSubcategories();
  };

  const closeRestoreModal = () => {
    setIsRestoreModalOpen(false);
    setSelectedSubcategory(null);
  };

  const refreshSubcategories = () => fetchSubcategories();

  useEffect(() => {
    fetchSubcategories();
  }, [currentPage, searchQuery, categoryFilter, includeDeleted]);

  // Pagination props for the table
  const paginationProps = {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    totalItems: totalSubcategories,
    itemsPerPage: limit,
    onPageChange: handlePageChange,
  };

  return {
    // Data
    subcategories,
    categories,
    isLoading,

    // Filters
    searchQuery,
    categoryFilter,
    includeDeleted,
    handleSearch,
    handleCategoryFilter,
    handleIncludeDeletedChange,

    // Pagination
    paginationProps,

    // Actions
    handleCreateSubcategory,
    handleEditSubcategory,
    handleDeleteSubcategory,
    handleRestoreSubcategory,
    handleShowActivity,
    handleCreateSubcategorySubmit,
    handleUpdateSubcategory,
    confirmDeleteSubcategory,
    confirmRestoreSubcategory,
    refreshSubcategories,

    // Modal states
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isRestoreModalOpen,
    isActivityModalOpen,
    selectedSubcategory,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    closeRestoreModal,
    closeActivityModal,
  };
};

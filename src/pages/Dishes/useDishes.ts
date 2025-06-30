import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { getDishes, createDish, updateDish, deleteDish, restoreDish } from '@/features/dish/asyncActions';
import { getCategories } from '@/features/category/asyncActions';
import { getSubcategories } from '@/features/subcategory/asyncActions';
import { GetDishesQuery, ICreateDish, IUpdateDish, IDish } from '@/interfaces/dish';
import { selectorDish } from '@/features/dish/slice';
import { selectorCategory } from '@/features/category/slice';
import { selectorSubcategory } from '@/features/subcategory/slice';

export const useDishes = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<IDish | null>(null);

  // Selectors
  const { dishesData, isLoading = false } = useSelector(selectorDish);
  const { categoriesData } = useSelector(selectorCategory);
  const { subcategoriesData } = useSelector(selectorSubcategory);

  const {
    dishes = [],
    totalDishes = 0,
    totalPages = 0,
    hasNextPage = false,
    hasPrevPage = false,
  } = dishesData || {};

  // Extract categories and subcategories from selectors
  const categories = categoriesData?.categories || [];
  const subcategories = subcategoriesData?.subcategories || [];

  const limit = 10;

  // Fetch categories and subcategories on mount
  useEffect(() => {
    dispatch(
      getCategories({
        page: '1',
        limit: '100',
        includeDeleted: 'false',
        includeSubcategories: 'false',
      })
    );

    dispatch(
      getSubcategories({
        page: '1',
        limit: '100',
        includeDeleted: 'false',
        includeCategory: 'true',
      })
    );
  }, [dispatch]);

  const fetchDishes = (params?: Partial<GetDishesQuery>) => {
    const queryParams: GetDishesQuery = {
      page: currentPage.toString(),
      limit: limit.toString(),
      search: searchQuery,
      categoryId: categoryFilter || undefined,
      subcategoryId: subcategoryFilter || undefined,
      includeDeleted: includeDeleted.toString(),
      includeRelations: 'true', // Always include relations for display
      ...params,
    };

    dispatch(getDishes(queryParams));
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (categoryId: string) => {
    setCategoryFilter(categoryId);
    setSubcategoryFilter(''); // Reset subcategory when category changes
    setCurrentPage(1);
  };

  const handleSubcategoryFilter = (subcategoryId: string) => {
    setSubcategoryFilter(subcategoryId);
    setCurrentPage(1);
  };

  const handleIncludeDeletedChange = (include: boolean) => {
    setIncludeDeleted(include);
    setCurrentPage(1);
  };

  const handleCreateDish = () => setIsCreateModalOpen(true);

  const handleEditDish = (dish: IDish) => {
    setSelectedDish(dish);
    setIsEditModalOpen(true);
  };

  const handleDeleteDish = (dish: IDish) => {
    setSelectedDish(dish);
    setIsDeleteModalOpen(true);
  };

  const handleShowActivity = (dish: IDish) => {
    setSelectedDish(dish);
    setIsActivityModalOpen(true);
  };

  const handleCreateDishSubmit = async (dishData: ICreateDish) => {
    await dispatch(createDish(dishData as ICreateDish & { image?: File | undefined })).unwrap();
    setIsCreateModalOpen(false);
    fetchDishes();
  };

  const handleUpdateDish = async (dishId: string, dishData: IUpdateDish) => {
    await dispatch(
      updateDish({ dishId, dishData: dishData as IUpdateDish & { image?: File | undefined } })
    ).unwrap();
    setIsEditModalOpen(false);
    setSelectedDish(null);
    fetchDishes();
  };

  const confirmDeleteDish = async () => {
    if (!selectedDish) return;
    await dispatch(deleteDish(selectedDish._id)).unwrap();
    setIsDeleteModalOpen(false);
    setSelectedDish(null);
    fetchDishes();
  };

  const closeCreateModal = () => setIsCreateModalOpen(false);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedDish(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedDish(null);
  };

  const closeActivityModal = () => {
    setIsActivityModalOpen(false);
    setSelectedDish(null);
  };

  const handleRestoreDish = (dish: IDish) => {
    setSelectedDish(dish);
    setIsRestoreModalOpen(true);
  };

  const confirmRestoreDish = async () => {
    if (!selectedDish) return;
    await dispatch(restoreDish(selectedDish._id)).unwrap();
    setIsRestoreModalOpen(false);
    setSelectedDish(null);
    fetchDishes();
  };

  const closeRestoreModal = () => {
    setIsRestoreModalOpen(false);
    setSelectedDish(null);
  };

  const refreshDishes = () => fetchDishes();

  useEffect(() => {
    fetchDishes();
  }, [currentPage, searchQuery, categoryFilter, subcategoryFilter, includeDeleted]);

  // Filter subcategories based on selected category
  const filteredSubcategories = categoryFilter
    ? subcategories.filter(sub => {
        const subCategory = typeof sub.category === 'string' ? sub.category : sub.category?._id;
        return subCategory === categoryFilter;
      })
    : subcategories;

  // Pagination props for the table
  const paginationProps = {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    totalItems: totalDishes,
    itemsPerPage: limit,
    onPageChange: handlePageChange,
  };

  return {
    // Data
    dishes,
    categories,
    subcategories: filteredSubcategories,
    isLoading,

    // Filters
    searchQuery,
    categoryFilter,
    subcategoryFilter,
    includeDeleted,
    handleSearch,
    handleCategoryFilter,
    handleSubcategoryFilter,
    handleIncludeDeletedChange,

    // Pagination
    paginationProps,

    // Actions
    handleCreateDish,
    handleEditDish,
    handleDeleteDish,
    handleRestoreDish,
    handleShowActivity,
    handleCreateDishSubmit,
    handleUpdateDish,
    confirmDeleteDish,
    confirmRestoreDish,
    refreshDishes,

    // Modal states
    isCreateModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isRestoreModalOpen,
    isActivityModalOpen,
    selectedDish,
    closeCreateModal,
    closeEditModal,
    closeDeleteModal,
    closeRestoreModal,
    closeActivityModal,
  };
};

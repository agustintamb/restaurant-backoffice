import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { getIngredients } from '@/features/ingredient/asyncActions';
import { selectorIngredient } from '@/features/ingredient/slice';
import { IIngredient } from '@/interfaces/ingredient';

export const useIngredientSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const { ingredientsData, isLoading } = useSelector(selectorIngredient);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<IIngredient[]>([]);

  const ingredients = ingredientsData?.ingredients || [];

  // Memoizar los IDs seleccionados para evitar re-cálculos innecesarios
  const selectedIngredientIds = useMemo(
    () => selectedIngredients.map(ingredient => ingredient._id),
    [selectedIngredients]
  );

  // Memoizar los resultados filtrados
  const searchResults = useMemo(() => {
    if (searchTerm.length < 1) return [];

    return ingredients.filter(
      ingredient => !ingredient.isDeleted && !selectedIngredientIds.includes(ingredient._id)
    );
  }, [ingredients, searchTerm, selectedIngredientIds]);

  // Función para buscar ingredientes
  const searchIngredients = useCallback(
    async (query: string) => {
      if (query.length < 1) {
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        await dispatch(
          getIngredients({
            search: query,
            limit: '20',
            includeDeleted: 'false',
          })
        ).unwrap();
      } catch (error) {
        console.error('Error searching ingredients:', error);
      } finally {
        setIsSearching(false);
      }
    },
    [dispatch]
  );

  // Debounce search - separado del efecto de filtrado
  useEffect(() => {
    if (searchTerm.length < 1) {
      setIsSearching(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      searchIngredients(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchIngredients]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const addIngredient = useCallback((ingredient: IIngredient) => {
    setSelectedIngredients(prev => {
      // Evitar duplicados
      if (prev.some(selected => selected._id === ingredient._id)) {
        return prev;
      }
      return [...prev, ingredient];
    });
    setSearchTerm('');
  }, []);

  const removeIngredient = useCallback((ingredientId: string) => {
    setSelectedIngredients(prev => prev.filter(ing => ing._id !== ingredientId));
  }, []);

  const setInitialIngredients = useCallback((ingredients: IIngredient[]) => {
    setSelectedIngredients(ingredients);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIngredients([]);
    setSearchTerm('');
  }, []);

  const getSelectedIngredientIds = useCallback(() => {
    return selectedIngredientIds;
  }, [selectedIngredientIds]);

  return {
    // Search state
    searchTerm,
    searchResults,
    isSearching: isSearching || isLoading,

    // Selected ingredients
    selectedIngredients,

    // Actions
    handleSearchChange,
    addIngredient,
    removeIngredient,
    setInitialIngredients,
    clearSelection,
    getSelectedIngredientIds,
  };
};

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { getAllergens } from '@/features/allergen/asyncActions';
import { selectorAllergen } from '@/features/allergen/slice';
import { IAllergen } from '@/interfaces/allergen';

export const useAllergenSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const { allergensData, isLoading } = useSelector(selectorAllergen);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState<IAllergen[]>([]);

  const allergens = allergensData?.allergens || [];

  // Memoizar los IDs seleccionados para evitar re-cálculos innecesarios
  const selectedAllergenIds = useMemo(
    () => selectedAllergens.map(allergen => allergen._id),
    [selectedAllergens]
  );

  // Memoizar los resultados filtrados
  const searchResults = useMemo(() => {
    if (searchTerm.length < 1) return [];

    return allergens.filter(
      allergen => !allergen.isDeleted && !selectedAllergenIds.includes(allergen._id)
    );
  }, [allergens, searchTerm, selectedAllergenIds]);

  // Función para buscar alérgenos
  const searchAllergens = useCallback(
    async (query: string) => {
      if (query.length < 1) {
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        await dispatch(
          getAllergens({
            search: query,
            limit: '20',
            includeDeleted: 'false',
          })
        ).unwrap();
      } catch (error) {
        console.error('Error searching allergens:', error);
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
      searchAllergens(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchAllergens]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const addAllergen = useCallback((allergen: IAllergen) => {
    setSelectedAllergens(prev => {
      // Evitar duplicados
      if (prev.some(selected => selected._id === allergen._id)) {
        return prev;
      }
      return [...prev, allergen];
    });
    setSearchTerm('');
  }, []);

  const removeAllergen = useCallback((allergenId: string) => {
    setSelectedAllergens(prev => prev.filter(allergen => allergen._id !== allergenId));
  }, []);

  const setInitialAllergens = useCallback((allergens: IAllergen[]) => {
    setSelectedAllergens(allergens);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedAllergens([]);
    setSearchTerm('');
  }, []);

  const getSelectedAllergenIds = useCallback(() => {
    return selectedAllergenIds;
  }, [selectedAllergenIds]);

  return {
    // Search state
    searchTerm,
    searchResults,
    isSearching: isSearching || isLoading,

    // Selected allergens
    selectedAllergens,

    // Actions
    handleSearchChange,
    addAllergen,
    removeAllergen,
    setInitialAllergens,
    clearSelection,
    getSelectedAllergenIds,
  };
};

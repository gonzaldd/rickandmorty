import { useState, useEffect, useCallback } from 'react';
import { Character } from '@/features/characters/types';
import { getCharacters } from '@/api/rickAndMortyAPI';
import { useDebounce } from './useDebounce';

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const loadData = useCallback(async (query: string, pageToFetch: number) => {
    if (pageToFetch > 1 && !hasNextPage) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getCharacters(pageToFetch, query);

      if (pageToFetch === 1) {
        setCharacters(response.results);
      } else {
        setCharacters((prev) => [...prev, ...response.results]);
      }
      setHasNextPage(response.info.next !== null);
      setPage(pageToFetch + 1);
    } catch (err) {
      setError('Error al obtener los datos.');
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  }, [hasNextPage]);

  useEffect(() => {
    loadData(debouncedSearchQuery, 1);
  }, [debouncedSearchQuery, loadData]);

  const loadMoreCharacters = () => {
    loadData(debouncedSearchQuery, page);
  };

  const retryFetch = () => {
    loadData(debouncedSearchQuery, 1);
  };

  return {
    characters,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    loadMoreCharacters,
    retry: retryFetch
  };
}
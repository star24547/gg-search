import { useState, useCallback } from 'react';
import { fetchGames } from '../api/rawg';

/**
 * 게임 검색 상태와 로직을 관리하는 커스텀 훅
 */
export function useGameSearch() {
  const [games, setGames]       = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError]       = useState(null);
  const [query, setQuery]       = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [activeGenre, setActiveGenre] = useState(null);

  const search = useCallback(async (searchQuery) => {
    setLoading(true);
    setError(null);
    setQuery(searchQuery);
    setHasSearched(true);
    setActiveGenre(null);

    try {
      const data = await fetchGames(searchQuery);
      setGames(data.results || []);
    } catch (err) {
      setError(err.message || '검색 중 오류가 발생했습니다.');
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const filterByGenre = useCallback(async (genre) => {
    setLoading(true);
    setError(null);
    setQuery('');
    setHasSearched(false);
    setActiveGenre(genre);

    try {
      const data = await fetchGames('', 1, genre.id);
      setGames(data.results || []);
    } catch (err) {
      setError(err.message || '장르 데이터를 불러오지 못했습니다.');
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPopular = useCallback(async () => {
    setLoading(true);
    setError(null);
    setHasSearched(false);
    setQuery('');
    setActiveGenre(null);

    try {
      const data = await fetchGames('');
      setGames(data.results || []);
    } catch (err) {
      setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { games, isLoading, error, query, hasSearched, activeGenre, search, filterByGenre, loadPopular };
}
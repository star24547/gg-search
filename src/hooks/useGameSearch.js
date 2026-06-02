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

  /**
   * 게임 검색 실행
   * @param {string} searchQuery - 검색어
   */
  const search = useCallback(async (searchQuery) => {
    setLoading(true);
    setError(null);
    setQuery(searchQuery);
    setHasSearched(true);

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

  /**
   * 인기 게임 목록 로드 (초기 화면용)
   */
  const loadPopular = useCallback(async () => {
    setLoading(true);
    setError(null);
    setHasSearched(false);
    setQuery('');

    try {
      const data = await fetchGames('');
      setGames(data.results || []);
    } catch (err) {
      setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { games, isLoading, error, query, hasSearched, search, loadPopular };
}

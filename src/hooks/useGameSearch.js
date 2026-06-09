import { useState, useCallback, useRef } from 'react';
import { fetchGames } from '../api/rawg';

export function useGameSearch() {
  const [games, setGames]               = useState([]);
  const [isLoading, setLoading]         = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [error, setError]               = useState(null);
  const [query, setQuery]               = useState('');
  const [hasSearched, setHasSearched]   = useState(false);
  const [activeGenre, setActiveGenre]   = useState(null);
  const [hasMore, setHasMore]           = useState(true);

  // useRef로 최신값 유지
  const pageRef        = useRef(1);
  const queryRef       = useRef('');
  const activeGenreRef = useRef(null);
  const isLoadingMoreRef = useRef(false);
  const hasMoreRef     = useRef(true);

  const search = useCallback(async (searchQuery) => {
    setLoading(true);
    setError(null);
    setQuery(searchQuery);
    setHasSearched(true);
    setActiveGenre(null);
    pageRef.current = 1;
    queryRef.current = searchQuery;
    activeGenreRef.current = null;

    try {
      const data = await fetchGames(searchQuery, 1);
      setGames(data.results || []);
      setHasMore(!!data.next);
      hasMoreRef.current = !!data.next;
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
    pageRef.current = 1;
    queryRef.current = '';
    activeGenreRef.current = genre;

    try {
      const data = await fetchGames('', 1, genre.id);
      setGames(data.results || []);
      setHasMore(!!data.next);
      hasMoreRef.current = !!data.next;
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
    pageRef.current = 1;
    queryRef.current = '';
    activeGenreRef.current = null;

    try {
      const data = await fetchGames('');
      setGames(data.results || []);
      setHasMore(!!data.next);
      hasMoreRef.current = !!data.next;
    } catch (err) {
      setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoadingMoreRef.current || !hasMoreRef.current) return;

    isLoadingMoreRef.current = true;
    setLoadingMore(true);
    const nextPage = pageRef.current + 1;

    try {
      const data = await fetchGames(
        queryRef.current,
        nextPage,
        activeGenreRef.current?.id
      );
      setGames(prev => [...prev, ...data.results]);
      setHasMore(!!data.next);
      hasMoreRef.current = !!data.next;
      pageRef.current = nextPage;
    } catch (err) {
      setError(err.message || '추가 데이터를 불러오지 못했습니다.');
    } finally {
      isLoadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }, []);

  return {
    games, isLoading, isLoadingMore, error,
    query, hasSearched, activeGenre, hasMore,
    search, filterByGenre, loadPopular, loadMore
  };
}
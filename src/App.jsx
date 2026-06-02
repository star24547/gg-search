import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';
import { useGameSearch } from './hooks/useGameSearch';
import styles from './App.module.css';

/**
 * App - 루트 컴포넌트
 * 전체 상태 관리:
 *   - 게임 검색 상태 (useGameSearch 훅)
 *   - 선택된 게임 ID (상세 모달용)
 */
export default function App() {
  const { games, isLoading, error, query, hasSearched, search, loadPopular } = useGameSearch();
  const [selectedGameId, setSelectedGameId] = useState(null);

  // 초기 진입 시 인기 게임 로드
  useEffect(() => {
    loadPopular();
  }, []);

  return (
    <div className={styles.app}>
      {/* ── 헤더 ── */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🎮</span>
          <span className={styles.logoText}>GG<span className={styles.logoAccent}>Search</span></span>
        </div>
        <p className={styles.tagline}>전 세계 게임 정보를 한눈에</p>

        {/* 검색창 */}
        <SearchBar onSearch={search} isLoading={isLoading} />
      </header>

      {/* ── 메인 콘텐츠 ── */}
      <main className={styles.main}>
        <GameList
          games={games}
          isLoading={isLoading}
          error={error}
          query={query}
          hasSearched={hasSearched}
          onSelectGame={setSelectedGameId}
        />
      </main>

      {/* ── 푸터 ── */}
      <footer className={styles.footer}>
        <p>Powered by <a href="https://rawg.io" target="_blank" rel="noreferrer">RAWG API</a></p>
      </footer>

      {/* ── 상세 모달 ── */}
      {selectedGameId && (
        <GameDetail
          gameId={selectedGameId}
          onClose={() => setSelectedGameId(null)}
        />
      )}
    </div>
  );
}

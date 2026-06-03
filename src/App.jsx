import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';
import Sidebar from './components/Sidebar';
import { useGameSearch } from './hooks/useGameSearch';
import styles from './App.module.css';

export default function App() {
  const {
    games, isLoading, error, query, hasSearched,
    activeGenre, search, filterByGenre, loadPopular
  } = useGameSearch();
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    loadPopular();
  }, []);

  const sectionTitle = activeGenre
    ? `${activeGenre.name} 게임`
    : hasSearched
    ? `"${query}" 검색 결과`
    : '🔥 인기 게임';

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🎮</span>
          <span className={styles.logoText}>GG<span className={styles.logoAccent}>Search</span></span>
        </div>
        <p className={styles.tagline}>전 세계 게임 정보를 한눈에</p>
        <SearchBar onSearch={search} isLoading={isLoading} />
      </header>

      <div className={styles.body}>
        <Sidebar
          activeGenre={activeGenre}
          onSelectGenre={filterByGenre}
          onReset={loadPopular}
        />
        <main className={styles.main}>
          <GameList
            games={games}
            isLoading={isLoading}
            error={error}
            query={query}
            hasSearched={hasSearched}
            sectionTitle={sectionTitle}
            onSelectGame={setSelectedGameId}
          />
        </main>
      </div>

      <footer className={styles.footer}>
        <p>Powered by <a href="https://rawg.io" target="_blank" rel="noreferrer">RAWG API</a></p>
      </footer>

      {selectedGameId && (
        <GameDetail
          gameId={selectedGameId}
          onClose={() => setSelectedGameId(null)}
        />
      )}
    </div>
  );
}
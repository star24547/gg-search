import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';
import Sidebar from './components/Sidebar';
import { useGameSearch } from './hooks/useGameSearch';
import { useFavorites } from './hooks/useFavorites';
import styles from './App.module.css';

export default function App() {
  const {
    games, isLoading, error, query, hasSearched,
    activeGenre, search, filterByGenre, loadPopular
  } = useGameSearch();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    loadPopular();
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
    document.body.classList.toggle('light');
  };

  const sectionTitle = activeGenre
    ? `${activeGenre.name} 게임`
    : hasSearched
    ? `"${query}" 검색 결과`
    : '🔥 인기 게임';

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.topRow}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🎮</span>
            <span className={styles.logoText}>GG<span className={styles.logoAccent}>Search</span></span>
          </div>
          <button className={styles.themeBtn} onClick={toggleTheme}>
            {isDark ? '☀️ 라이트' : '🌙 다크'}
          </button>
        </div>
        <p className={styles.tagline}>전 세계 게임 정보를 한눈에</p>
        <SearchBar onSearch={search} isLoading={isLoading} />
      </header>

      <div className={styles.body}>
        <Sidebar
          activeGenre={activeGenre}
          onSelectGenre={(genre) => {
            setShowFavorites(false);
            filterByGenre(genre);
          }}
          onReset={() => {
            setShowFavorites(false);
            loadPopular();
          }}
          showFavorites={showFavorites}                              // 👈 추가
          onToggleFavorites={() => setShowFavorites(prev => !prev)} // 👈 추가
        />
        <main className={styles.main}>
          <GameList
            games={showFavorites ? favorites : games}               // 👈 수정
            isLoading={isLoading}
            error={error}
            query={query}
            hasSearched={hasSearched}
            sectionTitle={showFavorites ? '❤️ 즐겨찾기' : sectionTitle} // 👈 수정
            onSelectGame={setSelectedGameId}
            onToggleFavorite={toggleFavorite}                       // 👈 추가
            isFavorite={isFavorite}                                 // 👈 추가
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
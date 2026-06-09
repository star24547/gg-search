import { useEffect, useState } from 'react';
import { fetchGenres } from '../api/rawg';
import styles from './Sidebar.module.css';

const GENRE_EMOJI = {
  action: '⚔️', rpg: '🧙', shooter: '🔫', adventure: '🗺️',
  puzzle: '🧩', strategy: '♟️', sports: '⚽', racing: '🏎️',
  simulation: '🏗️', indie: '🎨', arcade: '👾', platformer: '🏃',
  fighting: '🥊', casual: '🎲', family: '👨‍👩‍👧', card: '🃏',
};

export default function Sidebar({ activeGenre, onSelectGenre, onReset, showFavorites, onToggleFavorites }) {
  const [genres, setGenres]     = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenres()
      .then(data => setGenres(data.results || []))
      .catch(() => setGenres([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>🗂 장르</h2>
      <button
        className={`${styles.item} ${!activeGenre ? styles.active : ''}`}
        onClick={onReset}
      >
        <span className={styles.emoji}>🔥</span>
        <span className={styles.name}>인기 게임</span>
      </button>

      <button
        className={`${styles.item} ${showFavorites ? styles.active : ''}`}
        onClick={onToggleFavorites}
      >
        <span className={styles.emoji}>❤️</span>
        <span className={styles.name}>즐겨찾기</span>
      </button>
      
      <div className={styles.divider} />
      {isLoading ? (
        <p className={styles.loading}>불러오는 중...</p>
      ) : (
        genres.map(genre => (
          <button
            key={genre.id}
            className={`${styles.item} ${activeGenre?.id === genre.id ? styles.active : ''}`}
            onClick={() => onSelectGenre(genre)}
          >
            <span className={styles.emoji}>{GENRE_EMOJI[genre.slug] || '🎮'}</span>
            <span className={styles.name}>{genre.name}</span>
            <span className={styles.count}>{genre.games_count?.toLocaleString()}</span>
          </button>
        ))
      )}
    </aside>
  );
}
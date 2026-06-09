import styles from './GameCard.module.css';

/**
 * GameCard - 게임 카드 컴포넌트
 * Props:
 *   game: object    - RAWG API 게임 데이터
 *   onClick()       - 카드 클릭 콜백 (상세 보기)
 */
export default function GameCard({ game, onClick, onToggleFavorite, isFavorite }) {
  // 평점에 따른 색상 반환
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#00e5ff';
    if (rating >= 4.0) return '#4caf50';
    if (rating >= 3.0) return '#ff9800';
    return '#f44336';
  };

  // 장르 태그 (최대 2개)
  const genres = game.genres?.slice(0, 2).map(g => g.name) || [];

  // 플랫폼 아이콘 매핑
  const platformIcon = (slug) => {
    if (slug?.includes('pc')) return '🖥';
    if (slug?.includes('playstation')) return '🎮';
    if (slug?.includes('xbox')) return '🟩';
    if (slug?.includes('nintendo') || slug?.includes('switch')) return '🔴';
    if (slug?.includes('ios') || slug?.includes('android')) return '📱';
    return '🕹';
  };

  const platforms = game.parent_platforms?.slice(0, 4) || [];

  return (
    <div className={styles.card} onClick={onClick}>
      {/* 썸네일 */}
      <div className={styles.thumb}>
        {game.background_image
          ? <img src={game.background_image} alt={game.name} loading="lazy" />
          : <div className={styles.noImg}>🎮</div>
        }
        {/* 평점 뱃지 */}
        <div
          className={styles.rating}
          style={{ color: getRatingColor(game.rating) }}
        >
          ★ {game.rating?.toFixed(1) || 'N/A'}
        </div>
        <button
          className={styles.heartBtn}
          onClick={(e) => {
            e.stopPropagation(); // 카드 클릭 이벤트 막기
            onToggleFavorite(game);
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      {/* 카드 내용 */}
      <div className={styles.body}>
        <h3 className={styles.title}>{game.name}</h3>

        {/* 장르 태그 */}
        <div className={styles.tags}>
          {genres.map(g => (
            <span key={g} className={styles.tag}>{g}</span>
          ))}
        </div>

        {/* 플랫폼 + 출시일 */}
        <div className={styles.meta}>
          <span className={styles.platforms}>
            {platforms.map(p => (
              <span key={p.platform.slug} title={p.platform.name}>
                {platformIcon(p.platform.slug)}
              </span>
            ))}
          </span>
          <span className={styles.released}>
            {game.released ? game.released.slice(0, 4) : '미정'}
          </span>
        </div>
      </div>
    </div>
  );
}

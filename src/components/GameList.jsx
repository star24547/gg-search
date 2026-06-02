import GameCard from './GameCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import styles from './GameList.module.css';

/**
 * GameList - 게임 카드 목록 컴포넌트
 * Props:
 *   games: array      - 게임 데이터 배열
 *   isLoading: bool   - 로딩 상태
 *   error: string     - 에러 메시지
 *   query: string     - 현재 검색어
 *   hasSearched: bool - 검색 실행 여부
 *   onSelectGame()    - 게임 선택 콜백
 */
export default function GameList({ games, isLoading, error, query, hasSearched, onSelectGame }) {
  // 로딩 중
  if (isLoading) return <LoadingSpinner />;

  // 에러 발생
  if (error) return <ErrorMessage message={error} />;

  // 검색 결과 없음
  if (hasSearched && games.length === 0) {
    return (
      <ErrorMessage
        message={`"${query}"에 대한 검색 결과가 없습니다.`}
        hint="다른 키워드로 검색해보세요."
      />
    );
  }

  return (
    <section className={styles.section}>
      {/* 섹션 헤더 */}
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>
          {hasSearched ? `"${query}" 검색 결과` : '🔥 인기 게임'}
        </h2>
        <span className={styles.count}>{games.length}개</span>
      </div>

      {/* 카드 그리드 */}
      <div className={styles.grid}>
        {games.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => onSelectGame(game.id)}
          />
        ))}
      </div>
    </section>
  );
}

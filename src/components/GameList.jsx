import { useEffect, useRef } from 'react';
import GameCard from './GameCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import styles from './GameList.module.css';

export default function GameList({
  games, isLoading, isLoadingMore, error,
  query, hasSearched, sectionTitle, hasMore,
  onSelectGame, onToggleFavorite, isFavorite, onLoadMore
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          onLoadMore?.();
        }
      },
      { threshold: 0, root: null, rootMargin: '200px' }
    );

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, onLoadMore]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (hasSearched && games.length === 0) {
    return (
      <ErrorMessage
        message={`"${query}"에 대한 검색 결과가 없습니다.`}
        hint="다른 키워드로 검색해보세요."
      />
    );
  }

  return (
    <>
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>
            {sectionTitle || (hasSearched ? `"${query}" 검색 결과` : '🔥 인기 게임')}
          </h2>
          <span className={styles.count}>{games.length}개</span>
        </div>

        <div className={styles.grid}>
          {games.map(game => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => onSelectGame(game.id)}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite ? isFavorite(game.id) : false}
            />
          ))}
        </div>

        {/* 추가 로딩 스피너 */}
        {isLoadingMore && (
          <div className={styles.loadingMore}>
            <div className={styles.spinner} />
            <p>더 불러오는 중...</p>
          </div>
        )}

        {/* 마지막 페이지 */}
        {!hasMore && games.length > 0 && (
          <p className={styles.noMore}>모든 게임을 불러왔어요 😊</p>
        )}
      </section>

      {/* 맨 아래 감지용 div */}
      <div ref={bottomRef} style={{ height: '100px', background: 'transparent' }} />
    </>
  );
}
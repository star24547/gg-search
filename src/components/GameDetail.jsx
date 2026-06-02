import { useState, useEffect } from 'react';
import { fetchGameDetail, fetchGameScreenshots } from '../api/rawg';
import LoadingSpinner from './LoadingSpinner';
import styles from './GameDetail.module.css';

/**
 * GameDetail - 게임 상세 정보 모달 컴포넌트
 * Props:
 *   gameId: number - 조회할 게임 ID
 *   onClose()      - 모달 닫기 콜백
 */
export default function GameDetail({ gameId, onClose }) {
  const [game, setGame]             = useState(null);
  const [screenshots, setShots]     = useState([]);
  const [isLoading, setLoading]     = useState(true);
  const [error, setError]           = useState(null);
  const [activeShot, setActiveShot] = useState(null);

  // 게임 상세 + 스크린샷 동시 요청
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [detail, shots] = await Promise.all([
          fetchGameDetail(gameId),
          fetchGameScreenshots(gameId),
        ]);
        setGame(detail);
        setShots(shots.results || []);
      } catch (err) {
        setError('상세 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [gameId]);

  // ESC 키로 닫기
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Metacritic 점수 색상
  const metaColor = (score) => {
    if (!score) return '#6b7280';
    if (score >= 75) return '#4caf50';
    if (score >= 50) return '#ff9800';
    return '#f44336';
  };

  return (
    // 배경 클릭 시 닫기
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* 닫기 버튼 */}
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        {/* 로딩 / 에러 / 콘텐츠 */}
        {isLoading && <LoadingSpinner />}
        {error && <p className={styles.error}>{error}</p>}

        {game && !isLoading && (
          <>
            {/* 히어로 이미지 */}
            <div className={styles.hero}>
              {game.background_image && (
                <img src={game.background_image} alt={game.name} />
              )}
              <div className={styles.heroOverlay} />
              <div className={styles.heroContent}>
                <h2 className={styles.title}>{game.name}</h2>
                {/* Metacritic 점수 */}
                {game.metacritic && (
                  <span
                    className={styles.metaBadge}
                    style={{ borderColor: metaColor(game.metacritic), color: metaColor(game.metacritic) }}
                  >
                    Metacritic {game.metacritic}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.body}>
              {/* 기본 정보 그리드 */}
              <div className={styles.infoGrid}>
                <InfoItem label="출시일" value={game.released || '미정'} />
                <InfoItem label="평점" value={`★ ${game.rating?.toFixed(1) || 'N/A'}`} />
                <InfoItem label="개발사" value={game.developers?.map(d => d.name).join(', ') || '알 수 없음'} />
                <InfoItem label="퍼블리셔" value={game.publishers?.map(p => p.name).join(', ') || '알 수 없음'} />
              </div>

              {/* 장르 */}
              {game.genres?.length > 0 && (
                <div className={styles.tagRow}>
                  <span className={styles.label}>장르</span>
                  {game.genres.map(g => (
                    <span key={g.id} className={styles.tag}>{g.name}</span>
                  ))}
                </div>
              )}

              {/* 플랫폼 */}
              {game.platforms?.length > 0 && (
                <div className={styles.tagRow}>
                  <span className={styles.label}>플랫폼</span>
                  {game.platforms.map(p => (
                    <span key={p.platform.id} className={`${styles.tag} ${styles.tagPlatform}`}>
                      {p.platform.name}
                    </span>
                  ))}
                </div>
              )}

              {/* 게임 설명 */}
              {game.description_raw && (
                <div className={styles.desc}>
                  <h3 className={styles.label}>게임 소개</h3>
                  <p>{game.description_raw.slice(0, 400)}
                    {game.description_raw.length > 400 ? '...' : ''}
                  </p>
                </div>
              )}

              {/* 스크린샷 갤러리 */}
              {screenshots.length > 0 && (
                <div className={styles.gallery}>
                  <h3 className={styles.label}>스크린샷</h3>
                  <div className={styles.shotGrid}>
                    {screenshots.slice(0, 6).map(s => (
                      <img
                        key={s.id}
                        src={s.image}
                        alt="screenshot"
                        className={styles.shot}
                        onClick={() => setActiveShot(s.image)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* 스크린샷 라이트박스 */}
      {activeShot && (
        <div className={styles.lightbox} onClick={() => setActiveShot(null)}>
          <img src={activeShot} alt="screenshot large" />
        </div>
      )}
    </div>
  );
}

// 작은 정보 항목 컴포넌트
function InfoItem({ label, value }) {
  return (
    <div className={styles.infoItem}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={styles.infoValue}>{value}</span>
    </div>
  );
}

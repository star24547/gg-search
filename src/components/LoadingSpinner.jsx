import styles from './LoadingSpinner.module.css';

/**
 * LoadingSpinner - API 요청 중 로딩 표시 컴포넌트
 */
export default function LoadingSpinner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
      <p className={styles.text}>게임 정보를 불러오는 중...</p>
    </div>
  );
}

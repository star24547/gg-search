import styles from './ErrorMessage.module.css';

/**
 * ErrorMessage - 에러 또는 빈 결과 메시지 컴포넌트
 * Props:
 *   message: string - 표시할 메시지
 *   hint: string    - 추가 안내 문구 (선택)
 */
export default function ErrorMessage({ message, hint }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>😵</span>
      <p className={styles.msg}>{message}</p>
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}

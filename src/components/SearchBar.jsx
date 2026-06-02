import { useState } from 'react';
import styles from './SearchBar.module.css';

/**
 * SearchBar - 검색 입력창 컴포넌트
 * Props:
 *   onSearch(query: string) - 검색 실행 콜백
 *   isLoading: boolean      - 로딩 중 여부 (버튼 비활성화용)
 */
export default function SearchBar({ onSearch, isLoading }) {
  const [input, setInput] = useState('');

  // 검색 실행 (빈 값 방지)
  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  // Enter 키 입력 처리
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <span className={styles.icon}>🔍</span>
        <input
          className={styles.input}
          type="text"
          placeholder="게임 이름을 입력하세요... (예: Elden Ring)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          className={styles.btn}
          onClick={handleSubmit}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? '검색 중...' : '검색'}
        </button>
      </div>
    </div>
  );
}

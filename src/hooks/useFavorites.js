import { useState } from 'react';

export function useFavorites() {
  // localStorage에서 초기값 불러오기
  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );

  // 추가/제거 토글
  const toggleFavorite = (game) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === game.id);
      const next = exists
        ? prev.filter(f => f.id !== game.id) // 이미 있으면 제거
        : [...prev, game];                    // 없으면 추가
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  // 즐겨찾기 여부 확인
  const isFavorite = (gameId) => favorites.some(f => f.id === gameId);

  return { favorites, toggleFavorite, isFavorite };
}
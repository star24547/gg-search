// RAWG API 통신 모듈
// API 키: https://rawg.io/apidocs 에서 무료 발급
const API_KEY = import.meta.env.VITE_RAWG_API_KEY || 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.rawg.io/api';

/**
 * 공통 fetch 유틸: 에러 핸들링 포함
 */
async function apiFetch(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('key', API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API 오류: ${res.status}`);
  return res.json();
}

/**
 * 게임 목록 검색
 * @param {string} query   - 검색 키워드 (없으면 인기 게임)
 * @param {number} page    - 페이지 번호
 * @param {number} genreId - 장르 ID (없으면 전체)
 */
export async function fetchGames(query = '', page = 1, genreId = null) {
  const params = { page, page_size: 20, ordering: '-rating' };
  if (query)   params.search = query;
  if (genreId) params.genres = genreId;
  return apiFetch('/games', params);
}

/**
 * 게임 상세 정보 조회
 * @param {number|string} id - 게임 ID 또는 slug
 */
export async function fetchGameDetail(id) {
  return apiFetch(`/games/${id}`);
}

/**
 * 게임 스크린샷 조회
 * @param {number|string} id - 게임 ID
 */
export async function fetchGameScreenshots(id) {
  return apiFetch(`/games/${id}/screenshots`);
}

/**
 * 장르 목록 조회
 */
export async function fetchGenres() {
  return apiFetch('/genres');
}
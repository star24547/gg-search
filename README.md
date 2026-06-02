# 🎮 GG Search — 게임 정보 검색 앱

RAWG API를 활용한 React 게임 검색 앱입니다.

## 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. API 키 설정
1. https://rawg.io/apidocs 에서 무료 회원가입
2. API Key 발급
3. 프로젝트 루트에 `.env` 파일 생성:
```
VITE_RAWG_API_KEY=발급받은_키_입력
```

### 3. 개발 서버 실행
```bash
npm run dev
```

## 프로젝트 구조
```
src/
├── api/
│   └── rawg.js          # RAWG API 통신 모듈
├── hooks/
│   └── useGameSearch.js # 검색 상태 관리 커스텀 훅
├── components/
│   ├── SearchBar.jsx     # 검색 입력창
│   ├── GameList.jsx      # 게임 목록
│   ├── GameCard.jsx      # 게임 카드
│   ├── GameDetail.jsx    # 게임 상세 모달
│   ├── LoadingSpinner.jsx
│   └── ErrorMessage.jsx
├── App.jsx              # 루트 컴포넌트
└── main.jsx             # 진입점
```

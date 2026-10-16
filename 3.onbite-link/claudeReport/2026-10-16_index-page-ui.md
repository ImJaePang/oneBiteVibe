# 인덱스 페이지 UI 구성 (2026-10-16)

요청: 북마크 서비스 인덱스 페이지 UI (헤더 / 좌측 사이드바 / 메인 그리드)

## 컴포넌트 목록

| 컴포넌트 | 파일 | 역할 | 종류 |
|---|---|---|---|
| Home | `app/page.tsx` | 헤더 + 사이드바 + 메인 레이아웃 조립 | Server |
| Header | `components/Header.tsx` | 상단 헤더. 좌측 "한입 링크" 로고, 우측 새 링크 버튼 | Server |
| NewLinkButton | `components/NewLinkButton.tsx` | "+ 새 링크" 버튼 (동작 미구현) | Server |
| Sidebar | `components/Sidebar.tsx` | 좌측 사이드바. All 버튼 + 폴더 리스트 | Server |
| FolderList | `components/FolderList.tsx` | 폴더 목록 렌더링 | Server |
| LinkGrid | `components/LinkGrid.tsx` | 링크 카드 반응형 그리드 (1~4열) | Server |
| LinkCard | `components/LinkCard.tsx` | 개별 링크 카드 (제목/설명/URL) | Server |

## 기타
- `lib/mockData.ts`: 폴더/링크 목업 데이터 및 타입
- `app/layout.tsx`: 메타데이터 제목을 "한입 링크"로 변경

## 참고 / 후속 과제
- 모든 컴포넌트가 정적이라 `"use client"` 없음. 상호작용(폴더 선택, 새 링크 모달) 추가 시 해당 컴포넌트만 Client로 전환.
- 요청의 "새 랭크버튼"은 "새 링크 버튼"으로 해석.

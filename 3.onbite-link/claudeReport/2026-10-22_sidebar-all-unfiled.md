# 사이드바 '전체' / '미분류' 보기 (2026-10-22)

요청: 좌측 사이드바에서 전체 링크와 미분류(폴더 없는) 링크를 볼 수 있게

## 컴포넌트 목록

| 컴포넌트 | 파일 | 역할 | 종류 | 변경 |
|---|---|---|---|---|
| Sidebar | `components/Sidebar.tsx` | 기존 동작 없던 "All" 버튼 → "전체"(`/`) 링크, "미분류"(`/unfiled`) 링크 추가 | Server | 수정 |
| UnfiledPage | `app/unfiled/page.tsx` | 미분류 링크 페이지 | Server | 신규 |
| LinkGrid | `components/LinkGrid.tsx` | `unfiled` prop 추가: `folderId` 가 없는 링크만 표시 | Client | 수정 |

## 재사용한 기존 컴포넌트
`AppShell`, `LinkCard`, `FolderList`.

## 참고 / 후속 과제
- 미분류 = `folder_id` 가 null 인 링크 (폴더 삭제로 비워진 링크 포함).
- 현재 페이지 강조 표시(active)는 폴더 항목과 동일하게 없음.
- `tsc --noEmit` 통과. 브라우저 동작은 직접 확인하지 못함.

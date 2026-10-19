# 폴더 추가 기능 (2026-10-19)

요청: 헤더에 새 폴더 버튼 → 모달에서 이름 입력/저장 → 사이드바에 새 폴더 표시 (`prompt.md`)

## 컴포넌트 목록

| 컴포넌트 | 파일 | 역할 | 종류 | 변경 |
|---|---|---|---|---|
| FolderProvider | `components/FolderProvider.tsx` | 폴더 목록 state + `addFolder` 를 context로 공유, `useFolders` 훅 제공 | Client | 신규 |
| NewFolderButton | `components/NewFolderButton.tsx` | "+ 새 폴더" 보조 버튼, 모달 열림 상태 관리 | Client | 신규 |
| NewFolderModal | `components/NewFolderModal.tsx` | 화면 가운데 모달. 폴더 이름 인풋, 취소/저장 버튼. 빈 이름이면 저장 비활성, Esc/배경 클릭/취소로 닫힘 | Client | 신규 |
| Header | `components/Header.tsx` | 새 링크 버튼 좌측에 NewFolderButton 배치 | Server | 수정 |
| FolderList | `components/FolderList.tsx` | `mockData` 대신 `useFolders()` 로 목록 렌더 → 새 폴더가 사이드바에 표시 | Client | 수정 |
| FolderSelect | `components/FolderSelect.tsx` | 새 링크 폼의 폴더 셀렉트도 `useFolders()` 사용 (새 폴더 선택 가능) | Client | 수정 |
| RootLayout | `app/layout.tsx` | `FolderProvider` 로 children 감쌈 (페이지 이동 시에도 state 유지) | Server | 수정 |
| FolderPage | `app/folder/[id]/page.tsx` | 서버 `notFound()` 검사 제거 | Server | 수정 |

## 기타
- `app/globals.css`: `.btn-secondary:hover` 추가 (재사용: 기존 `.field`, `.btn-primary`, 디자인 토큰)

## 참고 / 후속 과제
- 새 폴더는 메모리(state)에만 저장 → 새로고침하면 사라짐. 영구 저장은 localStorage/API 필요.
- 서버가 새 폴더 id를 알 수 없어 `/folder/[id]` 의 존재하지 않는 id 404 처리를 제거함 (빈 목록으로 표시). 영구 저장 도입 시 복원 필요.
- 중복 폴더명 검사는 하지 않음.

## 수정 이력
- 모달이 화면 상단 밖에 표시되던 문제 수정: 헤더의 `backdrop-blur`(backdrop-filter)가 `fixed` 자식의 기준 박스가 되어 헤더(48px) 기준으로 배치되던 것이 원인. `NewFolderModal` 을 `createPortal(..., document.body)` 로 렌더링하도록 변경.

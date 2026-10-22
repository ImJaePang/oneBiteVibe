# 폴더 삭제 – Supabase 연동 (2026-10-22)

요청: 폴더 삭제 시 `folders` 테이블에서 해당 행 제거 (`prompt.md`)
작업 전 MCP(`list_tables`)로 구조 확인: `folders(id, name, created_at)`, `links.folder_id` → `folders.id` (`ON DELETE SET NULL`).

## 컴포넌트 목록

| 컴포넌트 | 파일 | 역할 | 종류 | 변경 |
|---|---|---|---|---|
| FolderProvider | `components/FolderProvider.tsx` | `removeFolder` 가 DB 에서 id 로 delete 후 성공하면 state 에서 제거 (async) | Client | 수정 |
| DeleteFolderButton | `components/DeleteFolderButton.tsx` | `handleConfirm` 이 삭제 완료를 기다린 뒤 모달 닫기·이동. 실패 시 모달 유지 + `console.error` | Client | 수정 |

## 재사용한 기존 컴포넌트
`DeleteFolderModal`, `ConfirmDeleteModal` — 코드 변경 없음.

## 참고 / 후속 과제
- FK 가 `ON DELETE SET NULL` 이라 폴더를 지워도 소속 링크는 DB 에서 삭제되지 않고 `folder_id` 만 비워짐. (링크는 아직 목업이라 DB 에는 영향 없음)
- 실패 시 사용자용 오류 메시지는 없음.
- `tsc --noEmit` 통과. 브라우저에서 실제 삭제 동작은 직접 확인하지 못함.

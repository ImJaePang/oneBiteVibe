# 링크 삭제 – Supabase 연동 (2026-10-22)

요청: 링크 삭제 시 `links` 테이블에서 해당 행 제거 (`prompt.md`)
작업 전 MCP(`list_tables`)로 `links` 구조 확인 (`id` PK, `folder_id` → `folders.id`).

## 컴포넌트 목록

| 컴포넌트 | 파일 | 역할 | 종류 | 변경 |
|---|---|---|---|---|
| LinkProvider | `components/LinkProvider.tsx` | `removeLink` 가 DB 에서 id 로 delete 후 성공하면 state 에서 제거 (async) | Client | 수정 |
| DeleteLinkButton | `components/DeleteLinkButton.tsx` | 삭제 완료를 기다린 뒤 모달 닫기. 실패 시 모달 유지 + `console.error` | Client | 수정 |

## 재사용한 기존 컴포넌트
`DeleteLinkModal`, `ConfirmDeleteModal` — 변경 없음.

## 참고 / 후속 과제
- 이제 링크 추가·수정·삭제 모두 DB 와 연동됨.
- 실패 시 사용자용 오류 메시지는 없음.
- `tsc --noEmit` 통과. 브라우저에서 실제 삭제 동작은 직접 확인하지 못함.

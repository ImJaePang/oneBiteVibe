# 폴더 이름 수정 – Supabase 연동 (2026-10-22)

요청: 폴더 이름 수정 시 `folders` 테이블에 반영 (`prompt.md`)
작업 전 MCP(`list_tables`)로 `folders(id, name, created_at)` 구조 확인.

## 컴포넌트 목록

| 컴포넌트 | 파일 | 역할 | 종류 | 변경 |
|---|---|---|---|---|
| FolderProvider | `components/FolderProvider.tsx` | `renameFolder` 가 `folders.name` 을 id 로 update 후 성공하면 state 반영 (async). 대상 행이 없으면 오류로 처리 | Client | 수정 |

## 재사용한 기존 컴포넌트
`EditFolderModal`, `FolderNameModal`(이전 작업에서 async onSubmit·중복 제출 방지 이미 적용), `EditFolderButton` — 코드 변경 없음.

## 참고 / 후속 과제
- 삭제는 요청 범위 밖이라 아직 메모리 state 만 변경.
- 수정 실패 시 모달이 열린 채 유지되고 `console.error` 만 출력 (사용자용 오류 메시지 없음).
- `tsc --noEmit` 통과. 브라우저에서 실제 수정 동작은 직접 확인하지 못함.

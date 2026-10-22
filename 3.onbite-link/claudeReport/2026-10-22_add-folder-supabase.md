# 폴더 추가 기능 – Supabase 연동 (2026-10-22)

요청: 새 폴더를 `folders` 테이블에 저장, 중복 클릭 방지, 사이드바에 DB 폴더를 순서대로 표시 (`prompt.md`)
작업 전 MCP(`list_tables`)로 `folders(id bigint identity PK, name text not null, created_at timestamptz default now())` 구조 확인.

## 컴포넌트 목록

| 컴포넌트 | 파일 | 역할 | 종류 | 변경 |
|---|---|---|---|---|
| RootLayout | `app/layout.tsx` | 서버에서 `folders` 를 `created_at, id` 오름차순으로 조회해 `FolderProvider` 에 전달 | Server | 수정 |
| FolderProvider | `components/FolderProvider.tsx` | 목업 대신 `initialFolders` prop 사용. `addFolder` 가 DB insert 후 반환된 행을 state 에 추가 (async) | Client | 수정 |
| FolderNameModal | `components/FolderNameModal.tsx` | 저장 중 `submitting` state + ref 로 중복 제출 차단, 저장 버튼 비활성화. 성공 시에만 닫힘, 실패 시 열린 채 유지 | Client | 수정 |

## 재사용한 기존 컴포넌트
`NewFolderButton`, `NewFolderModal`, `FolderList`(사이드바 목록), `Sidebar` — 코드 변경 없음. `utils/supabase/server.ts`, `client.ts` 사용.

## 참고 / 후속 과제
- 폴더 id 는 DB 에서 숫자(bigint)지만 기존 `Folder` 타입에 맞춰 `String(id)` 로 변환.
- 폴더 **이름 수정·삭제**는 요청 범위 밖이라 아직 메모리 state 만 변경 (새로고침하면 DB 상태로 복원).
- 링크는 여전히 목업 데이터라 `folderId` 가 DB 폴더와 맞지 않음 → DB 폴더의 링크 목록은 비어 보임.
- insert 실패 시 `console.error` 만 하고 사용자용 오류 메시지는 만들지 않음.
- `tsc --noEmit` 통과. 브라우저에서 실제 추가/중복 클릭 동작은 직접 확인하지 못함.
- RLS 가 꺼져 있음 (앞선 보고 참고).

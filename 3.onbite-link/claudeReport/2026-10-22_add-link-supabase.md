# 링크 추가 기능 – Supabase 연동 (2026-10-22)

요청: 새 링크를 `links` 테이블에 저장, 저장 버튼 중복 클릭 방지, 폴더 셀렉트에 DB 폴더 나열, 저장된 링크를 인덱스/폴더 페이지에 표시 (`prompt.md`)
작업 전 MCP(`list_tables`)로 구조 확인: `links(id, url not null, title, description, thumbnail_url, created_at, folder_id → folders.id)`.

## 컴포넌트 목록

| 컴포넌트 | 파일 | 역할 | 종류 | 변경 |
|---|---|---|---|---|
| RootLayout | `app/layout.tsx` | `folders` 와 `links`(최신순)를 서버에서 함께 조회해 각 Provider 에 전달 | Server | 수정 |
| LinkProvider | `components/LinkProvider.tsx` | 목업 대신 `initialLinks` prop 사용. `addLink` 가 DB insert 후 반환된 행을 목록 맨 앞에 추가 (async) | Client | 수정 |
| NewLinkForm | `components/NewLinkForm.tsx` | `await addLink(...)`, ref 로 중복 제출 차단 (기존 `pending` 은 버튼 비활성화용으로 유지). 실패 시 기존 오류 문구 표시 | Client | 수정 |
| linkRow | `lib/linkRow.ts` | DB 행(`LinkRow`) → `LinkItem` 변환 (`toLinkItem`) | 유틸 | 신규 |

## 재사용한 기존 컴포넌트
`FolderSelect`(이미 `FolderProvider` 의 DB 폴더를 나열 — 변경 없음), `SaveButton`, `LinkUrlInput`, `LinkGrid`(인덱스·폴더 페이지 공용, 폴더 id 로 필터 — 변경 없음), `LinkCard`.

## 참고 / 후속 과제
- 링크 **수정·삭제**는 요청 범위 밖이라 아직 메모리 state 만 변경 (새로고침하면 DB 상태로 복원).
- DB 의 `title/description` 이 null 이면 빈 문자열, `folder_id` 가 null 이면 `folderId` 는 빈 문자열(= 어느 폴더 페이지에도 안 나오고 인덱스에만 표시).
- 폴더 삭제 후에도 이미 로드된 링크는 화면 state 에 남아 있다가 새로고침하면 `folder_id` 없는 링크로 바뀜.
- `lib/mockData.ts` 의 `links`/`folders` 목업은 더 이상 쓰이지 않지만 삭제하지 않음 (타입은 사용 중).
- `tsc --noEmit` 통과. 브라우저에서 실제 저장/표시 동작은 직접 확인하지 못함.
- RLS 꺼져 있음.

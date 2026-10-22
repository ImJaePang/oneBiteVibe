# 링크 수정 – Supabase 연동 (2026-10-22)

요청: 링크 수정 시 변경 정보를 `links` 테이블에 업데이트 (`prompt.md`)
작업 전 MCP(`list_tables`)로 `links(id, url, title, description, thumbnail_url, created_at, folder_id)` 구조 확인.

## 컴포넌트 목록

| 컴포넌트 | 파일 | 역할 | 종류 | 변경 |
|---|---|---|---|---|
| LinkProvider | `components/LinkProvider.tsx` | `updateLink` 가 `folder_id`·`title`·`description` 을 id 로 update 후 성공하면 state 반영 (async). 대상 행이 없으면 오류 | Client | 수정 |
| EditLinkModal | `components/EditLinkModal.tsx` | 저장 완료를 기다린 뒤 닫기. 저장 중 중복 제출 차단·`SaveButton` pending 표시. 실패 시 모달 유지 + `console.error` | Client | 수정 |

## 재사용한 기존 컴포넌트
`EditLinkButton`, `FolderSelect`, `LinkTitleInput`, `LinkDescriptionInput`, `SaveButton`, `Modal` — 변경 없음(`SaveButton` 의 기존 `pending` prop 사용).

## 참고 / 후속 과제
- 링크 **삭제**는 요청 범위 밖이라 아직 메모리 state 만 변경.
- URL·썸네일은 수정 대상이 아니라 그대로 유지.
- 실패 시 사용자용 오류 메시지는 없음.
- `tsc --noEmit` 통과. 브라우저에서 실제 수정 동작은 직접 확인하지 못함.

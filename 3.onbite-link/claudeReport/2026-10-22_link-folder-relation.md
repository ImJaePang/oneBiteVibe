# 링크스–폴더스 테이블 연결 (2026-10-22)

요청: `links.folder_id` 추가 + `folders.id` 외래키 (`prompt.md`)

## 컴포넌트 목록

DB 스키마 작업이라 변경/추가된 React 컴포넌트는 없음.

| 대상 | 종류 | 역할 | 변경 |
|---|---|---|---|
| `public.links.folder_id` 컬럼 | Supabase (마이그레이션 `add_folder_id_to_links`) | 링크가 속한 폴더 참조 | 신규 |

## 스키마

| 컬럼 | 타입 | 제약 |
|---|---|---|
| folder_id | bigint | nullable, FK → `folders.id`, `ON DELETE SET NULL` |

- 폴더를 삭제하면 해당 폴더의 링크는 삭제되지 않고 `folder_id`만 NULL 로 바뀜.

## 참고 / 후속 과제
- 앱 코드는 아직 DB와 연결되지 않음 (메모리 state). 연결 시 폴더 삭제 동작이 현재 UI(링크도 함께 사라지는지 등)와 맞는지 확인 필요.
- 마이그레이션 적용 결과를 목록 조회로 재확인하지는 않음.

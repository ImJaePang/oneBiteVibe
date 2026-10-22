# 폴더스 테이블 생성 (2026-10-22)

요청: Supabase에 `folders` 테이블 생성 (`prompt.md`)

## 컴포넌트 목록

DB 스키마 작업이라 변경/추가된 React 컴포넌트는 없음.

| 대상 | 종류 | 역할 | 변경 |
|---|---|---|---|
| `public.folders` 테이블 | Supabase (마이그레이션 `create_folders_table`) | 폴더 저장소 | 신규 |

## 스키마

| 컬럼 | 타입 | 제약 |
|---|---|---|
| id | bigint | PK, `generated always as identity` (오토 인크리먼트) |
| name | text | NOT NULL |
| created_at | timestamptz | NOT NULL, default `now()` |

- RLS: 비활성화 (요청대로)

## 참고 / 후속 과제
- RLS가 꺼져 있어 anon 키만 있으면 누구나 읽기/쓰기 가능. 배포 전 활성화 + 정책 필요:
  `ALTER TABLE "public"."folders" ENABLE ROW LEVEL SECURITY;`
- `links` 테이블과 연결하는 `folder_id` 외래키는 요청 범위에 없어 추가하지 않음.
- 앱 코드(`FolderProvider` 등)는 아직 이 테이블과 연결되지 않음 (메모리 state).

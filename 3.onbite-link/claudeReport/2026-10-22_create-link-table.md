# 링크 테이블 생성 (2026-10-22)

요청: Supabase에 `link` 테이블 생성 (`prompt.md`)

## 컴포넌트 목록

이번 작업은 DB 스키마 작업이라 변경/추가된 React 컴포넌트는 없음.

| 대상 | 종류 | 역할 | 변경 |
|---|---|---|---|
| `public.links` 테이블 | Supabase (마이그레이션 `create_link_table`) | 링크 저장소 | 신규 |

## 스키마

| 컬럼 | 타입 | 제약 |
|---|---|---|
| id | bigint | PK, `generated always as identity` (오토 인크리먼트) |
| url | text | NOT NULL |
| title | text | 선택 (nullable) |
| description | text | 선택 (nullable) |
| thumbnail_url | text | 선택 (nullable) |
| created_at | timestamptz | NOT NULL, default `now()` |

- RLS: 비활성화 (요청대로)

## 참고 / 후속 과제
- RLS가 꺼져 있어 anon 키만 있으면 누구나 읽기/쓰기 가능 (Supabase 보안 경고). 배포 전 RLS 활성화 + 정책 추가 필요:
  `ALTER TABLE "public"."links" ENABLE ROW LEVEL SECURITY;`
- 테이블 이름은 처음 `link`로 만들었다가 요청에 따라 `links`로 변경함 (마이그레이션 `rename_link_to_links`).
- 폴더 연결용 컬럼(folder_id)은 요청 범위에 없어 추가하지 않음.
- 앱 코드(`LinkProvider` 등)는 아직 이 테이블과 연결되지 않음 (여전히 메모리 state).

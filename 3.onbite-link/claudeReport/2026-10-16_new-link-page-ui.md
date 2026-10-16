# 새 링크 페이지 UI (2026-10-16)

요청: `/new` 페이지 구현, 인덱스의 "+ 새 링크" 버튼 클릭 시 이동
이전 보고서 참고: `2026-10-16_index-page-ui.md` (Header/Sidebar/FolderList 등 재사용)

## 신규 컴포넌트

| 컴포넌트 | 파일 | 역할 |
|---|---|---|
| NewLinkPage | `app/new/page.tsx` | `/new` 라우트. AppShell + NewLinkForm 조립 |
| AppShell | `components/AppShell.tsx` | 헤더 + 사이드바 + 메인(children) 공통 레이아웃 |
| NewLinkForm | `components/NewLinkForm.tsx` | 폼 컨테이너 (입력 + 셀렉트 + 저장) |
| LinkUrlInput | `components/LinkUrlInput.tsx` | 링크 URL 입력 인풋 |
| FolderSelect | `components/FolderSelect.tsx` | 폴더 선택 셀렉트 (mockData 폴더 사용) |
| SaveButton | `components/SaveButton.tsx` | 저장 버튼 (동작 미구현) |

## 수정된 컴포넌트

| 컴포넌트 | 변경 |
|---|---|
| NewLinkButton | `<button>` → `next/link`의 `<Link href="/new">` |
| Home (`app/page.tsx`) | 레이아웃을 AppShell로 분리해 사용 (화면 변화 없음) |

## 재사용
Header, Sidebar, FolderList, NewLinkButton을 AppShell 경유로 그대로 사용.

## 후속 과제
- 저장 동작(Server Action)과 폴더 선택 시 필터링은 미구현.
- 모두 서버 컴포넌트, `"use client"` 없음.

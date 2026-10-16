# 폴더별 링크 페이지 UI (2026-10-16)

요청: `/folder/폴더아이디` 페이지, 사이드바 폴더 클릭 시 이동
이전 보고서 참고: `index-page-ui`, `new-link-page-ui` (AppShell, LinkGrid, FolderList 재사용)

## 신규 컴포넌트
| 컴포넌트 | 파일 | 역할 |
|---|---|---|
| FolderPage | `app/folder/[id]/page.tsx` | 동적 라우트. params의 id로 AppShell + LinkGrid 조립. 없는 폴더 id는 404 |

## 수정된 컴포넌트
| 컴포넌트 | 변경 |
|---|---|
| FolderList | 폴더 `<button>` → `<Link href="/folder/{id}">` |
| LinkGrid | 선택적 `folderId` prop 추가(해당 폴더 링크만 표시), 빈 상태 문구 추가 |

## 재사용
AppShell(Header+Sidebar), LinkGrid, LinkCard를 인덱스와 동일하게 사용.

## 후속 과제
- 사이드바 All 버튼은 아직 `/`로 이동하지 않음(요청 범위 밖).
- 현재 폴더 활성 표시 미구현.

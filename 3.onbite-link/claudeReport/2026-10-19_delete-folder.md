# 폴더 삭제 기능 (2026-10-19)

요청: 사이드바 폴더 호버 시 우측에 휴지통 아이콘 → 클릭 시 확인 모달 → 삭제 (`prompt.md`)

## 컴포넌트 목록

| 컴포넌트 | 파일 | 역할 | 종류 | 변경 |
|---|---|---|---|---|
| Modal | `components/Modal.tsx` | 공통 모달 셸(포털, 오버레이, 제목, Esc/배경 클릭 닫기). 기존 NewFolderModal 의 껍데기를 추출 | Client | 신규 |
| DeleteFolderModal | `components/DeleteFolderModal.tsx` | "폴더 이름 + 정말 삭제하시겠습니까?" 확인 모달. 취소(기본 포커스)/삭제(에러 색) | Client | 신규 |
| DeleteFolderButton | `components/DeleteFolderButton.tsx` | 휴지통 SVG 아이콘 버튼 + 모달 열림 상태. 확인 시 삭제, 보고 있던 폴더면 `/` 로 이동 | Client | 신규 |
| FolderList | `components/FolderList.tsx` | 항목을 `li`(호버 배경) + Link + DeleteFolderButton 구조로 변경 | Client | 수정 |
| FolderProvider | `components/FolderProvider.tsx` | `removeFolder(id)` 추가 | Client | 수정 |
| NewFolderModal | `components/NewFolderModal.tsx` | 공통 `Modal` 을 사용하도록 리팩터링 (동작 동일) | Client | 수정 |

## 기타
- `app/globals.css`: `.folder-delete`(평소 투명, `.folder-item:hover` 또는 키보드 포커스 시 표시, 호버 시 에러 색), `.btn-danger` 추가.

## 참고 / 후속 과제
- 삭제는 메모리(state)에서만 이뤄지며 새로고침하면 목업 폴더가 복원됨.
- 폴더 삭제 시 그 폴더의 링크는 삭제되지 않고 "All" 목록에만 남음(목업 데이터 기준). 링크도 함께 지울지 정책 결정 필요.
- 터치 기기는 호버가 없어 아이콘이 보이지 않음(키보드 포커스로는 표시됨).

## 수정 이력
- 삭제 버튼이 호버 전에도 보이던 문제: 코드의 CSS(`.folder-delete { opacity: 0 }`)는 맞았으나, 개발 서버가 내보내는 CSS 청크가 이전 버전에 머물러 해당 규칙이 빠져 있었음(dev 서버 HMR 미반영). `globals.css` 를 다시 저장해 재빌드시키고 규칙이 서빙되는 것을 확인.
- `.folder-delete` 에 `cursor: pointer` 추가, 버튼 호버 배경을 연한 빨강(`color-mix`, 에러 색 12%)으로 변경(아이콘은 에러 색 유지).

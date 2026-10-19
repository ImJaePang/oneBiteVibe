# 폴더 수정 기능 (2026-10-19)

요청: 사이드바 폴더 호버 시 이름 우측에 연필 아이콘 → 클릭 시 폴더 이름 수정 모달 (`prompt.md`)

## 컴포넌트 목록

| 컴포넌트 | 파일 | 역할 | 종류 | 변경 |
|---|---|---|---|---|
| FolderNameModal | `components/FolderNameModal.tsx` | 폴더 이름 입력 모달 공통부(제목/초기값/취소·저장). 열릴 때 기존 이름 전체 선택, 빈 이름 저장 비활성. 기존 NewFolderModal 본문을 추출 | Client | 신규 |
| EditFolderModal | `components/EditFolderModal.tsx` | 수정 모달. 현재 이름을 채워 `renameFolder` 호출 | Client | 신규 |
| EditFolderButton | `components/EditFolderButton.tsx` | 연필 SVG 아이콘 버튼 + 모달 열림 상태 | Client | 신규 |
| NewFolderModal | `components/NewFolderModal.tsx` | `FolderNameModal` 을 쓰는 얇은 래퍼로 축소 (동작 동일) | Client | 수정 |
| FolderProvider | `components/FolderProvider.tsx` | `renameFolder(id, name)` 추가 | Client | 수정 |
| FolderList | `components/FolderList.tsx` | 이름 우측에 수정·삭제 버튼 그룹 배치 | Client | 수정 |
| DeleteFolderButton | `components/DeleteFolderButton.tsx` | 공통 클래스 `folder-action` 적용 | Client | 수정 |

## 기타
- `app/globals.css`: `.folder-delete` → 공통 `.folder-action`(호버 시 표시, pointer 커서)으로 분리. `.folder-edit:hover`(액센트 색), `.folder-delete:hover`(에러 색) 추가.

## 참고 / 후속 과제
- 수정도 메모리(state)에만 반영되어 새로고침하면 원래 이름으로 복원됨.
- 이름이 바뀌어도 id 는 유지되므로 `/folder/[id]` URL 은 그대로 동작.
- 중복 폴더명 검사는 하지 않음.

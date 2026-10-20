# 링크 삭제 기능 (2026-10-20)

요청: 링크 카드 호버 시 우측 상단에 휴지통 버튼 → 클릭 시 확인 모달 (`prompt.md`)

## 컴포넌트 목록

| 컴포넌트 | 파일 | 역할 | 종류 | 변경 |
|---|---|---|---|---|
| DeleteLinkButton | `components/DeleteLinkButton.tsx` | 카드 우측 상단 휴지통 버튼 + 모달 열림 상태. 확인 시 `removeLink` 호출 | Client | 신규 |
| DeleteLinkModal | `components/DeleteLinkModal.tsx` | "링크 삭제" 확인 문구(링크 제목 표시) | Client | 신규 |
| ConfirmDeleteModal | `components/ConfirmDeleteModal.tsx` | 삭제 확인 모달 공통부(문구 + 취소/삭제). 기존 DeleteFolderModal 본문을 추출 | Client | 신규 |
| TrashIcon | `components/TrashIcon.tsx` | 휴지통 SVG. DeleteFolderButton 에 있던 것을 추출 | Server | 신규 |
| LinkCard | `components/LinkCard.tsx` | `<a>` 를 `relative` 래퍼로 감싸고 `DeleteLinkButton` 을 형제로 배치 (`<a>` 안에 버튼 중첩 방지) | Server | 수정 |
| LinkProvider | `components/LinkProvider.tsx` | `removeLink(id)` 추가 | Client | 수정 |
| DeleteFolderModal | `components/DeleteFolderModal.tsx` | `ConfirmDeleteModal` 을 쓰는 얇은 래퍼로 축소 (동작 동일) | Client | 수정 |
| DeleteFolderButton | `components/DeleteFolderButton.tsx` | 인라인 SVG → `TrashIcon` | Client | 수정 |

## 기타
- `app/globals.css`: 폴더 버튼용 `.folder-action` 호버 규칙에 `.link-item:hover` 추가 (표시 방식·색 재사용).

## 참고 / 후속 과제
- 삭제도 메모리(state)에만 반영되어 새로고침하면 복원됨.
- 휴지통 버튼은 카드에 마우스를 올리거나 키보드 포커스 시 나타남. 터치 기기에는 호버가 없어 상시 표시 여부는 별도 검토 필요.
- 브라우저에서 호버/모달 동작은 직접 확인하지 못했고 `tsc --noEmit` 만 통과 확인.

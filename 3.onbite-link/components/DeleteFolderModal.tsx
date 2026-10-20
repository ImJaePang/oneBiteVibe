"use client";

import type { Folder } from "@/lib/mockData";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

type DeleteFolderModalProps = {
  folder: Folder;
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteFolderModal({
  folder,
  onConfirm,
  onClose,
}: DeleteFolderModalProps) {
  return (
    <ConfirmDeleteModal title="폴더 삭제" onConfirm={onConfirm} onClose={onClose}>
      <strong className="font-semibold">{folder.name}</strong> 폴더를 정말
      삭제하시겠습니까?
    </ConfirmDeleteModal>
  );
}

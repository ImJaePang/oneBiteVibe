"use client";

import type { Folder } from "@/lib/mockData";
import Modal from "./Modal";

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
    <Modal title="폴더 삭제" onClose={onClose}>
      <p className="text-base text-[var(--text)]">
        <strong className="font-semibold">{folder.name}</strong> 폴더를 정말
        삭제하시겠습니까?
      </p>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          autoFocus
          onClick={onClose}
          className="btn-secondary rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)]"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="btn-danger rounded-md bg-[var(--error)] px-4 py-2 text-sm text-white"
        >
          삭제
        </button>
      </div>
    </Modal>
  );
}

"use client";

import Modal from "./Modal";

type ConfirmDeleteModalProps = {
  title: string;
  children: React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmDeleteModal({
  title,
  children,
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) {
  return (
    <Modal title={title} onClose={onClose}>
      <p className="text-base text-[var(--text)]">{children}</p>
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

"use client";

import { useRef, useState } from "react";
import Modal from "./Modal";

type FolderNameModalProps = {
  title: string;
  initialName?: string;
  onSubmit: (name: string) => void | Promise<void>;
  onClose: () => void;
};

export default function FolderNameModal({
  title,
  initialName = "",
  onSubmit,
  onClose,
}: FolderNameModalProps) {
  const [name, setName] = useState(initialName);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const trimmed = name.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed || submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    try {
      await onSubmit(trimmed);
      onClose();
    } catch (error) {
      console.error(error);
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text)]">
          폴더 이름
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => e.currentTarget.select()}
            placeholder="폴더 이름을 입력하세요"
            className="field rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]"
          />
        </label>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)]"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!trimmed || submitting}
            className="btn-primary rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            저장
          </button>
        </div>
      </form>
    </Modal>
  );
}

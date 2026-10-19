"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useFolders } from "./FolderProvider";

export default function NewFolderModal({ onClose }: { onClose: () => void }) {
  const { addFolder } = useFolders();
  const [name, setName] = useState("");
  const trimmed = name.trim();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed) return;
    addFolder(trimmed);
    onClose();
  };

  // 헤더의 backdrop-filter 가 fixed 의 기준 박스가 되므로 body 로 포털 렌더링
  return createPortal(
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-[var(--text)]/30 p-6"
      onClick={onClose}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-folder-title"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6"
      >
        <h2
          id="new-folder-title"
          className="text-xl font-semibold leading-tight text-[var(--text)]"
        >
          새 폴더
        </h2>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text)]">
          폴더 이름
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            disabled={!trimmed}
            className="btn-primary rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            저장
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}

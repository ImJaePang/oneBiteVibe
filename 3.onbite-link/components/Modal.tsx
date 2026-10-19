"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ title, onClose, children }: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // 헤더의 backdrop-filter 가 fixed 의 기준 박스가 되므로 body 로 포털 렌더링
  return createPortal(
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-[var(--text)]/30 p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6"
      >
        <h2
          id={titleId}
          className="text-xl font-semibold leading-tight text-[var(--text)]"
        >
          {title}
        </h2>
        {children}
      </div>
    </div>,
    document.body,
  );
}

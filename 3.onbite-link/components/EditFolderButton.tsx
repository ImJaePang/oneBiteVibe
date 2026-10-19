"use client";

import { useState } from "react";
import type { Folder } from "@/lib/mockData";
import EditFolderModal from "./EditFolderModal";

export default function EditFolderButton({ folder }: { folder: Folder }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={`${folder.name} 폴더 이름 수정`}
        onClick={() => setOpen(true)}
        className="folder-action folder-edit shrink-0 rounded-md p-1.5 text-[var(--text-sub)]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </button>
      {open && <EditFolderModal folder={folder} onClose={() => setOpen(false)} />}
    </>
  );
}

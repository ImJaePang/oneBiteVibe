"use client";

import { useState } from "react";
import type { Folder } from "@/lib/mockData";
import EditFolderModal from "./EditFolderModal";
import PencilIcon from "./PencilIcon";

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
        <PencilIcon />
      </button>
      {open && <EditFolderModal folder={folder} onClose={() => setOpen(false)} />}
    </>
  );
}

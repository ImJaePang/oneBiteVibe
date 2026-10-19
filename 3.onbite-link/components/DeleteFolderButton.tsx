"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Folder } from "@/lib/mockData";
import DeleteFolderModal from "./DeleteFolderModal";
import { useFolders } from "./FolderProvider";

export default function DeleteFolderButton({ folder }: { folder: Folder }) {
  const [open, setOpen] = useState(false);
  const { removeFolder } = useFolders();
  const pathname = usePathname();
  const router = useRouter();

  const handleConfirm = () => {
    removeFolder(folder.id);
    setOpen(false);
    // 삭제한 폴더를 보고 있었다면 전체 목록으로 이동
    if (pathname === `/folder/${folder.id}`) router.push("/");
  };

  return (
    <>
      <button
        type="button"
        aria-label={`${folder.name} 폴더 삭제`}
        onClick={() => setOpen(true)}
        className="folder-delete shrink-0 rounded-md p-1.5 text-[var(--text-sub)]"
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
          <path d="M3 6h18" />
          <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      </button>
      {open && (
        <DeleteFolderModal
          folder={folder}
          onConfirm={handleConfirm}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

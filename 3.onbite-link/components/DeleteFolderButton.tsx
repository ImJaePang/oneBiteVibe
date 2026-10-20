"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Folder } from "@/lib/mockData";
import DeleteFolderModal from "./DeleteFolderModal";
import { useFolders } from "./FolderProvider";
import TrashIcon from "./TrashIcon";

export default function DeleteFolderButton({ folder }: { folder: Folder }) {
  const [open, setOpen] = useState(false);
  const { removeFolder } = useFolders();
  const router = useRouter();

  const handleConfirm = () => {
    removeFolder(folder.id);
    setOpen(false);
    // 렌더링 중 usePathname() 을 쓰면 프리렌더링이 막혀서 이벤트 시점에 읽음
    // 삭제한 폴더를 보고 있었다면 전체 목록으로 이동
    if (window.location.pathname === `/folder/${folder.id}`) router.push("/");
  };

  return (
    <>
      <button
        type="button"
        aria-label={`${folder.name} 폴더 삭제`}
        onClick={() => setOpen(true)}
        className="folder-action folder-delete shrink-0 rounded-md p-1.5 text-[var(--text-sub)]"
      >
        <TrashIcon />
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

"use client";

import { useFolders } from "./FolderProvider";
import FolderNameModal from "./FolderNameModal";

export default function NewFolderModal({ onClose }: { onClose: () => void }) {
  const { addFolder } = useFolders();

  return (
    <FolderNameModal title="새 폴더" onSubmit={addFolder} onClose={onClose} />
  );
}

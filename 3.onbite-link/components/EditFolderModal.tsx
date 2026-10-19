"use client";

import type { Folder } from "@/lib/mockData";
import FolderNameModal from "./FolderNameModal";
import { useFolders } from "./FolderProvider";

type EditFolderModalProps = {
  folder: Folder;
  onClose: () => void;
};

export default function EditFolderModal({
  folder,
  onClose,
}: EditFolderModalProps) {
  const { renameFolder } = useFolders();

  return (
    <FolderNameModal
      title="폴더 이름 수정"
      initialName={folder.name}
      onSubmit={(name) => renameFolder(folder.id, name)}
      onClose={onClose}
    />
  );
}

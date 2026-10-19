"use client";

import { useFolders } from "./FolderProvider";

export default function FolderSelect() {
  const { folders } = useFolders();

  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text)]">
      폴더
      <select
        name="folderId"
        defaultValue=""
        className="field rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]"
      >
        <option value="" disabled>
          폴더를 선택하세요
        </option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </label>
  );
}

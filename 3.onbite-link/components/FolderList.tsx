"use client";

import Link from "next/link";
import DeleteFolderButton from "./DeleteFolderButton";
import { useFolders } from "./FolderProvider";

export default function FolderList() {
  const { folders } = useFolders();

  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => (
        <li
          key={folder.id}
          className="folder-item nav-hover flex items-center rounded-md pr-1"
        >
          <Link
            href={`/folder/${folder.id}`}
            className="block min-w-0 flex-1 truncate px-3 py-2 text-left text-sm text-[var(--text)]"
          >
            📁 {folder.name}
          </Link>
          <DeleteFolderButton folder={folder} />
        </li>
      ))}
    </ul>
  );
}

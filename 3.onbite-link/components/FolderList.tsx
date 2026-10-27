"use client";

import DeleteFolderButton from "./DeleteFolderButton";
import EditFolderButton from "./EditFolderButton";
import { useFolders } from "./FolderProvider";
import NavLink from "./NavLink";

export default function FolderList() {
  const { folders } = useFolders();

  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => (
        <li
          key={folder.id}
          className="folder-item nav-hover flex items-center rounded-md pr-1"
        >
          <NavLink
            href={`/folder/${folder.id}`}
            className="block min-w-0 flex-1 truncate px-3 py-2 text-left text-sm text-[var(--text)]"
          >
            📁 {folder.name}
          </NavLink>
          <div className="flex shrink-0 items-center gap-0.5">
            <EditFolderButton folder={folder} />
            <DeleteFolderButton folder={folder} />
          </div>
        </li>
      ))}
    </ul>
  );
}

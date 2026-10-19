import Link from "next/link";
import { folders } from "@/lib/mockData";

export default function FolderList() {
  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => (
        <li key={folder.id}>
          <Link
            href={`/folder/${folder.id}`}
            className="nav-hover block w-full rounded-md px-3 py-2 text-left text-sm text-[var(--text)]"
          >
            📁 {folder.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

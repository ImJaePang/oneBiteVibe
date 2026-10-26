import Link from "next/link";
import FolderList from "./FolderList";
import LogoutButton from "./LogoutButton";

const navClassName =
  "nav-hover block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-[var(--text)]";

export default function Sidebar() {
  return (
    <aside className="w-56 flex shrink-0 flex-col border-r border-[var(--border)] p-4">
      <nav className="mb-2 flex flex-col gap-1">
        <Link href="/" className={navClassName}>
          전체
        </Link>
        <Link href="/unfiled" className={navClassName}>
          미분류
        </Link>
      </nav>
      <FolderList />
      <LogoutButton className={`${navClassName} mt-auto disabled:opacity-40`} />
    </aside>
  );
}

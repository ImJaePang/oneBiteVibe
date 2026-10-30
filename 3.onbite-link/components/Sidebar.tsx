import Link from "next/link";
import FolderList from "./FolderList";
import LogoutButton from "./LogoutButton";
import NavLink from "./NavLink";

const navClassName =
  "nav-hover block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-[var(--text)]";

export default function Sidebar() {
  return (
    <aside className="w-56 flex shrink-0 flex-col border-r border-[var(--border)] p-4">
      <nav className="mb-2 flex flex-col gap-1">
        <NavLink href="/" className={navClassName}>
          전체
        </NavLink>
        <NavLink href="/unfiled" className={navClassName}>
          미분류
        </NavLink>
      </nav>
      <FolderList />
      <div className="mt-auto flex flex-col gap-1">
        <LogoutButton className={`${navClassName} disabled:opacity-40`} />
        <Link
          href="/privacy"
          className="nav-hover block w-full rounded-md px-3 py-2 text-left text-xs text-gray-500"
        >
          개인정보 처리방침
        </Link>
      </div>
    </aside>
  );
}

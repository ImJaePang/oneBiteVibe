import FolderList from "./FolderList";

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-[var(--border)] p-4">
      <button
        type="button"
        className="nav-hover mb-2 w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-[var(--text)]"
      >
        All
      </button>
      <FolderList />
    </aside>
  );
}

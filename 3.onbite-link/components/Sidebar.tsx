import FolderList from "./FolderList";

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-foreground/10 p-4">
      <button
        type="button"
        className="mb-4 w-full rounded-md bg-foreground/10 px-3 py-2 text-left text-sm font-semibold"
      >
        All
      </button>
      <FolderList />
    </aside>
  );
}

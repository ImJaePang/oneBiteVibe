import { folders } from "@/lib/mockData";

export default function FolderSelect() {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      폴더
      <select
        name="folderId"
        defaultValue=""
        className="rounded-md border border-foreground/20 bg-background px-3 py-2 font-normal outline-none focus:border-foreground"
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

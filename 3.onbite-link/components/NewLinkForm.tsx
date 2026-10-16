import FolderSelect from "./FolderSelect";
import LinkUrlInput from "./LinkUrlInput";
import SaveButton from "./SaveButton";

export default function NewLinkForm() {
  return (
    <section className="flex-1 p-6">
      <form className="flex max-w-xl flex-col gap-5">
        <h2 className="text-xl font-bold">새 링크 추가</h2>
        <LinkUrlInput />
        <FolderSelect />
        <SaveButton />
      </form>
    </section>
  );
}

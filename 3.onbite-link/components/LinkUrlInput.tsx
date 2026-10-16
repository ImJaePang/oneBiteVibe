export default function LinkUrlInput() {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      링크
      <input
        type="url"
        name="url"
        placeholder="https://example.com"
        className="rounded-md border border-foreground/20 bg-transparent px-3 py-2 font-normal outline-none focus:border-foreground"
      />
    </label>
  );
}

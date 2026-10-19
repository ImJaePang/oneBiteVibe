export default function LinkUrlInput() {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text)]">
      링크
      <input
        type="url"
        name="url"
        placeholder="https://example.com"
        className="field rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]"
      />
    </label>
  );
}

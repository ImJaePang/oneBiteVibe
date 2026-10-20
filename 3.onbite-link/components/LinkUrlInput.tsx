type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function LinkUrlInput({ value, onChange }: Props) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text)]">
      링크
      <input
        type="text"
        inputMode="url"
        name="url"
        required
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="example.com 또는 https://example.com"
        className="field rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]"
      />
    </label>
  );
}

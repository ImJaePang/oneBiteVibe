type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function LinkDescriptionInput({ value, onChange }: Props) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text)]">
      설명
      <textarea
        name="description"
        rows={3}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="링크 설명을 입력하세요"
        className="field resize-none rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]"
      />
    </label>
  );
}

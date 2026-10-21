type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function LinkTitleInput({ value, onChange }: Props) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text)]">
      제목
      <input
        type="text"
        name="title"
        required
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="링크 제목을 입력하세요"
        className="field rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]"
      />
    </label>
  );
}

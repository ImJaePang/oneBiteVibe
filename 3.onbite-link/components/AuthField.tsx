type Props = {
  label: string;
  name: string;
  type: "email" | "password";
  placeholder: string;
  autoComplete: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function AuthField({
  label,
  name,
  type,
  placeholder,
  autoComplete,
  value,
  onChange,
}: Props) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text)]">
      {label}
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="field rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]"
      />
    </label>
  );
}

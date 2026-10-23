import Link from "next/link";

type Field = {
  label: string;
  name: string;
  type: "email" | "password";
  placeholder: string;
  autoComplete: string;
};

type Props = {
  title: string;
  fields: Field[];
  submitLabel: string;
  altText: string;
  altLabel: string;
  altHref: string;
};

export default function AuthCard({
  title,
  fields,
  submitLabel,
  altText,
  altLabel,
  altHref,
}: Props) {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold leading-tight text-[var(--text)]">한입 링크</span>
          <h1 className="text-sm text-[var(--text-sub)]">{title}</h1>
        </div>
        <div className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
          {fields.map((f) => (
            <label
              key={f.name}
              className="flex flex-col gap-1.5 text-sm font-medium text-[var(--text)]"
            >
              {f.label}
              <input
                type={f.type}
                name={f.name}
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                className="field rounded-md border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-base font-normal text-[var(--text)]"
              />
            </label>
          ))}
          <button
            type="button"
            className="btn-primary mt-2 cursor-pointer rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white"
          >
            {submitLabel}
          </button>
        </div>
        <p className="text-center text-sm text-[var(--text-sub)]">
          {altText}{" "}
          <Link href={altHref} className="link-hover text-[var(--accent)]">
            {altLabel}
          </Link>
        </p>
      </div>
    </main>
  );
}

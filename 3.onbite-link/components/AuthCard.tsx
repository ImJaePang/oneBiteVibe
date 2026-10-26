import Link from "next/link";

type Props = {
  title: string;
  altText: string;
  altLabel: string;
  altHref: string;
  extraLink?: { label: string; href: string };
  children: React.ReactNode;
};

export default function AuthCard({ title, altText, altLabel, altHref, extraLink, children }: Props) {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl font-bold leading-tight text-[var(--text)]">한입 링크</span>
          <h1 className="text-sm text-[var(--text-sub)]">{title}</h1>
        </div>
        <div className="flex flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
          {children}
        </div>
        <div className="flex flex-col items-center gap-2">
          {extraLink && (
            <Link href={extraLink.href} className="link-hover text-sm text-[var(--accent)]">
              {extraLink.label}
            </Link>
          )}
          <p className="text-center text-sm text-[var(--text-sub)]">
            {altText}{" "}
            <Link href={altHref} className="link-hover text-[var(--accent)]">
              {altLabel}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

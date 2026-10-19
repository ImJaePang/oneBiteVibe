import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-primary rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white"
    >
      + 새 링크
    </Link>
  );
}

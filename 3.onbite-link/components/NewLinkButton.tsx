import Link from "next/link";

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-80"
    >
      + 새 링크
    </Link>
  );
}

import type { LinkItem } from "@/lib/mockData";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4"
    >
      <h3 className="font-semibold text-[var(--text)]">{link.title}</h3>
      <p className="line-clamp-2 text-sm leading-snug text-[var(--text-sub)]">
        {link.description}
      </p>
      <span className="truncate text-[13px] text-[var(--text-sub)]">{link.url}</span>
    </a>
  );
}

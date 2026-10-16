import type { LinkItem } from "@/lib/mockData";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-2 rounded-lg border border-foreground/10 p-4 transition-shadow hover:shadow-md"
    >
      <h3 className="font-semibold">{link.title}</h3>
      <p className="line-clamp-2 text-sm text-foreground/70">{link.description}</p>
      <span className="truncate text-xs text-foreground/50">{link.url}</span>
    </a>
  );
}

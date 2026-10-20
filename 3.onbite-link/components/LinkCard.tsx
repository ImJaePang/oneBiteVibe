import type { LinkItem } from "@/lib/mockData";
import DeleteLinkButton from "./DeleteLinkButton";
import LinkThumbnail from "./LinkThumbnail";

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    // 버튼을 <a> 안에 넣을 수 없어 형제로 두고 우측 상단에 겹침
    <div className="link-item relative">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover flex h-full flex-col gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4"
      >
        {link.thumbnail && <LinkThumbnail src={link.thumbnail} />}
        <h3 className="font-semibold text-[var(--text)]">{link.title}</h3>
        <p className="line-clamp-2 text-sm leading-snug text-[var(--text-sub)]">
          {link.description}
        </p>
        <span className="truncate text-[13px] text-[var(--text-sub)]">{link.url}</span>
      </a>
      <DeleteLinkButton link={link} />
    </div>
  );
}

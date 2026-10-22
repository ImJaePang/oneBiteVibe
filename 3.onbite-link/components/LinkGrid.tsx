"use client";

import LinkCard from "./LinkCard";
import { useLinks } from "./LinkProvider";

export default function LinkGrid({
  folderId,
  unfiled = false,
}: {
  folderId?: string;
  unfiled?: boolean;
}) {
  const { links } = useLinks();
  const items = unfiled
    ? links.filter((link) => !link.folderId)
    : folderId
      ? links.filter((link) => link.folderId === folderId)
      : links;

  return (
    <section className="grid flex-1 grid-cols-1 content-start gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.length === 0 ? (
        <p className="col-span-full text-sm text-[var(--text-sub)]">
          저장된 링크가 없습니다.
        </p>
      ) : (
        items.map((link) => <LinkCard key={link.id} link={link} />)
      )}
    </section>
  );
}

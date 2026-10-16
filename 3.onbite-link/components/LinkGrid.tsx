import { links } from "@/lib/mockData";
import LinkCard from "./LinkCard";

export default function LinkGrid({ folderId }: { folderId?: string }) {
  const items = folderId
    ? links.filter((link) => link.folderId === folderId)
    : links;

  return (
    <section className="grid flex-1 grid-cols-1 content-start gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.length === 0 ? (
        <p className="col-span-full text-sm text-foreground/50">
          저장된 링크가 없습니다.
        </p>
      ) : (
        items.map((link) => <LinkCard key={link.id} link={link} />)
      )}
    </section>
  );
}

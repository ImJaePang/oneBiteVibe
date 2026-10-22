import type { LinkItem } from "./mockData";

export type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
};

// links 테이블 행 → 화면에서 쓰는 LinkItem (id 는 문자열, 빈 값은 빈 문자열)
export function toLinkItem(row: LinkRow): LinkItem {
  return {
    id: String(row.id),
    url: row.url,
    title: row.title ?? "",
    description: row.description ?? "",
    folderId: row.folder_id === null ? "" : String(row.folder_id),
    thumbnail: row.thumbnail_url,
  };
}

import { cookies } from "next/headers";
import { connection } from "next/server";
import { toLinkItem } from "@/lib/linkRow";
import type { Folder, LinkItem } from "@/lib/mockData";
import { createClient } from "@/utils/supabase/server";
import FolderProvider from "./FolderProvider";
import LinkProvider from "./LinkProvider";

// 세션 쿠키를 읽는 요청 시점 데이터 조회라서, 레이아웃에서는 반드시 <Suspense> 안에서 렌더링해야 함
export default async function DataProviders({ children }: { children: React.ReactNode }) {
  const supabase = createClient(await cookies());
  // getUser() 가 세션 만료 비교에 Date.now() 를 쓰므로, 요청 시점으로 확실히 미룸
  await connection();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // 로그인한 사용자의 데이터만 불러옴 (비로그인 상태면 조회하지 않음)
  const [{ data: folderRows }, { data: linkRows }] = user
    ? await Promise.all([
        supabase
          .from("folders")
          .select("id, name")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true })
          .order("id", { ascending: true }),
        supabase
          .from("links")
          .select("id, url, title, description, thumbnail_url, folder_id")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .order("id", { ascending: false }),
      ])
    : [{ data: null }, { data: null }];
  const folders: Folder[] = (folderRows ?? []).map((row) => ({
    id: String(row.id),
    name: row.name,
  }));
  const links: LinkItem[] = (linkRows ?? []).map(toLinkItem);

  return (
    /* 계정이 바뀌면 key 가 달라져 Provider 가 새로 마운트되고, 데이터를 처음부터 다시 받음 */
    <FolderProvider key={user?.id ?? "anonymous"} initialFolders={folders}>
      <LinkProvider key={user?.id ?? "anonymous"} initialLinks={links}>
        {children}
      </LinkProvider>
    </FolderProvider>
  );
}

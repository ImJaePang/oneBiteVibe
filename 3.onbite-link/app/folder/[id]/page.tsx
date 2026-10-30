import type { Metadata } from "next";
import { cookies } from "next/headers";
import AppShell from "@/components/AppShell";
import LinkGrid from "@/components/LinkGrid";
import { pageMetadata } from "@/lib/pageMetadata";
import { createClient } from "@/utils/supabase/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = createClient(await cookies());
  // RLS 로 본인 폴더만 조회됨. 없거나 비로그인이면 기본 제목 사용
  const { data: folder } = await supabase
    .from("folders")
    .select("name")
    .eq("id", id)
    .maybeSingle();

  const name = folder?.name ?? "폴더";
  return pageMetadata(name, `${name} 폴더에 저장된 링크 목록입니다.`);
}

export default async function FolderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AppShell>
      <LinkGrid folderId={id} />
    </AppShell>
  );
}

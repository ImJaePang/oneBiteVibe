import AppShell from "@/components/AppShell";
import LinkGrid from "@/components/LinkGrid";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("전체 링크", "저장한 모든 링크를 한곳에서 확인하세요.");

export default function Home() {
  return (
    <AppShell>
      <LinkGrid />
    </AppShell>
  );
}

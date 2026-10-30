import AppShell from "@/components/AppShell";
import LinkGrid from "@/components/LinkGrid";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("미분류 링크", "폴더에 담지 않은 링크 목록입니다.");

export default function UnfiledPage() {
  return (
    <AppShell>
      <LinkGrid unfiled />
    </AppShell>
  );
}

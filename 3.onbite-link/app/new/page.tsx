import AppShell from "@/components/AppShell";
import NewLinkForm from "@/components/NewLinkForm";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("새 링크 추가", "새로운 링크를 저장하세요.");

export default function NewLinkPage() {
  return (
    <AppShell>
      <NewLinkForm />
    </AppShell>
  );
}

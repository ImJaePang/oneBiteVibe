import AppShell from "@/components/AppShell";
import LinkGrid from "@/components/LinkGrid";

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

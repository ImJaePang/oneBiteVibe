import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import LinkGrid from "@/components/LinkGrid";
import { folders } from "@/lib/mockData";

export default async function FolderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!folders.some((folder) => folder.id === id)) notFound();

  return (
    <AppShell>
      <LinkGrid folderId={id} />
    </AppShell>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import FolderProvider from "@/components/FolderProvider";
import LinkProvider from "@/components/LinkProvider";
import type { Folder } from "@/lib/mockData";
import { createClient } from "@/utils/supabase/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "한입 링크",
  description: "북마크 서비스",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("folders")
    .select("id, name")
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });
  const folders: Folder[] = (data ?? []).map((row) => ({
    id: String(row.id),
    name: row.name,
  }));

  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FolderProvider initialFolders={folders}>
          <LinkProvider>{children}</LinkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}

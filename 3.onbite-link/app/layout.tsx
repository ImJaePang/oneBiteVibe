import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import FolderProvider from "@/components/FolderProvider";
import LinkProvider from "@/components/LinkProvider";
import { toLinkItem } from "@/lib/linkRow";
import type { Folder, LinkItem } from "@/lib/mockData";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// 파비콘은 app/favicon.ico 파일 컨벤션으로 자동 등록됨
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "한입 링크",
    template: "%s | 한입 링크",
  },
  description: "북마크 서비스",
  openGraph: {
    type: "website",
    siteName: "한입 링크",
    title: "한입 링크",
    description: "북마크 서비스",
    locale: "ko_KR",
    images: [{ url: "/thumbnail.png", width: 2400, height: 1260, alt: "한입 링크" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "한입 링크",
    description: "북마크 서비스",
    images: ["/thumbnail.png"],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const supabase = createClient(await cookies());
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
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 계정이 바뀌면 key 가 달라져 Provider 가 새로 마운트되고, 데이터를 처음부터 다시 받음 */}
        <FolderProvider key={user?.id ?? "anonymous"} initialFolders={folders}>
          <LinkProvider key={user?.id ?? "anonymous"} initialLinks={links}>
            {children}
          </LinkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import DataProviders from "@/components/DataProviders";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <DataProviders>{children}</DataProviders>
        </Suspense>
      </body>
    </html>
  );
}

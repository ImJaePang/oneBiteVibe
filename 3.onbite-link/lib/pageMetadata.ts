import type { Metadata } from "next";

const DEFAULT_DESCRIPTION = "북마크 서비스";

// openGraph/twitter 는 상위 layout 과 얕게 병합되어 통째로 덮어써지므로, 페이지별로 이미지까지 함께 채워서 반환
export function pageMetadata(title: string, description = DEFAULT_DESCRIPTION): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "한입 링크",
      locale: "ko_KR",
      title,
      description,
      images: [{ url: "/thumbnail.png", width: 2400, height: 1260, alt: "한입 링크" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/thumbnail.png"],
    },
  };
}

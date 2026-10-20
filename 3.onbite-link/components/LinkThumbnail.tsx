"use client";

import { useState } from "react";

export default function LinkThumbnail({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  // 임의의 외부 도메인 이미지라 next/image 대신 일반 img 사용
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="aspect-[1.91/1] w-full rounded-md border border-[var(--border)] object-cover"
    />
  );
}

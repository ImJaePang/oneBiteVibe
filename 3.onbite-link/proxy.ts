import type { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

// Next 16 에서 middleware 는 proxy 로 이름이 바뀜
export async function proxy(request: NextRequest) {
  return createClient(request);
}

export const config = {
  // 정적 파일·이미지 최적화·OG API 는 세션 갱신 대상에서 제외
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/og|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

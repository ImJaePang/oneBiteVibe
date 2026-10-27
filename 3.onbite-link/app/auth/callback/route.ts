import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

// 비밀번호 재설정 메일 링크와 소셜 로그인(카카오)이 도착하는 곳:
// code 를 세션으로 교환한 뒤 next 경로(기본: 재설정 페이지)로 보냄
export async function GET(request: NextRequest) {
  const { origin, searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  // 오픈 리디렉트 방지: 같은 사이트 내부 경로("/..." 이면서 "//" 가 아닌 것)만 허용
  const isInternal = next !== null && next.startsWith("/") && !next.startsWith("//");
  const isSocial = isInternal && next === "/";

  if (code) {
    const supabase = createClient(await cookies());
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${isInternal ? next : "/reset-password"}`);
    }
  }

  return NextResponse.redirect(
    isSocial ? `${origin}/login?error=oauth_failed` : `${origin}/forgot-password?error=invalid_link`,
  );
}

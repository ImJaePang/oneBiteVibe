import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// 로그인한 사용자만 접근 가능한 경로: 인덱스, 폴더별, 미분류, 새 링크, 비밀번호 재설정(메일 링크로 세션을 얻은 뒤) 페이지
const PROTECTED_PATHS = ["/folder", "/unfiled", "/new", "/reset-password"];

const isProtectedPath = (pathname: string) =>
  pathname === "/" ||
  PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

export const createClient = async (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    },
  );

  // 토큰이 만료됐다면 이 호출에서 갱신되어 setAll 로 쿠키가 반영됨
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isProtectedPath(request.nextUrl.pathname)) {
    const redirectResponse = NextResponse.redirect(
      new URL("/login", request.url),
    );
    // 갱신 과정에서 설정된 쿠키(만료 세션 정리 등)를 리다이렉트 응답에도 유지
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return redirectResponse;
  }

  return supabaseResponse
};

"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import AuthField from "./AuthField";
import Toast from "./Toast";

const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
  email_not_confirmed: "이메일 인증이 완료되지 않았습니다. 메일함을 확인해주세요.",
  validation_failed: "입력한 정보를 다시 확인해주세요.",
  user_banned: "이용이 제한된 계정입니다.",
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
};

export default function LoginForm({ initialError }: { initialError: string | null }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [navigating, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(initialError);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const busy = pending || navigating;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (email === "" || password === "") {
      setToast("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setPending(true);
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) {
      setToast(
        (error.code && ERROR_MESSAGES[error.code]) ||
          "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.",
      );
      setPending(false);
      return;
    }
    // Next 가 이 페이지의 state 를 보존하므로, 로그아웃 후 돌아왔을 때 이전 값이 남지 않게 초기화
    setPending(false);
    setEmail("");
    setPassword("");
    startTransition(() => {
      router.push("/");
      router.refresh();
    });
  }

  async function handleKakaoLogin() {
    if (busy) return;
    setPending(true);
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/` },
    });
    // 성공하면 카카오 인증 페이지로 이동하므로 실패한 경우에만 복구
    if (error) {
      setToast("카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setPending(false);
    }
  }

  return (
    <>
      {toast && <Toast message={toast} />}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthField
          label="이메일"
          name="email"
          type="email"
          placeholder="email@example.com"
          autoComplete="email"
          value={email}
          onChange={setEmail}
        />
        <AuthField
          label="비밀번호"
          name="password"
          type="password"
          placeholder="비밀번호"
          autoComplete="current-password"
          value={password}
          onChange={setPassword}
        />
        <button
          type="submit"
          disabled={busy}
          className="btn-primary mt-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? "로그인 중..." : "로그인"}
        </button>
        <button
          type="button"
          onClick={handleKakaoLogin}
          disabled={busy}
          aria-label="카카오 로그인"
          className="block w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          {/* 카카오 가이드에 따라 비율은 유지하고 가로만 폼 너비에 맞춤 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kakao_login_large_wide.png"
            alt="카카오 로그인"
            width={600}
            height={90}
            className="h-auto w-full"
          />
        </button>
      </form>
    </>
  );
}

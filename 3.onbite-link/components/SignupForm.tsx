"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import AuthField from "./AuthField";
import Toast from "./Toast";

const ERROR_MESSAGES: Record<string, string> = {
  user_already_exists: "이미 가입된 이메일입니다.",
  email_exists: "이미 가입된 이메일입니다.",
  weak_password: "비밀번호가 너무 약합니다. 더 복잡한 비밀번호를 사용해주세요.",
  email_address_invalid: "올바르지 않은 이메일 형식입니다.",
  validation_failed: "입력한 정보를 다시 확인해주세요.",
  signup_disabled: "현재 회원가입이 비활성화되어 있습니다.",
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
  over_email_send_rate_limit: "인증 메일 발송 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
};

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pending, setPending] = useState(false);
  const [navigating, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const busy = pending || navigating;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    if (email === "" || password === "" || passwordConfirm === "") {
      setToast("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setPending(true);
    const { data, error } = await createClient().auth.signUp({ email, password });
    if (error) {
      setToast(
        (error.code && ERROR_MESSAGES[error.code]) ||
          "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.",
      );
      setPending(false);
      return;
    }
    if (!data.session) {
      setToast("이메일 인증이 필요합니다. 메일함을 확인해주세요.");
      setPending(false);
      return;
    }
    // Next 가 이 페이지의 state 를 보존하므로, 다시 돌아왔을 때 이전 값이 남지 않게 초기화
    setPending(false);
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    startTransition(() => {
      router.push("/");
      router.refresh();
    });
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
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
        />
        <AuthField
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />
        <p className="text-xs text-[var(--text-sub)]">
          가입하면{" "}
          <Link href="/privacy" className="link-hover underline">
            개인정보 처리방침
          </Link>
          에 동의한 것으로 간주합니다.
        </p>
        <button
          type="submit"
          disabled={busy}
          className="btn-primary mt-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? "가입 중..." : "회원가입"}
        </button>
      </form>
    </>
  );
}

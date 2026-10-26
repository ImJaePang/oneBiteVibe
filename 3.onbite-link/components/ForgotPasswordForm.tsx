"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import AuthField from "./AuthField";
import Toast from "./Toast";

const ERROR_MESSAGES: Record<string, string> = {
  email_address_invalid: "올바르지 않은 이메일 형식입니다.",
  validation_failed: "입력한 정보를 다시 확인해주세요.",
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
  over_email_send_rate_limit: "메일 발송 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
};

export default function ForgotPasswordForm({ initialError }: { initialError: string | null }) {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [toast, setToast] = useState<string | null>(initialError);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    if (email === "") {
      setToast("이메일을 입력해주세요.");
      return;
    }

    setPending(true);
    const { error } = await createClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    });
    setPending(false);
    if (error) {
      setToast(
        (error.code && ERROR_MESSAGES[error.code]) ||
          "메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.",
      );
      return;
    }
    setToast("비밀번호 재설정 링크를 발송했습니다. 메일함을 확인해주세요.");
    setEmail("");
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
        <button
          type="submit"
          disabled={pending}
          className="btn-primary mt-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "발송 중..." : "재설정 링크 발송"}
        </button>
      </form>
    </>
  );
}

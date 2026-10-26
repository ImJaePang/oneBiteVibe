"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import AuthField from "./AuthField";
import Toast from "./Toast";

const ERROR_MESSAGES: Record<string, string> = {
  same_password: "이전과 다른 비밀번호를 입력해주세요.",
  weak_password: "비밀번호가 너무 약합니다. 더 복잡한 비밀번호를 사용해주세요.",
  validation_failed: "입력한 정보를 다시 확인해주세요.",
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
};

export default function ResetPasswordForm() {
  const router = useRouter();
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
    if (password === "" || passwordConfirm === "") {
      setToast("새 비밀번호를 모두 입력해주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setPending(true);
    const { error } = await createClient().auth.updateUser({ password });
    if (error) {
      setToast(
        (error.code && ERROR_MESSAGES[error.code]) ||
          "비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.",
      );
      setPending(false);
      return;
    }
    // Next 가 이 페이지의 state 를 보존하므로, 다시 돌아왔을 때 이전 값이 남지 않게 초기화
    setPending(false);
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
          label="새 비밀번호"
          name="password"
          type="password"
          placeholder="새 비밀번호"
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
        />
        <AuthField
          label="새 비밀번호 확인"
          name="passwordConfirm"
          type="password"
          placeholder="새 비밀번호 확인"
          autoComplete="new-password"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />
        <button
          type="submit"
          disabled={busy}
          className="btn-primary mt-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? "변경 중..." : "비밀번호 변경"}
        </button>
      </form>
    </>
  );
}

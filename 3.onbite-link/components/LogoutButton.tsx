"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [navigating, startTransition] = useTransition();
  const busy = pending || navigating;

  async function handleLogout() {
    if (busy) return;
    setPending(true);
    const { error } = await createClient().auth.signOut();
    if (error) {
      setPending(false);
      return;
    }
    // Next 가 이 페이지의 state 를 보존하므로, 다시 돌아왔을 때 pending 이 남지 않게 초기화
    setPending(false);
    startTransition(() => {
      router.push("/login");
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={busy}
      className={className}
    >
      {busy ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}

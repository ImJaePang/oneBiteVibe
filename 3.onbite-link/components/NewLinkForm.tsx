"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FolderSelect from "./FolderSelect";
import LinkUrlInput from "./LinkUrlInput";
import { useLinks } from "./LinkProvider";
import SaveButton from "./SaveButton";
import type { OpenGraphData } from "@/lib/openGraph";

// 스킴 없이 입력한 주소(www.naver.com)는 https:// 를 붙여 보정
function normalizeUrl(input: string) {
  const trimmed = input.trim();
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export default function NewLinkForm() {
  const router = useRouter();
  const { addLink } = useLinks();
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(normalizeUrl(url))}`);
      const data: OpenGraphData & { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error);

      addLink({
        url: data.url,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        folderId,
      });
      router.push(`/folder/${folderId}`);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "링크 정보를 가져오지 못했습니다.",
      );
      setPending(false);
    }
  };

  return (
    <section className="flex-1 p-6">
      <form
        onSubmit={handleSubmit}
        className="flex max-w-xl flex-col gap-4 rounded-lg border border-[var(--border)] bg-[var(--card)] p-6"
      >
        <h2 className="text-xl font-semibold leading-tight text-[var(--text)]">
          새 링크 추가
        </h2>
        <LinkUrlInput value={url} onChange={setUrl} />
        <FolderSelect value={folderId} onChange={setFolderId} />
        {error && (
          <p role="alert" className="text-sm text-[var(--error)]">
            {error}
          </p>
        )}
        <SaveButton pending={pending} />
      </form>
    </section>
  );
}

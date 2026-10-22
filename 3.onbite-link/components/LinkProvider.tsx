"use client";

import { createContext, useContext, useState } from "react";
import { toLinkItem } from "@/lib/linkRow";
import type { LinkItem } from "@/lib/mockData";
import { createClient } from "@/utils/supabase/client";

type LinkContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => Promise<void>;
  removeLink: (id: string) => void;
  updateLink: (
    id: string,
    patch: Pick<LinkItem, "folderId" | "title" | "description">,
  ) => Promise<void>;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function useLinks() {
  const value = useContext(LinkContext);
  if (!value) throw new Error("useLinks must be used within LinkProvider");
  return value;
}

export default function LinkProvider({
  initialLinks,
  children,
}: {
  initialLinks: LinkItem[];
  children: React.ReactNode;
}) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  const addLink = async (link: Omit<LinkItem, "id">) => {
    const { data, error } = await createClient()
      .from("links")
      .insert({
        url: link.url,
        title: link.title,
        description: link.description,
        thumbnail_url: link.thumbnail ?? null,
        folder_id: Number(link.folderId),
      })
      .select("id, url, title, description, thumbnail_url, folder_id")
      .single();
    if (error) throw error;
    setLinks((prev) => [toLinkItem(data), ...prev]);
  };

  const removeLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const updateLink = async (
    id: string,
    patch: Pick<LinkItem, "folderId" | "title" | "description">,
  ) => {
    const { error } = await createClient()
      .from("links")
      .update({
        folder_id: patch.folderId ? Number(patch.folderId) : null,
        title: patch.title,
        description: patch.description,
      })
      .eq("id", id)
      .select("id")
      .single();
    if (error) throw error;
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...patch } : link)),
    );
  };

  return (
    <LinkContext.Provider value={{ links, addLink, removeLink, updateLink }}>
      {children}
    </LinkContext.Provider>
  );
}

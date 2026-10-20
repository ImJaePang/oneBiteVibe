"use client";

import { createContext, useContext, useState } from "react";
import { links as initialLinks, type LinkItem } from "@/lib/mockData";

type LinkContextValue = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => void;
};

const LinkContext = createContext<LinkContextValue | null>(null);

export function useLinks() {
  const value = useContext(LinkContext);
  if (!value) throw new Error("useLinks must be used within LinkProvider");
  return value;
}

export default function LinkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  const addLink = (link: Omit<LinkItem, "id">) => {
    setLinks((prev) => [{ ...link, id: crypto.randomUUID() }, ...prev]);
  };

  return (
    <LinkContext.Provider value={{ links, addLink }}>
      {children}
    </LinkContext.Provider>
  );
}

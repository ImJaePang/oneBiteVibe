"use client";

import { createContext, useContext, useState } from "react";
import type { Folder } from "@/lib/mockData";
import { createClient } from "@/utils/supabase/client";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  removeFolder: (id: string) => void;
  renameFolder: (id: string, name: string) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function useFolders() {
  const value = useContext(FolderContext);
  if (!value) throw new Error("useFolders must be used within FolderProvider");
  return value;
}

export default function FolderProvider({
  initialFolders,
  children,
}: {
  initialFolders: Folder[];
  children: React.ReactNode;
}) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = async (name: string) => {
    const { data, error } = await createClient()
      .from("folders")
      .insert({ name })
      .select("id, name")
      .single();
    if (error) throw error;
    setFolders((prev) => [...prev, { id: String(data.id), name: data.name }]);
  };

  const removeFolder = (id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  };

  const renameFolder = (id: string, name: string) => {
    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name } : folder)),
    );
  };

  return (
    <FolderContext.Provider
      value={{ folders, addFolder, removeFolder, renameFolder }}
    >
      {children}
    </FolderContext.Provider>
  );
}

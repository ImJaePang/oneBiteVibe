"use client";

import { createContext, useContext, useState } from "react";
import { folders as initialFolders, type Folder } from "@/lib/mockData";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

export function useFolders() {
  const value = useContext(FolderContext);
  if (!value) throw new Error("useFolders must be used within FolderProvider");
  return value;
}

export default function FolderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = (name: string) => {
    setFolders((prev) => [...prev, { id: crypto.randomUUID(), name }]);
  };

  return (
    <FolderContext.Provider value={{ folders, addFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

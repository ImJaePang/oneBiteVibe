"use client";

import { createContext, useContext, useState } from "react";
import { folders as initialFolders, type Folder } from "@/lib/mockData";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
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
  children,
}: {
  children: React.ReactNode;
}) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = (name: string) => {
    setFolders((prev) => [...prev, { id: crypto.randomUUID(), name }]);
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

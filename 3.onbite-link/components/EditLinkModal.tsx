"use client";

import { useState } from "react";
import type { LinkItem } from "@/lib/mockData";
import FolderSelect from "./FolderSelect";
import LinkDescriptionInput from "./LinkDescriptionInput";
import { useLinks } from "./LinkProvider";
import LinkTitleInput from "./LinkTitleInput";
import Modal from "./Modal";
import SaveButton from "./SaveButton";

type EditLinkModalProps = {
  link: LinkItem;
  onClose: () => void;
};

export default function EditLinkModal({ link, onClose }: EditLinkModalProps) {
  const { updateLink } = useLinks();
  const [folderId, setFolderId] = useState(link.folderId);
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const trimmedTitle = title.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmedTitle) return;
    updateLink(link.id, {
      folderId,
      title: trimmedTitle,
      description: description.trim(),
    });
    onClose();
  };

  return (
    <Modal title="링크 수정" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FolderSelect value={folderId} onChange={setFolderId} />
        <LinkTitleInput value={title} onChange={setTitle} />
        <LinkDescriptionInput value={description} onChange={setDescription} />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)]"
          >
            취소
          </button>
          <SaveButton />
        </div>
      </form>
    </Modal>
  );
}

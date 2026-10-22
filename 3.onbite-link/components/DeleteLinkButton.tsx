"use client";

import { useState } from "react";
import type { LinkItem } from "@/lib/mockData";
import DeleteLinkModal from "./DeleteLinkModal";
import { useLinks } from "./LinkProvider";
import TrashIcon from "./TrashIcon";

export default function DeleteLinkButton({ link }: { link: LinkItem }) {
  const [open, setOpen] = useState(false);
  const { removeLink } = useLinks();

  return (
    <>
      <button
        type="button"
        aria-label={`${link.title} 링크 삭제`}
        onClick={() => setOpen(true)}
        className="folder-action folder-delete absolute right-2 top-2 rounded-md bg-[var(--card)] p-1.5 text-[var(--text-sub)]"
      >
        <TrashIcon />
      </button>
      {open && (
        <DeleteLinkModal
          link={link}
          onConfirm={async () => {
            try {
              await removeLink(link.id);
            } catch (error) {
              console.error(error);
              return;
            }
            setOpen(false);
          }}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

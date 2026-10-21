"use client";

import { useState } from "react";
import type { LinkItem } from "@/lib/mockData";
import EditLinkModal from "./EditLinkModal";
import PencilIcon from "./PencilIcon";

export default function EditLinkButton({ link }: { link: LinkItem }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={`${link.title} 링크 수정`}
        onClick={() => setOpen(true)}
        className="folder-action folder-edit absolute right-10 top-2 rounded-md bg-[var(--card)] p-1.5 text-[var(--text-sub)]"
      >
        <PencilIcon />
      </button>
      {open && <EditLinkModal link={link} onClose={() => setOpen(false)} />}
    </>
  );
}

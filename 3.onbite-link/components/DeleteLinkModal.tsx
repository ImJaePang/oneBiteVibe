"use client";

import type { LinkItem } from "@/lib/mockData";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

type DeleteLinkModalProps = {
  link: LinkItem;
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteLinkModal({
  link,
  onConfirm,
  onClose,
}: DeleteLinkModalProps) {
  return (
    <ConfirmDeleteModal title="링크 삭제" onConfirm={onConfirm} onClose={onClose}>
      <strong className="font-semibold">{link.title}</strong> 링크를 정말
      삭제하시겠습니까?
    </ConfirmDeleteModal>
  );
}

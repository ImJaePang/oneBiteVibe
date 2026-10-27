"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 현재 경로와 href 가 같으면 선택된 항목으로 표시 (aria-current 로 음영 스타일 적용)
export default function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}

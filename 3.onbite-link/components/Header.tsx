import NewLinkButton from "./NewLinkButton";

export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-foreground/10 px-6">
      <span className="text-lg font-bold">한입 링크</span>
      <NewLinkButton />
    </header>
  );
}

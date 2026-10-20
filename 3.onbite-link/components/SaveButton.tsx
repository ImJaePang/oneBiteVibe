export default function SaveButton({ pending = false }: { pending?: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary self-end rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      {pending ? "저장 중..." : "저장"}
    </button>
  );
}

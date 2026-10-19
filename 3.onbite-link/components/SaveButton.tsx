export default function SaveButton() {
  return (
    <button
      type="button"
      className="btn-primary self-end rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      저장
    </button>
  );
}

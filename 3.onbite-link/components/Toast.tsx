export default function Toast({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-md bg-[var(--error)] px-4 py-2 text-sm text-white"
    >
      {message}
    </div>
  );
}

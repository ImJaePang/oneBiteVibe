type TimerProps = {
  seconds: number;
};

export default function Timer({ seconds }: TimerProps) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="font-mono text-7xl font-bold tabular-nums" aria-live="off">
      {mm}:{ss}
    </div>
  );
}

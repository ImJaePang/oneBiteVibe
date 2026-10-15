type ControllersProps = {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
};

const buttonClass =
  "rounded-md border border-current px-4 py-2 disabled:opacity-40";

export default function Controllers({
  isRunning,
  onStart,
  onStop,
  onReset,
}: ControllersProps) {
  return (
    <div className="flex gap-2">
      <button className={buttonClass} onClick={onStart} disabled={isRunning}>
        시작
      </button>
      <button className={buttonClass} onClick={onStop} disabled={!isRunning}>
        정지
      </button>
      <button className={buttonClass} onClick={onReset}>
        초기화
      </button>
    </div>
  );
}

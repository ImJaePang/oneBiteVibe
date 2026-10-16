type ControllersProps = {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
};

const baseClass =
  "rounded-md px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 ease-out " +
  "enabled:hover:-translate-y-0.5 enabled:hover:shadow-lg enabled:active:translate-y-0 enabled:active:scale-95 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40";

const startClass = `${baseClass} bg-emerald-500 enabled:hover:bg-emerald-600 focus-visible:outline-emerald-500`;
const stopClass = `${baseClass} bg-rose-500 enabled:hover:bg-rose-600 focus-visible:outline-rose-500`;
const resetClass = `${baseClass} bg-slate-500 enabled:hover:bg-slate-600 focus-visible:outline-slate-500`;

export default function Controllers({
  isRunning,
  onStart,
  onStop,
  onReset,
}: ControllersProps) {
  return (
    <div className="flex gap-2">
      <button className={startClass} onClick={onStart} disabled={isRunning}>
        시작
      </button>
      <button className={stopClass} onClick={onStop} disabled={!isRunning}>
        정지
      </button>
      <button className={resetClass} onClick={onReset}>
        초기화
      </button>
    </div>
  );
}

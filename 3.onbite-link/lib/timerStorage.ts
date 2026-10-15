export const TIMER_STORAGE_KEY = "pomodoro-minutes";
export const DEFAULT_MINUTES = 25;
export const MIN_MINUTES = 1;
export const MAX_MINUTES = 60;

export function loadMinutes(): number {
  try {
    const value = Number(localStorage.getItem(TIMER_STORAGE_KEY));
    if (Number.isInteger(value) && value >= MIN_MINUTES && value <= MAX_MINUTES) {
      return value;
    }
  } catch {}
  return DEFAULT_MINUTES;
}

export function saveMinutes(minutes: number) {
  localStorage.setItem(TIMER_STORAGE_KEY, String(minutes));
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  MAX_MINUTES,
  MIN_MINUTES,
  loadMinutes,
  saveMinutes,
} from "@/lib/timerStorage";

export default function TimerSettingInput() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loaded, setLoaded] = useState(false);

  // 저장된 값은 브라우저에서만 읽을 수 있으므로 마운트 후 반영
  if (!loaded && typeof window !== "undefined") {
    setLoaded(true);
    setValue(String(loadMinutes()));
  }

  const minutes = Number(value);
  const isValid =
    value.trim() !== "" &&
    Number.isInteger(minutes) &&
    minutes >= MIN_MINUTES &&
    minutes <= MAX_MINUTES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    saveMinutes(minutes);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
      <label className="flex items-center gap-2">
        <input
          type="number"
          min={MIN_MINUTES}
          max={MAX_MINUTES}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-24 rounded-md border border-current bg-transparent px-3 py-2"
        />
        분
      </label>
      {value !== "" && !isValid && (
        <p className="text-sm text-red-500">
          {MIN_MINUTES}분 이상 {MAX_MINUTES}분 이하의 정수만 입력할 수 있습니다.
        </p>
      )}
      <button
        type="submit"
        disabled={!isValid}
        className="rounded-md border border-current px-4 py-2 disabled:opacity-40"
      >
        설정 완료
      </button>
    </form>
  );
}

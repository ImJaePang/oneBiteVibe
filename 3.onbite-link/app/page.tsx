"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Controllers from "@/components/Controllers";
import Timer from "@/components/Timer";
import { DEFAULT_MINUTES, loadMinutes } from "@/lib/timerStorage";

export default function Home() {
  const [totalSeconds, setTotalSeconds] = useState(DEFAULT_MINUTES * 60);
  const [seconds, setSeconds] = useState(DEFAULT_MINUTES * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 로컬스토리지에 저장된 설정 시간 불러오기
  useEffect(() => {
    const total = loadMinutes() * 60;
    setTotalSeconds(total);
    setSeconds(total);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStart = () => {
    if (seconds > 0) setIsRunning(true);
  };
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(totalSeconds);
  };

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">pomodoro</h1>
      <Timer seconds={seconds} />
      <Controllers
        isRunning={isRunning}
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
      />
      <Link
        href="/setting"
        className="rounded-md border border-current px-4 py-2"
      >
        설정
      </Link>
    </main>
  );
}

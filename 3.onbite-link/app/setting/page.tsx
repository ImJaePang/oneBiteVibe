import TimerSettingInput from "@/components/TimerSettingInput";

export default function SettingPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6">
      <h3 className="text-xl font-semibold">Setting</h3>
      <TimerSettingInput />
    </main>
  );
}

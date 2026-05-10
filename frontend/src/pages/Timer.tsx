import { useEffect, useState } from "react";

type TimerMode = "focus" | "shortBreak" | "longBreak";

function Timer() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const durations = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const changeMode = (newMode: TimerMode) => {
    setMode(newMode);
    setSecondsLeft(durations[newMode]);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setSecondsLeft(durations[mode]);
    setIsRunning(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold">Pomodoro Timer</h2>
      <p className="mt-2 text-slate-600">
        Start, pause, and manage focused work sessions.
      </p>

      <div className="mt-8 max-w-xl rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex justify-center gap-3">
          <button
            onClick={() => changeMode("focus")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              mode === "focus"
                ? "bg-red-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            Focus
          </button>

          <button
            onClick={() => changeMode("shortBreak")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              mode === "shortBreak"
                ? "bg-red-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            Short Break
          </button>

          <button
            onClick={() => changeMode("longBreak")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              mode === "longBreak"
                ? "bg-red-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            Long Break
          </button>
        </div>

        <div className="mt-10 text-center">
          <div className="text-7xl font-bold tracking-tight text-slate-900">
            {formatTime(secondsLeft)}
          </div>

          <p className="mt-3 text-slate-500">
            {mode === "focus"
              ? "Focus session in progress"
              : mode === "shortBreak"
              ? "Short break time"
              : "Long break time"}
          </p>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => setIsRunning((prev) => !prev)}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            onClick={resetTimer}
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
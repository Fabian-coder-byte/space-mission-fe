"use client";

import { useState, useEffect } from "react";

function getTimeLeft(targetDate) {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Countdown({ launchDate }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(launchDate));
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(launchDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [launchDate]);

  if (!mounted) return null;
  if (!timeLeft) {
    return (
      <div className="py-2 text-center text-sm text-slate-400">
        Lancio avvenuto
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: "Giorni" },
    { value: timeLeft.hours, label: "Ore" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      {units.map(({ value, label }) => (
        <div
          key={label}
          className="rounded-2xl border border-slate-700 bg-slate-950/80 p-3"
        >
          <p className="text-2xl font-bold tabular-nums text-white">
            {String(value).padStart(2, "0")}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">{label}</p>
        </div>
      ))}
    </div>
  );
}

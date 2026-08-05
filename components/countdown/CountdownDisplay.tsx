"use client";

import React from "react";

interface CountdownDisplayProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownDisplay({
  days,
  hours,
  minutes,
  seconds,
}: CountdownDisplayProps) {
  const units = [
    { label: "DAYS", value: days },
    { label: "HOURS", value: hours },
    { label: "MINUTES", value: minutes },
    { label: "SECONDS", value: seconds },
  ];

  const formatTwoDigits = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-3xl w-full my-8">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 hover:bg-white/[0.07] hover:border-white/[0.15]"
        >
          <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-amber-100/90 tracking-tight tabular-nums drop-shadow-[0_2px_12px_rgba(253,230,138,0.25)]">
            {formatTwoDigits(unit.value)}
          </span>
          <span className="mt-2.5 font-sans text-[10px] sm:text-xs font-medium tracking-[0.3em] text-zinc-400 uppercase">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

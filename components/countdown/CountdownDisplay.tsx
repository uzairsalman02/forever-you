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
          className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_24px_rgba(244,114,182,0.06)] transition-all duration-300 hover:bg-white/50"
        >
          <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-zinc-900 tracking-tight tabular-nums">
            {formatTwoDigits(unit.value)}
          </span>
          <span className="mt-2 font-sans text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-zinc-400 uppercase">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

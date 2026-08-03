"use client";

import React from "react";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { CountdownDisplay } from "./CountdownDisplay";

interface CountdownSceneProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownScene({
  days,
  hours,
  minutes,
  seconds,
}: CountdownSceneProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Subtle floating background ambient particles */}
      <FloatingParticles />

      {/* Main Content Container */}
      <main className="relative z-10 flex flex-col items-center max-w-2xl mx-auto px-4 py-12">
        {/* Subdued top tagline */}
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-zinc-500 mb-6 font-medium">
          Forever You
        </span>

        {/* Large elegant title */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-zinc-900 tracking-tight leading-[1.15] mb-6">
          A Little Surprise Awaits...
        </h1>

        {/* Small paragraph */}
        <p className="font-sans text-sm sm:text-base font-normal text-zinc-600 leading-relaxed max-w-md mb-8 whitespace-pre-line">
          {"Some moments are worth waiting for.\nCome back when the countdown reaches zero."}
        </p>

        {/* Countdown Display */}
        <CountdownDisplay
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </main>
    </div>
  );
}

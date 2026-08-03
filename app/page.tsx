"use client";

import { RELEASE_CONFIG } from "@/content/release";
import { useCountdown } from "@/hooks/useCountdown";
import { CountdownScene } from "@/components/countdown/CountdownScene";

export default function HomePage() {
  const { days, hours, minutes, seconds, isUnlocked, isHydrated } = useCountdown(
    RELEASE_CONFIG.releaseDate,
    RELEASE_CONFIG.developmentMode
  );

  // Prevent flash before client hydration
  if (!isHydrated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background" />
    );
  }

  // When countdown is active and not unlocked, display ONLY Scene 1
  if (!isUnlocked) {
    return (
      <CountdownScene
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }

  // Unlocked experience view (Auto Unlocked when timer reaches zero or DEVELOPMENT_MODE = true)
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background">
      <h1 className="font-serif text-5xl md:text-6xl font-light tracking-wide text-zinc-900 mb-4">
        Forever You
      </h1>
      <p className="font-sans text-sm md:text-base font-normal tracking-widest uppercase text-zinc-600">
        Welcome to your special experience
      </p>
    </main>
  );
}

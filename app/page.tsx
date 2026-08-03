"use client";

import { RELEASE_CONFIG } from "@/content/release";
import { useCountdown } from "@/hooks/useCountdown";
import { CountdownScene } from "@/components/countdown/CountdownScene";
import { HeroScene } from "@/components/hero/HeroScene";
import { MemoryVaultScene } from "@/components/memory-vault/MemoryVaultScene";

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

  // Unlocked experience: Scene 2 (Hero) -> Scene 3 (Memory Vault)
  return (
    <div className="w-full bg-background min-h-screen">
      <HeroScene />
      <MemoryVaultScene />
      {/* Scroll target anchor prepared for future section */}
      <div id="memories-section" />
    </div>
  );
}

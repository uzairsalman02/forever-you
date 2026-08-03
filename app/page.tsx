"use client";

import { useState } from "react";
import { RELEASE_CONFIG } from "@/content/release";
import { useCountdown } from "@/hooks/useCountdown";
import { CountdownScene } from "@/components/countdown/CountdownScene";
import { HeroScene } from "@/components/hero/HeroScene";
import { MemoryVaultScene } from "@/components/memory-vault/MemoryVaultScene";
import { MemoryRevealScene } from "@/components/memories/MemoryRevealScene";
import { LetterScene } from "@/components/letter/LetterScene";

export default function HomePage() {
  const { days, hours, minutes, seconds, isUnlocked, isHydrated } = useCountdown(
    RELEASE_CONFIG.releaseDate,
    RELEASE_CONFIG.developmentMode
  );
  const [showMemoryReveal, setShowMemoryReveal] = useState(false);

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

  const handleVaultTransitionComplete = () => {
    setShowMemoryReveal(true);
    setTimeout(() => {
      const revealSection = document.getElementById("memories-section");
      if (revealSection) {
        revealSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleSurpriseClick = () => {
    const nextSection = document.getElementById("cake-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Unlocked experience flow:
  // Scene 2 (Hero) -> Scene 3 (Memory Vault) -> Scene 4 (Memory Reveal) -> Scene 5 (The Letter)
  return (
    <div className="w-full bg-background min-h-screen">
      <HeroScene />
      <MemoryVaultScene
        onTransitionComplete={handleVaultTransitionComplete}
      />
      {showMemoryReveal && <MemoryRevealScene />}
      {!showMemoryReveal && <div id="memories-section" />}
      <LetterScene onSurpriseClick={handleSurpriseClick} />
      {/* Scroll target anchor prepared for upcoming section */}
      <div id="cake-section" />
    </div>
  );
}

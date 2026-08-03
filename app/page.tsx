"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RELEASE_CONFIG } from "@/content/release";
import { useCountdown } from "@/hooks/useCountdown";
import { CountdownScene } from "@/components/countdown/CountdownScene";
import { HeroScene } from "@/components/hero/HeroScene";
import { MemoryVaultScene } from "@/components/memory-vault/MemoryVaultScene";
import { MemoryRevealScene } from "@/components/memories/MemoryRevealScene";
import { LetterScene } from "@/components/letter/LetterScene";
import { CelebrationScene } from "@/components/celebration/CelebrationScene";
import { MusicController } from "@/components/ui/MusicController";
import { TopBunting } from "@/components/ui/TopBunting";
import { GlobalParticleEngine } from "@/components/ui/GlobalParticleEngine";
import {
  stopHappyBirthdayMusicBox,
  startMusicOnFirstInteraction,
} from "@/utils/audio";

export default function HomePage() {
  const { days, hours, minutes, seconds, isUnlocked, isHydrated } = useCountdown(
    RELEASE_CONFIG.releaseDate,
    RELEASE_CONFIG.developmentMode
  );
  const [showMemoryReveal, setShowMemoryReveal] = useState(false);
  const [experienceKey, setExperienceKey] = useState(0);
  const [isResettingOverlay, setIsResettingOverlay] = useState(false);

  // Register first user gesture listener to gently start background music
  useEffect(() => {
    const handleFirstGesture = () => {
      startMusicOnFirstInteraction();
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });
    window.addEventListener("scroll", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("scroll", handleFirstGesture);
    };
  }, []);

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

  const handleOpenGift = () => {
    const memoryVault = document.getElementById("memory-vault");
    if (memoryVault) {
      memoryVault.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    const cakeSection = document.getElementById("cake-section");
    if (cakeSection) {
      cakeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Full Experience Reset Handler
  const handleGlobalReset = () => {
    if (isResettingOverlay) return;

    // Step 1: Smoothly fade screen to soft pink overlay over 600ms
    setIsResettingOverlay(true);

    setTimeout(() => {
      // Step 2: Stop any active Web Audio playback
      stopHappyBirthdayMusicBox();

      // Step 3: Increment experience key to unmount and re-mount all scene components with fresh initial state
      setExperienceKey((prev) => prev + 1);
      setShowMemoryReveal(false);

      // Step 4: Instantly scroll to top while screen is covered by overlay
      window.scrollTo({ top: 0, behavior: "instant" });

      // Step 5: Fade overlay out smoothly over 600ms
      setTimeout(() => {
        setIsResettingOverlay(false);
      }, 100);
    }, 600);
  };

  return (
    <div className="w-full min-h-screen relative animate-dynamic-gradient overflow-x-hidden">
      {/* 1. Global rAF Particle Engine (Hearts, Petals, Stars, Duck Doodles, Sparkles) */}
      <GlobalParticleEngine />

      {/* 2. Soft Ambient Drifting Light Orbs */}
      <div
        className="fixed top-1/4 left-10 w-96 h-96 rounded-full bg-rose-200/30 blur-[100px] pointer-events-none animate-float-light z-0"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-1/3 right-10 w-[28rem] h-[28rem] rounded-full bg-purple-200/25 blur-[120px] pointer-events-none animate-float-light z-0"
        style={{ animationDelay: "-11s" }}
        aria-hidden="true"
      />

      {/* 3. Top Fabric Birthday Bunting Banner */}
      <TopBunting />

      {/* 4. Global Experience Reset Soft Pink Overlay */}
      <AnimatePresence>
        {isResettingOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#fff5f7] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* 5. Floating Glassmorphic Music Controller Widget */}
      <MusicController />

      {/* 6. Unlocked Interactive Story Scenes */}
      <HeroScene key={`hero-${experienceKey}`} onOpenGift={handleOpenGift} />
      <MemoryVaultScene
        key={`vault-${experienceKey}`}
        onTransitionComplete={handleVaultTransitionComplete}
      />
      {showMemoryReveal && (
        <MemoryRevealScene key={`reveal-${experienceKey}`} />
      )}
      {!showMemoryReveal && <div id="memories-section" />}
      <LetterScene
        key={`letter-${experienceKey}`}
        onSurpriseClick={handleSurpriseClick}
      />
      <CelebrationScene
        key={`celebration-${experienceKey}`}
        onReplayClick={handleGlobalReset}
      />
    </div>
  );
}

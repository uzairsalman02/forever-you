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
import { CinematicDuckIntro } from "@/components/intro/CinematicDuckIntro";
import { CinematicBackgroundEngine } from "@/components/ui/CinematicBackgroundEngine";
import { MusicController } from "@/components/ui/MusicController";
import { useAudio } from "@/context/AudioContext";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function HomePage() {
  const { config } = useSiteConfig();
  const targetDateIso = `${config.countdown.targetDate}T${config.countdown.targetTime}:00Z`;
  const devMode = config.countdown.skipCountdown || config.countdown.developmentMode;

  const { days, hours, minutes, seconds, isUnlocked } = useCountdown(
    targetDateIso,
    devMode
  );
  const [showMemoryReveal, setShowMemoryReveal] = useState(false);
  const [experienceKey, setExperienceKey] = useState(0);
  const [isResettingOverlay, setIsResettingOverlay] = useState(false);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const { stopAllAudio } = useAudio();

  const handleIntroComplete = () => {
    setHasPlayedIntro(true);
  };


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
      stopAllAudio();

      // Step 3: Increment experience key to unmount and re-mount all scene components with fresh initial state
      setExperienceKey((prev) => prev + 1);
      setShowMemoryReveal(false);
      setHasPlayedIntro(false);

      // Step 4: Instantly scroll to top while screen is covered by overlay
      window.scrollTo({ top: 0, behavior: "instant" });

      // Step 5: Fade overlay out smoothly over 600ms
      setTimeout(() => {
        setIsResettingOverlay(false);
      }, 100);
    }, 600);
  };

  return (
    <div className="w-full min-h-screen relative bg-transparent overflow-x-hidden">
      {/* 6-Layer Cinematic Background Engine (Living Cloud, Particles, Bunting) */}
      <CinematicBackgroundEngine />

      {/* One-Time Cinematic Baby Duck Opening Sequence */}
      {!hasPlayedIntro && (
        <CinematicDuckIntro onComplete={handleIntroComplete} />
      )}

      {/* Global Experience Reset Soft Pink Overlay */}
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

      {/* Floating Glassmorphic Music Controller Widget */}
      <MusicController />

      {/* Unlocked Interactive Story Scenes */}
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

"use client";

import { useState, useEffect } from "react";
import { TimeLeft } from "@/types";

export function useCountdown(targetDateIso: string, developmentMode: boolean) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUnlocked: developmentMode,
  });
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    if (developmentMode) {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isUnlocked: true,
      });
      return;
    }

    const calculateTimeLeft = () => {
      const targetTime = new Date(targetDateIso).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isUnlocked: true,
        });
        return true; // Unlocked
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isUnlocked: false,
      });
      return false;
    };

    // Calculate immediately on mount
    const unlocked = calculateTimeLeft();
    if (unlocked) return;

    // Update every second
    const timer = setInterval(() => {
      const isDone = calculateTimeLeft();
      if (isDone) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateIso, developmentMode]);

  return { ...timeLeft, isHydrated };
}

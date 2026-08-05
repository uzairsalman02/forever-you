"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  AUDIO_CONFIG,
  SoundEffectType,
  BackgroundTrackConfig,
} from "@/content/audioConfig";

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  progress: number; // 0 to 100 %
  trackInfo: BackgroundTrackConfig;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  playBGM: () => void;
  pauseBGM: () => void;
  fadeInBGM: (targetVol?: number) => void;
  fadeOutBGM: (durationMs?: number) => void;
  playSound: (effect: SoundEffectType) => void;
  stopAllAudio: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

// Web Audio API Context for Sound Effects Synthesis
let sfxAudioCtx: AudioContext | null = null;

function getSfxAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sfxAudioCtx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      sfxAudioCtx = new AudioCtx();
    }
  }
  if (sfxAudioCtx && sfxAudioCtx.state === "suspended") {
    sfxAudioCtx.resume().catch(() => {});
  }
  return sfxAudioCtx;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(AUDIO_CONFIG.backgroundTrack.defaultVolume);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const hasInteractedRef = useRef(false);
  const wasPlayingBeforeTabHide = useRef(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Background Music Element & Event Listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio(AUDIO_CONFIG.backgroundTrack.src);
    audio.loop = AUDIO_CONFIG.backgroundTrack.loop;
    audio.preload = "auto";
    audio.volume = volume;
    bgAudioRef.current = audio;

    const handleTimeUpdate = () => {
      if (!audio) return;
      const cur = audio.currentTime || 0;
      const dur = audio.duration || 0;
      setCurrentTime(cur);
      setDuration(dur);
      if (dur > 0) {
        setProgress((cur / dur) * 100);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      bgAudioRef.current = null;
    };
  }, []);

  // Smooth Volume Fade In
  const fadeInBGM = useCallback(
    (targetVol?: number) => {
      const audio = bgAudioRef.current;
      if (!audio) return;

      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

      const endVol = targetVol ?? volume;
      audio.volume = 0;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            let current = 0;
            fadeIntervalRef.current = setInterval(() => {
              current += 0.04;
              if (current >= endVol) {
                current = endVol;
                if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
              }
              if (audio) audio.volume = current;
            }, 80);
          })
          .catch(() => {
            // Autoplay blocked by browser policy
          });
      }
    },
    [volume]
  );

  // Smooth Volume Fade Out
  const fadeOutBGM = useCallback((durationMs = 600) => {
    const audio = bgAudioRef.current;
    if (!audio || audio.paused) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    let current = audio.volume;
    const step = current / (durationMs / 50);

    fadeIntervalRef.current = setInterval(() => {
      current -= step;
      if (current <= 0.01) {
        current = 0;
        audio.pause();
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      } else {
        audio.volume = current;
      }
    }, 50);
  }, []);

  // First User Interaction Listener
  useEffect(() => {
    const handleFirstGesture = () => {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;
      fadeInBGM();
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });
    window.addEventListener("scroll", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("scroll", handleFirstGesture);
    };
  }, [fadeInBGM]);

  // Tab Inactivity Auto-Pause / Resume Lifecycle
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = bgAudioRef.current;
      if (!audio) return;

      if (document.hidden) {
        if (!audio.paused) {
          wasPlayingBeforeTabHide.current = true;
          audio.pause();
        } else {
          wasPlayingBeforeTabHide.current = false;
        }
      } else {
        if (wasPlayingBeforeTabHide.current) {
          audio.play().catch(() => {});
          wasPlayingBeforeTabHide.current = false;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const playBGM = useCallback(() => {
    const audio = bgAudioRef.current;
    if (audio && audio.paused) {
      audio.play().catch(() => {});
    }
  }, []);

  const pauseBGM = useCallback(() => {
    const audio = bgAudioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;

    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audio.muted = nextMute;
  }, [isMuted]);

  const setVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = clamped;
    }
  }, []);

  const stopAllAudio = useCallback(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      bgAudioRef.current.currentTime = 0;
    }
  }, []);

  // Independent Sound Effects Engine
  const playSound = useCallback((effect: SoundEffectType) => {
    const ctx = getSfxAudioCtx();
    if (!ctx) return;

    const sfxVol = AUDIO_CONFIG.soundEffects[effect]?.volume ?? 0.25;

    try {
      const now = ctx.currentTime;

      switch (effect) {
        case "buttonClick": {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(sfxVol, now + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.08);
          break;
        }
        case "waxSeal": {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(350, now);
          osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(sfxVol, now + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.15);
          break;
        }
        case "envelope":
        case "paper": {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.exponentialRampToValueAtTime(440, now + 0.25);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(sfxVol, now + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.25);
          break;
        }
        case "candleBlow": {
          const bufferSize = ctx.sampleRate * 0.35;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(400, now);
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(sfxVol, now + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          noise.start(now);
          noise.stop(now + 0.35);
          break;
        }
        case "cakeCut": {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(523.25, now);
          osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.2);
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(sfxVol, now + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.22);
          break;
        }
        case "celebration":
        case "restart": {
          const freqs = [523.25, 659.25, 783.99, 1046.5];
          freqs.forEach((f, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(f, now + idx * 0.08);
            gain.gain.setValueAtTime(0.001, now + idx * 0.08);
            gain.gain.linearRampToValueAtTime(sfxVol, now + idx * 0.08 + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.35);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.35);
          });
          break;
        }
      }
    } catch {}
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        currentTime,
        duration,
        progress,
        trackInfo: AUDIO_CONFIG.backgroundTrack,
        togglePlay,
        toggleMute,
        setVolume,
        playBGM,
        pauseBGM,
        fadeInBGM,
        fadeOutBGM,
        playSound,
        stopAllAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return ctx;
}

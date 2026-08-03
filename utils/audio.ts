"use client";

import { AUDIO_CONFIG } from "@/content/audioConfig";

let bgAudio: HTMLAudioElement | null = null;
let isMusicPlaying = false;
let currentVolume = AUDIO_CONFIG.backgroundMusic.defaultVolume;
let musicListeners: Array<(isPlaying: boolean, volume: number) => void> = [];
let hasUserInteracted = false;

// Web Audio Context for Sound Effects Synthesis
let fxContext: AudioContext | null = null;

function getFxContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!fxContext) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      fxContext = new AudioCtx();
    }
  }
  if (fxContext && fxContext.state === "suspended") {
    fxContext.resume();
  }
  return fxContext;
}

// ----------------------------------------------------
// BACKGROUND MUSIC PLAYER
// ----------------------------------------------------

export function initBackgroundMusic() {
  if (typeof window === "undefined" || bgAudio) return;

  bgAudio = new Audio(AUDIO_CONFIG.backgroundMusic.src);
  bgAudio.loop = true;
  bgAudio.preload = "auto";
  bgAudio.volume = currentVolume;

  bgAudio.addEventListener("play", () => {
    isMusicPlaying = true;
    notifyListeners();
  });

  bgAudio.addEventListener("pause", () => {
    isMusicPlaying = false;
    notifyListeners();
  });
}

// Gently starts background music on first user gesture with volume fade-in
export function startMusicOnFirstInteraction() {
  if (hasUserInteracted) return;
  hasUserInteracted = true;

  initBackgroundMusic();

  if (bgAudio && bgAudio.paused) {
    bgAudio.volume = 0;
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Fade volume gently to target default volume
          let vol = 0;
          const targetVol = currentVolume;
          const fadeInterval = setInterval(() => {
            vol += 0.05;
            if (vol >= targetVol) {
              vol = targetVol;
              clearInterval(fadeInterval);
            }
            if (bgAudio) bgAudio.volume = vol;
          }, 100);
        })
        .catch(() => {
          // Autoplay blocked by browser policy; user can click floating music button
          hasUserInteracted = false;
        });
    }
  }
}

export function toggleBackgroundMusic() {
  initBackgroundMusic();
  if (!bgAudio) return;

  if (bgAudio.paused) {
    bgAudio.play().catch(() => {});
  } else {
    bgAudio.pause();
  }
}

export function setBackgroundMusicVolume(vol: number) {
  currentVolume = Math.max(0, Math.min(1, vol));
  if (bgAudio) {
    bgAudio.volume = currentVolume;
  }
  notifyListeners();
}

export function getMusicState() {
  return {
    isPlaying: isMusicPlaying,
    volume: currentVolume,
    trackName: AUDIO_CONFIG.backgroundMusic.trackName,
  };
}

export function subscribeMusicState(
  cb: (isPlaying: boolean, volume: number) => void
) {
  musicListeners.push(cb);
  return () => {
    musicListeners = musicListeners.filter((l) => l !== cb);
  };
}

function notifyListeners() {
  musicListeners.forEach((cb) => cb(isMusicPlaying, currentVolume));
}

// ----------------------------------------------------
// SYNTHETIC SOUND EFFECTS (Web Audio API)
// ----------------------------------------------------

export function playEnvelopeSound() {
  const ctx = getFxContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.25);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(AUDIO_CONFIG.soundEffects.envelope.volume, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch {}
}

export function playCandleBlowSound() {
  const ctx = getFxContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; // Soft white noise puff
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(400, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(AUDIO_CONFIG.soundEffects.candle.volume, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.4);
  } catch {}
}

export function playCakeCutSound() {
  const ctx = getFxContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.2);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(AUDIO_CONFIG.soundEffects.cakeCut.volume, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  } catch {}
}

export function playCelebrationSound() {
  const ctx = getFxContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C arpeggio
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(AUDIO_CONFIG.soundEffects.celebration.volume, now + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.4);
    });
  } catch {}
}

// ----------------------------------------------------
// HAPPY BIRTHDAY MUSIC BOX SYNTHESIZER
// ----------------------------------------------------

let activeOscillators: OscillatorNode[] = [];

export function playHappyBirthdayMusicBox() {
  const ctx = getFxContext();
  if (!ctx) return;

  stopHappyBirthdayMusicBox();
  activeOscillators = [];

  const notes = [
    { note: 392.0, duration: 0.35, delay: 0 },
    { note: 392.0, duration: 0.35, delay: 0.4 },
    { note: 440.0, duration: 0.7, delay: 0.8 },
    { note: 392.0, duration: 0.7, delay: 1.6 },
    { note: 523.25, duration: 0.7, delay: 2.4 },
    { note: 493.88, duration: 1.2, delay: 3.2 },

    { note: 392.0, duration: 0.35, delay: 4.6 },
    { note: 392.0, duration: 0.35, delay: 5.0 },
    { note: 440.0, duration: 0.7, delay: 5.4 },
    { note: 392.0, duration: 0.7, delay: 6.2 },
    { note: 587.33, duration: 0.7, delay: 7.0 },
    { note: 523.25, duration: 1.2, delay: 7.8 },

    { note: 392.0, duration: 0.35, delay: 9.2 },
    { note: 392.0, duration: 0.35, delay: 9.6 },
    { note: 783.99, duration: 0.7, delay: 10.0 },
    { note: 659.25, duration: 0.7, delay: 10.8 },
    { note: 523.25, duration: 0.7, delay: 11.6 },
    { note: 493.88, duration: 0.7, delay: 12.4 },
    { note: 440.0, duration: 1.2, delay: 13.2 },

    { note: 698.46, duration: 0.35, delay: 14.6 },
    { note: 698.46, duration: 0.35, delay: 15.0 },
    { note: 659.25, duration: 0.7, delay: 15.4 },
    { note: 523.25, duration: 0.7, delay: 16.2 },
    { note: 587.33, duration: 0.7, delay: 17.0 },
    { note: 523.25, duration: 1.6, delay: 17.8 },
  ];

  const now = ctx.currentTime + 0.1;

  notes.forEach(({ note, duration, delay }) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(note, now + delay);

      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.linearRampToValueAtTime(0.16, now + delay + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + duration + 0.1);

      activeOscillators.push(osc);
    } catch {}
  });
}

export function stopHappyBirthdayMusicBox() {
  if (activeOscillators.length > 0) {
    activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    activeOscillators = [];
  }
}

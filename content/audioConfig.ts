export interface BackgroundTrackConfig {
  trackName: string;
  artist: string;
  src: string;
  defaultVolume: number;
  loop: boolean;
}

export interface SoundEffectItemConfig {
  src: string;
  volume: number;
}

export type SoundEffectType =
  | "envelope"
  | "waxSeal"
  | "paper"
  | "buttonClick"
  | "candleBlow"
  | "candle"
  | "cakeCut"
  | "celebration"
  | "restart";

export interface AudioConfig {
  backgroundTrack: BackgroundTrackConfig;
  backgroundMusic: BackgroundTrackConfig;
  soundEffects: Record<SoundEffectType, SoundEffectItemConfig>;
}

const trackConfig: BackgroundTrackConfig = {
  trackName: "Forever You — Romantic Piano",
  artist: "Cinematic Symphony",
  src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3",
  defaultVolume: 0.35,
  loop: true,
};

const sfxCandle = { src: "", volume: 0.2 };

// Single source configuration file for the entire global audio system.
export const AUDIO_CONFIG: AudioConfig = {
  backgroundTrack: trackConfig,
  backgroundMusic: trackConfig,
  soundEffects: {
    envelope: { src: "", volume: 0.25 },
    waxSeal: { src: "", volume: 0.3 },
    paper: { src: "", volume: 0.25 },
    buttonClick: { src: "", volume: 0.2 },
    candleBlow: sfxCandle,
    candle: sfxCandle,
    cakeCut: { src: "", volume: 0.25 },
    celebration: { src: "", volume: 0.3 },
    restart: { src: "", volume: 0.25 },
  },
};

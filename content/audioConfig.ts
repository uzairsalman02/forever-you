export interface BackgroundMusicConfig {
  trackName: string;
  src: string;
  defaultVolume: number;
}

export interface SoundEffectConfig {
  src: string;
  volume: number;
}

export const AUDIO_CONFIG = {
  backgroundMusic: {
    trackName: "Forever You — Romantic Piano",
    // Replace with custom MP3 URL if desired
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3",
    defaultVolume: 0.35,
  } as BackgroundMusicConfig,

  soundEffects: {
    envelope: {
      src: "",
      volume: 0.25,
    },
    candle: {
      src: "",
      volume: 0.2,
    },
    cakeCut: {
      src: "",
      volume: 0.25,
    },
    celebration: {
      src: "",
      volume: 0.3,
    },
  } as Record<string, SoundEffectConfig>,
};

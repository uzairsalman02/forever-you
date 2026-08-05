"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { VAULT_MEMORIES } from "@/content/vaultMemories";
import { LETTER_CONFIG } from "@/content/letterConfig";
import { AUDIO_CONFIG } from "@/content/audioConfig";
import { RELEASE_CONFIG } from "@/content/release";
import { SITE_CONFIG } from "@/utils/constants";

export interface GeneralSettings {
  websiteTitle: string;
  browserTitle: string;
  recipientName: string;
  heroTitle: string;
  heroSubtitle: string;
  greetingText: string;
  letterTitle: string;
  footerText: string;
}

export interface CountdownSettings {
  targetDate: string;
  targetTime: string;
  timezone: string;
  enableCountdown: boolean;
  developmentMode: boolean;
  skipCountdown: boolean;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  isFavorite: boolean;
  rotation: string;
}

export interface LetterParagraphItem {
  id: string;
  text: string;
}

export interface LetterSettings {
  tagline: string;
  title: string;
  subtitle: string;
  paragraphs: LetterParagraphItem[];
  buttonText: string;
  fontStyle: string;
}

export interface MusicSettings {
  trackName: string;
  artist: string;
  src: string;
  volume: number;
  loop: boolean;
  autoplay: boolean;
  fadeIn: boolean;
  fadeOut: boolean;
}

export interface DuckIntroSettings {
  enableDuck: boolean;
  enableQuack: boolean;
  duckSpeed: number;
  duckSize: number;
  animationDuration: number;
  enableIntro: boolean;
}

export interface WebsiteEffectsSettings {
  birthdayFlags: boolean;
  floatingHearts: boolean;
  petals: boolean;
  sparkles: boolean;
  dynamicBackground: boolean;
  cursorGlow: boolean;
  mouseParallax: boolean;
  glassEffects: boolean;
  animations: boolean;
  pageTransitions: boolean;
}

export interface ThemeSettings {
  primaryColor: string;
  accentColor: string;
  gradientStart: string;
  gradientEnd: string;
  backgroundStyle: "living-cloud" | "soft-pastel" | "gradient" | "dark";
  fontFamily: string;
  buttonStyle: "glass" | "solid" | "gradient" | "rounded";
  borderRadius: string;
}

export interface HeroSettings {
  mainHeading: string;
  subtitle: string;
  buttonText: string;
  backgroundStyle: string;
  heroHeight: string;
}

export interface FinalMessageSettings {
  title: string;
  text: string;
  buttonText: string;
}

export interface FullSiteConfig {
  general: GeneralSettings;
  countdown: CountdownSettings;
  gallery: GalleryItem[];
  sequence: string[];
  letter: LetterSettings;
  music: MusicSettings;
  duckIntro: DuckIntroSettings;
  effects: WebsiteEffectsSettings;
  theme: ThemeSettings;
  hero: HeroSettings;
  finalMessage: FinalMessageSettings;
}

const STORAGE_KEY = "forever_you_cms_config_v1";

// Default configuration blueprint
export const DEFAULT_SITE_CONFIG: FullSiteConfig = {
  general: {
    websiteTitle: "Forever You — A Cinematic Experience",
    browserTitle: SITE_CONFIG.title,
    recipientName: "Farwa",
    heroTitle: "Happy Birthday",
    heroSubtitle: "For the girl who changed my world.",
    greetingText: "Some moments are worth waiting for...",
    letterTitle: "A Letter From My Heart",
    footerText: "Forever You — Made with love ❤️",
  },
  countdown: {
    targetDate: "2026-08-21",
    targetTime: "00:00",
    timezone: "UTC",
    enableCountdown: true,
    developmentMode: RELEASE_CONFIG.developmentMode,
    skipCountdown: false,
  },
  gallery: VAULT_MEMORIES.map((m, idx) => ({
    id: m.id,
    imageUrl: m.imageUrl,
    caption: `Memory ${idx + 1}`,
    isFavorite: idx === 24, // Center focal polaroid
    rotation: m.rotation,
  })),
  sequence: VAULT_MEMORIES.map((m) => m.id),
  letter: {
    tagline: LETTER_CONFIG.tagline,
    title: LETTER_CONFIG.title,
    subtitle: "Every word is written for you",
    paragraphs: LETTER_CONFIG.paragraphs.map((p) => ({ id: p.id, text: p.text })),
    buttonText: LETTER_CONFIG.buttonText,
    fontStyle: "calligraphy",
  },
  music: {
    trackName: AUDIO_CONFIG.backgroundTrack.trackName,
    artist: AUDIO_CONFIG.backgroundTrack.artist,
    src: AUDIO_CONFIG.backgroundTrack.src,
    volume: AUDIO_CONFIG.backgroundTrack.defaultVolume,
    loop: AUDIO_CONFIG.backgroundTrack.loop,
    autoplay: true,
    fadeIn: true,
    fadeOut: true,
  },
  duckIntro: {
    enableDuck: true,
    enableQuack: true,
    duckSpeed: 1,
    duckSize: 1,
    animationDuration: 9.5,
    enableIntro: true,
  },
  effects: {
    birthdayFlags: true,
    floatingHearts: true,
    petals: true,
    sparkles: true,
    dynamicBackground: true,
    cursorGlow: true,
    mouseParallax: true,
    glassEffects: true,
    animations: true,
    pageTransitions: true,
  },
  theme: {
    primaryColor: "#F472B6",
    accentColor: "#FB7185",
    gradientStart: "#FFF5F7",
    gradientEnd: "#FCE7F3",
    backgroundStyle: "living-cloud",
    fontFamily: "var(--font-cormorant)",
    buttonStyle: "glass",
    borderRadius: "rounded-full",
  },
  hero: {
    mainHeading: "Happy Birthday",
    subtitle: "For the girl who changed my world.",
    buttonText: "Open My Gift ❤️",
    backgroundStyle: "ambient",
    heroHeight: "min-h-screen",
  },
  finalMessage: {
    title: "Make a Wish & Cut the Cake!",
    text: "Here is to another year of laughter, love, and unforgettable memories.",
    buttonText: "Replay Experience ❤️",
  },
};

interface SiteConfigContextType {
  config: FullSiteConfig;
  updateSection: <K extends keyof FullSiteConfig>(
    section: K,
    data: Partial<FullSiteConfig[K]>
  ) => void;
  saveConfig: () => void;
  exportConfig: () => void;
  importConfig: (jsonData: string) => boolean;
  resetToDefaults: () => void;
  isSaved: boolean;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(
  undefined
);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<FullSiteConfig>(DEFAULT_SITE_CONFIG);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setConfig((prev) => ({ ...prev, ...parsed }));
        }
      } catch (err) {
        console.error("Failed to load CMS config from localStorage:", err);
      }
    }
  }, []);

  const updateSection = <K extends keyof FullSiteConfig>(
    section: K,
    data: Partial<FullSiteConfig[K]>
  ) => {
    setConfig((prev) => {
      const nextSectionData = Array.isArray(prev[section])
        ? (data as FullSiteConfig[K])
        : { ...(prev[section] as object), ...(data as object) };
      const updated = {
        ...prev,
        [section]: nextSectionData,
      };
      // Auto-save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
    setIsSaved(true);
  };

  const saveConfig = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    }
    setIsSaved(true);
  };

  const exportConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `forever-you-cms-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importConfig = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed && typeof parsed === "object") {
        setConfig((prev) => ({ ...prev, ...parsed }));
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        }
        setIsSaved(true);
        return true;
      }
    } catch (err) {
      console.error("Failed to import CMS config:", err);
    }
    return false;
  };

  const resetToDefaults = () => {
    setConfig(DEFAULT_SITE_CONFIG);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsSaved(true);
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        updateSection,
        saveConfig,
        exportConfig,
        importConfig,
        resetToDefaults,
        isSaved,
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return context;
}

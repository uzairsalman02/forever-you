"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { VAULT_MEMORIES } from "@/content/vaultMemories";
import { DETAILED_MEMORIES } from "@/content/detailedMemories";
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

export interface DetailedMemoryItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface SubtitleItem {
  id: string;
  text: string;
  holdDuration?: number;
  pauseAfter?: number;
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
  galleryStyle: "polaroid-collage" | "scatter";
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
  heroHeartImage: string;
}

export interface FinalMessageSettings {
  title: string;
  text: string;
  buttonText: string;
}

export const DEFAULT_SUBTITLES: SubtitleItem[] = [
  { id: "sub-1", text: "Kuch kahaniyan...", holdDuration: 2.5 },
  { id: "sub-2", text: "Waqt ke saath purani nahi hotin...", holdDuration: 2.8 },
  { id: "sub-3", text: "Wo waqt ke saath aur gehri ho jati hain...", holdDuration: 3.2 },
  { id: "sub-4", text: "Zindagi mein bohot kuch badla...", holdDuration: 2.8 },
  { id: "sub-5", text: "Lekin ek cheez kabhi nahi badli...", holdDuration: 2.8 },
  { id: "sub-6", text: "Meri tumhare liye mohabbat...", holdDuration: 3.0 },
  { id: "sub-7", text: "2013 mein jab hum mile the...", holdDuration: 2.8 },
  { id: "sub-8", text: "Tab kahan pata tha...", holdDuration: 2.5 },
  { id: "sub-9", text: "Ke ek anjaan shuruat...", holdDuration: 2.5 },
  { id: "sub-10", text: "Kisi din meri zindagi ki...", holdDuration: 2.5 },
  { id: "sub-11", text: "Sab se khoobsurat haqeeqat ban jayegi...", holdDuration: 3.2 },
  { id: "sub-12", text: "Mujhe aaj bhi yaad hai...", holdDuration: 2.5 },
  { id: "sub-13", text: "Wo pehli dafa...", holdDuration: 2.2 },
  { id: "sub-14", text: "Jab meri nazar...", holdDuration: 2.2 },
  { id: "sub-15", text: "Tumhari un khamosh aankhon par padi thi...", holdDuration: 3.2 },
  { id: "sub-16", text: "Tumhara...", holdDuration: 2.0 },
  { id: "sub-17", text: "Balcony se chup kar mujhe dekhna...", holdDuration: 2.8 },
  { id: "sub-18", text: "Aur woh muskurahat...", holdDuration: 2.5 },
  { id: "sub-19", text: "Kisi ne kya khoob kaha hai...", holdDuration: 2.5 },
  { id: "sub-20", text: "\"Teri khamosh aankhon mein jo thehar gaya ek dafa...\"", holdDuration: 3.5 },
  { id: "sub-21", text: "\"Usay phir zamane ki bheed mein...\"", holdDuration: 3.0 },
  { id: "sub-22", text: "\"Kahan sukoon milta hai...\"", holdDuration: 3.0 },
  { id: "sub-23", text: "Phir zindagi ne...", holdDuration: 2.2 },
  { id: "sub-24", text: "Bohot kuch dikhaya...", holdDuration: 2.5 },
  { id: "sub-25", text: "Wo sab...", holdDuration: 2.0 },
  { id: "sub-26", text: "Jo main kabhi nahi chahta tha...", holdDuration: 2.8 },
  { id: "sub-27", text: "Ek waqt aisa bhi aaya...", holdDuration: 2.5 },
  { id: "sub-28", text: "Jab mujhe laga...", holdDuration: 2.2 },
  { id: "sub-29", text: "Jaise sab kuch khatam ho gaya ho...", holdDuration: 3.0 },
  { id: "sub-30", text: "Main bilkul akela reh gaya tha...", holdDuration: 3.0 },
  { id: "sub-31", text: "Lekin...", holdDuration: 2.0 },
  { id: "sub-32", text: "Jo dilon se jude hote hain...", holdDuration: 2.8 },
  { id: "sub-33", text: "Taqdeerein unhein...", holdDuration: 2.5 },
  { id: "sub-34", text: "Dobara mila hi deti hain...", holdDuration: 3.0 },
  { id: "sub-35", text: "Zindagi ne mujhe bohot thakaya...", holdDuration: 2.8 },
  { id: "sub-36", text: "Magar har andhere mein...", holdDuration: 2.5 },
  { id: "sub-37", text: "Tum meri roshni bani rahi...", holdDuration: 3.0 },
  { id: "sub-38", text: "Tum meri bechaini ka sukoon ho...", holdDuration: 3.0 },
  { id: "sub-39", text: "Mere dard ki dawa ho...", holdDuration: 2.8 },
  { id: "sub-40", text: "Tumhari ek awaaz...", holdDuration: 2.2 },
  { id: "sub-41", text: "Mujhe phir se jeena sikha deti hai...", holdDuration: 3.2 },
  { id: "sub-42", text: "Ye sirf yaadon ki kahani nahi...", holdDuration: 2.8 },
  { id: "sub-43", text: "Ye us mohabbat ki kahani hai...", holdDuration: 3.0 },
  { id: "sub-44", text: "Jo har toofan ke baad...", holdDuration: 2.5 },
  { id: "sub-45", text: "Aur mazboot hoti gayi...", holdDuration: 2.8 },
  { id: "sub-46", text: "Log...", holdDuration: 2.0 },
  { id: "sub-47", text: "Waqt ke saath badal jaate hain...", holdDuration: 2.8 },
  { id: "sub-48", text: "Lekin...", holdDuration: 2.0 },
  { id: "sub-49", text: "Tum...", holdDuration: 2.0 },
  { id: "sub-50", text: "Aaj bhi meri pehli mohabbat ho...", holdDuration: 3.2 },
  { id: "sub-51", text: "Aur meri aakhri manzil bhi...", holdDuration: 3.0 },
  { id: "sub-52", text: "Mujhe poori zindagi...", holdDuration: 2.5 },
  { id: "sub-53", text: "Bas tumhara saath chahiye...", holdDuration: 3.2, pauseAfter: 3.0 },
  { id: "sub-54", text: "Happy Birthday...", holdDuration: 2.5 },
  { id: "sub-55", text: "Farwa.", holdDuration: 3.0, pauseAfter: 2.0 },
  { id: "sub-56", text: "Main hamesha tumhara tha...", holdDuration: 2.8 },
  { id: "sub-57", text: "Aur...", holdDuration: 2.0 },
  { id: "sub-58", text: "Hamesha tumhara rahunga.", holdDuration: 3.5, pauseAfter: 1.0 },
];

export interface FullSiteConfig {
  general: GeneralSettings;
  countdown: CountdownSettings;
  gallery: GalleryItem[];
  detailedMemories: DetailedMemoryItem[];
  subtitles: SubtitleItem[];
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
  detailedMemories: DETAILED_MEMORIES.map((m) => ({
    id: m.id,
    image: m.image,
    title: m.title,
    description: m.description,
  })),
  subtitles: DEFAULT_SUBTITLES,
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
    galleryStyle: "polaroid-collage",
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
    heroHeartImage: VAULT_MEMORIES[0]?.imageUrl || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80",
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

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useAudio } from "@/context/AudioContext";

import { DevHeader } from "@/components/dev/DevHeader";
import { DevSidebar, DevTab } from "@/components/dev/DevSidebar";

import { GeneralSettingsPanel } from "@/components/dev/panels/GeneralSettingsPanel";
import { CountdownSettingsPanel } from "@/components/dev/panels/CountdownSettingsPanel";
import { GalleryManagerPanel } from "@/components/dev/panels/GalleryManagerPanel";
import { MemorySequencePanel } from "@/components/dev/panels/MemorySequencePanel";
import { SubtitleEditorPanel } from "@/components/dev/panels/SubtitleEditorPanel";
import { LetterEditorPanel } from "@/components/dev/panels/LetterEditorPanel";
import { MusicSettingsPanel } from "@/components/dev/panels/MusicSettingsPanel";
import { DuckIntroPanel } from "@/components/dev/panels/DuckIntroPanel";
import { WebsiteEffectsPanel } from "@/components/dev/panels/WebsiteEffectsPanel";
import { ThemeSettingsPanel } from "@/components/dev/panels/ThemeSettingsPanel";
import { HeroSettingsPanel } from "@/components/dev/panels/HeroSettingsPanel";
import { FinalMessagePanel } from "@/components/dev/panels/FinalMessagePanel";
import { AdvancedSettingsPanel } from "@/components/dev/panels/AdvancedSettingsPanel";

const DEV_PASSWORD = "1881";

export default function DevDashboardPage() {
  const router = useRouter();
  const { config } = useSiteConfig();
  const { stopAllAudio } = useAudio();
  const [activeTab, setActiveTab] = useState<DevTab>("general");

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [inputPassword, setInputPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Silence background music when entering /dev page
  useEffect(() => {
    stopAllAudio();
  }, [stopAllAudio]);

  // Check existing session authentication state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAuth = sessionStorage.getItem("forever_you_dev_authed");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
      setIsCheckingAuth(false);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === DEV_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
      sessionStorage.setItem("forever_you_dev_authed", "true");
    } else {
      setPasswordError(true);
      setInputPassword("");
    }
  };

  if (isCheckingAuth) {
    return null;
  }

  // Password Protection Gate Modal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-6 select-none relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="fixed top-1/4 left-1/3 w-[30rem] h-[30rem] rounded-full bg-rose-500/20 blur-[130px] pointer-events-none" />
        <div className="fixed bottom-1/4 right-1/3 w-[30rem] h-[30rem] rounded-full bg-pink-500/20 blur-[130px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-8 sm:p-10 rounded-3xl shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-3xl mx-auto shadow-lg shadow-rose-500/30">
            🔒
          </div>

          <div>
            <h1 className="font-sans font-bold text-xl text-white tracking-wide">
              Developer Control Panel
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Enter security PIN code to access developer settings.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-2">
            <div className="space-y-1">
              <input
                type="password"
                maxLength={8}
                autoFocus
                value={inputPassword}
                onChange={(e) => {
                  setInputPassword(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="Enter Security PIN"
                className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/20 text-center font-mono text-lg tracking-[0.4em] text-white focus:outline-none focus:ring-2 focus:ring-rose-500/50 placeholder:tracking-normal placeholder:font-sans placeholder:text-xs placeholder:text-slate-400"
              />

              {passwordError && (
                <p className="text-xs text-rose-400 font-semibold pt-1 animate-pulse">
                  ❌ Incorrect Security PIN Code.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-sans font-bold text-xs tracking-wider uppercase shadow-lg shadow-rose-500/25 transition-all active:scale-[0.98]"
            >
              Unlock Dashboard 🔓
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 selection:bg-rose-500 selection:text-white">
      {/* Background Subtle Light Ambient Glow */}
      <div className="fixed top-0 left-1/4 w-[40rem] h-[40rem] rounded-full bg-rose-200/30 blur-[150px] pointer-events-none z-0" aria-hidden="true" />
      <div className="fixed bottom-0 right-1/4 w-[40rem] h-[40rem] rounded-full bg-pink-200/30 blur-[150px] pointer-events-none z-0" aria-hidden="true" />

      {/* Glassmorphic CMS App Shell */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Glass Header */}
        <DevHeader />

        {/* Main Content Area (Sidebar + Panel) */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Responsive Navigation Sidebar / Bar */}
          <DevSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Active Tab Panel Content */}
          <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto max-h-[calc(100vh-4rem)]">
            <div className="max-w-6xl mx-auto">
              {activeTab === "general" && <GeneralSettingsPanel />}
              {activeTab === "countdown" && <CountdownSettingsPanel />}
              {activeTab === "gallery" && <GalleryManagerPanel />}
              {activeTab === "sequence" && <MemorySequencePanel />}
              {activeTab === "subtitles" && <SubtitleEditorPanel />}
              {activeTab === "letter" && <LetterEditorPanel />}
              {activeTab === "music" && <MusicSettingsPanel />}
              {activeTab === "duck" && <DuckIntroPanel />}
              {activeTab === "effects" && <WebsiteEffectsPanel />}
              {activeTab === "theme" && <ThemeSettingsPanel />}
              {activeTab === "hero" && <HeroSettingsPanel />}
              {activeTab === "final" && <FinalMessagePanel />}
              {activeTab === "advanced" && <AdvancedSettingsPanel />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

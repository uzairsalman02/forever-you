"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSiteConfig } from "@/context/SiteConfigContext";

import { DevHeader } from "@/components/dev/DevHeader";
import { DevSidebar, DevTab } from "@/components/dev/DevSidebar";

import { GeneralSettingsPanel } from "@/components/dev/panels/GeneralSettingsPanel";
import { CountdownSettingsPanel } from "@/components/dev/panels/CountdownSettingsPanel";
import { GalleryManagerPanel } from "@/components/dev/panels/GalleryManagerPanel";
import { MemorySequencePanel } from "@/components/dev/panels/MemorySequencePanel";
import { LetterEditorPanel } from "@/components/dev/panels/LetterEditorPanel";
import { MusicSettingsPanel } from "@/components/dev/panels/MusicSettingsPanel";
import { DuckIntroPanel } from "@/components/dev/panels/DuckIntroPanel";
import { WebsiteEffectsPanel } from "@/components/dev/panels/WebsiteEffectsPanel";
import { ThemeSettingsPanel } from "@/components/dev/panels/ThemeSettingsPanel";
import { HeroSettingsPanel } from "@/components/dev/panels/HeroSettingsPanel";
import { FinalMessagePanel } from "@/components/dev/panels/FinalMessagePanel";
import { AdvancedSettingsPanel } from "@/components/dev/panels/AdvancedSettingsPanel";

export default function DevDashboardPage() {
  const router = useRouter();
  const { config } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<DevTab>("general");
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Security check: Redirect to homepage if development mode is disabled
  useEffect(() => {
    if (config.countdown && !config.countdown.developmentMode) {
      router.push("/");
    }
  }, [config.countdown, router]);

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 ${darkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"}`}>
      {/* Background Subtle Ambient Glow */}
      <div className="fixed top-0 left-1/4 w-[40rem] h-[40rem] rounded-full bg-rose-500/10 blur-[150px] pointer-events-none z-0" aria-hidden="true" />
      <div className="fixed bottom-0 right-1/4 w-[40rem] h-[40rem] rounded-full bg-pink-500/10 blur-[150px] pointer-events-none z-0" aria-hidden="true" />

      {/* Glassmorphic CMS App Shell */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Glass Header */}
        <DevHeader darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Main Content Area (Sidebar + Panel) */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Navigation Sidebar */}
          <DevSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Active Tab Panel Content */}
          <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-[calc(100vh-4rem)]">
            <div className="max-w-6xl mx-auto">
              {activeTab === "general" && <GeneralSettingsPanel />}
              {activeTab === "countdown" && <CountdownSettingsPanel />}
              {activeTab === "gallery" && <GalleryManagerPanel />}
              {activeTab === "sequence" && <MemorySequencePanel />}
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

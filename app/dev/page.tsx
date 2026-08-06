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

export default function DevDashboardPage() {
  const router = useRouter();
  const { config } = useSiteConfig();
  const { stopAllAudio } = useAudio();
  const [activeTab, setActiveTab] = useState<DevTab>("general");

  // Silence background music when entering /dev page
  useEffect(() => {
    stopAllAudio();
  }, [stopAllAudio]);

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

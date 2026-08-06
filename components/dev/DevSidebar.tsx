"use client";

import React from "react";

export type DevTab =
  | "general"
  | "countdown"
  | "gallery"
  | "sequence"
  | "subtitles"
  | "letter"
  | "music"
  | "duck"
  | "effects"
  | "theme"
  | "hero"
  | "final"
  | "advanced";

interface DevSidebarProps {
  activeTab: DevTab;
  setActiveTab: (tab: DevTab) => void;
}

const TABS: { id: DevTab; label: string; icon: string }[] = [
  { id: "general", label: "1. General Settings", icon: "⚙️" },
  { id: "countdown", label: "2. Countdown Settings", icon: "⏳" },
  { id: "gallery", label: "3. Gallery Manager", icon: "🖼️" },
  { id: "sequence", label: "4. Zoom Memories", icon: "📸" },
  { id: "subtitles", label: "5. Subtitle Editor", icon: "🎬" },
  { id: "letter", label: "6. Letter Editor", icon: "💌" },
  { id: "music", label: "7. Music Settings", icon: "🎵" },
  { id: "duck", label: "8. Duck Intro", icon: "🐥" },
  { id: "effects", label: "9. Website Effects", icon: "✨" },
  { id: "theme", label: "10. Theme Settings", icon: "🎨" },
  { id: "hero", label: "11. Hero Settings", icon: "👑" },
  { id: "final", label: "12. Final Message", icon: "💖" },
  { id: "advanced", label: "13. Advanced / Export", icon: "🚀" },
];

export function DevSidebar({ activeTab, setActiveTab }: DevSidebarProps) {
  return (
    <>
      {/* Desktop Vertical Sidebar */}
      <aside className="hidden lg:flex w-64 min-h-[calc(100vh-4rem)] p-4 bg-white/60 backdrop-blur-2xl border-r border-slate-200/80 flex-col gap-1 select-none shrink-0">
        <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Navigation Sections
        </div>

        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                isActive
                  ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-md shadow-rose-500/20"
                  : "text-slate-700 hover:bg-slate-100/80"
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </aside>

      {/* Mobile & Tablet Horizontal Scroll Tab Navigation */}
      <div className="lg:hidden w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/80 p-2 overflow-x-auto flex items-center gap-2 select-none shrink-0 scrollbar-none">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-rose-500 text-white font-semibold shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

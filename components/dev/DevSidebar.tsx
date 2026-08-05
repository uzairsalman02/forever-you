"use client";

import React from "react";

export type DevTab =
  | "general"
  | "countdown"
  | "gallery"
  | "sequence"
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
  { id: "sequence", label: "4. Memory Sequence", icon: "🔀" },
  { id: "letter", label: "5. Letter Editor", icon: "💌" },
  { id: "music", label: "6. Music Settings", icon: "🎵" },
  { id: "duck", label: "7. Duck Intro", icon: "🐥" },
  { id: "effects", label: "8. Website Effects", icon: "✨" },
  { id: "theme", label: "9. Theme Settings", icon: "🎨" },
  { id: "hero", label: "10. Hero Settings", icon: "👑" },
  { id: "final", label: "11. Final Message", icon: "💖" },
  { id: "advanced", label: "12. Advanced / Export", icon: "🚀" },
];

export function DevSidebar({ activeTab, setActiveTab }: DevSidebarProps) {
  return (
    <aside className="w-64 min-h-[calc(100vh-4rem)] p-4 bg-white/10 backdrop-blur-2xl border-r border-white/20 flex flex-col gap-1 select-none">
      <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
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
                ? "bg-gradient-to-r from-rose-500/90 to-pink-500/90 text-white font-semibold shadow-md shadow-rose-500/20"
                : "text-slate-700 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-white/10"
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            <span className="truncate">{tab.label}</span>
          </button>
        );
      })}
    </aside>
  );
}

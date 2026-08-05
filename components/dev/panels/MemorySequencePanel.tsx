"use client";

import React from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function MemorySequencePanel() {
  const { config, updateSection } = useSiteConfig();
  const { gallery } = config;

  const favoriteItems = gallery.filter((item) => item.isFavorite);
  const normalItems = gallery.filter((item) => !item.isFavorite);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Memory Sequence Manager 🔀
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review the sequential playback order of focal photographs and scatter items.
        </p>
      </div>

      <div className="bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-sm space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-500">
          ⭐ Focal Photographs (Camera Zoom Sequence)
        </h3>
        {favoriteItems.length === 0 ? (
          <p className="text-xs text-slate-400 italic">
            No focal photographs marked. Go to Gallery Manager and click &quot;☆ Focal&quot; on any photo!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {favoriteItems.map((item) => (
              <div key={item.id} className="relative rounded-xl overflow-hidden aspect-square border-2 border-rose-500">
                <img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  FOCAL
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-sm space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          All Memory Scatter Grid Sequence ({normalItems.length} Items)
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {normalItems.map((item, idx) => (
            <div key={item.id} className="relative rounded-lg overflow-hidden aspect-square bg-slate-800/20">
              <img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover" />
              <span className="absolute top-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1 py-0.5 rounded">
                #{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import { useSiteConfig, DetailedMemoryItem } from "@/context/SiteConfigContext";

export function MemorySequencePanel() {
  const { config, updateSection } = useSiteConfig();
  const { detailedMemories } = config;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateItem = (id: string, field: keyof DetailedMemoryItem, value: string) => {
    const updated = (detailedMemories || []).map((m) =>
      m.id === id ? { ...m, [field]: value } : m
    );
    updateSection("detailedMemories", updated);
  };

  const handleAddMemory = () => {
    const newItem: DetailedMemoryItem = {
      id: `zoom-mem-${Date.now()}`,
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&auto=format&fit=crop&q=90",
      title: `Memory ${(detailedMemories || []).length + 1}`,
      description: "Write your special story or memory caption here...",
    };
    updateSection("detailedMemories", [...(detailedMemories || []), newItem]);
  };

  const handleDeleteMemory = (id: string) => {
    updateSection(
      "detailedMemories",
      (detailedMemories || []).filter((m) => m.id !== id)
    );
  };

  const handleMoveMemory = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= (detailedMemories || []).length) return;

    const list = [...(detailedMemories || [])];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    updateSection("detailedMemories", list);
  };

  const handleImageFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          handleUpdateItem(id, "image", dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Zoom Memories Editor (&quot;Relive Some Memories&quot;) 📸
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Customize photos, titles, and stories shown when clicking &quot;Relive Some Memories&quot;.
          </p>
        </div>

        <button
          onClick={handleAddMemory}
          className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold transition-all shadow-md"
        >
          + Add Zoom Memory
        </button>
      </div>

      <div className="space-y-4">
        {(detailedMemories || []).map((mem, idx) => (
          <div
            key={mem.id || idx}
            className="p-5 rounded-2xl bg-white/60 backdrop-blur-xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-5 items-start"
          >
            {/* Image Thumbnail & Upload */}
            <div className="w-full md:w-44 flex flex-col gap-2 shrink-0">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900/10 border border-slate-200 relative">
                <img src={mem.image} alt={mem.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                  #{idx + 1}
                </span>
              </div>

              <div className="flex gap-1">
                <label className="flex-1 py-1.5 px-2 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 text-[10px] font-semibold text-center cursor-pointer">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileUpload(mem.id, e)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Title & Caption Form Inputs */}
            <div className="flex-1 w-full space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  Image URL
                </label>
                <input
                  type="text"
                  value={mem.image}
                  onChange={(e) => handleUpdateItem(mem.id, "image", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/40 font-mono"
                  placeholder="Image URL..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  Memory Title
                </label>
                <input
                  type="text"
                  value={mem.title}
                  onChange={(e) => handleUpdateItem(mem.id, "title", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                  placeholder="e.g. Our First Trip Together"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  Heartfelt Story / Caption
                </label>
                <textarea
                  rows={2}
                  value={mem.description}
                  onChange={(e) => handleUpdateItem(mem.id, "description", e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                  placeholder="Write your story caption..."
                />
              </div>
            </div>

            {/* Reorder & Delete Buttons */}
            <div className="flex md:flex-col gap-2 shrink-0 self-start">
              <button
                disabled={idx === 0}
                onClick={() => handleMoveMemory(idx, "up")}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-xs"
                title="Move Up"
              >
                ⬆️
              </button>
              <button
                disabled={idx === (detailedMemories || []).length - 1}
                onClick={() => handleMoveMemory(idx, "down")}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-xs"
                title="Move Down"
              >
                ⬇️
              </button>
              <button
                onClick={() => handleDeleteMemory(mem.id)}
                className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors text-xs"
                title="Delete Zoom Memory"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

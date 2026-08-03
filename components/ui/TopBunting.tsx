"use client";

import React from "react";

export function TopBunting() {
  // Flag color palette: Pink, White, Rose Gold, Soft Peach
  const flagColors = [
    "fill-rose-300/80 stroke-rose-400/40",
    "fill-white/90 stroke-rose-200/50",
    "fill-amber-200/80 stroke-amber-300/50",
    "fill-pink-200/80 stroke-pink-300/40",
    "fill-rose-200/80 stroke-rose-300/40",
    "fill-white/90 stroke-rose-200/50",
    "fill-amber-200/80 stroke-amber-300/50",
    "fill-pink-300/70 stroke-pink-400/40",
  ];

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none overflow-hidden select-none"
    >
      <div className="w-full flex justify-between items-start animate-swing-bunting px-1">
        {/* SVG String Line & Fabric Flags */}
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-auto max-h-16 sm:max-h-20 drop-shadow-[0_4px_10px_rgba(244,114,182,0.15)]"
          preserveAspectRatio="none"
        >
          {/* Curved Garland String Line */}
          <path
            d="M0,10 Q300,50 600,10 Q900,50 1200,10"
            fill="none"
            stroke="rgba(244,114,182,0.3)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Tri-Garland Fabric Flags */}
          {Array.from({ length: 24 }).map((_, i) => {
            const xPos = (i * 1200) / 24 + 10;
            // Calculate yPos along the parabolic curve
            const relX = (xPos % 600) / 300 - 1;
            const yPos = 10 + (1 - relX * relX) * 35;
            const colorClass = flagColors[i % flagColors.length];

            return (
              <polygon
                key={i}
                points={`${xPos},${yPos} ${xPos + 38},${yPos} ${xPos + 19},${yPos + 48}`}
                className={`${colorClass} transition-transform duration-500`}
                strokeWidth="1"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

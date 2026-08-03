"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CelebrationOverlayProps {
  isCelebrating?: boolean;
}

export function CelebrationOverlay({
  isCelebrating = true,
}: CelebrationOverlayProps) {
  if (!isCelebrating) return null;

  // Array of falling hearts, sparkles, flower petals, and fireworks
  const items = Array.from({ length: 32 }).map((_, i) => {
    const isHeart = i % 2 === 0;
    const isSparkle = i % 3 === 0;
    return {
      id: i,
      symbol: isHeart ? "❤️" : isSparkle ? "✨" : "🌸",
      left: `${(i * 3.1) % 96}%`,
      delay: (i * 0.12) % 2.5,
      duration: 3.5 + (i % 3),
      size: isHeart ? 16 + (i % 4) * 4 : 12 + (i % 3) * 3,
      xOffset: (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 15),
    };
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: "-10vh", x: 0, opacity: 0, rotate: 0 }}
            animate={{
              y: "110vh",
              x: item.xOffset,
              opacity: [0, 0.9, 0.9, 0],
              rotate: item.xOffset * 4,
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left: item.left,
              fontSize: `${item.size}px`,
            }}
          >
            {item.symbol}
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}

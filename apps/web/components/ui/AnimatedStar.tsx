"use client";

import { motion } from "framer-motion";

export function AnimatedStar() {
  return (
    <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
      {/* Glow pulse behind — 50% more transparent */}
      <motion.div
        className="absolute top-0 bottom-0 rounded-full"
        style={{ left: "-5%", right: "5%", backgroundColor: "#A3824A", filter: "blur(28px)" }}
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.8, 1.05, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Crescent moon SVG */}
      <motion.svg
        viewBox="0 0 100 100"
        className="relative h-20 w-20 drop-shadow-[0_0_18px_rgba(212,180,0,0.45)]"
        animate={{ y: [-3, 3, -3], rotate: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <mask id="moonMask">
            <circle cx="50" cy="50" r="36" fill="white" />
            <circle cx="65" cy="42" r="27" fill="black" />
          </mask>
          <radialGradient id="moonGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#FFF0A0" />
            <stop offset="40%"  stopColor="#F5C830" />
            <stop offset="100%" stopColor="#A3824A" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="36" fill="url(#moonGrad)" mask="url(#moonMask)" />
      </motion.svg>

      {/* Inner shimmer dot */}
      <motion.div
        className="absolute h-3 w-3 rounded-full"
        style={{ backgroundColor: "#FFFBE0", filter: "blur(4px)", transform: "translateX(-120%)" }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.8, 1.3, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

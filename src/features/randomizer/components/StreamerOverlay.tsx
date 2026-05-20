"use client";

import { motion } from "framer-motion";
import { RadioTower } from "lucide-react";
import type { RandomResult } from "@/shared/types/randomizer";

export const StreamerOverlay = ({ result }: { result?: RandomResult }) => (
  <motion.div
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    className="clip-corners fixed left-4 right-4 top-4 z-50 mx-auto max-w-4xl border border-hextech/40 bg-void/88 p-3 shadow-glow backdrop-blur-xl"
  >
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <RadioTower className="h-5 w-5 text-hextech" />
        <span className="font-display text-xl font-bold uppercase tracking-[0.14em] text-white">Streamer Overlay</span>
      </div>
      <div className="text-sm text-slate-300">
        {result ? `${result.champion?.name ?? "Team Roll"} · ${result.role ?? "Fill"} · ${result.challenge?.title ?? result.build?.name ?? "Ready"}` : "Esperando roll..."}
      </div>
    </div>
  </motion.div>
);

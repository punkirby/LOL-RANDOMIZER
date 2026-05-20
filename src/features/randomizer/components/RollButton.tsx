"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface RollButtonProps {
  disabled?: boolean;
  phase: string;
  onClick: () => void;
}

export const RollButton = ({ disabled, phase, onClick }: RollButtonProps) => (
  <div className="relative mx-auto flex aspect-square w-56 items-center justify-center sm:w-72">
    <motion.div
      aria-hidden
      className="absolute inset-0 rounded-full border border-hextech/30"
      animate={{ rotate: 360 }}
      transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      aria-hidden
      className="absolute inset-5 rounded-full border border-gold/40"
      animate={{ rotate: -360 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute inset-10 rounded-full bg-hextech/10 blur-2xl" />
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.045 }}
      whileTap={{ scale: 0.96 }}
      className="clip-corners relative z-10 flex h-40 w-40 flex-col items-center justify-center overflow-hidden border border-gold/70 bg-gradient-to-br from-[#1b2438] via-[#071525] to-[#081014] text-center shadow-gold transition disabled:cursor-wait sm:h-52 sm:w-52"
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ["-130%", "130%"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <Sparkles className="mb-2 h-6 w-6 text-hextech" />
      <span className="font-display text-5xl font-bold uppercase tracking-[0.12em] text-white sm:text-6xl">Roll</span>
      <span className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-gold">{phase === "idle" ? "Rift Core" : phase}</span>
    </motion.button>
  </div>
);

"use client";

import { Crown, Dice5, Flame, Gamepad2, Swords, Users, WandSparkles, Zap } from "lucide-react";
import { cn } from "@/shared/lib/cn";
import type { RandomMode } from "@/shared/types/randomizer";

const modes: Array<{ id: RandomMode; label: string; hint: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: "champion", label: "Campeón", hint: "Solo pick", icon: Crown },
  { id: "role", label: "Rol", hint: "Pick + lane", icon: Gamepad2 },
  { id: "build", label: "Build", hint: "Items + runas", icon: WandSparkles },
  { id: "full", label: "Full Challenge", hint: "Todo incluido", icon: Flame },
  { id: "team", label: "Team", hint: "5 roles", icon: Users },
  { id: "draft", label: "Draft", hint: "Compo completa", icon: Swords },
  { id: "aram", label: "ARAM", hint: "Caos rápido", icon: Zap },
  { id: "bravery", label: "Ultimate Bravery", hint: "Modo viral", icon: Dice5 }
];

interface ModeSelectorProps {
  value: RandomMode;
  onChange: (mode: RandomMode) => void;
}

export const ModeSelector = ({ value, onChange }: ModeSelectorProps) => (
  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
    {modes.map((mode) => {
      const Icon = mode.icon;
      const active = value === mode.id;

      return (
        <button
          key={mode.id}
          type="button"
          onClick={() => onChange(mode.id)}
          className={cn(
            "group clip-corners relative min-h-24 overflow-hidden border px-4 py-4 text-left transition duration-300",
            active
              ? "border-hextech/70 bg-hextech/14 shadow-glow"
              : "border-white/10 bg-white/[0.045] hover:border-gold/60 hover:bg-white/[0.075]"
          )}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-60" />
          <Icon className={cn("mb-3 h-5 w-5 transition", active ? "text-hextech" : "text-gold group-hover:text-hextech")} />
          <div className="font-display text-lg font-bold uppercase tracking-[0.08em] text-white">{mode.label}</div>
          <div className="mt-1 text-xs font-medium text-slate-400">{mode.hint}</div>
        </button>
      );
    })}
  </div>
);

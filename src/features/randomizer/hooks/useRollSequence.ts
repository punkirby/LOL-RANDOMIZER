"use client";

import { useCallback, useState } from "react";
import type { RandomMode, RandomResult } from "@/shared/types/randomizer";
import { useRandomizerStore } from "@/features/randomizer/store/randomizerStore";

type Phase = "idle" | "charging" | "revealing" | "complete";

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export const useRollSequence = () => {
  const roll = useRandomizerStore((state) => state.roll);
  const sound = useRandomizerStore((state) => state.settings.sound);
  const [phase, setPhase] = useState<Phase>("idle");

  const executeRoll = useCallback(
    async (mode: RandomMode): Promise<RandomResult> => {
      if (sound) playImpactCue();
      setPhase("charging");
      await new Promise((resolve) => setTimeout(resolve, 620));
      const result = roll(mode);
      setPhase("revealing");
      await new Promise((resolve) => setTimeout(resolve, 540));
      setPhase("complete");
      return result;
    },
    [roll, sound]
  );

  return { executeRoll, phase, isRolling: phase === "charging" || phase === "revealing" };
};

const playImpactCue = () => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const now = context.currentTime;

  [130, 196, 261].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = index === 2 ? "triangle" : "sine";
    oscillator.frequency.setValueAtTime(frequency, now + index * 0.08);
    gain.gain.setValueAtTime(0.0001, now + index * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.08, now + index * 0.08 + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.32);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now + index * 0.08);
    oscillator.stop(now + index * 0.08 + 0.34);
  });
};

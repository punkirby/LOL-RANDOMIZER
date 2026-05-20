"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Share2, Trophy } from "lucide-react";
import { useState } from "react";
import { ModeSelector } from "@/features/randomizer/components/ModeSelector";
import { ResultPanel } from "@/features/randomizer/components/ResultPanel";
import { RollButton } from "@/features/randomizer/components/RollButton";
import { SidePanels } from "@/features/randomizer/components/SidePanels";
import { StreamerOverlay } from "@/features/randomizer/components/StreamerOverlay";
import { useRollSequence } from "@/features/randomizer/hooks/useRollSequence";
import { useRandomizerStore } from "@/features/randomizer/store/randomizerStore";
import type { RandomMode } from "@/shared/types/randomizer";

export const RandomizerApp = () => {
  const [mode, setMode] = useState<RandomMode>("full");
  const current = useRandomizerStore((state) => state.current);
  const settings = useRandomizerStore((state) => state.settings);
  const { executeRoll, isRolling, phase } = useRollSequence();

  return (
    <main className="noise relative min-h-screen overflow-hidden">
      <div className="hex-grid pointer-events-none fixed inset-0 z-0 opacity-70" />
      <div className="pointer-events-none fixed left-1/2 top-0 z-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-hextech/10 blur-3xl" />
      {settings.streamerMode && <StreamerOverlay result={current} />}

      <div className="relative z-10 mx-auto max-w-[1520px] px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-5 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 border border-gold/30 bg-gold/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              <Trophy className="h-4 w-4" />
              Premium League Randomizer
            </div>
            <h1 className="font-display text-5xl font-bold uppercase leading-none text-white sm:text-7xl lg:text-8xl">Rift Roulette</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Campeones, roles, builds, runas, hechizos, challenges, composiciones y reglas especiales en una experiencia lista para premades, streamers y noches de caos competitivo.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="clip-corners flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-hextech/60 hover:bg-hextech/10">
              <Share2 className="h-4 w-4" />
              Compartir
            </button>
            <button className="clip-corners flex items-center gap-2 border border-gold/40 bg-gold/10 px-4 py-3 text-sm font-semibold text-gold transition hover:border-gold hover:bg-gold/20">
              <Download className="h-4 w-4" />
              Exportar
            </button>
          </div>
        </header>

        <section className="mb-6 grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="glass clip-corners p-4 sm:p-5">
              <ModeSelector value={mode} onChange={setMode} />
            </div>

            <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
              <section className="glass clip-corners relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden p-5 text-center">
                <div className="absolute inset-x-8 top-10 h-px gold-line" />
                <div className="absolute inset-x-8 bottom-10 h-px gold-line" />
                <p className="mb-6 font-display text-2xl font-bold uppercase tracking-[0.16em] text-white">Core Randomizer</p>
                <RollButton disabled={isRolling} phase={phase} onClick={() => void executeRoll(mode)} />
                <div className="mt-8 grid w-full grid-cols-3 gap-2 text-center">
                  {["Impacto", "Caos", "Clip"].map((label, index) => (
                    <div key={label} className="border border-white/10 bg-white/[0.035] p-3">
                      <div className="font-display text-2xl font-bold text-hextech">{index === 0 ? "97" : index === 1 ? "S+" : "4K"}</div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{label}</div>
                    </div>
                  ))}
                </div>
              </section>

              <ResultPanel result={current} />
            </div>
          </div>

          <SidePanels />
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Feature title="Daily Challenges" text="Rotación diaria preparada para enganchar a comunidades y Discords." />
          <Feature title="Draft Compartido" text="Arquitectura lista para salas, códigos de lobby y randoms grupales sincronizados." />
          <Feature title="Riot Ready" text="Datos locales ahora, conexión posterior con Riot API y Data Dragon sin reescribir la app." />
        </section>
      </div>

      <AnimatePresence>
        {isRolling && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-40 bg-hextech/10 mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.2] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

const Feature = ({ title, text }: { title: string; text: string }) => (
  <div className="glass clip-corners p-5">
    <h3 className="font-display text-2xl font-bold uppercase text-white">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
  </div>
);

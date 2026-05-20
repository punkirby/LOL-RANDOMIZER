"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Heart, Shield, Swords, WandSparkles } from "lucide-react";
import { useRandomizerStore } from "@/features/randomizer/store/randomizerStore";
import type { RandomResult } from "@/shared/types/randomizer";

const ddragonIds: Record<string, string> = {
  aatrox: "Aatrox",
  ahri: "Ahri",
  akali: "Akali",
  ashe: "Ashe",
  azir: "Azir",
  briar: "Briar",
  caitlyn: "Caitlyn",
  darius: "Darius",
  ekko: "Ekko",
  ezreal: "Ezreal",
  fiora: "Fiora",
  gwen: "Gwen",
  hwei: "Hwei",
  irelia: "Irelia",
  jinx: "Jinx",
  kaisa: "Kaisa",
  leesin: "LeeSin",
  leona: "Leona",
  lux: "Lux",
  mordekaiser: "Mordekaiser",
  naafiri: "Naafiri",
  nami: "Nami",
  orianna: "Orianna",
  pyke: "Pyke",
  qiyana: "Qiyana",
  rakan: "Rakan",
  riven: "Riven",
  samira: "Samira",
  senna: "Senna",
  sett: "Sett",
  thresh: "Thresh",
  viego: "Viego",
  viktor: "Viktor",
  yasuo: "Yasuo",
  yone: "Yone",
  zeri: "Zeri"
};

const splashUrl = (championId?: string) => {
  if (!championId) return "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg";
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${ddragonIds[championId] ?? "Lux"}_0.jpg`;
};

export const ResultPanel = ({ result }: { result?: RandomResult }) => {
  const toggleFavorite = useRandomizerStore((state) => state.toggleFavorite);
  const favorites = useRandomizerStore((state) => state.favorites);
  const isFavorite = result ? favorites.some((favorite) => favorite.id === result.id) : false;

  return (
    <section className="glass clip-corners relative min-h-[620px] overflow-hidden">
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -16 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative min-h-[620px]"
          >
            <Image src={splashUrl(result.champion?.id)} alt={result.champion?.name ?? "League champion splash"} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover opacity-48" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/72 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void/60" />

            <div className="relative z-10 flex min-h-[620px] flex-col justify-end p-5 sm:p-8">
              <div className="mb-auto flex items-center justify-between gap-3">
                <span className="clip-corners border border-hextech/40 bg-hextech/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-hextech">
                  {result.mode.replace("-", " ")}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => void navigator.clipboard?.writeText(`${result.champion?.name ?? "Team Roll"} | ${result.role ?? "Fill"} | ${result.shareCode}`)}
                    className="rounded-full border border-white/10 bg-white/10 p-3 text-white transition hover:border-hextech/60 hover:text-hextech"
                    aria-label="Copiar resultado"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button onClick={() => toggleFavorite(result)} className="rounded-full border border-white/10 bg-white/10 p-3 text-white transition hover:border-gold/70 hover:text-gold" aria-label="Guardar favorito">
                    <Heart className={isFavorite ? "h-4 w-4 fill-gold text-gold" : "h-4 w-4"} />
                  </button>
                </div>
              </div>

              <div className="max-w-2xl">
                <p className="font-display text-lg font-semibold uppercase tracking-[0.28em] text-gold">{result.champion?.title ?? "Composición generada"}</p>
                <h2 className="mt-2 font-display text-6xl font-bold uppercase leading-none text-white sm:text-7xl">{result.champion?.name ?? "Rift Squad"}</h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">{result.champion?.fantasy ?? "Cinco picks, cinco planes de partida y suficiente caos para que el lobby despierte."}</p>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-2">
                <InfoTile icon={Swords} label="Rol / Hechizos" value={`${result.role ?? "Fill"}${result.spells ? ` · ${result.spells.map((spell) => spell.name).join(" + ")}` : ""}`} />
                <InfoTile icon={WandSparkles} label="Build" value={result.build ? `${result.build.name} · ${result.build.style}` : "Pick limpio sin build forzada"} />
                <InfoTile icon={Shield} label="Runas" value={result.runes ? `${result.runes.keystone} (${result.runes.primary}) + ${result.runes.secondary}` : "Runas libres"} />
                <InfoTile icon={Heart} label="Challenge" value={result.challenge ? `${result.challenge.title}: ${result.challenge.description}` : result.restrictions[0]} />
              </div>

              {result.team && (
                <div className="mt-5 grid gap-2 sm:grid-cols-5">
                  {result.team.map((slot) => (
                    <div key={`${slot.role}-${slot.champion.id}`} className="border border-white/10 bg-black/26 p-3">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-hextech">{slot.role}</div>
                      <div className="mt-1 font-display text-xl font-bold text-white">{slot.champion.name}</div>
                      <div className="text-xs text-slate-400">{slot.build.name}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                {result.restrictions.map((restriction) => (
                  <span key={restriction} className="border border-gold/20 bg-gold/10 px-3 py-2 text-xs font-medium text-gold">
                    {restriction}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-[620px] flex-col items-center justify-center p-8 text-center">
            <div className="mb-6 h-28 w-28 rounded-full border border-hextech/30 bg-hextech/10 shadow-glow" />
            <p className="font-display text-4xl font-bold uppercase text-white">Listo para abrir la grieta</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">Elige un modo y pulsa ROLL. El resultado aparecerá con campeón, rol, build, runas, hechizos y reglas especiales según el modo.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const InfoTile = ({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) => (
  <div className="border border-white/10 bg-black/28 p-4 backdrop-blur">
    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-hextech">
      <Icon className="h-4 w-4" />
      {label}
    </div>
    <p className="text-sm leading-6 text-slate-200">{value}</p>
  </div>
);

"use client";

import { BarChart3, Clock3, Eye, Heart, MonitorUp, Moon, Radio, Trash2, Volume2, VolumeX } from "lucide-react";
import { useMemo } from "react";
import { useRandomizerStore } from "@/features/randomizer/store/randomizerStore";

export const SidePanels = () => {
  const history = useRandomizerStore((state) => state.history);
  const favorites = useRandomizerStore((state) => state.favorites);
  const settings = useRandomizerStore((state) => state.settings);
  const updateSettings = useRandomizerStore((state) => state.updateSettings);
  const clearHistory = useRandomizerStore((state) => state.clearHistory);

  const stats = useMemo(() => {
    const championCounts = history.reduce<Record<string, number>>((acc, item) => {
      if (!item.champion?.name) return acc;
      acc[item.champion.name] = (acc[item.champion.name] ?? 0) + 1;
      return acc;
    }, {});
    const topChampion = Object.entries(championCounts).sort((a, b) => b[1] - a[1])[0];
    const braveryCount = history.filter((item) => item.mode === "bravery" || item.mode === "full").length;
    return { topChampion, braveryCount };
  }, [history]);

  return (
    <aside className="space-y-4">
      <Panel title="Control Room" icon={Radio}>
        <div className="grid gap-2">
          <Toggle
            icon={settings.sound ? Volume2 : VolumeX}
            label="Sonido"
            active={settings.sound}
            onClick={() => updateSettings({ sound: !settings.sound })}
          />
          <Toggle
            icon={MonitorUp}
            label="Modo streamer"
            active={settings.streamerMode}
            onClick={() => updateSettings({ streamerMode: !settings.streamerMode })}
          />
          <Toggle
            icon={Eye}
            label="Evitar favoritos"
            active={settings.avoidFavorites}
            onClick={() => updateSettings({ avoidFavorites: !settings.avoidFavorites })}
          />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {(["piltover", "noxus", "ionia", "shadow-isles"] as const).map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => updateSettings({ theme })}
              className={`h-9 border transition ${settings.theme === theme ? "border-hextech bg-hextech/20" : "border-white/10 bg-white/5 hover:border-gold/50"}`}
              aria-label={`Tema ${theme}`}
            />
          ))}
        </div>
      </Panel>

      <Panel title="Estadísticas" icon={BarChart3}>
        <Metric label="Rolls totales" value={history.length.toString()} />
        <Metric label="Favoritos" value={favorites.length.toString()} />
        <Metric label="Full/Bravery" value={stats.braveryCount.toString()} />
        <Metric label="Campeón frecuente" value={stats.topChampion ? `${stats.topChampion[0]} x${stats.topChampion[1]}` : "Sin datos"} />
      </Panel>

      <Panel title="Últimos randoms" icon={Clock3} action={history.length ? <button onClick={clearHistory} className="text-slate-400 transition hover:text-ember" aria-label="Limpiar historial"><Trash2 className="h-4 w-4" /></button> : null}>
        <div className="space-y-2">
          {history.slice(0, 7).map((item) => (
            <div key={item.id} className="border border-white/10 bg-white/[0.035] p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-display text-lg font-bold text-white">{item.champion?.name ?? "Team Roll"}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-hextech">{item.mode}</span>
              </div>
              <div className="mt-1 text-xs text-slate-400">{item.role ?? "Fill"} · {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
            </div>
          ))}
          {!history.length && <p className="py-4 text-sm leading-6 text-slate-400">Todavía no hay historial. El primer roll siempre tiene sabor a ceremonia.</p>}
        </div>
      </Panel>

      <Panel title="Favoritos" icon={Heart}>
        <div className="space-y-2">
          {favorites.slice(0, 5).map((item) => (
            <div key={item.id} className="border border-gold/20 bg-gold/10 p-3">
              <div className="font-display text-lg font-bold text-white">{item.champion?.name ?? "Team Roll"}</div>
              <div className="text-xs text-gold">{item.challenge?.title ?? item.build?.name ?? item.mode}</div>
            </div>
          ))}
          {!favorites.length && <p className="py-4 text-sm leading-6 text-slate-400">Guarda resultados potentes para repetirlos en stream o en premade.</p>}
        </div>
      </Panel>
    </aside>
  );
};

const Panel = ({ title, icon: Icon, children, action }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode; action?: React.ReactNode }) => (
  <section className="glass clip-corners p-4">
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-hextech" />
        <h2 className="font-display text-xl font-bold uppercase tracking-[0.12em] text-white">{title}</h2>
      </div>
      {action}
    </div>
    {children}
  </section>
);

const Toggle = ({ icon: Icon, label, active, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; active: boolean; onClick: () => void }) => (
  <button type="button" onClick={onClick} className={`flex items-center justify-between border px-3 py-3 text-sm transition ${active ? "border-hextech/60 bg-hextech/12 text-white" : "border-white/10 bg-white/[0.035] text-slate-400 hover:text-white"}`}>
    <span className="flex items-center gap-2">
      <Icon className="h-4 w-4" />
      {label}
    </span>
    <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-hextech shadow-glow" : "bg-slate-600"}`} />
  </button>
);

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="mb-2 border border-white/10 bg-black/20 p-3">
    <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</div>
    <div className="mt-1 font-display text-2xl font-bold text-white">{value}</div>
  </div>
);

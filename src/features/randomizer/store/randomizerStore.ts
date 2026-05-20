"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createRandomResult } from "@/features/randomizer/domain/randomizerEngine";
import type { RandomMode, RandomResult, RandomizerSettings } from "@/shared/types/randomizer";

interface RandomizerState {
  current?: RandomResult;
  history: RandomResult[];
  favorites: RandomResult[];
  settings: RandomizerSettings;
  roll: (mode: RandomMode) => RandomResult;
  toggleFavorite: (result: RandomResult) => void;
  updateSettings: (settings: Partial<RandomizerSettings>) => void;
  clearHistory: () => void;
}

export const useRandomizerStore = create<RandomizerState>()(
  persist(
    (set, get) => ({
      history: [],
      favorites: [],
      settings: {
        sound: true,
        streamerMode: false,
        theme: "piltover",
        avoidFavorites: false
      },
      roll: (mode) => {
        const result = createRandomResult(mode);
        set((state) => ({
          current: result,
          history: [result, ...state.history].slice(0, 40)
        }));
        return result;
      },
      toggleFavorite: (result) => {
        const exists = get().favorites.some((favorite) => favorite.id === result.id);
        set((state) => ({
          favorites: exists ? state.favorites.filter((favorite) => favorite.id !== result.id) : [result, ...state.favorites].slice(0, 24)
        }));
      },
      updateSettings: (settings) => set((state) => ({ settings: { ...state.settings, ...settings } })),
      clearHistory: () => set({ history: [] })
    }),
    {
      name: "rift-roulette-v1",
      partialize: (state) => ({
        history: state.history,
        favorites: state.favorites,
        settings: state.settings
      })
    }
  )
);

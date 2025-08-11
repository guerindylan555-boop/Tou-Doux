"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SettingsState = {
  apiKey: string;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      apiKey: "",
      setApiKey: (apiKey: string) => set({ apiKey }),
      clearApiKey: () => set({ apiKey: "" }),
    }),
    {
      name: "todoux-settings",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ apiKey: state.apiKey }),
    }
  )
);

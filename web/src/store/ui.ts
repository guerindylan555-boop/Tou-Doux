"use client";

import { create } from "zustand";

type UiState = {
  loading: boolean;
  message?: string;
  setLoading: (loading: boolean, message?: string) => void;
};

export const useUiStore = create<UiState>((set) => ({
  loading: false,
  message: undefined,
  setLoading: (loading, message) => set({ loading, message }),
}));

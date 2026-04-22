import { create } from "zustand";

type AppState = {
  language: string;
  setLanguage: (language: string) => void;
  count: number;
  inc: () => void;
  dec: () => void;
  reset: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
  dec: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
  language: "en",
  setLanguage: (language: string) => set({ language }),
}));

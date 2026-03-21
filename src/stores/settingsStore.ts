import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserSettings } from '../types';

interface SettingsStore {
  settings: UserSettings | null;
  setSettings: (s: UserSettings) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: null,
      setSettings: (s) => set({ settings: s }),
    }),
    { name: 'fit-happens-settings' },
  ),
);

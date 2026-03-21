import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DailyLog, MealSelection } from '../types';

export function emptyMeal(): MealSelection {
  return { protein: null, carbs: null, side: null };
}

function emptyLog(date: string): DailyLog {
  return {
    date,
    isTrainingDay: false,
    isCheatDay: false,
    cheatMealSlot: null,
    breakfast: emptyMeal(),
    morningSnack: emptyMeal(),
    lunch: emptyMeal(),
    afternoonSnack: emptyMeal(),
    evening: emptyMeal(),
    ateVeggies: false,
    waterGlasses: 0,
  };
}

interface DailyLogStore {
  logs: Record<string, DailyLog>;
  getLog: (date: string) => DailyLog;
  updateLog: (date: string, patch: Partial<DailyLog>) => void;
}

export const useDailyLogStore = create<DailyLogStore>()(
  persist(
    (set, get) => ({
      logs: {},
      getLog: (date) => get().logs[date] ?? emptyLog(date),
      updateLog: (date, patch) =>
        set((state) => ({
          logs: {
            ...state.logs,
            [date]: { ...(state.logs[date] ?? emptyLog(date)), ...patch },
          },
        })),
    }),
    { name: 'fit-happens-logs' },
  ),
);

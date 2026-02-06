import { useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { CycleSettings } from '../types/cycle';
import { getEffectiveLastPeriodStart } from '../utils/cycleCalculator';

const getTodayString = () => format(new Date(), 'yyyy-MM-dd');

interface CycleState {
  settings: CycleSettings;
  promptShownForCycle: string | null;
  currentDate: string;
  setLastPeriodStart: (date: string) => void;
  setCycleLength: (length: number) => void;
  setPeriodLength: (length: number) => void;
  completeOnboarding: () => void;
  resetAllData: () => void;
  setPromptShown: (cycleDate: string) => void;
  checkDateChange: () => void;
}

const initialSettings: CycleSettings = {
  lastPeriodStart: null,
  averageCycleLength: 28,
  averagePeriodLength: 5,
  onboardingCompleted: false,
};

export const useCycleStore = create<CycleState>()(
  persist(
    (set, get) => ({
      settings: initialSettings,
      promptShownForCycle: null,
      currentDate: getTodayString(),

      setLastPeriodStart: (date: string) =>
        set((state) => ({
          settings: { ...state.settings, lastPeriodStart: date },
          promptShownForCycle: date,
        })),

      setCycleLength: (length: number) =>
        set((state) => ({
          settings: { ...state.settings, averageCycleLength: length },
        })),

      setPeriodLength: (length: number) =>
        set((state) => ({
          settings: { ...state.settings, averagePeriodLength: length },
        })),

      completeOnboarding: () =>
        set((state) => ({
          settings: { ...state.settings, onboardingCompleted: true },
        })),

      resetAllData: () =>
        set({
          settings: initialSettings,
          promptShownForCycle: null,
          currentDate: getTodayString(),
        }),

      setPromptShown: (cycleDate: string) =>
        set({ promptShownForCycle: cycleDate }),

      checkDateChange: () => {
        const today = getTodayString();
        if (get().currentDate !== today) {
          set({ currentDate: today });
        }
      },
    }),
    {
      name: 'bloom-cycle-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        settings: state.settings,
        promptShownForCycle: state.promptShownForCycle,
      }),
    }
  )
);

export const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const unsubFinishHydration = useCycleStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    // Check if already hydrated
    if (useCycleStore.persist.hasHydrated()) {
      setHasHydrated(true);
    }

    return () => {
      unsubFinishHydration();
    };
  }, []);

  return hasHydrated;
};

export const useIsOnboardingComplete = () =>
  useCycleStore((state) => state.settings.onboardingCompleted);

export const useCurrentDate = () =>
  useCycleStore((state) => state.currentDate);

export const checkDateChange = () =>
  useCycleStore.getState().checkDateChange();

export const useLastPeriodStart = () =>
  useCycleStore((state) => state.settings.lastPeriodStart);

export const useCycleSettings = () =>
  useCycleStore((state) => state.settings);

export const useEffectiveCycleStart = () => {
  const settings = useCycleStore((state) => state.settings);
  const promptShownForCycle = useCycleStore((state) => state.promptShownForCycle);

  if (!settings.lastPeriodStart) {
    return {
      effectiveDate: null,
      rolledOver: false,
      cyclesPassed: 0,
      shouldShowPrompt: false,
    };
  }

  const { date, rolledOver, cyclesPassed } = getEffectiveLastPeriodStart(
    settings.lastPeriodStart,
    settings.averageCycleLength
  );

  return {
    effectiveDate: date,
    rolledOver,
    cyclesPassed,
    shouldShowPrompt: rolledOver && promptShownForCycle !== date,
  };
};

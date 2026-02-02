import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CycleSettings } from '../types/cycle';
import { getEffectiveLastPeriodStart } from '../utils/cycleCalculator';

interface CycleState {
  settings: CycleSettings;
  promptShownForCycle: string | null;
  setLastPeriodStart: (date: string) => void;
  setCycleLength: (length: number) => void;
  setPeriodLength: (length: number) => void;
  completeOnboarding: () => void;
  resetAllData: () => void;
  setPromptShown: (cycleDate: string) => void;
}

const initialSettings: CycleSettings = {
  lastPeriodStart: null,
  averageCycleLength: 28,
  averagePeriodLength: 5,
  onboardingCompleted: false,
};

export const useCycleStore = create<CycleState>()(
  persist(
    (set) => ({
      settings: initialSettings,
      promptShownForCycle: null,

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
        }),

      setPromptShown: (cycleDate: string) =>
        set({ promptShownForCycle: cycleDate }),
    }),
    {
      name: 'bloom-cycle-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useIsOnboardingComplete = () =>
  useCycleStore((state) => state.settings.onboardingCompleted);

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

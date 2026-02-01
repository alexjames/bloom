import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CycleSettings } from '../types/cycle';

interface CycleState {
  settings: CycleSettings;
  setLastPeriodStart: (date: string) => void;
  setCycleLength: (length: number) => void;
  setPeriodLength: (length: number) => void;
  completeOnboarding: () => void;
  resetAllData: () => void;
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

      setLastPeriodStart: (date: string) =>
        set((state) => ({
          settings: { ...state.settings, lastPeriodStart: date },
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
        }),
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

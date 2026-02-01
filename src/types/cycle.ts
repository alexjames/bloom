export interface PredictedCycle {
  startDate: string;
  endDate: string;
  ovulationDate: string;
  fertileWindowStart: string;
  fertileWindowEnd: string;
  cycleNumber: number;
}

export interface CycleSettings {
  lastPeriodStart: string | null;
  averageCycleLength: number;
  averagePeriodLength: number;
  onboardingCompleted: boolean;
}

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

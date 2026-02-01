import { addDays, differenceInDays, format, parseISO } from 'date-fns';
import { PredictedCycle, CyclePhase } from '../types/cycle';

const DEFAULTS = {
  CYCLE_LENGTH: 28,
  PERIOD_LENGTH: 5,
  OVULATION_OFFSET: 14,
  FERTILE_WINDOW_BEFORE: 4,
  FERTILE_WINDOW_AFTER: 1,
};

export function calculateNextPeriod(
  lastPeriodStart: Date,
  cycleLength: number = DEFAULTS.CYCLE_LENGTH
): Date {
  return addDays(lastPeriodStart, cycleLength);
}

export function calculateOvulation(
  nextPeriodStart: Date,
  ovulationOffset: number = DEFAULTS.OVULATION_OFFSET
): Date {
  return addDays(nextPeriodStart, -ovulationOffset);
}

export function calculateFertileWindow(ovulationDate: Date): {
  start: Date;
  end: Date;
} {
  return {
    start: addDays(ovulationDate, -DEFAULTS.FERTILE_WINDOW_BEFORE),
    end: addDays(ovulationDate, DEFAULTS.FERTILE_WINDOW_AFTER),
  };
}

export function generateCyclePredictions(
  lastPeriodStart: string,
  cycleLength: number,
  periodLength: number,
  numberOfCycles: number = 6
): PredictedCycle[] {
  const predictions: PredictedCycle[] = [];
  let currentStart = parseISO(lastPeriodStart);

  for (let i = 1; i <= numberOfCycles; i++) {
    const nextPeriodStart = addDays(currentStart, cycleLength);
    const nextPeriodEnd = addDays(nextPeriodStart, periodLength - 1);
    const ovulationDate = calculateOvulation(nextPeriodStart);
    const fertileWindow = calculateFertileWindow(ovulationDate);

    predictions.push({
      startDate: format(nextPeriodStart, 'yyyy-MM-dd'),
      endDate: format(nextPeriodEnd, 'yyyy-MM-dd'),
      ovulationDate: format(ovulationDate, 'yyyy-MM-dd'),
      fertileWindowStart: format(fertileWindow.start, 'yyyy-MM-dd'),
      fertileWindowEnd: format(fertileWindow.end, 'yyyy-MM-dd'),
      cycleNumber: i,
    });

    currentStart = nextPeriodStart;
  }

  return predictions;
}

export function getCurrentCycleDay(lastPeriodStart: string): number {
  const start = parseISO(lastPeriodStart);
  const today = new Date();
  return differenceInDays(today, start) + 1;
}

export function getDaysUntilNextPeriod(
  lastPeriodStart: string,
  cycleLength: number
): number {
  const nextPeriod = calculateNextPeriod(parseISO(lastPeriodStart), cycleLength);
  const today = new Date();
  return Math.max(0, differenceInDays(nextPeriod, today));
}

export function getCurrentPhase(
  cycleDay: number,
  periodLength: number,
  cycleLength: number
): CyclePhase {
  const ovulationDay = cycleLength - 14;

  if (cycleDay <= periodLength) {
    return 'menstrual';
  } else if (cycleDay < ovulationDay - 1) {
    return 'follicular';
  } else if (cycleDay <= ovulationDay + 1) {
    return 'ovulation';
  } else {
    return 'luteal';
  }
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  return `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`;
}

export function formatDate(date: string, formatStr: string = 'MMM d'): string {
  return format(parseISO(date), formatStr);
}

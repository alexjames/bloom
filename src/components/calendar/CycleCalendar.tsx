import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format, parseISO, eachDayOfInterval } from 'date-fns';
import { useCycleStore, useEffectiveCycleStart, useCurrentDate } from '../../store/cycleStore';
import { generateCyclePredictions } from '../../utils/cycleCalculator';
import { theme } from '../../constants/colors';

export function CycleCalendar() {
  const settings = useCycleStore((state) => state.settings);
  const { effectiveDate } = useEffectiveCycleStart();
  const currentDate = useCurrentDate();

  const markedDates = useMemo(() => {
    if (!effectiveDate) return {};

    const marks: { [date: string]: any } = {};

    // Generate 6 cycles worth of predictions
    const predictions = generateCyclePredictions(
      effectiveDate,
      settings.averageCycleLength,
      settings.averagePeriodLength,
      6
    );

    // Also mark the current/past period
    const currentPeriodDays = eachDayOfInterval({
      start: parseISO(effectiveDate),
      end: parseISO(
        format(
          new Date(
            parseISO(effectiveDate).getTime() +
              (settings.averagePeriodLength - 1) * 24 * 60 * 60 * 1000
          ),
          'yyyy-MM-dd'
        )
      ),
    });

    currentPeriodDays.forEach((day, dayIndex) => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const isFirst = dayIndex === 0;
      const isLast = dayIndex === currentPeriodDays.length - 1;

      marks[dateStr] = {
        color: theme.colors.cycle.period,
        textColor: theme.colors.neutral.white,
        startingDay: isFirst,
        endingDay: isLast,
      };
    });

    // Mark predicted periods
    predictions.forEach((prediction, index) => {
      const periodDays = eachDayOfInterval({
        start: parseISO(prediction.startDate),
        end: parseISO(prediction.endDate),
      });

      periodDays.forEach((day, dayIndex) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const isFirst = dayIndex === 0;
        const isLast = dayIndex === periodDays.length - 1;

        marks[dateStr] = {
          ...marks[dateStr],
          color: index === 0 ? theme.colors.cycle.period : theme.colors.cycle.predicted,
          textColor: theme.colors.neutral.white,
          startingDay: isFirst,
          endingDay: isLast,
        };
      });

      // Mark fertile window as a band with darker color for ovulation day
      const fertileDays = eachDayOfInterval({
        start: parseISO(prediction.fertileWindowStart),
        end: parseISO(prediction.fertileWindowEnd),
      });

      const ovulationDateStr = prediction.ovulationDate;

      fertileDays.forEach((day, dayIndex) => {
        const dateStr = format(day, 'yyyy-MM-dd');

        // Skip if this is already a period day
        if (marks[dateStr]?.color === theme.colors.cycle.period ||
            marks[dateStr]?.color === theme.colors.cycle.predicted) {
          return;
        }

        const isFirst = dayIndex === 0;
        const isLast = dayIndex === fertileDays.length - 1;
        const isOvulationDay = dateStr === ovulationDateStr;

        // Check adjacent days for segment boundaries
        const prevDateStr = dayIndex > 0 ? format(fertileDays[dayIndex - 1], 'yyyy-MM-dd') : null;
        const nextDateStr = dayIndex < fertileDays.length - 1 ? format(fertileDays[dayIndex + 1], 'yyyy-MM-dd') : null;

        const prevIsOvulation = prevDateStr === ovulationDateStr;
        const nextIsOvulation = nextDateStr === ovulationDateStr;
        const prevIsPeriod = prevDateStr && (marks[prevDateStr]?.color === theme.colors.cycle.period ||
                                              marks[prevDateStr]?.color === theme.colors.cycle.predicted);
        const nextIsPeriod = nextDateStr && (marks[nextDateStr]?.color === theme.colors.cycle.period ||
                                              marks[nextDateStr]?.color === theme.colors.cycle.predicted);

        // Determine band color - darker for ovulation, lighter for other fertile days
        const bandColor = isOvulationDay
          ? theme.colors.cycle.ovulation
          : theme.colors.cycle.fertile;

        // Determine segment boundaries
        let startingDay = isFirst || prevIsOvulation || prevIsPeriod;
        let endingDay = isLast || nextIsOvulation || nextIsPeriod;

        // Ovulation day is its own segment (darker color stands out)
        if (isOvulationDay) {
          startingDay = true;
          endingDay = true;
        }

        marks[dateStr] = {
          color: bandColor,
          textColor: theme.colors.neutral.white,
          startingDay,
          endingDay,
        };
      });
    });

    // Mark today
    const today = currentDate;
    if (!marks[today]?.color) {
      marks[today] = {
        ...marks[today],
        marked: true,
        dotColor: theme.colors.pink[500],
      };
    }

    return marks;
  }, [effectiveDate, settings.averageCycleLength, settings.averagePeriodLength, currentDate]);

  const calendarTheme = {
    backgroundColor: 'transparent',
    calendarBackground: 'transparent',
    textSectionTitleColor: theme.colors.neutral[600],
    selectedDayBackgroundColor: theme.colors.pink[500],
    selectedDayTextColor: theme.colors.neutral.white,
    todayTextColor: theme.colors.pink[600],
    todayBackgroundColor: theme.colors.pink[50],
    dayTextColor: theme.colors.neutral[800],
    textDisabledColor: theme.colors.neutral[300],
    monthTextColor: theme.colors.pink[700],
    arrowColor: theme.colors.pink[500],
    textDayFontSize: 14,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 12,
    'stylesheet.day.period': {
      base: {
        overflow: 'hidden',
        height: 34,
        alignItems: 'center',
        width: 38,
      },
    },
  };

  return (
    <View style={styles.container}>
      <Calendar
        markingType="period"
        markedDates={markedDates}
        theme={calendarTheme}
        enableSwipeMonths
        hideExtraDays={false}
        firstDay={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.md,
  },
});

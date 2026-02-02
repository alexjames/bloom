import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common';
import { theme } from '../../constants/colors';
import { getCurrentCycleDay, getCurrentPhase } from '../../utils/cycleCalculator';
import { useCycleStore, useEffectiveCycleStart } from '../../store/cycleStore';

export function CurrentCycleCard() {
  const settings = useCycleStore((state) => state.settings);
  const { effectiveDate } = useEffectiveCycleStart();

  if (!effectiveDate) return null;

  const cycleDay = getCurrentCycleDay(effectiveDate);
  const phase = getCurrentPhase(
    cycleDay,
    settings.averagePeriodLength,
    settings.averageCycleLength
  );

  const phaseInfo = {
    menstrual: { label: 'Period', color: theme.colors.cycle.period, emoji: '🌸' },
    follicular: { label: 'Follicular Phase', color: theme.colors.pink[400], emoji: '🌱' },
    ovulation: { label: 'Ovulation', color: theme.colors.cycle.ovulation, emoji: '✨' },
    luteal: { label: 'Luteal Phase', color: theme.colors.pink[300], emoji: '🌙' },
  };

  const currentPhase = phaseInfo[phase];

  return (
    <Card variant="highlighted">
      <View style={styles.container}>
        <Text style={styles.emoji}>{currentPhase.emoji}</Text>
        <View style={styles.info}>
          <Text style={styles.dayLabel}>Day {cycleDay}</Text>
          <Text style={[styles.phase, { color: currentPhase.color }]}>
            {currentPhase.label}
          </Text>
        </View>
        <View style={styles.cycleIndicator}>
          <View
            style={[
              styles.progressCircle,
              {
                borderColor: currentPhase.color,
              },
            ]}
          >
            <Text style={styles.cycleNumber}>{cycleDay}</Text>
            <Text style={styles.cycleDenom}>/{settings.averageCycleLength}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    marginRight: theme.spacing.md,
  },
  info: {
    flex: 1,
  },
  dayLabel: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.neutral[800],
  },
  phase: {
    fontSize: theme.fontSize.md,
    fontWeight: '500',
    marginTop: theme.spacing.xs,
  },
  cycleIndicator: {
    alignItems: 'center',
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.neutral.white,
  },
  cycleNumber: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.neutral[800],
  },
  cycleDenom: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.neutral[500],
  },
});

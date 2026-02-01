import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common';
import { theme } from '../../constants/colors';
import { generateCyclePredictions, formatDateRange, formatDate } from '../../utils/cycleCalculator';
import { useCycleStore } from '../../store/cycleStore';
import { PredictedCycle } from '../../types/cycle';

export function UpcomingCyclesCard() {
  const settings = useCycleStore((state) => state.settings);

  if (!settings.lastPeriodStart) return null;

  const predictions = generateCyclePredictions(
    settings.lastPeriodStart,
    settings.averageCycleLength,
    settings.averagePeriodLength,
    3
  );

  return (
    <Card>
      <Text style={styles.title}>Upcoming Cycles</Text>
      <Text style={styles.subtitle}>Next 3 predicted periods</Text>

      <View style={styles.cyclesList}>
        {predictions.map((cycle, index) => (
          <CycleRow key={index} cycle={cycle} index={index} />
        ))}
      </View>
    </Card>
  );
}

function CycleRow({ cycle, index }: { cycle: PredictedCycle; index: number }) {
  return (
    <View style={[styles.cycleRow, index < 2 && styles.cycleRowBorder]}>
      <View style={styles.cycleNumber}>
        <Text style={styles.cycleNumberText}>{index + 1}</Text>
      </View>
      <View style={styles.cycleInfo}>
        <View style={styles.periodRow}>
          <Text style={styles.periodIcon}>🩸</Text>
          <Text style={styles.periodText}>
            {formatDateRange(cycle.startDate, cycle.endDate)}
          </Text>
        </View>
        <View style={styles.ovulationRow}>
          <Text style={styles.ovulationIcon}>🥚</Text>
          <Text style={styles.ovulationText}>
            Ovulation: {formatDate(cycle.ovulationDate)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.neutral[800],
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.neutral[500],
    marginBottom: theme.spacing.lg,
  },
  cyclesList: {
    gap: 0,
  },
  cycleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  cycleRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[100],
  },
  cycleNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.pink[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  cycleNumberText: {
    fontSize: theme.fontSize.sm,
    fontWeight: '600',
    color: theme.colors.pink[600],
  },
  cycleInfo: {
    flex: 1,
  },
  periodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  periodIcon: {
    fontSize: 14,
    marginRight: theme.spacing.sm,
  },
  periodText: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.cycle.period,
  },
  ovulationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ovulationIcon: {
    fontSize: 14,
    marginRight: theme.spacing.sm,
  },
  ovulationText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.neutral[600],
  },
});

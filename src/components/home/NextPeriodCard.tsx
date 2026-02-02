import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../common';
import { theme } from '../../constants/colors';
import { getDaysUntilNextPeriod, generateCyclePredictions, formatDate } from '../../utils/cycleCalculator';
import { useCycleStore, useEffectiveCycleStart } from '../../store/cycleStore';

export function NextPeriodCard() {
  const settings = useCycleStore((state) => state.settings);
  const { effectiveDate } = useEffectiveCycleStart();

  if (!effectiveDate) return null;

  const daysUntil = getDaysUntilNextPeriod(
    effectiveDate,
    settings.averageCycleLength
  );

  const predictions = generateCyclePredictions(
    effectiveDate,
    settings.averageCycleLength,
    settings.averagePeriodLength,
    1
  );

  const nextPeriod = predictions[0];

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🩸</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Next Period</Text>
          {daysUntil === 0 ? (
            <Text style={styles.highlight}>Expected today!</Text>
          ) : daysUntil === 1 ? (
            <Text style={styles.highlight}>Expected tomorrow</Text>
          ) : (
            <Text style={styles.days}>
              In <Text style={styles.highlight}>{daysUntil} days</Text>
            </Text>
          )}
          <Text style={styles.date}>
            {formatDate(nextPeriod.startDate, 'EEEE, MMM d')}
          </Text>
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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.cycle.periodLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.neutral[500],
    marginBottom: theme.spacing.xs,
  },
  days: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.neutral[700],
  },
  highlight: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.cycle.period,
  },
  date: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.neutral[500],
    marginTop: theme.spacing.xs,
  },
});

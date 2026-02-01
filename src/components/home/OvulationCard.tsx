import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { differenceInDays, parseISO } from 'date-fns';
import { Card } from '../common';
import { theme } from '../../constants/colors';
import { generateCyclePredictions, formatDate } from '../../utils/cycleCalculator';
import { useCycleStore } from '../../store/cycleStore';

export function OvulationCard() {
  const settings = useCycleStore((state) => state.settings);

  if (!settings.lastPeriodStart) return null;

  const predictions = generateCyclePredictions(
    settings.lastPeriodStart,
    settings.averageCycleLength,
    settings.averagePeriodLength,
    1
  );

  const nextCycle = predictions[0];
  const today = new Date();
  const ovulationDate = parseISO(nextCycle.ovulationDate);
  const daysUntilOvulation = differenceInDays(ovulationDate, today);

  const fertileStart = parseISO(nextCycle.fertileWindowStart);
  const fertileEnd = parseISO(nextCycle.fertileWindowEnd);
  const isInFertileWindow = today >= fertileStart && today <= fertileEnd;

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🥚</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Ovulation</Text>
          {daysUntilOvulation === 0 ? (
            <Text style={styles.highlight}>Today!</Text>
          ) : daysUntilOvulation > 0 ? (
            <Text style={styles.days}>
              In <Text style={styles.highlight}>{daysUntilOvulation} days</Text>
            </Text>
          ) : (
            <Text style={styles.days}>
              <Text style={styles.highlight}>{Math.abs(daysUntilOvulation)} days ago</Text>
            </Text>
          )}
          <Text style={styles.date}>
            {formatDate(nextCycle.ovulationDate, 'EEEE, MMM d')}
          </Text>
          {isInFertileWindow && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Fertile Window</Text>
            </View>
          )}
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
    backgroundColor: theme.colors.cycle.fertileLight,
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
    color: theme.colors.cycle.ovulation,
  },
  date: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.neutral[500],
    marginTop: theme.spacing.xs,
  },
  badge: {
    backgroundColor: theme.colors.cycle.fertileLight,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
    marginTop: theme.spacing.sm,
  },
  badgeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
    color: theme.colors.cycle.ovulation,
  },
});

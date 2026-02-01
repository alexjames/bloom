import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../constants/colors';

export function Legend() {
  return (
    <View style={styles.container}>
      <LegendItem color={theme.colors.cycle.period} label="Period" />
      <LegendItem color={theme.colors.cycle.predicted} label="Predicted" />
      <LegendItem color={theme.colors.cycle.ovulation} label="Ovulation" />
      <LegendItem color={theme.colors.cycle.fertile} label="Fertile" />
    </View>
  );
}

function LegendItem({
  color,
  label,
  isDot = false,
}: {
  color: string;
  label: string;
  isDot?: boolean;
}) {
  return (
    <View style={styles.item}>
      {isDot ? (
        <View style={[styles.dot, { backgroundColor: color }]} />
      ) : (
        <View style={[styles.bar, { backgroundColor: color }]} />
      )}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.md,
    marginTop: theme.spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  bar: {
    width: 20,
    height: 12,
    borderRadius: 4,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.neutral[600],
  },
});

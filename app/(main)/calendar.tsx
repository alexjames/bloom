import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { CycleCalendar, Legend } from '../../src/components/calendar';
import { theme } from '../../src/constants/colors';

export default function CalendarScreen() {
  return (
    <LinearGradient
      colors={[theme.colors.pink[50], theme.colors.neutral.white]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Calendar</Text>
            <Text style={styles.subtitle}>Track your cycle at a glance</Text>
          </View>

          <CycleCalendar />
          <Legend />

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>How to read</Text>
            <Text style={styles.infoText}>
              Swipe left or right to view different months. Period days are shown
              in pink bands, with darker pink for the next upcoming period.
              Fertile days are marked with green bands, with predicted ovulation highlighted.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '700',
    color: theme.colors.pink[700],
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.neutral[500],
    marginTop: theme.spacing.xs,
  },
  infoCard: {
    backgroundColor: theme.colors.pink[50],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  infoTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.pink[700],
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.neutral[600],
    lineHeight: 20,
  },
});

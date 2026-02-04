import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { format, parseISO } from 'date-fns';
import { Button } from '../../src/components/common';
import { useCycleStore } from '../../src/store/cycleStore';
import { theme } from '../../src/constants/colors';

export default function CompleteScreen() {
  const settings = useCycleStore((state) => state.settings);
  const completeOnboarding = useCycleStore((state) => state.completeOnboarding);

  const handleStart = () => {
    completeOnboarding();
    router.replace('/(main)/home');
  };

  return (
    <LinearGradient
      colors={[theme.colors.pink[50], theme.colors.pink[100]]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✨</Text>
          </View>

          <Text style={styles.title}>You're all set!</Text>
          <Text style={styles.subtitle}>
            We'll help you track your cycle and predict your upcoming periods
          </Text>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Your Settings</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Last period started</Text>
              <Text style={styles.summaryValue}>
                {settings.lastPeriodStart
                  ? format(parseISO(settings.lastPeriodStart), 'MMM d, yyyy')
                  : '-'}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Cycle length</Text>
              <Text style={styles.summaryValue}>
                {settings.averageCycleLength} days
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Period length</Text>
              <Text style={styles.summaryValue}>
                {settings.averagePeriodLength} days
              </Text>
            </View>
          </View>

          <Text style={styles.note}>
            You can adjust these settings anytime in the app
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Start Tracking" onPress={handleStart} />
        </View>
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
    paddingHorizontal: theme.spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.lg,
  },
  icon: {
    fontSize: 50,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '700',
    color: theme.colors.pink[700],
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.neutral[600],
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  summaryCard: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    width: '100%',
    ...theme.shadows.md,
  },
  summaryTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.pink[700],
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[100],
  },
  summaryLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.neutral[600],
  },
  summaryValue: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.neutral[800],
  },
  note: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.neutral[500],
    marginTop: theme.spacing.lg,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingBottom: theme.spacing.xl,
  },
});

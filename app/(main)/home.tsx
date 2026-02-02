import { useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  CurrentCycleCard,
  CycleConfirmModal,
  LogPeriodCard,
  NextPeriodCard,
  OvulationCard,
  UpcomingCyclesCard,
} from '../../src/components/home';
import { theme } from '../../src/constants/colors';
import { useCycleStore, useEffectiveCycleStart } from '../../src/store/cycleStore';

export default function HomeScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { effectiveDate, shouldShowPrompt } = useEffectiveCycleStart();
  const setPromptShown = useCycleStore((state) => state.setPromptShown);

  const handleConfirmPeriod = () => {
    if (effectiveDate) {
      setPromptShown(effectiveDate);
    }
  };

  const handleDenyPeriod = () => {
    if (effectiveDate) {
      setPromptShown(effectiveDate);
    }
    setShowDatePicker(true);
  };

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
          </View>

          <View style={styles.cardsContainer}>
            <CurrentCycleCard />

            <View style={styles.row}>
              <View style={styles.halfCard}>
                <NextPeriodCard />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfCard}>
                <OvulationCard />
              </View>
            </View>

            <UpcomingCyclesCard />

            <LogPeriodCard showDatePickerInitially={showDatePicker} onDatePickerClose={() => setShowDatePicker(false)} />
          </View>
        </ScrollView>
      </SafeAreaView>

      {effectiveDate && (
        <CycleConfirmModal
          visible={shouldShowPrompt}
          predictedDate={effectiveDate}
          onConfirm={handleConfirmPeriod}
          onDeny={handleDenyPeriod}
        />
      )}
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
  greeting: {
    fontSize: theme.fontSize.md,
    color: theme.colors.neutral[500],
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: '700',
    color: theme.colors.pink[700],
  },
  cardsContainer: {
    gap: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
  },
  halfCard: {
    flex: 1,
  },
});

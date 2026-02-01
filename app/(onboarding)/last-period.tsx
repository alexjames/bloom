import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, DateData } from 'react-native-calendars';
import { format, subDays } from 'date-fns';
import { Button } from '../../src/components/common';
import { useCycleStore } from '../../src/store/cycleStore';
import { theme } from '../../src/constants/colors';

export default function LastPeriodScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const setLastPeriodStart = useCycleStore((state) => state.setLastPeriodStart);

  const today = format(new Date(), 'yyyy-MM-dd');
  const minDate = format(subDays(new Date(), 60), 'yyyy-MM-dd');

  const handleDateSelect = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const handleContinue = () => {
    if (selectedDate) {
      setLastPeriodStart(selectedDate);
      router.push('/(onboarding)/complete');
    }
  };

  const markedDates = selectedDate
    ? {
        [selectedDate]: {
          selected: true,
          selectedColor: theme.colors.pink[500],
        },
      }
    : {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>When did your last period start?</Text>
        <Text style={styles.subtitle}>
          Select the first day of your most recent period
        </Text>

        <View style={styles.calendarContainer}>
          <Calendar
            current={today}
            maxDate={today}
            minDate={minDate}
            onDayPress={handleDateSelect}
            markedDates={markedDates}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: theme.colors.neutral[600],
              selectedDayBackgroundColor: theme.colors.pink[500],
              selectedDayTextColor: theme.colors.neutral.white,
              todayTextColor: theme.colors.pink[600],
              dayTextColor: theme.colors.neutral[800],
              textDisabledColor: theme.colors.neutral[300],
              monthTextColor: theme.colors.pink[700],
              arrowColor: theme.colors.pink[500],
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
          />
        </View>

        {selectedDate && (
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedLabel}>Selected date:</Text>
            <Text style={styles.selectedDate}>
              {format(new Date(selectedDate), 'MMMM d, yyyy')}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedDate}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pink[50],
    paddingHorizontal: theme.spacing.xl,
  },
  content: {
    flex: 1,
    paddingTop: theme.spacing.xxl,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.pink[700],
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.neutral[600],
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  calendarContainer: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.md,
  },
  selectedInfo: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  selectedLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.neutral[500],
    marginBottom: theme.spacing.xs,
  },
  selectedDate: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.pink[600],
  },
  buttonContainer: {
    paddingBottom: theme.spacing.xl,
  },
});

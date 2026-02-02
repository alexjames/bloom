import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format, subDays } from 'date-fns';
import { Card, Button } from '../common';
import { theme } from '../../constants/colors';
import { useCycleStore } from '../../store/cycleStore';

interface LogPeriodCardProps {
  showDatePickerInitially?: boolean;
  onDatePickerClose?: () => void;
}

export function LogPeriodCard({
  showDatePickerInitially = false,
  onDatePickerClose,
}: LogPeriodCardProps) {
  const [showDatePicker, setShowDatePicker] = useState(showDatePickerInitially);

  useEffect(() => {
    if (showDatePickerInitially) {
      setShowDatePicker(true);
    }
  }, [showDatePickerInitially]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const setLastPeriodStart = useCycleStore((state) => state.setLastPeriodStart);

  const handleLogToday = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setLastPeriodStart(today);
    showConfirmationBriefly();
  };

  const handleDateSelect = (day: { dateString: string }) => {
    setLastPeriodStart(day.dateString);
    closeDatePicker();
    showConfirmationBriefly();
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
    onDatePickerClose?.();
  };

  const showConfirmationBriefly = () => {
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  const today = format(new Date(), 'yyyy-MM-dd');
  const minDate = format(subDays(new Date(), 90), 'yyyy-MM-dd');

  if (showConfirmation) {
    return (
      <Card style={styles.confirmationCard}>
        <View style={styles.confirmationContent}>
          <Text style={styles.confirmationIcon}>✓</Text>
          <Text style={styles.confirmationText}>Period logged!</Text>
          <Text style={styles.confirmationSubtext}>Predictions updated</Text>
        </View>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <View style={styles.header}>
          <Text style={styles.icon}>🩸</Text>
          <Text style={styles.title}>Period started?</Text>
        </View>

        <Button
          title="Period Started Today"
          onPress={handleLogToday}
          style={styles.primaryButton}
        />

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>Choose a different date</Text>
        </TouchableOpacity>
      </Card>

      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
        onRequestClose={closeDatePicker}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeDatePicker}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select period start date</Text>
              <TouchableOpacity onPress={closeDatePicker}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={handleDateSelect}
              maxDate={today}
              minDate={minDate}
              theme={{
                backgroundColor: theme.colors.neutral.white,
                calendarBackground: theme.colors.neutral.white,
                selectedDayBackgroundColor: theme.colors.pink[500],
                selectedDayTextColor: theme.colors.neutral.white,
                todayTextColor: theme.colors.pink[600],
                dayTextColor: theme.colors.neutral[800],
                textDisabledColor: theme.colors.neutral[300],
                monthTextColor: theme.colors.pink[700],
                arrowColor: theme.colors.pink[500],
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  icon: {
    fontSize: 24,
    marginRight: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.neutral[800],
  },
  primaryButton: {
    marginBottom: theme.spacing.md,
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  secondaryButtonText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.pink[500],
  },
  confirmationCard: {
    backgroundColor: theme.colors.cycle.fertileLight,
  },
  confirmationContent: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  confirmationIcon: {
    fontSize: 32,
    color: theme.colors.cycle.ovulation,
    marginBottom: theme.spacing.sm,
  },
  confirmationText: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.cycle.ovulation,
  },
  confirmationSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.neutral[600],
    marginTop: theme.spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.lg,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[100],
  },
  modalTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.neutral[800],
  },
  closeButton: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.neutral[500],
    padding: theme.spacing.xs,
  },
});

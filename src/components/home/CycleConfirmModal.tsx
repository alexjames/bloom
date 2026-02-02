import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import { Button } from '../common';
import { theme } from '../../constants/colors';

interface CycleConfirmModalProps {
  visible: boolean;
  predictedDate: string;
  onConfirm: () => void;
  onDeny: () => void;
}

export function CycleConfirmModal({
  visible,
  predictedDate,
  onConfirm,
  onDeny,
}: CycleConfirmModalProps) {
  const formattedDate = format(parseISO(predictedDate), 'MMMM d');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onConfirm}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.icon}>🩸</Text>
            <Text style={styles.title}>Did your period start?</Text>
          </View>

          <Text style={styles.description}>
            We predicted your period started on{' '}
            <Text style={styles.dateHighlight}>{formattedDate}</Text>.
          </Text>

          <View style={styles.buttons}>
            <Button
              title="Yes, that's correct"
              onPress={onConfirm}
              style={styles.confirmButton}
            />
            <Button
              title="No, let me log the date"
              variant="outline"
              onPress={onDeny}
              style={styles.denyButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    padding: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  icon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: '700',
    color: theme.colors.neutral[800],
    textAlign: 'center',
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.neutral[600],
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  dateHighlight: {
    fontWeight: '600',
    color: theme.colors.pink[600],
  },
  buttons: {
    gap: theme.spacing.md,
  },
  confirmButton: {
    marginBottom: 0,
  },
  denyButton: {
    marginBottom: 0,
  },
});

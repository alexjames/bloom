import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Button } from '../../src/components/common';
import { useCycleStore } from '../../src/store/cycleStore';
import { theme } from '../../src/constants/colors';

export default function SettingsScreen() {
  const settings = useCycleStore((state) => state.settings);
  const setCycleLength = useCycleStore((state) => state.setCycleLength);
  const setPeriodLength = useCycleStore((state) => state.setPeriodLength);
  const resetAllData = useCycleStore((state) => state.resetAllData);

  const handleCycleLengthChange = (delta: number) => {
    const newLength = settings.averageCycleLength + delta;
    if (newLength >= 21 && newLength <= 40) {
      setCycleLength(newLength);
    }
  };

  const handlePeriodLengthChange = (delta: number) => {
    const newLength = settings.averagePeriodLength + delta;
    if (newLength >= 2 && newLength <= 10) {
      setPeriodLength(newLength);
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset All Data',
      'This will delete all your cycle data and take you back to the setup screen. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetAllData();
            router.replace('/(onboarding)/welcome');
          },
        },
      ]
    );
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
            <Text style={styles.title}>Settings</Text>
            <Text style={styles.subtitle}>Customize your cycle tracking</Text>
          </View>

          <Card>
            <Text style={styles.sectionTitle}>Cycle Settings</Text>

            <SettingRow
              label="Cycle Length"
              value={`${settings.averageCycleLength} days`}
              onDecrease={() => handleCycleLengthChange(-1)}
              onIncrease={() => handleCycleLengthChange(1)}
            />

            <SettingRow
              label="Period Length"
              value={`${settings.averagePeriodLength} days`}
              onDecrease={() => handlePeriodLengthChange(-1)}
              onIncrease={() => handlePeriodLengthChange(1)}
            />
          </Card>

          <Card style={styles.infoCard}>
            <Text style={styles.infoTitle}>About Predictions</Text>
            <Text style={styles.infoText}>
              Predictions are based on your average cycle length. Ovulation is
              estimated to occur 14 days before your next period. The fertile
              window spans 4 days before to 1 day after ovulation.
            </Text>
          </Card>

          <View style={styles.dangerZone}>
            <Text style={styles.dangerTitle}>Danger Zone</Text>
            <Button
              title="Reset All Data"
              variant="outline"
              onPress={handleReset}
              style={styles.resetButton}
              textStyle={styles.resetButtonText}
            />
          </View>

          <TouchableOpacity
            style={styles.privacyLink}
            onPress={() => Linking.openURL('https://sites.google.com/view/bloomperiodtracker/privacy-policy')}
            activeOpacity={0.7}
          >
            <Text style={styles.privacyLinkText}>Privacy Policy</Text>
          </TouchableOpacity>

          <Text style={styles.version}>Bloom v1.0.0</Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function SettingRow({
  label,
  value,
  onDecrease,
  onIncrease,
}: {
  label: string;
  value: string;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <View style={styles.stepper}>
        <TouchableOpacity
          style={styles.stepperButton}
          onPress={onDecrease}
          activeOpacity={0.7}
        >
          <Text style={styles.stepperButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.settingValue}>{value}</Text>
        <TouchableOpacity
          style={styles.stepperButton}
          onPress={onIncrease}
          activeOpacity={0.7}
        >
          <Text style={styles.stepperButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.neutral[800],
    marginBottom: theme.spacing.lg,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral[100],
  },
  settingLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.neutral[700],
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  stepperButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.pink[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: {
    fontSize: theme.fontSize.xl,
    fontWeight: '600',
    color: theme.colors.pink[600],
  },
  settingValue: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.neutral[800],
    minWidth: 80,
    textAlign: 'center',
  },
  infoCard: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.pink[50],
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
  dangerZone: {
    marginTop: theme.spacing.xl,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.neutral.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
  },
  dangerTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.neutral[600],
    marginBottom: theme.spacing.md,
  },
  resetButton: {
    borderColor: theme.colors.neutral[400],
  },
  resetButtonText: {
    color: theme.colors.neutral[600],
  },
  version: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.neutral[400],
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  privacyLink: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  privacyLinkText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.pink[600],
    textDecorationLine: 'underline',
  },
});

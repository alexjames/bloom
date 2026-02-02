import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../../src/components/common';
import { theme } from '../../src/constants/colors';

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={[theme.colors.pink[50], theme.colors.pink[100]]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🌸</Text>
          </View>

          <Text style={styles.title}>Bloom</Text>
          <Text style={styles.subtitle}>Privacy-first Period Tracker</Text>

          <View style={styles.features}>
            <FeatureItem text="Track your menstrual cycle" />
            <FeatureItem text="Know your ovulation days" />
            <FeatureItem text="100% private, your data is NEVER collected or shared" />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={() => router.push('/(onboarding)/last-period')}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>✓</Text>
      <Text style={styles.featureText}>{text}</Text>
    </View>
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
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.neutral.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.lg,
  },
  icon: {
    fontSize: 60,
  },
  title: {
    fontSize: theme.fontSize.display,
    fontWeight: '700',
    color: theme.colors.pink[700],
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.neutral[600],
    marginBottom: theme.spacing.xxl,
  },
  features: {
    alignSelf: 'stretch',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  featureIcon: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.pink[500],
    marginRight: theme.spacing.md,
    fontWeight: '600',
  },
  featureText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.neutral[700],
  },
  buttonContainer: {
    paddingBottom: theme.spacing.xl,
  },
});

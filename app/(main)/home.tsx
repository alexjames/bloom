import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  CurrentCycleCard,
  LogPeriodCard,
  NextPeriodCard,
  OvulationCard,
  UpcomingCyclesCard,
} from '../../src/components/home';
import { theme } from '../../src/constants/colors';

export default function HomeScreen() {
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

            <LogPeriodCard />
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

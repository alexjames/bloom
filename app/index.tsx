import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useCycleStore } from '../src/store/cycleStore';
import { theme } from '../src/constants/colors';

export default function Index() {
  const onboardingCompleted = useCycleStore(
    (state) => state.settings.onboardingCompleted
  );

  useEffect(() => {
    // Navigate based on onboarding status
    if (onboardingCompleted) {
      router.replace('/(main)/home');
    } else {
      router.replace('/(onboarding)/welcome');
    }
  }, [onboardingCompleted]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.pink[500]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.pink[50],
  },
});

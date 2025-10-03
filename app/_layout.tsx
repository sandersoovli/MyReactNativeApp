import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="splash/index">
      {/* Splash */}
      <Stack.Screen name="splash/index" options={{ headerShown: false }} />

      {/* Auth group (Login/Signup elavad sees) */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />

      {/* Tabs */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Terms & Privacy */}
      <Stack.Screen name="terms-privacy" options={{ title: 'Terms & Privacy' }} />
    </Stack>
  );
}

// app/(tabs)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: undefined,  // ei näita kausta nime
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: '' }}
      />
      <Stack.Screen
        name="Login"
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="Signup"
        options={{ title: 'Sign Up' }}
      />
    </Stack>
  );
}

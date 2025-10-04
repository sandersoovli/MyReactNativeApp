import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: 'left' }}>
      <Stack.Screen name="Login/index" options={{ title: 'Log In' }} />
      <Stack.Screen name="Signup/index" options={{ title: 'Sign Up' }} />
    </Stack>
  );
}

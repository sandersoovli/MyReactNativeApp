import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="splash/index">
      {/* Splash */}
      <Stack.Screen name="splash/index" options={{ headerShown: false }} />

      {/* Auth kaust (Login/Signup) */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />

      {/* Tabs kaust */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Terms & Privacy modalina */}
      <Stack.Screen 
        name="terms-privacy" 
        options={{ 
          presentation: 'modal', // modal efekt
          headerShown: true, 
          title: 'Terms & Privacy' // see ilmub päises
        }} 
      />

      {/* Toote detailid - kasutab Custom Headerit, seega peida vaikimisi päis */}
      <Stack.Screen 
        name="productdetails" 
        options={{ 
          headerShown: false,
          headerBackVisible: false,
        }} 
      />
    </Stack>
  );
}

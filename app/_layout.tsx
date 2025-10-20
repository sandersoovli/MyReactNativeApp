import { AuthProvider } from '@/app/(context)/AuthContext';
import { FavoritesProvider } from '@/app/(context)/FavoritesContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Stack initialRouteName="splash/index">
          {/* Splash ekraan */}
          <Stack.Screen name="splash/index" options={{ headerShown: false }} />

          {/* Auth kaust */}
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />

          {/* Tabs kaust */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Terms & Privacy modal */}
          <Stack.Screen 
            name="terms-privacy" 
            options={{ 
              presentation: 'modal', 
              headerShown: true, 
              title: 'Terms & Privacy' 
            }} 
          />

          {/* Toote detailid */}
          <Stack.Screen 
            name="productdetails" 
            options={{ 
              headerShown: false,
              headerBackVisible: false,
            }} 
          />
        </Stack>
      </FavoritesProvider>
    </AuthProvider>
  );
}

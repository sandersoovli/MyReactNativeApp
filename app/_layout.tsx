import { AuthProvider } from '@/app/(context)/AuthContext';
import { FavoritesProvider } from '@/app/(context)/FavoritesContext';
import { ListingsProvider } from '@/app/(context)/ListingsContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ListingsProvider>
          <Stack initialRouteName="splash/index">
            <Stack.Screen name="splash/index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="terms-privacy" 
              options={{ presentation: 'modal', headerShown: true, title: 'Terms & Privacy' }} 
            />
            <Stack.Screen 
              name="productdetails" 
              options={{ headerShown: false, headerBackVisible: false }} 
            />
          </Stack>
        </ListingsProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

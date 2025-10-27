// path: app/My-Listings/_layout.jsx
import { Stack } from 'expo-router';

export default function MyListingsLayout() {
  return (
    <Stack
      // Peidab päise (headeri) KÕIKIDEL lehtedel, mis kasutavad seda _layout.jsx faili.
      screenOptions={{
        headerShown: false, 
      }}
    >
      {/* Siin ei ole enam vaja headerShown: false sätteid. 
        Kui sa tahad mõnel ekraanil päist näidata, saad selle eraldi sisse lülitada (headerShown: true).
      */}
      
      {/* Index-ekraan. Nimi peab olema "index". */}
      <Stack.Screen 
        name="index" 
        options={{ title: 'My Listings', headerShown: true }} 
      />
      
      {/* Add Listing ekraan. Võimalik, et tahad siin päist näidata. */}
      <Stack.Screen 
        name="add-listing/index" 
        options={{ title: 'Add Listing', headerShown: false }} // Header peidetakse
      />
      
      {/* My Listings ekraan. Nimi peab olema "my-listings/index". */}
      <Stack.Screen 
        name="my-listings/index" 
        options={{ title: 'My Listings', headerShown: false }} 
      />
    </Stack>
  );
}
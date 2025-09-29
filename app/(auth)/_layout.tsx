import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        // Eemaldab vaikimisi kausta nime või Stack'i pealkirja
        headerTitle: undefined, 
        
        // VÄGA OLULINE: Peidab TÄIELIKULT Tagasi-nupu kõrval oleva teksti. 
        // See välistab varasema lehe pealkirja (nt. 'Login??????') ilmumise.
        // headerBackTitleVisible: false, 
        
        // Seadista kogu stack'i pealkirjad vasakule, et need ilmuksid tagasi-nupu kõrvale.
        headerTitleAlign: 'left',
      }}
    >
      <Stack.Screen
        name="Login/index"
        options={{ 
            // See tiitel ilmub nüüd päises vasakul, asendades "Login/index"
            title: 'Log In', 
        }} 
      />
      <Stack.Screen 
        name="Signup/index" 
        options={{ 
            // See tiitel ilmub nüüd päises vasakul
            title: 'Sign Up', 
        }} 
      />
    </Stack>
  );
}
// app/(tabs)/productdetails/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function ProductDetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: 'Product detail',
        headerTitleAlign: 'left', // Vasakule joondatud
      }}
    >
      {/* index.jsx renderdatakse automaatselt */}
    </Stack>
  );
}

// app/(tabs)/_layout.jsx
import { AntDesign } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#4F63AC',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="index" // Home ekraan
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="favorites" // favorites ekraan
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="favorite" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile" // profile ekraan
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

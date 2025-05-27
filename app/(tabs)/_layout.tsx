import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { Media } from '@/constants/Media';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: [
          Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
          Media.styles.view,
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="manage-search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <ThemedView
              className={`h-[36px] w-[36px] top-0 rounded-full items-center justify-center`}
              style={{
                backgroundColor: colorScheme === 'dark' ? '#000' : '#ddd',
              }}
            >
              <MaterialIcons name="add" size={36} color={color} />
            </ThemedView>
          ),
        }}
      />
      <Tabs.Screen
        name="catfact"
        options={{
          title: 'Cat Fact',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="chevron.left.forwardslash.chevron.right"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="catfacts"
        options={{
          title: 'Cat Facts',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="chevron.right" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

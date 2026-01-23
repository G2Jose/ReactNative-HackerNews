import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Top',
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="flame.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: 'New',
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="sparkles" color={color} />,
        }}
      />
      <Tabs.Screen
        name="best"
        options={{
          title: 'Best',
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="star.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ask"
        options={{
          title: 'Ask',
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="questionmark.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => <IconSymbol size={20} name="briefcase.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

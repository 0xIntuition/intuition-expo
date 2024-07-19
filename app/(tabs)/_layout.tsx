import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerTintColor: Colors[colorScheme ?? 'light'].text,
        headerShown: true,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Signals',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="atoms"
        options={{
          title: 'Atoms',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'extension-puzzle' : 'extension-puzzle-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="triples"
        options={{
          title: 'Triples',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'git-merge' : 'git-merge-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="accounts"
        options={{
          title: 'Accounts',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

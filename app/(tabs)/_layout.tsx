import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

export default function TabLayout() {

  if (Platform.OS === 'ios') {
    // Use NativeTabs on iOS for better native experience
    return (
      <NativeTabs minimizeBehavior='onScrollDown'>
        <NativeTabs.Trigger name="quests">
          <Label>Quests</Label>
          <Icon sf="bolt" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="lists">
          <Label>Lists</Label>
          <Icon sf="list.bullet" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="account">
          <Label>My Intuition</Label>
          <Icon sf="person" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="explore" role="search">
          <Label>Explore</Label>
          <Icon sf="magnifyingglass" />
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  // Use legacy Tabs on Android for better scroll compatibility
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          title: 'Quests',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="bolt" color={color} />,
        }}
      />
      <Tabs.Screen
        name="lists"
        options={{
          title: 'Lists',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'My Intuition',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="person" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="search" color={color} />,
        }}
      />
    </Tabs>
  );
}

import { Tabs } from 'expo-router';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs

      screenOptions={{
        headerTintColor: Colors[colorScheme ?? 'light'].text,
        headerShown: true,

        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarShowLabel: false,
        tabBarInactiveBackgroundColor: 'transparent',
        tabBarActiveBackgroundColor: 'transparent',
        headerBackground: () => null,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Intuition',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Signals',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'volume-high' : 'volume-high-outline'} color={color} />
          ),
        }}
      />


      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="me"
        options={{
          title: 'Me',
          href: !isWeb ? '/me' : null,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

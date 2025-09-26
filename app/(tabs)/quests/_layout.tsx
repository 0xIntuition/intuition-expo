import { Stack } from 'expo-router';

export default function QuestsLayout() {
  return (<Stack>
    <Stack.Screen name="index" options={{ title: 'Quests', headerLargeTitle: true }} />
    <Stack.Screen name="questions" options={{ title: 'Questions' }} />
    <Stack.Screen name="ecosystems" options={{ title: 'Ecosystems' }} />
    <Stack.Screen name="preferences" options={{ title: 'Preferences' }} />
    <Stack.Screen name="question" options={{ presentation: 'modal', headerShown: false }} />
  </Stack>)
}


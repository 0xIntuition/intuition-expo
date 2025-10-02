import { Stack } from 'expo-router';

export default function QuestsLayout() {
  return (<Stack>
    <Stack.Screen name="index" options={{ title: 'Quests', headerLargeTitle: true }} />
    <Stack.Screen name="question/[id]" options={{ headerLargeTitle: false, presentation: 'modal' }} />
    <Stack.Screen name="epochs/[id]" options={{ headerLargeTitle: false }} />
  </Stack>)
}


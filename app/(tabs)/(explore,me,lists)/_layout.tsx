import { Stack } from 'expo-router';

export default function Layout() {
  return (<Stack>
    <Stack.Screen name="index" options={{ headerLargeTitle: false }} />
    <Stack.Screen name="list/[id]" options={{ headerLargeTitle: false }} />
    <Stack.Screen name="atom/[id]" options={{ headerLargeTitle: false }} />
    <Stack.Screen name="triple/[id]" options={{ headerLargeTitle: false }} />
    <Stack.Screen name="account/[id]" options={{ headerLargeTitle: false }} />
  </Stack>)
}


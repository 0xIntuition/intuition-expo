import { Stack } from 'expo-router';

export default function Layout() {
  return (<Stack>
    <Stack.Screen name="index" options={{ headerLargeTitle: true }} />
    <Stack.Screen name="list/[id]" options={{ headerLargeTitle: true }} />
    <Stack.Screen name="atom/[id]" options={{ headerLargeTitle: true }} />
    <Stack.Screen name="triple/[id]" options={{ headerLargeTitle: true }} />
    <Stack.Screen name="account/[id]" options={{ headerLargeTitle: true }} />
  </Stack>)
}


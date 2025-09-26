import { Stack } from 'expo-router';

export default function Layout() {
  return (<Stack>
    <Stack.Screen name="index" options={{ title: 'Explore', headerLargeTitle: true }} />
    <Stack.Screen name="list" options={{ headerShown: false }} />
    <Stack.Screen name="atom" options={{ headerShown: false }} />
    <Stack.Screen name="triple" options={{ headerShown: false }} />
  </Stack>)
}


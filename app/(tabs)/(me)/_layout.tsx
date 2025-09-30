import { Stack } from 'expo-router';

export default function MeLayout() {
  return (<Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="list" options={{ headerShown: false }} />
    <Stack.Screen name="atom" options={{ headerShown: false }} />
    <Stack.Screen name="triple" options={{ headerShown: false }} />
  </Stack>)
}


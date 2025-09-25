import { Stack } from 'expo-router';

export default function Layout() {
  return (<Stack>
    <Stack.Screen name="index" options={{ title: 'Explore', headerLargeTitle: true }} />
    <Stack.Screen name="atom" options={{ title: 'Atom', headerLargeTitle: true }} />
    <Stack.Screen name="list" options={{ title: 'List', headerLargeTitle: true }} />
    <Stack.Screen name="triple" options={{ title: 'Triple', headerLargeTitle: true }} />
  </Stack>)
}


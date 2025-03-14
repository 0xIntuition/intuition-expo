import React from 'react';
import { Slot, Stack } from 'expo-router';

export default function ExploreLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Explore' }} />
      <Stack.Screen name="atoms" options={{ title: 'Atoms' }} />
      <Stack.Screen name="triples" options={{ title: 'Triples' }} />
      <Stack.Screen name="accounts" options={{ title: 'Accounts' }} />
      <Stack.Screen name="lists" options={{ title: 'Collections' }} />
    </Stack>
  );
}

import React from 'react';
import { Stack } from 'expo-router';

export default function ManageProductLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
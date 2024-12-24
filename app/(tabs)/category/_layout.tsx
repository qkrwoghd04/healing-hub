import React from 'react';
import { Stack } from 'expo-router';

export default function CategoryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="categoryList"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

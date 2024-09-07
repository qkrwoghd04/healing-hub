import React from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { ProductProvider } from './contexts/ProductContext';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "HSSaemaul-Regular": require("../assets/fonts/HSSaemaul-Regular.ttf"),
    "GmarketSansTTFBold": require("../assets/fonts/GmarketSansTTFBold.ttf"),
    "GmarketSansTTFLight": require("../assets/fonts/GmarketSansTTFLight.ttf"),
    "GmarketSansTTFMedium": require("../assets/fonts/GmarketSansTTFMedium.ttf"),
    "Lato-HeavyItalic": require("../assets/fonts/Lato-HeavyItalic.ttf"),
    
  });

  useEffect(() => {
    if (error) throw error
    
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  if(!fontsLoaded && !error) return null;
  return (
    <ProductProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="admins/login" options={{ headerShown: false }} />
        <Stack.Screen name="admins/home" options={{ headerShown: false }} />
      </Stack>
    </ProductProvider>
  );
}
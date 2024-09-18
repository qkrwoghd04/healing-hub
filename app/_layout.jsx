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
    "Pretendard-Black": require("../assets/fonts/Pretendard-Black.ttf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.ttf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.ttf"),
    "Pretendard-Thin": require("../assets/fonts/Pretendard-Thin.ttf"),
    "Typography-Times-Bold-Italic": require("../assets/fonts/Typography Times Bold Italic.ttf"),
    "Typography-Times-Bold": require("../assets/fonts/Typography Times Bold.ttf"),
    "Typography-Times-Italic": require("../assets/fonts/Typography Times Italic.ttf"),
    "Typography-Times-Regular": require("../assets/fonts/Typography Times Regular.ttf"),
    
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
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          height: 85,
          paddingBottom: 20,
        },
        tabBarActiveTintColor: '#212525',
        tabBarInactiveTintColor: '#212525',
        tabBarLabelStyle: {
          fontSize: 20,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarHideOnKeyboard: true,
        animationEnabled: false,
        ...Platform.select({
          ios: {
            tabBarBackground: () => (
              <BlurView
                tint="light"
                intensity={100}
                style={StyleSheet.absoluteFill}
              />
            ),
          },
          android: {
            tabBarBackground: () => (
              <View style={{ flex: 1, backgroundColor: 'green' }} />
            ),
          },
        }),
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: '홈',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: '가게 정보',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
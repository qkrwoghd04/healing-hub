import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TabBar from "../../components/TabBar";

export default function TabsLayout() {
  return (
    <Tabs tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: '홈',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: '매장 정보',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="profile" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
import React from 'react';
import { Tabs } from 'expo-router';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 0.3,
        borderColor: '#000',
        padding: 0,
      },
      tabBarShowLabel: true,
      tabBarActiveTintColor: '#dba40d',
      tabBarInactiveTintColor: '#20284F',
    }}>
      <Tabs.Screen 
        name="category" 
        options={{
          title: '카테고리',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="category" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="index" 
        options={{
          title: '홈',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />        
          ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: '매장 정보',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="questioncircleo" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
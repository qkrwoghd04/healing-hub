import React from 'react';
import { Tabs } from 'expo-router';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function AdminTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.3,
          borderColor: '#000',
          padding: 10,
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#dba40d',
        tabBarInactiveTintColor: '#20284F',
      }}>
      <Tabs.Screen
        name="mngProduct"
        options={{
          title: '상품 관리',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="manage-search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Admin',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mngPost"
        options={{
          title: '글 관리',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="post-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

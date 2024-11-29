import React from 'react';
import { Tabs } from 'expo-router';
import { AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function TabsLayout() {
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
        name="pedometer"
        options={{
          title: '만보기',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shoe-prints" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
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
      <Tabs.Screen
        name="userInfo"
        options={{
          title: '내 정보',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="user" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

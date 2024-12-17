import React, { ReactNode } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter, Href } from 'expo-router';

interface HearderProps {
  name: string;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  rightRoute?: Href;
  leftRoute?: Href;
}

const Header: React.FC<HearderProps> = ({ name, iconRight, iconLeft, rightRoute, leftRoute }) => {
  const router = useRouter();

  const handleNavigationRight = () => {
    if (rightRoute) {
      router.push(rightRoute);
    }
  };

  const handleNavigationLeft = () => {
    if (leftRoute) {
      router.push(leftRoute);
    }
  };

  return (
    <View className="relative w-full h-[7%] flex-row justify-between items-center mb-2">
      <Pressable onPress={handleNavigationLeft} className="w-1/5 pl-4">
        {iconLeft}
      </Pressable>

      <Text className="text-2xl font-black font-SpoqaMedium w-3/5 text-center">{name}</Text>

      <Pressable onPress={handleNavigationRight} className="w-1/5 pl-4">
        {iconRight}
      </Pressable>
    </View>
  );
};

export default Header;

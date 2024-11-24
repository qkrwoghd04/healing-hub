import React, { ReactNode } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter, Href } from 'expo-router';

interface HearderProps {
  name: string;
  icon?: ReactNode;
  route?: Href;
}

const Header: React.FC<HearderProps> = ({ name, icon, route }) => {
  const router = useRouter();


  const handleNavigation = () => {
    if (icon && route) {
      router.push(route);
    }
  };


  return (
    <View className="relative w-full h-[7%] flex-row justify-center items-center mb-2">
      <Text className="text-2xl font-black font-Pretendard-Medium">{name}</Text>

      <TouchableOpacity onPress={handleNavigation} className="absolute right-5">
        {icon}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

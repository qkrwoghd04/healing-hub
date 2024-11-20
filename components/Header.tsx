import React, { ReactNode } from 'react';

import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter, Href } from 'expo-router';

interface HearderProps {
  name: string;
  icon: ReactNode;
  route: Href;
}

const Header: React.FC<HearderProps> = ({ name, icon, route }) => {
  const router = useRouter();

  const navigateToAdminLogin = () => {
    router.push(route);
  };

  return (
    <View className="relative w-full mt-10 flex-row justify-center items-center">
      <Text className="text-2xl color-[#443F3D] font-Pretendard-Medium">{name}</Text>

      <TouchableOpacity onPress={navigateToAdminLogin} className="absolute right-5">
        {icon}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

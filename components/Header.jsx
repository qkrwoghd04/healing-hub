import React from 'react';
import { View as NativeView , Text as NativeText, TouchableOpacity as NativeTouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { styled } from "nativewind";

const View = styled(NativeView);
const TouchableOpacity  = styled(NativeTouchableOpacity);
const Text = styled(NativeText);

const Header = () => {
  const router = useRouter();

  const navigateToAdminLogin = () => {
    router.push('/admin/login');
  };

  return (
    <View className="flex-row justify-center items-center w-full relatvie h-[5vh] m-1">
      <Text className="text-3xl font-bold color-[#443F3D] font-Typography-Times-Regular">
        아이힐링허브
      </Text>

      <TouchableOpacity onPress={navigateToAdminLogin} className="absolute right-8">
        <MaterialIcons name="admin-panel-settings" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
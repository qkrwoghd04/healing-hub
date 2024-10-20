import React from 'react';
import { View as NativeView , Text as NativeText, TouchableOpacity as NativeTouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { styled } from "nativewind";

const View = styled(NativeView);
const TouchableOpacity  = styled(NativeTouchableOpacity);
const Text = styled(NativeText);

const AdminHeader = () => {
  const router = useRouter();

  const navigateToAdminLogin = () => {
    router.push('/(tabs)');
  };

  return (
    <View className="flex-row justify-center items-center w-full relatvie h-[5vh] m-1 mt-10">
      <Text className="text-2xl color-[#443F3D] font-Pretendard-Medium">
        Admin Home
      </Text>

      <TouchableOpacity onPress={navigateToAdminLogin} className="absolute right-8">
        <Feather name="home" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default AdminHeader;
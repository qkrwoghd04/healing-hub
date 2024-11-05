import React from 'react';
import { styled } from "nativewind";
import { View as NativeView , Text as NativeText, TouchableOpacity as NativeTouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const View = styled(NativeView);
const TouchableOpacity  = styled(NativeTouchableOpacity);
const Text = styled(NativeText);

const AdminHeader = () => {
  const router = useRouter();

  const navigateToAdminLogin = () => {
    router.push('/(tabs)');
  };

  return (
    <View className="relatvie w-full mt-10 flex-row justify-center items-center">
      <Text className="text-2xl color-[#443F3D] font-Pretendard-Medium">
        Admin Home
      </Text>

      <TouchableOpacity onPress={navigateToAdminLogin} className="absolute right-5">
        <Feather name="home" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default AdminHeader;
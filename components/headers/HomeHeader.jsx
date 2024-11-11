import React from 'react';
import {
  View as NativeView,
  Text as NativeText,
  TouchableOpacity as NativeTouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { styled } from 'nativewind';

const View = styled(NativeView);
const TouchableOpacity = styled(NativeTouchableOpacity);
const Text = styled(NativeText);

const Header = () => {
  const router = useRouter();

  const navigateToAdminLogin = () => {
    router.push('/(admin)/login');
  };

  return (
    <View className="relative w-full mt-10 flex-row justify-center items-center">
      {/* App name */}
      <Text className="text-2xl color-[#20284F] font-Pretendard-Medium">힐링허브</Text>
      {/* Admin */}
      <TouchableOpacity onPress={navigateToAdminLogin} className="absolute right-5">
        <MaterialIcons name="admin-panel-settings" size={48} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { styled } from 'nativewind';

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTouchableOpacity = styled(TouchableOpacity)

const Header = () => {
  const router = useRouter();

  const navigateToAdminLogin = () => {
    router.push('/admin/login');
  };

  return (
    <StyledView className="flex-row justify-center items-center w-full relatvie h-[5vh] m-1">
      <StyledText className="text-3xl font-bold color-[#443F3D] font-Typography-Times-Regular">
        Healing Hub
      </StyledText>

      <StyledTouchableOpacity onPress={navigateToAdminLogin} className="absolute right-8">
        <MaterialIcons name="admin-panel-settings" size={35} color="black" />
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default Header;
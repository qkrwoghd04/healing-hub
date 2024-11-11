import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const CallButton = () => {
  const makePhoneCall = () => {
    Linking.openURL('tel:010-4040-1669');
  };
  return (
    <StyledView className="relative h-16 w-full flex items-center justify-center mb-2">
      <StyledTouchableOpacity
        className="bg-black rounded-md h-full w-[90%] flex justify-center items-center border-2 border-[#45403D]"
        onPress={makePhoneCall}>
        <StyledText className="text-3xl font-Pretendard-Medium text-white">매장 주문</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default CallButton;

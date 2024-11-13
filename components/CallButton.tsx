import React from 'react';
import { Linking } from 'react-native';
import { View, TouchableOpacity, Text } from './StyledComponents';

const CallButton = () => {
  const makePhoneCall = () => {
    Linking.openURL('tel:010-4040-1669');
  };
  return (
    <View className="relative h-16 w-full flex items-center justify-center mb-2">
      <TouchableOpacity
        className="bg-black rounded-md h-full w-[90%] flex justify-center items-center border-2 border-[#45403D]"
        onPress={makePhoneCall}>
        <Text className="text-3xl font-Pretendard-Medium text-white">매장 주문</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CallButton;

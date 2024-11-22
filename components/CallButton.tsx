import React from 'react';
import { Linking } from 'react-native';
import { View, TouchableOpacity, Text } from 'react-native';

const CallButton = () => {
  const makePhoneCall = () => {
    Linking.openURL('tel:010-4040-1669');
  };
  return (
    <View className='relative w-full h-[10%]'>
      <TouchableOpacity
        className="w-full h-full flex justify-center items-center border-2 border-[#45403D] rounded-2xl bg-black"
        onPress={makePhoneCall}>
        <Text className="text-3xl font-Pretendard-Medium text-white">매장 주문</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CallButton;

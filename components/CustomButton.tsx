import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  color: string;
  onPress: () => void;
  text: string;
}

const CustomButton:React.FC<ButtonProps> = ({ color, onPress, text }) => {

  return (
    <View className='relative w-full h-[10%] flex items-center'>
      <TouchableOpacity
        className={`w-full h-full flex justify-center items-center rounded-2xl ${color}`}
        onPress={onPress}>
        <Text className="text-3xl font-Pretendard-Medium color-white">{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

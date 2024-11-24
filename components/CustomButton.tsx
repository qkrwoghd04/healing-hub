import React from 'react';
import { View, Pressable, Text } from 'react-native';

interface ButtonProps {
  color: string;
  onPress: () => void;
  text: string;
}

const CustomButton:React.FC<ButtonProps> = ({ color, onPress, text }) => {

  return (
    <View className='relative w-full h-[10%] flex items-center'>
      <Pressable
        className={`w-full h-full flex justify-center items-center rounded-2xl ${color} border-4`}
        onPress={onPress}>
        <Text className="text-4xl font-Pretendard-Medium color-black">{text}</Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;

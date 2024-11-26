import React from 'react';
import { View, Pressable, Text } from 'react-native';

interface ButtonProps {
  backgroudColor: string;
  onPress: () => void;
  text: string;
}

const CustomButton:React.FC<ButtonProps> = ({ backgroudColor
  , onPress, text }) => {

  return (
    <View className='relative w-full h-[10%] flex items-center'>
      <Pressable
        className={`w-full h-full flex justify-center items-center rounded-2xl  ${backgroudColor}`}
        onPress={onPress}>
        <Text className="text-4xl font-Pretendard-Medium color-white">{text}</Text>
      </Pressable>
    </View>
  );
};

export default CustomButton;

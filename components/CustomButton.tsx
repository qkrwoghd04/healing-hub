import React from 'react';
import { View, Pressable, Text, Animated } from 'react-native';
import { usePressAnimation } from '@/hook/usePressAnimation'

interface ButtonProps {
  backgroudColor: string;
  onPress: () => void;
  text: string;
}

const CustomButton: React.FC<ButtonProps> = ({ backgroudColor, onPress, text }) => {
  const { scaleValue, pressHandlers } = usePressAnimation();

  return (
    <View className="relative w-full h-[70px] flex items-center">
      <Animated.View 
        style={{
          transform: [{ scale: scaleValue }],
          width: '100%',
          height: '100%'
        }}
      >
        <Pressable
          className={`w-full h-full flex justify-center items-center rounded-2xl ${backgroudColor}`}
          {...pressHandlers} onPress={onPress}
        >
          <Text className="text-4xl font-Pretendard-Medium color-white">{text}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default CustomButton;
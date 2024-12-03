import React from 'react';
import { Pressable, Text, Animated } from 'react-native';
import { usePressAnimation } from '@/hook/usePressAnimation';

interface ButtonProps {
  buttonStyle: string;
  textStyle: string;
  onPress: () => void;
  text: string;
}

const CustomButton: React.FC<ButtonProps> = ({ buttonStyle, onPress, text, textStyle }) => {
  const { scaleValue, pressHandlers } = usePressAnimation();

  return (
    // <View className="relative w-full h-[70px] flex items-center">
    <Animated.View
      style={{
        width: '100%',
        transform: [{ scale: scaleValue }],
        height: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Pressable className={`${buttonStyle}`} {...pressHandlers(onPress)}>
        <Text className={`${textStyle}`}>{text}</Text>
      </Pressable>
    </Animated.View>
    // </View>
  );
};

export default CustomButton;

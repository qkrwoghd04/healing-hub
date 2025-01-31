import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, Animated } from 'react-native';
import { colors } from "@/utils/colors"
import { usePressAnimation } from '@/hook/usePressAnimation';

type ButtonStyleType = "primary" | "cancel" | "confirm" | "custom";
type TextSizeType = "sm" | "md" | "lg";

interface ButtonProps {
  buttonStyle: ButtonStyleType;
  customStyle?: ViewStyle;
  onPress: () => void;
  text: string;
  textSize: TextSizeType;
}

const getButtonStyle = (
  buttonStyle: ButtonStyleType,
  customStyle?: ViewStyle): ViewStyle => {
  const defaultStyle = {
    ...styles.button,
    backgroundColor: colors.navy,
  };

  switch (buttonStyle) {
    case "cancel":
      return { ...defaultStyle, backgroundColor: colors.red };
    case "confirm":
      return { ...defaultStyle, backgroundColor: colors.blue };
    case "primary":
      return defaultStyle;
    case "custom":
      return { ...defaultStyle, ...customStyle };
    default:
      return defaultStyle;
  }
};

const getTextSize = (textSize: TextSizeType): TextStyle => {
  const defaultSize = { ...styles.text, fontSize: 20 };

  switch (textSize) {
    case "lg": return { ...styles.text, fontSize: 30 };
    case "md": return defaultSize;
    case "sm": return { ...styles.text, fontSize: 10 };
    default: return defaultSize;
  }
}

const Button: React.FC<ButtonProps> = ({ buttonStyle, customStyle, onPress, text, textSize }) => {
  const { scaleValue, pressHandlers } = usePressAnimation();

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], width: "100%" }}>
      <Pressable
        style={getButtonStyle(buttonStyle, customStyle)}
        {...pressHandlers(onPress)}
      >
        <Text style={getTextSize(textSize)}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold"
  },
});

export default Button;
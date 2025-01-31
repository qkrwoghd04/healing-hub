import { Animated, GestureResponderEvent } from 'react-native';
import { useRef } from 'react';

export const usePressAnimation = (initialScale = 1, pressedScale = 0.95) => {
  const scaleValue = useRef(new Animated.Value(initialScale)).current;
  const lastPressTime = useRef(0);
  const PRESS_DEBOUNCE_TIME = 200;

  const pressIn = () => {
    Animated.spring(scaleValue, {
      toValue: pressedScale,
      useNativeDriver: true,
      bounciness: 12,
      speed: 100,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scaleValue, {
      toValue: initialScale,
      useNativeDriver: true,
      bounciness: 12,
      speed: 100,
    }).start();
  };

  const pressHandlers = (onPress: () => void) => ({
    onPressIn: pressIn,
    onPressOut: pressOut,
    delayPressIn: 100,
    onPress: (event: GestureResponderEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastPressTime.current > PRESS_DEBOUNCE_TIME) {
        lastPressTime.current = currentTime;
        onPress();
      }
    },
  });

  return { scaleValue, pressHandlers };
};
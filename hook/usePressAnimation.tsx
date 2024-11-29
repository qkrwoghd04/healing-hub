import { Animated } from 'react-native'
import { useRef } from 'react'


export const usePressAnimation = ( initialScale=1, pressedScale=0.95 ) => {
  const scaleValue = useRef(new Animated.Value(initialScale)).current;

  const pressIn = () => {
    Animated.spring(scaleValue, {
      toValue: pressedScale,
      useNativeDriver: true,
      bounciness: 12,
      speed: 40
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scaleValue, {
      toValue: initialScale,
      useNativeDriver: true,
      bounciness: 12,
      speed: 40
    }).start();
  };

  const pressHandlers = {
    onPressIn: pressIn,
    onPressOut: pressOut,
  };

  return { scaleValue, pressHandlers };
}



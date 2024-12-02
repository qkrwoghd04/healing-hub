import { Animated } from 'react-native'
import { useRef } from 'react'


export const usePressAnimation = ( initialScale=1, pressedScale=0.95 ) => {
  const scaleValue = useRef(new Animated.Value(initialScale)).current;
  
  const pressIn = () => {
    Animated.spring(scaleValue, {
      toValue: pressedScale,
      useNativeDriver: true,
      bounciness: 12,
      speed: 200
    }).start()
  };

  const pressOut = (onPress?: () => void) => {
    Animated.spring(scaleValue, {
      toValue: initialScale,
      useNativeDriver: true,
      bounciness: 12,
      speed: 200
    }).start(() => {
      if(onPress){
        onPress();
      }
    });
  };

  const pressHandlers = (onPress: () => void) => ({
    onPressIn: pressIn,
    onPressOut: () => pressOut(onPress),
  });

  return { scaleValue , pressHandlers };
}



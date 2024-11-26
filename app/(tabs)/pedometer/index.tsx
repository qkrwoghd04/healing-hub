import { useState, useEffect, useRef, useCallback } from 'react';
import { SafeAreaView, Text, View, Alert, TouchableOpacity, Linking } from 'react-native';
import { ImageBackground } from 'expo-image';
import { Pedometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import CustomButton from '@/components/CustomButton';

const selectStepImage = (steps: number) => {
  if (steps < 2000) {
    return require('../../../assets/images/step1.jpg');
  } else if (steps < 4000) {
    return require('../../../assets/images/step2.jpg');
  } else if (steps < 6000) {
    return require('../../../assets/images/step3.jpg');
  } else if (steps < 8000) {
    return require('../../../assets/images/step4.jpg');
  } else if (steps < 10000) {
    return require('../../../assets/images/step5.jpg');
  } else {
    return require('../../../assets/images/step6.jpg');
  }
};

const Walk = () => {
  console.log("[Pedometer] Rendered")
  const [currentStepCount, setCurrentStepCount] = useState(0); //오늘 걸음 상태
  const [pastStepCount, setPastStepCount] = useState(0); //어제 걸음 상태
  const [permissionDenied, setPermissionDenied] = useState(true); // 권한 허용 여부
  const animationRef = useRef<LottieView | null>(null); // Lottiefile Ref 관리

  // 구독을 저장할 ref 추가
  const subscriptionRef = useRef<any>(null);

  const handlePress = useCallback(async () => {
    await Linking.openSettings();
  }, []);

  const emojiPositionStyle = useAnimatedStyle(() => {
    const progress = Math.min((currentStepCount / 10000) * 100, 100);
    return {
      left: `${progress}%`,
      transform: [
        { translateX: -10 },
      ]
    };
  });

  // 만보기 계산
  const progressStyle = useAnimatedStyle(() => {
    const progress = Math.min((currentStepCount / 10000) * 100, 100);
    return {
      width: withSpring(`${progress}%`, {
        mass: 2,
        damping: 20,
        stiffness: 90,
      }),
    };
  });

  useEffect(() => {
    checkPermissions();
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedCurrentSteps = await AsyncStorage.getItem('currentSteps');
      const savedPastSteps = await AsyncStorage.getItem('pastSteps');
      const lastUpdateDate = await AsyncStorage.getItem('lastUpdateDate');

      const today = new Date().toDateString();

      if (lastUpdateDate !== today) {
        // Date has changed, move current steps to past steps
        if (savedCurrentSteps) {
          await AsyncStorage.setItem('pastSteps', savedCurrentSteps);
          setPastStepCount(parseInt(savedCurrentSteps, 10) || 0); // Ensure fallback value
        }
        // Reset current steps to 0
        await AsyncStorage.setItem('currentSteps', '0');
        setCurrentStepCount(0);
        // Update date
        await AsyncStorage.setItem('lastUpdateDate', today);
      } else {
        // Same day, restore saved data
        setCurrentStepCount(parseInt(savedCurrentSteps || '0', 10)); // Use default value if null
        setPastStepCount(parseInt(savedPastSteps || '0', 10));       // Use default value if null
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const checkPermissions = async () => {
    const { status, canAskAgain } = await Pedometer.getPermissionsAsync(); // 디바이스에서 권한 체크
    console.log("권한 상태 : ", status, "canAskAgain : ", canAskAgain)

    // 권한이 부여되어 있다면,
    if (status === 'granted') {
      setPermissionDenied(false);
      subscribe();
    } else {
      if (canAskAgain) {
        const { granted } = await Pedometer.requestPermissionsAsync();
        // Allow 한다면
        if (granted) {
          setPermissionDenied(false);
          subscribe();
        } else {
          setPermissionDenied(true);
        }
      } else {
        setPermissionDenied(true);
      }
    }
  };

  const requestPermission = async () => {
    const { granted } = await Pedometer.requestPermissionsAsync();

    if (granted) {
      setPermissionDenied(false);
      subscribe();
    } else {
      Alert.alert(
        '신체 활동 권한을 허용해주세요',
        '걸음 수를 측청하기 위해 꼭 필요해요',
        [
          {
            text: '확인',
            onPress: () => {
              handlePress()
            }
          }
        ]
      );

    }
  };

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    console.log(isAvailable)
    if (isAvailable) {
      const subscription = Pedometer.watchStepCount(async (result) => {
        const savedSteps = (await AsyncStorage.getItem('currentSteps')) || '0';
        const previousSteps = parseInt(savedSteps, 10) || 0;

        // Add new steps to previous stored steps
        const newCurrentSteps = result.steps + previousSteps;

        setCurrentStepCount(newCurrentSteps);
        await AsyncStorage.setItem('currentSteps', newCurrentSteps.toString());
      });
      // Store subscription in the ref
      subscriptionRef.current = subscription;
    } else {
      Alert.alert(
        "사용 불가",
        "현재 가지고 계신 폰으로는 만보기 사용이 불가합니다",
        [
          { text: '확인' }
        ]
      )
    }
  };
  function CalculateKillometer(step: number) {
    return ((currentStepCount * 0.4) / 1000).toFixed(2);
  }
  function CalculateCalorie(step: number) {
    return ((currentStepCount * 0.0336)).toFixed(1);
  }

  return (
    <View className="flex-1">
      <ImageBackground
        source={selectStepImage(currentStepCount)}
        style={{
          flex: 1
        }}
        priority="high"
      >
        <SafeAreaView className='flex-1'>
          <View className="px-2 flex-1">
            {/* Steps Interface*/}
            <View className="bg-white rounded-xl shadow-xl p-4 opacity-70">
              <Text className="text-2xl font-medium text-black mb-2">오늘 걸음 수</Text>
              <View className='flex-row justify-between'>
                <Text className="text-2xl mb-4">
                  👟{currentStepCount}
                </Text>
                <Text className="text-2xl mb-4">
                  {CalculateKillometer(currentStepCount)}km
                </Text>
                <Text className="text-2xl mb-4">
                  {CalculateCalorie(currentStepCount)}kcal
                </Text>
              </View>
              <View className="w-full h-2 bg-gray-100 rounded-full mt-2">
                <Animated.View
                  style={[
                    emojiPositionStyle,
                    { position: 'absolute', top: -25, zIndex: 10 }
                  ]}
                >
                  <Text className="text-2xl">👟</Text>
                </Animated.View>

                <Animated.View
                  className="h-2 bg-blue-600 rounded-full"
                  style={progressStyle}
                />
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-xs text-gray-500">0</Text>
                <Text className="text-xs text-gray-500">10,000</Text>
              </View>
            </View>

            {/* 권한 요청 버튼 */}

            {permissionDenied && (
              <CustomButton
                backgroudColor="bg-blue-500"
                onPress={requestPermission}
                text="만보기 권한 허용하기"
                
              />
            )}
          </View>

          <View className="items-center justify-center">
            <LottieView
              autoPlay
              ref={animationRef}
              style={{
                width: 200,
                height: 200,
              }}
              source={require('../../../assets/walking.json')}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Walk;
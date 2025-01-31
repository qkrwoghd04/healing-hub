import { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, View, Alert, Linking } from 'react-native';
import { ImageBackground } from 'expo-image';
import { Pedometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import CustomButton from '@/components/Button';
import { SelectStepImage, CalculateKillometer, CalculateCalorie } from '@/components/functions/pedometerFunction';

const Walk = () => {
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [permissionDenied, setPermissionDenied] = useState(true);
  const animationRef = useRef<LottieView | null>(null);
  const subscriptionRef = useRef<any>(null);

  const handlePress = async () => {
    await Linking.openSettings();
  }

  const emojiPositionStyle = useAnimatedStyle(() => {
    const progress = Math.min((currentStepCount / 10000) * 100, 100);
    return {
      left: `${progress}%`,
      transform: [{ translateX: -10 }],
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
      const today = new Date().toDateString();

      const savedCurrentSteps = await AsyncStorage.getItem('currentSteps');
      const lastUpdateDate = await AsyncStorage.getItem('lastUpdateDate');

      if (lastUpdateDate !== today) {
        // 마지막으로 업데이트 된 날짜와 오늘의 날짜 비교
        if (savedCurrentSteps) {
          await AsyncStorage.setItem('pastSteps', savedCurrentSteps);
        }

        await AsyncStorage.setItem('currentSteps', '0');
        setCurrentStepCount(0);

        await AsyncStorage.setItem('lastUpdateDate', today);
      } else {
        setCurrentStepCount(parseInt(savedCurrentSteps || "0", 10));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const checkPermissions = async () => {
    const { status, canAskAgain } = await Pedometer.getPermissionsAsync();

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
      Alert.alert('신체 활동 권한을 허용해주세요', '걸음 수를 측청하기 위해 꼭 필요해요', [
        {
          text: '확인',
          onPress: () => {
            handlePress();
          },
        },
      ]);
    }
  };

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
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
      Alert.alert('사용 불가', '현재 가지고 계신 폰으로는 만보기 사용이 불가합니다', [
        { text: '확인' },
      ]);
    }
  };

  return (
    <View className="flex-1 relative">
      <ImageBackground
        source={SelectStepImage(currentStepCount)}
        style={{
          flex: 1,
        }}
        priority="high">
        <SafeAreaView className="flex-1">
          <View className="flex-1 p-2 justify-between">
            {/* Steps Interface*/}
            <View className="bg-white rounded-xl shadow-2xl p-4 opacity-90">
              <Text className="text-2xl font-SpoqaBold mb-2">오늘 걸음 수</Text>
              <View className="flex-row justify-between">
                <Text className="text-2xl mb-4 font-SpoqaMedium">👟{currentStepCount}</Text>
                <Text className="text-2xl mb-4 font-SpoqaMedium">{CalculateKillometer(currentStepCount)}km</Text>
                <Text className="text-2xl mb-4 font-SpoqaMedium">{CalculateCalorie(currentStepCount)}kcal</Text>
              </View>
              <View className="w-full h-2 bg-gray-100 rounded-full mt-2">
                <Animated.View
                  style={[emojiPositionStyle, { position: 'absolute', top: -15, zIndex: 10 }]}>
                  <Text className="text-sm">📍</Text>
                </Animated.View>

                <Animated.View className="h-2 bg-yellow-400 rounded-full" style={progressStyle} />
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-xs text-gray-500">0</Text>
                <Text className="text-xs text-gray-500">10,000</Text>
              </View>
            </View>

            <View className="items-center justify-center">
              <LottieView
                autoPlay
                ref={animationRef}
                style={{
                  width: 200,
                  height: 200,
                }}
                source={require('@/assets/walking.json')}
              />
              {/* 권한 요청 버튼 */}
              {permissionDenied && (
                <CustomButton
                  textStyle='text-3xl text-white'
                  buttonStyle="w-full h-full flex justify-center items-center rounded-2xl bg-blue"
                  onPress={requestPermission}
                  text="만보기 권한 허용하기"
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

    </View>

  );
};

export default Walk;

import { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../../components/Header'

const Walk = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  // Load saved data
  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedCurrentSteps = await AsyncStorage.getItem('currentSteps');
      const savedPastSteps = await AsyncStorage.getItem('pastSteps');
      const lastUpdateDate = await AsyncStorage.getItem('lastUpdateDate');
      
      const today = new Date().toDateString();
      console.log(lastUpdateDate);
      console.log(today);

      if (lastUpdateDate !== today) {
        // Date has changed, move current steps to past steps
        if (savedCurrentSteps) {
          await AsyncStorage.setItem('pastSteps', savedCurrentSteps);
          setPastStepCount(parseInt(savedCurrentSteps));
        }
        // Reset current steps to 0
        await AsyncStorage.setItem('currentSteps', '0');
        setCurrentStepCount(0);
        // Update date
        await AsyncStorage.setItem('lastUpdateDate', today);
      } else {
        // Same day, restore saved data
        if (savedCurrentSteps) {
          setCurrentStepCount(parseInt(savedCurrentSteps));
        }
        if (savedPastSteps) setPastStepCount(parseInt(savedPastSteps));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
        await AsyncStorage.setItem('pastSteps', pastStepCountResult.steps.toString());
      }

      return Pedometer.watchStepCount(async result => {
        // Add the steps to the previous stored steps
        const newCurrentSteps = result.steps + (parseInt(await AsyncStorage.getItem('currentSteps')) || 0);
        console.log(newCurrentSteps);
        setCurrentStepCount(newCurrentSteps);
        await AsyncStorage.setItem('currentSteps', newCurrentSteps.toString());
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription.then(sub => sub?.remove());
  }, []);

  return (
    <SafeAreaView className="w-full h-full">
      {/* Header */}
      <Header name="오늘의 걸음 수👣"/>

      {/* Main Content */}
      <View className="p-4 flex-1">
        {/* Status Card */}
        <View className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <Text className="text-sm font-medium text-gray-500 mb-1">만보기 활성화</Text>
          <Text className={`text-lg font-semibold ${isPedometerAvailable === 'true' ? 'text-green-600' : 'text-red-600'}`}>
            {isPedometerAvailable === 'true' ? 'Available' : 'Not Available'}
          </Text>
        </View>

        {/* Today's Steps Card */}
        <View className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <Text className="text-sm font-medium text-gray-500 mb-2">Current Steps</Text>
          <Text className="text-4xl font-bold text-blue-600 mb-1">
            {currentStepCount}
          </Text>
          <View className="w-full h-2 bg-gray-100 rounded-full mt-2">
            <View 
              className="h-2 bg-blue-600 rounded-full"
              style={{ width: `${Math.min((currentStepCount / 2000) * 100, 100)}%` }}
            />
          </View>
          <Text className="text-xs text-gray-400 mt-2">Daily Goal: 2,000 steps</Text>
        </View>

        {/* Past 24h Steps Card */}
        <View className="bg-white rounded-xl shadow-sm p-6">
          <Text className="text-sm font-medium text-gray-500 mb-2">Last 24 Hours</Text>
          <Text className="text-4xl font-bold text-purple-600">
            {pastStepCount}
          </Text>
          <Text className="text-xs text-gray-400 mt-2">Total steps from previous day</Text>
        </View>
      </View>

      {/* Bottom Info */}
      <View className="bg-white p-4">
        <Text className="text-center text-sm text-gray-400">
          Keep walking to reach your daily goal!
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Walk;

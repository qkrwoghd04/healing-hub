import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

// API
import { loginUser } from '../../api/api';
import { LoginResponse } from '../../types/Admin';
import CustomButton from '@/components/CustomButton';

const AdminLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // 입력값 검증 함수
  const validateInputs = (): boolean => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('입력 오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      // 로그인 요청
      const userData: LoginResponse = await loginUser({ email, password });
      // 로그인 성공 후 role 확인
      if (userData && userData.role === 'admin') {
        // 관리자 권한을 가진 경우
        await AsyncStorage.setItem('userToken', userData.token);
        await AsyncStorage.setItem('userRole', userData.role);
        await AsyncStorage.setItem('userName', userData.name);
        router.push('/(admin)/(tabs)'); // 관리 페이지로 이동
      } else {
        Alert.alert('로그인 실패', '관리자 계정만 로그인할 수 있습니다.');
        throw new Error('관리자 계정이 아닙니다');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('로그인 실패', '로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 뒤로 가기
  const handleGoBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 justify-center items-center p-5">
      {/* 뒤로가기 아이콘 */}
      <TouchableOpacity className="absolute top-10 left-5" onPress={handleGoBack}>
        <Ionicons name="chevron-back" size={48} color="black" />
      </TouchableOpacity>

      <Text className="font-Pretendard-Medium text-3xl pb-5">관리자 로그인</Text>
      <TextInput
        placeholder="이메일"
        placeholderTextColor="black"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
        autoFocus={true}
        className="w-full h-[60px] border-[1px] border-black rounded-md px-3 mb-3"
      />
      <TextInput
        placeholder="비밀번호"
        placeholderTextColor="black"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
        className="w-full h-[60px] border-[1px] border-black rounded-md px-3 mb-3"
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <CustomButton text="로그인" backgroudColor="bg-[#20284F]" onPress={handleLogin}/>
      )}
    </View>
  );
};

export default AdminLogin;

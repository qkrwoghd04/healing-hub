import React, { useState } from 'react';
import { View as NativeView, Text as NativeText, TextInput as NativeTextInput, TouchableOpacity as NativeTouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind'

// API
import { loginUser } from '../../api/api';

const View = styled(NativeView)
const Text = styled(NativeText)
const TextInput = styled(NativeTextInput)
const TouchableOpacity = styled(NativeTouchableOpacity)


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateInputs = () => {
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
      const userData = await loginUser(email, password);

      await AsyncStorage.setItem('userToken', userData.token);
      await AsyncStorage.setItem('userRole', userData.role);
      
      if (userData.name) {
        await AsyncStorage.setItem('userName', userData.name);
      }

      if (userData.role === 'admin') {
        router.push('(admin)/home');
      } 
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = '로그인 중 오류가 발생했습니다.';
      
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        
        if (error.response.status === 404) {
          errorMessage = 'API 엔드포인트를 찾을 수 없습니다. 서버 설정을 확인해주세요.';
        } else if (error.response.status === 401) {
          errorMessage = error.response.data.message || '이메일 또는 비밀번호가 올바르지 않습니다.';
        } else if (error.response.status >= 500) {
          errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
        }
      } else if (error.request) {
        errorMessage = '서버에서 응답을 받지 못했습니다. 네트워크 연결을 확인해주세요.';
      } else {
        errorMessage = error.message || '알 수 없는 오류가 발생했습니다.';
      }
      
      Alert.alert("로그인 실패", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    router.back(); 
  };

  return (
    <View className="flex-1 justify-center items-center p-10">
      <TouchableOpacity className='absolute top-20 left-5' onPress={handleGoBack}>
        <Ionicons name="chevron-back" size={48} color="gray" />
      </TouchableOpacity>
      <Text className='font-Pretendard-Medium text-3xl pb-5'>관리자 로그인</Text>
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
        className='w-full h-[50px] border-[1px] border-gray-300 rounded-md px-3 mb-3'
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
        className='w-full h-[50px] border-[1px] border-gray-300 rounded-md px-3 mb-3'
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <TouchableOpacity className="bg-[#20284F] w-full h-12 rounded-md flex justify-center items-center" onPress={handleLogin}>
          <Text className='text-white font-Pretendard-Medium text-xl'>로그인</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AdminLogin;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../api/api';
import { Ionicons } from '@expo/vector-icons';

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
      console.log('Login response:', userData);

      await AsyncStorage.setItem('userToken', userData.token);
      await AsyncStorage.setItem('userRole', userData.role);
      
      if (userData.name) {
        await AsyncStorage.setItem('userName', userData.name);
      }

      if (userData.role === 'admin') {
        router.push('/admins/home');
      } else {
        router.push('/(tabs)');
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>관리자 로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60, // 상태 바 높이를 고려하여 조정
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Pretendard-Medium',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#954F4C',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Medium',
  },
});

export default AdminLogin;
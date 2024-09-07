import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    showAdminAlert();
  }, []);

  const showAdminAlert = () => {
    Alert.alert(
      "알림",
      "관리자이신가요?",
      [
        {
          text: "아니요",
          onPress: () => router.replace('/(tabs)'),
          style: "cancel"
        },
        { text: "예", onPress: () => console.log("관리자 확인") }
      ],
      { 
        cancelable: false,
        titleStyle: { fontSize: 30, fontWeight: 'bold' },
        messageStyle: { fontSize: 28 },
        buttonTextStyle: { fontSize: 20 }
      }
    );
  };

  const handleLogin = () => {
    if (username === 'root' && password === 'secret') {
      router.push('/admins/home');
    } else {
      Alert.alert(
        "로그인 실패", 
        "아이디 또는 비밀번호가 올바르지 않습니다.",
        [{ text: "확인", style: "cancel" }],
        { 
          titleStyle: { fontSize: 24, fontWeight: 'bold' },
          messageStyle: { fontSize: 22 },
          buttonTextStyle: { fontSize: 20 }
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>관리자 로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 24,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AdminLogin;
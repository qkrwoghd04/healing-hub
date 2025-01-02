import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { sendNotification } from '@/api/api';
import CustomTextInput from '@/components/CustomTextInput';

const SendNotification = () => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [data, setData] = useState<object>();

  return (
    <Animated.View entering={FadeIn} style={styles.background}>
      <Animated.View entering={SlideInDown} style={styles.pushContainer}>
        <View style={{ flex: 1, width: '100%', padding: 10 }}>
          <View style={styles.headerContainer}>
            <Text className="pt-4 font-SpoqaMedium text-2xl text-blue">Push 알림 보내기 ✉️</Text>
          </View>

          <View style={styles.inputContainer}>
            <CustomTextInput
              placeholder="알림 제목"
              onChangeText={setTitle}
              value={title}
            />

            <CustomTextInput
              placeholder="새로운 상품이 등록되었습니다!"
              onChangeText={setBody}
              value={body}
            />
          </View>

          <View style={styles.footerContainer}>
            <View style={styles.buttonContainer}>
              <CustomButton
                buttonStyle=" w-[150px] h-16 p-2 border-2 border-blue rounded-lg flex justify-center items-center"
                textStyle="text-2xl font-Pretendard-Medium text-blue"
                onPress={() => router.push('..')}
                text="취소"
              />
            </View>

            <View style={styles.buttonContainer}>
              <CustomButton
                buttonStyle="w-[150px] h-16 p-2 bg-blue rounded-lg flex justify-center items-center"
                textStyle="text-2xl font-Pretendard-Medium color-white"
                onPress={() => {
                  const jsonData = {
                    title,
                    body,
                    data: data || {},
                  };

                  Alert.alert('알림을 전송하시겠습니까?', '한번 전송시 요금이 발생할 수 있습니다', [
                    {
                      text: '확인',
                      onPress: async () => {
                        try {
                          await sendNotification(jsonData);
                          Alert.alert('알림을 전송했습니다🔔');
                          router.push('..');
                        } catch (error) {
                          console.error('Failed to send notification:', error);
                        }
                      },
                    },
                    {
                      text: '취소',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                  ]);
                }}
                text="확인"
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000040',
  },
  pushContainer: {
    flexDirection: 'column',
    width: '90%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },
  animatedButton: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
  }
});

export default SendNotification;

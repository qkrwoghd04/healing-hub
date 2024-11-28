import React from 'react'
import { SafeAreaView, Text, View, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { login } from '@react-native-seoul/kakao-login';

const UserInfo = () => {

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 justify-center items-center'>
        <Text>index</Text>
        <Pressable onPress={login}>
          <Image
            source="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
            style={{
              width: 200,
              height: 100
            }}
            contentFit='contain'
          />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default UserInfo
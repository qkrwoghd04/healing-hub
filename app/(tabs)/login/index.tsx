import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import React, { useEffect } from 'react'
import { initializeKakaoSDK } from '@react-native-kakao/core'
import { login, logout, unlink } from '@react-native-kakao/user'

const Login = () => {
  useEffect(() => {
    initializeKakaoSDK('e6b1b3f5e6e616b6f75e926f9514ba8e')
  }, [])

  return (
    <View className="flex-1 justify-center items-center">
      <Pressable
        className='w-60 h-20 rounded-xl'
        onPress={() => login().then(console.log).catch(console.error)}>
        <Image
          source={require('@/assets/images/kakao_login.png')}
          style={{
            width: 200,
            height: 50,
          }}
          contentFit='contain'
        />
      </Pressable>
      <Pressable
        className='w-20 h-10 rounded-xl bg-red text-center'
        onPress={() => logout().then(console.log).catch(console.error)}>
        <Text>logout</Text>
      </Pressable>
      <Pressable
        className='w-20 h-10 rounded-xl bg-gray-500 text-center'
        onPress={() => unlink().then(console.log).catch(console.error)}>
        <Text>unlink</Text>
      </Pressable>
    </View>
  )
}

export default Login

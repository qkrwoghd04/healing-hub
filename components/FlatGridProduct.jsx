import React from 'react'
import { Text as NativeText, View as NativeView, TouchableOpacity, Image as NativeImage, } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styled } from 'nativewind'

const View = styled(NativeView)
const Text = styled(NativeText)
const Image = styled(NativeImage)

const Categories = [
  { name: "비타민 및 미네랄", img: require('../assets/icons/비타민.png') },
  { name: "콜라겐 및 피부건강", img: require('../assets/icons/콜라겐.png') },
  { name: "소화 및 장 건강", img: require('../assets/icons/소화.png') },
  { name: "오메가3 및 혈관 건강", img: require('../assets/icons/혈관건강.png') },
  { name: "관절 건강", img: require('../assets/icons/관절건강.png') },
  { name: "면역 강화", img: require('../assets/icons/면역강화.png') },
  { name: "기타 건강 보조제", img: require('../assets/icons/기타건강보조제.png') },
]

const FlatGridProduct = ({ dimension, name, title }) => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 px-2">
      {title && (
        <View className='flex-row justify-start items-center px-4 gap-x-2'>
          <Text className='text-black text-2xl font-Pretendard-Medium'>카테고리별</Text>
          <FontAwesome5 name="capsules" size={24} color="black" />
        </View>
      )}
      <FlatGrid
        itemDimension={dimension}
        data={Categories}
        className="py-3 flex-1"
        spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('categoryList', { category: item.name })}
          >
            <View className="justify-center items-center rounded-xl px-3 h-[130px] font-Pretendard-Light bg-white border-[1px] border-gray-400">
              <Image
                source={item.img}
                className="w-12 h-12 mb-2"
              />
              {name && (
                <Text className="mt-2 text-center text-sm">{item.name}</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default FlatGridProduct
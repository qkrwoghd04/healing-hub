import React from 'react'
import { Text as NativeText, View as NativeView, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { FlatGrid } from 'react-native-super-grid';
import { FontAwesome5 } from '@expo/vector-icons';
import { styled } from 'nativewind'
import { useRouter } from 'expo-router';

const View = styled(NativeView)
const Text = styled(NativeText)

// 이미지를 먼저 객체로 선언
const CategoryImages = {
  '비타민_및_미네랄': require('../assets/icons/vitamin.png'),
  '콜라겐_및_피부건강': require('../assets/icons/collagen.png'),
  '소화_및_장_건강': require('../assets/icons/digestion.png'),
  '오메가3_및_혈관_건강': require('../assets/icons/omega3.png'),
  '관절_건강': require('../assets/icons/joint.png'),
  '면역_강화': require('../assets/icons/immune.png'),
  '기타_건강_보조제': require('../assets/icons/others.png'),
};

// Categories 배열 수정
const Categories = [
  { name: "비타민 및 미네랄", img: CategoryImages.비타민_및_미네랄 },
  { name: "콜라겐 및 피부건강", img: CategoryImages.콜라겐_및_피부건강 },
  { name: "소화 및 장 건강", img: CategoryImages.소화_및_장_건강 },
  { name: "오메가3 및 혈관 건강", img: CategoryImages.오메가3_및_혈관_건강 },
  { name: "관절 건강", img: CategoryImages.관절_건강 },
  { name: "면역 강화", img: CategoryImages.면역_강화 },
  { name: "기타 건강 보조제", img: CategoryImages.기타_건강_보조제 },
];
const FlatGridProduct = ({ dimension, setName, title }) => {
  const router = useRouter();

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
            onPress={() => router.push({pathname: 'category/categoryList', params: { category: item.name}})}
          >
            <View className="justify-center items-center rounded-xl px-3 h-[130px] font-Pretendard-Light bg-white border-[1px] border-gray-400">
              <Image
                source={item.img}
                style={{marginBottom: 2, width: 48, height: 48}}
              />
              {setName && (
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
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Text as NativeText, View as NativeView, SafeAreaView as NativeSafeAreaView, TouchableOpacity, Image as NativeImage, } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import { styled } from 'nativewind'

//components
import SearchBar from '../../../components/SearchBar'

const View = styled(NativeView)
const Text = styled(NativeText)
const Image = styled(NativeImage)
const SafeAreaview = styled(NativeSafeAreaView)


const Categories = [
  { name: "비타민 및 미네랄", img: require('../../../assets/icons/비타민.png') },
  { name: "콜라겐 및 피부건강", img: require('../../../assets/icons/콜라겐.png') },
  { name: "소화 및 장 건강", img: require('../../../assets/icons/소화.png') },
  { name: "오메가3 및 혈관 건강", img: require('../../../assets/icons/혈관건강.png') },
  { name: "관절 건강", img: require('../../../assets/icons/관절건강.png') },
  { name: "면역 강화", img: require('../../../assets/icons/면역강화.png') },
  { name: "기타 건강 보조제", img: require('../../../assets/icons/기타건강보조제.png') },
]

const index = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (query) => {
    setSearchQuery(query);
  }


  return (
    <SafeAreaview className='h-full w-full bg-gray-200'>
      {/* Category Header with SearchBar */}
      <View className='bg-[#20284F] w-full h-[25%] rounded-b-2xl relative px-4 pt-8'>
        <View className='flex-1 justify-center items-start'>
          <Text className='text-white text-2xl font-Pretendard-Medium'>카테고리별 상품</Text>
        </View>
        <View className='flex-1'>
          <SearchBar
            searchQuery={searchQuery}
            onSearch={handleSearch}
            className="px-4 py-4 border-2 border-gray-400 rounded-xl bg-white"
          />
        </View>
      </View>

      {/* 카테고리 FlatGrid */}
      <View className="flex-1">
        <FlatGrid
          itemDimension={130}
          data={Categories}
          className="py-5 flex-1"
          spacing={10}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('categoryList', { category: item.name })} 
            >
              <View className='justify-center items-center rounded-xl p-3 h-[150px] bg-white font-Pretendard-Light '>
                <Image
                  source={item.img}
                  className="w-12 h-12 mb-2"
                />
                <Text className='text-xl text-[#20284F]'>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaview>
  )
}

export default index
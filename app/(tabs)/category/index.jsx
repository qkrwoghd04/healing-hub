import React, { useState } from 'react'
import { Text as NativeText, View as NativeView, SafeAreaView as NativeSafeAreaView } from 'react-native'
import { styled } from 'nativewind'

//components
import SearchBar from '../../../components/SearchBar'
import FlatGridProduct from '../../../components/FlatGridProduct';

const View = styled(NativeView)
const Text = styled(NativeText)
const SafeAreaview = styled(NativeSafeAreaView)

const CategroyScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  return (
    <SafeAreaview className='h-full w-full'>
      {/* Category Header with SearchBar */}
      <View className='bg-[#20284F] w-full h-[15%] rounded-b-2xl relative px-4 pt-8'>
        <View className='flex-1 justify-center items-start'>
          <Text className='text-white text-2xl font-Pretendard-Medium'>카테고리별 상품</Text>
        </View>
        {/* <View className='flex-1'>
          <SearchBar
            searchQuery={searchQuery}
            onSearch={handleSearch}
            className="px-4 py-4 border-2 border-gray-400 rounded-xl bg-white"
          />
        </View> */}
      </View>

      {/* 카테고리 FlatGrid */}
      <FlatGridProduct dimension={130} name={true} title={false}/>
    </SafeAreaview>
  )
}

export default CategroyScreen
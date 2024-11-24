import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

//components
// import SearchBar from '../../../components/SearchBar'
import FlatGrid from '../../../components/FlatGridProduct';

const CategroyScreen = () => {
  console.log("[Category Index] Rendered");
  return (
    <SafeAreaView className="h-full w-full">
      {/* Category Header with SearchBar */}
      <View className="relative w-full h-[7%]">
        <View className="flex-1 justify-center items-center">
          <Text className="text-black text-2xl font-Pretendard-Medium">카테고리별 상품</Text>
        </View>
      </View>

      {/* 카테고리 FlatGrid */}
      <FlatGrid dimension={130} setName={true} title={false} height='h-full'/>
    </SafeAreaView>
  );
};

export default CategroyScreen;

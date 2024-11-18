import React from 'react';
import { View, Text, SafeAreaView } from '../../../components/StyledComponents'

//components
// import SearchBar from '../../../components/SearchBar'
import FlatGridProduct from '../../../components/FlatGridProduct';


const CategroyScreen = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // };

  return (
    <SafeAreaView className="h-full w-full">
      {/* Category Header with SearchBar */}
      <View className="relative w-full h-[12%] px-4 pt-8 bg-black">
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-2xl font-Pretendard-Medium">카테고리별 상품</Text>
        </View>
      </View>

      {/* 카테고리 FlatGrid */}
      <FlatGridProduct dimension={130} setName={true} title={false} />
    </SafeAreaView>
  );
};

export default CategroyScreen;

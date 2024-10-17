import React, { useState, useEffect } from 'react'
import { useProducts } from '../api/ProductContext';
import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import { FormatPrice } from '../components/FormatPrice'

const CategoryProductScroll = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    if (products.length > 0) {
      setSelectedCategory(products[0].category);
    }
  }, [products]);

  // 상품을 popularity 순으로 정렬하는 함수
  const sortProductsByPopularity = (items) => {
    const popularityOrder = { High: 1, Medium: 2, Low: 3 };
    return items.sort((a, b) => popularityOrder[a.popularity] - popularityOrder[b.popularity]);
  };

  // 선택된 카테고리에 맞는 상품 필터링
  const filteredProducts = selectedCategory
    ? sortProductsByPopularity(products.filter(item => item.category === selectedCategory))
    : [];

    
  return (
    <View className="w-full h-[45%] rounded-md px-4 gap-2">
      
      <Text className="text-3xl font-pretendard-light py-2">카테고리별</Text>
      {/* 카테고리 스크롤바 */}
      <View className="w-full h-8">
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 8,
          }}
          className='w-full h-full'
        >
          {Array.from(new Set(products.map(item => item.category))).map((category, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => setSelectedCategory(category)}
              className={`flex flex-row items-center bg-white rounded-md p-2 border ${selectedCategory === category ? 'bg-gray-700' : 'border-gray-400'}`}
            >
              <Text className={`${selectedCategory === category ? 'text-white' : 'text-gray-700'}`}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 선택된 카테고리의 상품 목록 */}
      {selectedCategory && (
        <View className='w-full h-[70%]'>
          <ScrollView className='w-full h-full gap-y-2'>
            {filteredProducts.slice(0, 3).map((item, index) => (
              <View key={index} className="flex-row justify-start items-center rounded-md gap-x-4">
                {/* Product Number */}
                <View className='flex flex-col justify-center items-center'>
                  <Text className="text-xl font-Pretendard-Medium text-gray-800">{index + 1}</Text>
                  <View className='w-2 h-1 bg-gray-600'></View>
                </View>
                {/* Product Image */}
                <View className='bg-white w-16 h-16'>
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-full rounded-md"
                  />
                </View>
                {/* Product Info */}
                <View className='flex flex-col justify-between'>
                  <Text className="text-xl font-pretendard-light">{item.name}</Text>
                  <Text className="text-l font-pretendard-light">{item.description}</Text>
                  <Text className="text-xl">{FormatPrice(item.price)}</Text>
                </View>              
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

export default CategoryProductScroll
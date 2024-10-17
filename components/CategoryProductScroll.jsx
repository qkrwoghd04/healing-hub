import React, { useState, useEffect } from 'react'
import { styled } from 'nativewind';
import { useProducts } from '../api/ProductContext';
import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import { FormatPrice } from '../components/FormatPrice'

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

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
    <StyledView className="w-full h-auto rounded-md px-4">
      
      {/* 카테고리 스크롤바 */}
      <StyledText className="text-3xl font-pretendard-light py-2">카테고리별</StyledText>
      <StyledScrollView 
        horizontal
        contentContainerStyle={{
          gap: 8,
          marginBottom: 10
        }}
      >
        {Array.from(new Set(products.map(item => item.category))).map((category, index) => (
          <StyledTouchableOpacity 
            key={index} 
            onPress={() => setSelectedCategory(category)}
            className={`flex-row items-center bg-white rounded-md p-2 border ${selectedCategory === category ? 'bg-gray-700' : 'border-gray-400'}`}
          >
            <StyledText className={`${selectedCategory === category ? 'text-white' : 'text-gray-700'}`}>{category}</StyledText>
          </StyledTouchableOpacity>
        ))}
      </StyledScrollView>

      {/* 선택된 카테고리의 상품 목록 */}
      {selectedCategory && (
        <StyledView>
          <StyledScrollView className='w-full'>
            {filteredProducts.map((item, index) => (
              <StyledView key={index} className="flex-row justify-start items-center rounded-md gap-x-4">
                {/* Product Number */}
                <StyledView className='flex flex-col justify-center items-center'>
                  <StyledText className="text-xl font-Pretendard-Medium text-gray-800">{index + 1}</StyledText>
                  <StyledView className='w-2 h-1 bg-gray-600'></StyledView>
                </StyledView>
                {/* Product Image */}
                <StyledView className='bg-white w-20 h-20'>
                  <StyledImage
                    source={{ uri: item.image }}
                    className="w-full h-full rounded-md"
                  />
                </StyledView>
                {/* Product Info */}
                <StyledView className='h-full flex flex-col justify-between'>
                  <StyledText className="text-xl font-pretendard-light">{item.name}</StyledText>
                  <StyledText className="text-l font-pretendard-light">{item.description}</StyledText>
                  <StyledText className="text-xl">{FormatPrice(item.price)}</StyledText>
                </StyledView>              
              </StyledView>
            ))}
          </StyledScrollView>
        </StyledView>
      )}
    </StyledView>
  )
}

export default CategoryProductScroll
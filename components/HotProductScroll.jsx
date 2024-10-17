import React, { memo } from 'react'
import { styled } from 'nativewind';
import { useProducts } from '../api/ProductContext';
import { View, Text, Image, ScrollView} from 'react-native';
import { FormatPrice } from '../components/FormatPrice'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledImage = styled(Image)
const StyledScrollView = styled(ScrollView)

const ProductSlide = memo(({ item }) => (
  <StyledView className='flex flex-col justify-center items-center w-[15vh] h-[30vh] rounded-lg'>
    {/* Image */}
    <StyledView className='w-full h-1/2 flex justify-center items-center'>
      <StyledImage source={{ uri: item.image }} style={{ width: '95%', height: '100%', resizeMode: 'cover'}} className="border border-gray-300 rounded-lg" />
    </StyledView>
    
    <StyledView className='w-full h-1/2 p-2'>
      <StyledText className='text-lg font-bold mb-2 font-pretendard-Medium' numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </StyledText>
      <StyledText className='text-gray-600 mb-2 font-pretendard-light' numberOfLines={2} ellipsizeMode="tail">
        {item.description}
      </StyledText>
      <StyledText className='text-xl text-black font-Pretendard-Medium'>
        {FormatPrice(item.price)}
      </StyledText>
    </StyledView>
  </StyledView>
));

const HotProductScroll = () => {
  const { products } = useProducts();

   // popularity가 "High", "Medium", "Low" 순서로 필터링하여 최대 10개 선택
  const getFilteredProducts = () => {
    const highPopularityProducts = products.filter(item => item.popularity === "High");
    const mediumPopularityProducts = products.filter(item => item.popularity === "Medium");
    const lowPopularityProducts = products.filter(item => item.popularity === "Low");

    // 최종 상품 배열
    let selectedProducts = [...highPopularityProducts];

    // High로 10개가 안 채워지면 Medium에서 추가
    if (selectedProducts.length < 10) {
      selectedProducts = [...selectedProducts, ...mediumPopularityProducts.slice(0, 10 - selectedProducts.length)];
    }

    // High와 Medium으로 10개가 안 채워지면 Low에서 추가
    if (selectedProducts.length < 10) {
      selectedProducts = [...selectedProducts, ...lowPopularityProducts.slice(0, 10 - selectedProducts.length)];
    }

    return selectedProducts.slice(0, 10); // 최종적으로 최대 10개 선택
  };

  const filteredProducts = getFilteredProducts();

  return (
    <StyledView className='w-full h-[38vh] rounded-md px-4'>
      <StyledText className='text-3xl font-pretendard-light py-2'>인기 상품 및 할인 상품</StyledText>
      <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredProducts.map((item) => (
          <ProductSlide key={item.id} item={item} />
        ))}
      </StyledScrollView>
    </StyledView>
  )
}

export default HotProductScroll
import React, { memo } from 'react'
import { styled } from 'nativewind';
import { useProducts } from '../api/ProductContext';
import { View, Text, Image, ScrollView} from 'react-native';

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledImage = styled(Image)
const StyledScrollView = styled(ScrollView)

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
};

const ProductSlide = memo(({ item }) => (
  <StyledView className='flex flex-col justify-center items-center w-[15vh] h-[30vh] rounded-lg'>
    {/* Image */}
    <StyledView className='w-full h-1/2 flex justify-center items-center'>
      <StyledImage source={{ uri: item.image }} style={{ width: '95%', height: '100%', resizeMode: 'cover'}} className="border border-gray-300 rounded-lg" />
    </StyledView>
    
    <StyledView className='w-full h-1/2 p-2'>
      <StyledText className='text-lg font-bold mb-2 font-pretendard-Medium' numberOfLines={1} ellipsizeMode="tail">
        {item.shortName}
      </StyledText>
      <StyledText className='text-gray-600 mb-2 font-pretendard-light' numberOfLines={2} ellipsizeMode="tail">
        {item.description}
      </StyledText>
      <StyledText className='text-xl text-black font-Pretendard-Medium'>
        {formatPrice(item.price)}
      </StyledText>
    </StyledView>
  </StyledView>
));

const HotProductScroll = () => {
  const { products } = useProducts();

  return (
    <StyledView className='w-full h-[38vh] rounded-md px-4'>
      <StyledText className='text-3xl font-pretendard-light py-2'>인기 상품 및 할인 상품</StyledText>
      <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
        {products.map((item) => (
          <ProductSlide key={item.id} item={item} />
        ))}
      </StyledScrollView>
    </StyledView>
  )
}

export default HotProductScroll


// swiperContainer: {
//   height: hp('62%'),
//   marginTop: 7
// },
// slide: {
//   width: wp('100%'),
//   height: hp('55%'),
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginTop: 5,
//   marginBottom: 10,
// },
// ImageContainer: {
//   justifyContent: "center",
//   alignContent: "center",
//   width: '100%',
//   height: '75%',
// },
// productImage: {
//   width: '100%',
//   height: '100%',
//   resizeMode: 'cover',
//   borderRadius: 10,
// },
// line: {
//   borderBottomWidth: 1,
//   width: "100%",
//   borderBlockColor: "#e9ede6",
//   marginTop: hp('1%'),
// },
// productNameContainer: {
//   flexDirection: 'row',
//   justifyContent: 'center',
//   width: '100%',
// },
// productInfo: {
//   flex: 0.8,
//   padding: wp('2%'),
//   alignItems: 'center',
//   width: '100%',
// },
// productName: {
//   fontSize: wp('6%'),
//   fontWeight: 'bold',
//   marginTop: hp('1%'),
//   fontFamily: 'Pretendard-Medium',
//   textAlign: 'center',
//   width: '90%',
// },
// productPrice: {
//   fontSize: wp('7%'),
//   color: '#000',
//   marginTop: hp('1%'),
//   marginBottom: hp('1%'),
//   fontFamily: 'Pretendard-Medium'
// },
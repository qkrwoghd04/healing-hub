import React from 'react';
import { View, Pressable, Text, Animated } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Product } from '../types/Product';
import { FormatPrice } from './functions/FormatPrice';
import { usePressAnimation } from '@/hook/usePressAnimation'

interface ProductSlideProps {
  item: Product;
}

const ProductSlide = React.memo<ProductSlideProps>(({ item }) => {
  const { scaleValue, pressHandlers } = usePressAnimation()

  const openModal = () => {
    router.push(
      {
        pathname: '/productModal',
        params: {
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          image: item.image,
          product_detail_url: item.product_detail_url,
        },
      }
    )
  }
  return (
    <Animated.View 
      className="flex"
      style={{
        transform: [{scale: scaleValue}]
      }}
    >
      <Pressable
        {...pressHandlers(openModal)}
        >
        <View className="flex flex-col justify-center items-center w-[15vh] h-[30vh] rounded-lg">
          <View className="w-full h-1/2 flex justify-center items-center">
            <Image
              source={{ uri: item.image }}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#e8e8e8',
                borderRadius: 12,
              }}
              placeholder={require('@/assets/images/loading.png')}
              placeholderContentFit='contain'
              contentFit="cover"
            />
          </View>
          <View className="w-full h-1/2 p-2">
            <Text
              className="text-lg mb-2 font-SpoqaMedium"
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.name}
            </Text>
            <Text className="text-xl font-SpoqaMedium">
              {FormatPrice(item.price)}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
});

ProductSlide.displayName = 'ProductSlide';
export default ProductSlide;

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Product } from '../types/Product';
import { FormatPrice } from './functions/FormatPrice';

interface ProductSlideProps {
  item: Product;
}

const ProductSlide = React.memo<ProductSlideProps>(({ item }) => {
  return (
    <View className="flex">
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: '/modal',
            params: {
              id: item.id,
              name: item.name,
              price: item.price,
              description: item.description,
              image: item.image,
              product_detail_url: item.product_detail_url,
            },
          })
        }>
        <View className="flex flex-col justify-center items-center w-[15vh] h-[30vh] rounded-lg">
          <View className="w-full h-1/2 flex justify-center items-center">
            <Image
              source={{ uri: item.image }}
              style={{
                width: '100%',
                height: '100%',
                borderWidth: 1,
                borderColor: '#e8e8e8',
                borderRadius: 12,
              }}
              contentFit="cover"
            />
          </View>
          <View className="w-full h-1/2 p-2">
            <Text
              className="text-lg mb-2 font-pretendard-light"
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.name}
            </Text>
            <Text className="text-lg text-black font-Pretendard-Medium">
              {FormatPrice(item.price)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});

ProductSlide.displayName = 'ProductSlide';
export default ProductSlide;

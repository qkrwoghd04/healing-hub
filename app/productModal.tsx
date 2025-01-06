import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { FormatPrice } from '../components/functions/FormatPrice';

//Components
import DetailImage from '../components/DetailImage';

const Modal = () => {
  const { id, name, price, image, description, product_detail_url } = useLocalSearchParams<{
    id: string;
    name: string;
    price: string;
    image: string;
    description: string;
    product_detail_url: string;
  }>();

  if (!id) return null;

  return (
    <View className="relative w-full h-full bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
        {/* Top Image */}
        <View className="w-full h-[35vh] flex justify-center items-center rounded-lg">
          <Image
            source={image}
            contentFit="cover"
            style={{
              width: '100%',
              height: '100%',
              borderWidth: 1,
              borderColor: '#e8e8e8',
            }}
            transition={300}
            priority="high"
            cachePolicy="memory-disk"></Image>
        </View>

        {/* Product Info */}

        <View className="w-full flex-col justify-center items-start p-2 my-4 gap-2">
          <Text className="text-2xl font-SpoqaMedium">{name}</Text>
          <Text className="text-xl font-SpoqaMedium text-gray">{description}</Text>
          <Text className="text-2xl font-SpoqaBold">{FormatPrice(price)}</Text>
        </View>
        {/* 긴 이미지 */}
        <DetailImage uri={product_detail_url} />
      </ScrollView>
    </View>
  );
};

export default Modal;

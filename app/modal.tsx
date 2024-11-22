import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import { Image } from 'expo-image'
import { FormatPrice } from '../components/functions/FormatPrice';
import { ImageLoadEventData } from 'expo-image';

const Modal = () => {
  console.log("모달 렌더링")
  const { id, name, price, image, description, product_detail_url } = useLocalSearchParams<{
    id: string;
    name: string,
    price: string,
    image: string,
    description: string,
    product_detail_url: string,
  }>();
  const [imgHeight, setImgHeight] = useState(0);

  if (!id) return null;

  const handleImageLoad = (event: ImageLoadEventData) => {
    const { height } = event.source;
    setImgHeight(height);
  }

  return (
    <View className="relative w-full h-full bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
        {/* Top Image */}
        <View className="w-full h-[35vh] flex justify-center items-center rounded-lg">
          <Image
            source={image} 
            contentFit="cover"
            style={{ width: '100%', height: '100%' }}
            transition={300}
            priority="high"
            onLoad={handleImageLoad}
            cachePolicy="memory-disk"
          >
          </Image>
        </View>

        {/* Product Info */}
        <View className="flex-col justify-center items-start">
          <View className="w-full flex-col justify-center items-start border-y-[1px] border-gray-300 p-2 rounded-xl">
            <Text className="text-2xl font-Pretendard-Medium">{name}</Text>
            <Text className="text-xl font-Pretendard-Medium text-gray-700">
              {description}
            </Text>
            <Text className="text-2xl font-extrabold">{FormatPrice(price)}</Text>
          </View>

          {/* 긴 이미지 */}
          <View className="w-full" style={{ height: imgHeight ? imgHeight : 'auto' }}>
            <Image
              source={{ uri: product_detail_url }}
              contentFit="fill"
              style={{width:"100%", height: "100%"}}
              transition={300}
              priority="normal"
              onLoad={handleImageLoad}
              cachePolicy="memory-disk"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Modal;
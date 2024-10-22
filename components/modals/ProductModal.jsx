import React, { useState } from 'react';
import { Modal as NativeModal, View as NativeView, Text as NativeText, ScrollView as NativeScrollView, TouchableOpacity as NativeTouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import { styled } from "nativewind";
import { FormatPrice } from "../functions/FormatPrice";

const View = styled(NativeView);
const ScrollView = styled(NativeScrollView);
const Modal = styled(NativeModal);
const Text = styled(NativeText);
const TouchableOpacity = styled(NativeTouchableOpacity);

const ProductModal = ({ visible, onClose, product }) => {
  const [imgHeight, setImgHeight] = useState(0);

  if (!product) return null;

  const handleImageLoad = (event) => {
    const { width, height } = event.source; 
    setImgHeight(height); 
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(68, 63, 61, 0.6)' }}>
        <View className="w-full h-[70%] bg-white rounded-lg">
          <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
            {/* Top Image */}
            <View className="w-full h-[35vh] flex justify-center items-center rounded-lg">
              <Image
                source={{ uri: product.image }}
                style={{
                  width: '100%',
                  height: '90%',
                }}
                contentFit='contain'
              />
            </View>

            {/* Product Info */}
            <View className='flex-1 flex-col justify-center items-start'>
              <View className='w-full flex flex-col justify-center items-start border-y-[1px] border-gray-300 p-2 rounded-xl'>
                <Text className="text-2xl font-Pretendard-Medium">{product.name}</Text>
                <Text className="text-xl font-Pretendard-Medium text-gray-700">{product.description}</Text>
                <Text className="text-2xl font-extrabold">{FormatPrice(product.price)}</Text>
              </View>

              {/* 긴 이미지 */}
              <View className="flex-1 w-full" style={{ height: imgHeight ? imgHeight : 'auto' }}>
                {/* 제품 정보 with Arrow */}
                <View className='flex-col justify-center items-center py-4 gap-y-2'>
                  <Text className='font-Pretendard-Medium text-3xl text-black'>제품 정보</Text>
                  <Fontisto name="caret-down" size={24} color="black" />
                </View>
                {/* Product Detail Image */}
                <Image
                  source={{ uri: product.product_detail_url }}
                  contentFit="fill"
                  style={{ width: '100%', height: '100%'}}
                  transition={300}
                  onLoad={handleImageLoad}
                  cachePolicy="memory-disk"
                />
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity onPress={onClose} className="absolute top-2 right-3">
            <AntDesign name="close" size={48} color="#585e58" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductModal;

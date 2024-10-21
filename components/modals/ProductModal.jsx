import React, { useState, useEffect } from 'react';
import { Modal as NativeModal, View as NativeView, Text as NativeText, Image as NativeImage, ScrollView as NativeScrollView, TouchableOpacity as NativeTouchableOpacity, Dimensions } from 'react-native';
import {  AntDesign, Fontisto } from '@expo/vector-icons';
import { styled } from "nativewind";
import { FormatPrice } from "../functions/FormatPrice";


const View = styled(NativeView);
const ScrollView = styled(NativeScrollView);
const Modal = styled(NativeModal);
const Text = styled(NativeText);
const Image = styled(NativeImage);
const TouchableOpacity = styled(NativeTouchableOpacity);

const ProductModal = ({ visible, onClose, product }) => {
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth - 32;

  useEffect(() => {
    if (product?.image) {
      NativeImage.getSize(product.image, (width, height) => {
        setImageAspectRatio(width / height);
      }, (error) => {
        console.error('Error loading product image:', error);
      });
    }
  }, [product?.image]);

  const handleLongImageLoad = (imageUrl) => {
    NativeImage.getSize(imageUrl, (width, height) => {
      // 이미지의 실제 비율 계산
      const actualAspectRatio = width / height;
      setImageAspectRatio(actualAspectRatio);
    }, (error) => {
      console.error('Error loading long image:', error);
    });
  };

  if (!product) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(68, 63, 61, 0.6)' }}>
        <View className="w-full h-[58%] bg-white rounded-lg">
          <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
            {/* Top Image */}
            <View className="w-full h-[35vh] flex justify-center items-center rounded-lg">
              <Image
                source={{ uri: product.image }}
                style={{ 
                  width: '100%', 
                  height: '90%', 
                  resizeMode: 'contain'
                }}
              />
            </View>

            {/* Product Info */}
            <View className='flex flex-col justify-center items-start'>
              <View className='w-full flex flex-col justify-center items-start border-y-[1px] border-gray-300 p-2 rounded-xl'>
                <Text className="text-2xl font-Pretendard-Medium">{product.name}</Text>
                <Text className="text-xl font-Pretendard-Medium text-gray-700">{product.description}</Text>
                <Text className="text-2xl font-extrabold">{FormatPrice(product.price)}</Text>
              </View>

              {/* 긴 이미지 */}
              <View className="w-full">
                {/* 제품 정보 with Arrow */}
                <View className='flex-col justify-center items-center py-4 gap-y-2'>
                  <Text className='font-Pretendard-Medium text-3xl text-black'>제품 정보</Text>
                  <Fontisto name="caret-down" size={24} color="black" />
                </View>
                {/* Product Detail Image */}
                <Image
                  source={{ uri: product.product_detail_url }}
                  style={{
                    width: containerWidth,
                    height: containerWidth / imageAspectRatio,
                    resizeMode: 'contain'
                  }}
                  className="rounded-lg self-center"
                  onLoad={() => handleLongImageLoad(product.product_detail_url)}
                />
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity onPress={onClose} className="absolute top-2 right-3">
            <AntDesign name="close" size={35} color="#585e58" />  
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductModal;
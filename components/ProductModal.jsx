import React, { useRef, useState, useEffect } from 'react';
import { Modal as NativeModal, View as NativeView, Text as NativeText, Image as NativeImage, ScrollView as NativeScrollView, TouchableOpacity as NativeTouchableOpacity, Dimensions } from 'react-native';
import {  AntDesign, MaterialIcons } from '@expo/vector-icons';
import { styled } from "nativewind";
import { FormatPrice } from "../components/FormatPrice";


const View = styled(NativeView);
const ScrollView = styled(NativeScrollView);
const Modal = styled(NativeModal);
const Text = styled(NativeText);
const Image = styled(NativeImage);
const TouchableOpacity = styled(NativeTouchableOpacity);

const ProductModal = ({ visible, onClose, product }) => {
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth - 32; // padding 좌우 16px씩 제외

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
        <View className="w-full h-[70%] bg-white rounded-lg p-4">
          <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
            {/* Top Image */}
            <View className="w-full h-[35vh] flex justify-center items-center">
              <Image
                source={{ uri: product.image }}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  resizeMode: 'contain' 
                }}
              />
            </View>
            {/* Product Info */}
            <View className='flex flex-col justify-center items-start gap-y-2 py-2'>
              <Text className="text-2xl font-Pretendard-Medium">{product.name}</Text>
              <Text className="text-2xl font-Pretendard-Medium">{FormatPrice(product.price)}</Text>
              <Text className="text-xl font-Pretendard-Medium text-gray-700">{product.description}</Text>
            </View>

            {/* 긴 이미지 */}
            <View className="w-full border-t-4 border-gray-300">
              {/* 제품 정보 with Arrow */}
              <View className='flex-row justify-center items-center py-4'>
                <AntDesign name="arrowdown" size={30} color="black" />
                <Text className='font-Pretendard-Medium text-4xl text-red-500'>제품 정보</Text>
                <AntDesign name="arrowdown" size={30} color="black" />
              </View>
              {/* Product Detail Image */}
              <Image
                source={{ uri: "https://shop-phinf.pstatic.net/20221118_298/1668745369592QRKQO_JPEG/%EC%BF%A0%EC%BD%94%EC%9D%B4%EB%8B%A8.JPG?type=w860" }}
                style={{
                  width: containerWidth,
                  height: containerWidth / imageAspectRatio,
                  resizeMode: 'contain'
                }}
                className="rounded-lg self-center"
                onLoad={() => handleLongImageLoad("https://shop-phinf.pstatic.net/20221118_298/1668745369592QRKQO_JPEG/%EC%BF%A0%EC%BD%94%EC%9D%B4%EB%8B%A8.JPG?type=w860")}
              />
            </View>
          </ScrollView>

          <TouchableOpacity onPress={onClose} className="absolute top-2 left-3">
            <MaterialIcons name="arrow-back-ios" size={35} color="#707070" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductModal;
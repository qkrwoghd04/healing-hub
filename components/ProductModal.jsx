import React from 'react';
import { Modal, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FormatPrice } from '../components/FormatPrice';
import { Entypo } from '@expo/vector-icons';

const ProductModal = ({ visible, onClose, product }) => {
  if (!product) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(68, 63, 61, 0.6)' }}>
        <View className="w-full bg-white rounded-lg p-4">
          <ScrollView>
            {/* 확대된 이미지 */}
            <View className="w-full h-[40vh] flex justify-center items-center mb-4">
              <Image
                source={{ uri: product.image }}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                className="rounded-lg"
              />
            </View>

            {/* 상품 정보 */}
            <Text className="text-2xl mb-2 font-Pretendard-Medium">상품 정보: {product.name}</Text>
            <Text className="text-xl mb-2 font-Pretendard-Medium">가격: {FormatPrice(product.price)}</Text>
            <Text className="text-lg text-gray-600 font-Pretendard-Medium">{product.description}</Text>
          </ScrollView>

          {/* 닫기 버튼 */}
          <TouchableOpacity onPress={onClose} className="absolute top-2 right-2">
            <Entypo name="cross" size={40} color="gray"/>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductModal;

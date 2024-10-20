import React, { useState, useEffect, useRef } from 'react'
import { View as NativeView, Text as NativeText, Image as NativeImage, ScrollView as NativeScrollView, Animated, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { styled } from "nativewind";

//Components
import { FormatPrice } from './functions/FormatPrice'
import ProductModal from './modals/ProductModal';
import { sortProductsByPopularity } from './functions/sortProductsByPopularity'

const View = styled(NativeView);
const ScrollView = styled(NativeScrollView);
const Text = styled(NativeText);
const Image = styled(NativeImage);


const ProductSlide = ({ item, onPress }) => (
  <View className="flex">
    <TouchableOpacity onPress={onPress} >
      <View className='flex flex-col justify-center items-center w-[15vh] h-[30vh] rounded-lg'>
        {/* Image */}
        <View className='w-full h-1/2 flex justify-center items-center'>
          <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} className="border border-gray-300 rounded-lg" />
        </View>

        <View className='w-full h-1/2 p-2'>
          <Text className='text-xl mb-2 font-pretendard-light' numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text className='text-gray-600 mb-2 font-pretendard-light' numberOfLines={2} ellipsizeMode="tail">
            {item.description}
          </Text>
          <Text className='text-xl text-black font-Pretendard-Medium'>
            {FormatPrice(item.price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

const HotProductScroll = ({products = []}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // products가 없을 경우를 대비한 방어 코드 추가
  const filteredProducts = products ? sortProductsByPopularity(products).slice(0,10) : [];

  const opacity = useRef(new Animated.Value(1)).current; // Initial opacity is set to 1 (fully visible)

  useEffect(() => {
    // Start blinking effect by animating the opacity between 1 and 0
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,  // Fade out
          duration: 400, // 500ms duration for fade-out
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,  // Fade in
          duration: 400, // 500ms duration for fade-in
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  return (
    <View className="w-full h-[38%] rounded-md">
      <View className="flex flex-row justify-start items-center pl-4" >
        <Animated.Text
          style={{ opacity }} // Apply the animated opacity value
          className="text-2xl font-Pretendard-Medium mr-2 text-yellow-600"
        >
          인기 상품
        </Animated.Text>
        <FontAwesome name="thumbs-o-up" size={24} color="black" />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 20 }}
      >
        {filteredProducts.map((item) => (
          <ProductSlide key={item.id} item={item} onPress={() => openModal(item)} />
        ))}
      </ScrollView>

      {/* Modal for Product Details */}
      <ProductModal visible={modalVisible} onClose={closeModal} product={selectedProduct} />
    </View>
  )
}

export default HotProductScroll
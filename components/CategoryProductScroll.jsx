import React, { useState, useEffect } from 'react'
import { useProducts } from '../api/ProductContext';
import { View as NativeView, Text as NativeText, Image as NativeImage, ScrollView as NativeScrollView, TouchableOpacity as NativeTouchableOpacity} from 'react-native';
import { FormatPrice } from '../components/FormatPrice'
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind'

//Components
import ProductModal from './ProductModal';

const View = styled(NativeView)
const Text = styled(NativeText)
const Image = styled(NativeImage)
const ScrollView = styled(NativeScrollView)
const TouchableOpacity = styled(NativeTouchableOpacity)

const CategoryProductScroll = () => {
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    if (products.length > 0) {
      setSelectedCategory(products[0].category);
    }
  }, [products]);

  // 상품을 popularity 순으로 정렬하는 함수
  const sortProductsByPopularity = (items) => {
    const popularityOrder = { High: 1, Medium: 2, Low: 3 };
    return items.sort((a, b) => popularityOrder[a.popularity] - popularityOrder[b.popularity]);
  };

  // 선택된 카테고리에 맞는 상품 필터링
  const filteredProducts = selectedCategory
    ? sortProductsByPopularity(products.filter(item => item.category === selectedCategory))
    : [];

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  return (
    <View className="w-full h-[45%] rounded-md gap-2 flex flex-col justify-center items-start">
      {/* Title */}
      <View className="flex flex-row justify-start items-center pl-4">
        <Text className="text-3xl font-Pretendard-Medium pr-2">고객님들이 선택한 상품</Text>
        <Ionicons name="bag-check-outline" size={24} color="black" />
      </View>
      {/* 카테고리 스크롤바 */}
      <View className="w-full h-10">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 15,
          }}
          className='w-full h-full'
        >
          {Array.from(new Set(products.map(item => item.category))).reverse().map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCategory(category)}
              className={`flex flex-row items-center bg-white rounded-md p-2 border ${selectedCategory === category ? 'bg-gray-700' : 'border-gray-400'}`}
            >
              <Text className={`${selectedCategory === category ? 'text-white' : 'text-gray-700'} text-[20px]`}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 선택된 카테고리의 상품 목록 */}
      {selectedCategory && (
        <View className='w-full h-[70%]'>
          <ScrollView className='w-full h-full gap-y-2' contentContainerStyle={{ paddingHorizontal: 20 }}>
            {filteredProducts.slice(0, 3).map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => openModal(item)}
                className="flex-row justify-start items-center rounded-md gap-x-4"
              >
                {/* Product Number */}
                <View className='flex flex-col justify-center items-center'>
                  <Text className="text-xl font-Pretendard-Medium text-gray-800">{index + 1}</Text>
                  <View className='w-2 h-1 bg-gray-600'></View>
                </View>
                {/* Product Image */}
                <View className='bg-white w-16 h-16'>
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-full rounded-md"
                  />
                </View>
                {/* Product Info */}
                <View className='flex flex-col justify-between w-[70%]'>
                  <Text className="text-xl font-pretendard-light" numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                  <Text className="text-l font-pretendard-light" numberOfLines={1} ellipsizeMode="tail">{item.description}</Text>
                  <Text className="text-xl">{FormatPrice(item.price)}</Text>
                </View>
              </TouchableOpacity>
            ))}

          </ScrollView>
        </View>
      )}
      {/* Modal Detail */}
      <ProductModal visible={modalVisible} onClose={closeModal} product={selectedProduct} />
    </View>
  )
}

export default CategoryProductScroll
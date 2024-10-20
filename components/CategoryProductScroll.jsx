import React, { useState, useEffect } from 'react'
import { View as NativeView, Text as NativeText, Image as NativeImage, ScrollView as NativeScrollView, TouchableOpacity as NativeTouchableOpacity } from 'react-native';
import { FormatPrice } from './functions/FormatPrice'
import { FontAwesome6} from '@expo/vector-icons';
import { styled } from 'nativewind'

// Components
import ProductModal from './modals/ProductModal';
import { sortProductsByPopularity } from './functions/sortProductsByPopularity'

// For tailwind
const View = styled(NativeView)
const Text = styled(NativeText)
const Image = styled(NativeImage)
const ScrollView = styled(NativeScrollView)
const TouchableOpacity = styled(NativeTouchableOpacity)

const CategoryProductScroll = ({products = []}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); 

  useEffect(() => {
    if (products.length > 0) {
      const categories = Array.from(new Set(products.map(item => item.category))).reverse();
      setSelectedCategory(categories[0]); // Set the first category after reverse
    }
  }, [products]);

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
      {/* 상단 제목 */}
      <View className="flex flex-row justify-start items-center pl-4">
        <Text className="text-2xl font-Pretendard-Medium pr-2">카테고리 순위</Text>
        <FontAwesome6 name="ranking-star" size={24} color="black" />
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
              className={`flex flex-row items-center bg-white rounded-md p-2 border ${selectedCategory === category ? 'bg-[#20284F]' : 'border-gray-400'}`}
            >
              <Text className={`${selectedCategory === category ? 'text-white' : 'text-gray-700'} text-[15px]`}>{category}</Text>
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
                  <Text className={`text-2xl font-Pretendard-Medium ${ index===0 ? "text-[#AE9717]" : (index === 1 ? "text-[#7A7879]" : "text-[#AA5F30]")}`}>{index + 1}</Text>
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
import React, { useState } from 'react'
import { useProducts } from '../api/ProductContext';
import { View, Text, Image, ScrollView} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

//Components
import { FormatPrice } from '../components/FormatPrice'
import ProductModal from './ProductModal';
import { TouchableOpacity } from 'react-native';

const ProductSlide = ({ item, onPress }) => (
  <View className="flex">
    <TouchableOpacity onPress={onPress} >
      <View className='flex flex-col justify-center items-center w-[15vh] h-[30vh] rounded-lg'> 
        {/* Image */}
        <View className='w-full h-1/2 flex justify-center items-center'>
          <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%', resizeMode: 'cover'}} className="border border-gray-300 rounded-lg" />
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

const HotProductScroll = () => {
  const { products } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

   // popularity가 "High", "Medium", "Low" 순서로 필터링하여 최대 10개 선택
  const getFilteredProducts = () => {
    const highPopularityProducts = products.filter(item => item.popularity === "High");
    const mediumPopularityProducts = products.filter(item => item.popularity === "Medium");
    const lowPopularityProducts = products.filter(item => item.popularity === "Low");

    // 최종 상품 배열
    let selectedProducts = [...highPopularityProducts];

    // High로 10개가 안 채워지면 Medium에서 추가
    if (selectedProducts.length < 10) {
      selectedProducts = [...selectedProducts, ...mediumPopularityProducts.slice(0, 10 - selectedProducts.length)];
    }

    // High와 Medium으로 10개가 안 채워지면 Low에서 추가
    if (selectedProducts.length < 10) {
      selectedProducts = [...selectedProducts, ...lowPopularityProducts.slice(0, 10 - selectedProducts.length)];
    }

    return selectedProducts.slice(0, 10); // 최종적으로 최대 10개 선택
  };

  const filteredProducts = getFilteredProducts();

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  return (
    <View className="w-full h-[40%] rounded-md">
      <View className="flex flex-row justify-start items-center pb-2 pl-4" >
        <Text className="text-3xl font-Pretendard-Medium mr-2">매장 인기 상품</Text>
        <FontAwesome name="thumbs-o-up" size={24} color="black" />
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 20}}
        >
        {filteredProducts.map((item) => (
          <ProductSlide key={item.id} item={item} onPress={() => openModal(item)} />
        ))}
      </ScrollView>

      {/* Modal for Product Details */}
      <ProductModal visible={modalVisible} onClose={closeModal} product={selectedProduct}/>
    </View>
  )
}

export default HotProductScroll
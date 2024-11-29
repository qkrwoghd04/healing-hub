import React, { useState } from 'react';
import { TextInput, View, Alert, ScrollView, Pressable, Text } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { useProducts } from './ProductContext';
import { Product } from '@/types/Product'
import { Image } from 'expo-image'

import { FormatPrice } from './functions/FormatPrice';
import  ProductModal  from '@/components/modals/AdminProductModal'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { products, removeProduct } = useProducts();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  const filteredProducts = () => {
    if (!searchQuery) return [];
    return products.filter((product: Product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setModalVisible(true);
  };

  const confirmRemoveProduct = (id: string) => {
    if (products.length > 1) {
      Alert.alert('상품 삭제', '상품을 삭제하시겠습니까?', [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          onPress: async () => {
            try {
              await removeProduct(id);
              Alert.alert('삭제 완료', '상품이 삭제되었습니다.');
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('오류', '상품 삭제에 실패했습니다.');
            }
          },
        },
      ]);
    } else {
      Alert.alert('최소 개수 초과', '최소 1개의 상품은 존재해야 합니다.');
    }
  };
  
  return (
    <View className='flex-1 relative'>
      <View className="flex-row p-1 mx-2 justify-center items-center rounded-md z-10 h-[50px]">
        <Feather name="search" size={24} color="gray" className="ml-5" />
        <TextInput
          placeholder="상품을 검색하세요"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => setSearchQuery(query)}
          className="flex-1 ml-3"
        />
      </View>


      <View className="absolute top-[50px] z-20 w-full bg-white pl-6">
        <ScrollView>
          {filteredProducts().map((product: Product) => (
            <View
              key={product.id}
              className="w-full h-20 flex flex-row justify-start items-center my-1 border-b-[0.5px] border-gray-300">
              <Pressable onPress={() => handleEditProduct(product)} className='w-full h-20 flex-row justify-start items-center'>
                {/* Product Image */}
                <View className="w-[15%] h-full mr-2">
                  <Image
                    source={{ uri: product.image }}
                    style={{
                      width: "100%",
                      height: "100%"
                    }}
                  />
                </View>

                {/* Product Info */}
                <View className="w-[70%] h-full flex justify-center items-start border-l-[0.5px] border-gray-700 px-2">
                  <Text className="font-Pretendard-Medium mb-2">{product.name}</Text>
                  <Text>{FormatPrice(product.price)}</Text>
                </View>
              </Pressable>

                {/* Delete Button */}
                <Pressable onPress={() => confirmRemoveProduct(product.id)}>
                  <Entypo name="cross" size={30} color="gray" />
                </Pressable>
            </View>
          ))
          }
        </ScrollView>
      </View>

      {/* 기존 컨텐츠 영역 */}
      <View className="w-full h-full border-b-[1px] border-gray-400">
        <ScrollView className="w-full h-full mx-2">
          <View className='w-full h-full'>
            <Text className='text-2xl'>안녕하세요</Text>
          </View>
        </ScrollView>
      </View>
      <ProductModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible}
        editingProduct={editingProduct}
      />
    </View>
  );
};

export default SearchBar;
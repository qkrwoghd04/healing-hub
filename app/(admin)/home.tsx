import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Image } from 'expo-image'
import { Alert } from 'react-native';
import { useProducts } from '../../components/ProductContext';
import { Entypo, Feather } from '@expo/vector-icons';

// Components
import Header from '../../components/Header';
import { FormatPrice } from '../../components/functions/FormatPrice';
import AddProductModal from '../../components/modals/AddProductModal';
import SearchBar from '../../components/SearchBar';

//type
import { Product } from '../../types/Product'

const AdminHome = () => {
  const { products, removeProduct } = useProducts();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product:Product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearch = (query:string) => {
    setSearchQuery(query);
  };

  const confirmRemoveProduct = (id:string) => {
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
    <SafeAreaView className="w-full h-full bg-white">
      {/* Header */}
      <Header
        name="Admin Home"
        icon={<Feather name="home" size={30} color="black" />}
        route="/(tabs)"
      />

      {/* SearchBar Component */}
      <SearchBar
        searchQuery={searchQuery}
        onSearch={handleSearch}
        style={{paddingHorizontal: 8, paddingVertical:8, borderWidth: 1, borderRadius: 10, margin: 8}}
      />
      {/* Product List */}
      <View className="w-full h-[74%] border-b-[1px] border-gray-400">
        <ScrollView className="w-full h-full mx-2">
          {filteredProducts.map((product:Product) => (
            <View
              key={product.id}
              className="w-full h-16 flex flex-row justify-start items-center my-1">
              {/* Product Image */}
              <View className="w-[15%] h-full mr-2">
                <Image source={{ uri: product.image }} className="w-full h-full rounded-lg" />
              </View>

              {/* Product Info */}
              <View className="w-[70%] h-full flex justify-center items-start border-l-[0.5px] border-gray-700 px-2">
                <Text className="font-Pretendard-Medium mb-2">{product.name}</Text>
                <Text>{FormatPrice(product.price)}</Text>
              </View>

              {/* Delete Button */}
              <TouchableOpacity onPress={() => confirmRemoveProduct(product.id)}>
                <Entypo name="cross" size={30} color="gray" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Add Button */}
      <TouchableOpacity
        className="absolute bottom-3 right-5 bg-[#20284F] p-2 rounded-lg"
        onPress={() => setModalVisible(true)}>
        <Text className="text-xl text-white font-pretendard-light">상품 추가</Text>
      </TouchableOpacity>

      {/* Product Modal */}
      <AddProductModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

export default AdminHome;

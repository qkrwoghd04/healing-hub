import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert, TextInput } from 'react-native';
import { useProducts } from '../../api/ProductContext';
import { Entypo } from '@expo/vector-icons';

// Components
import AdminHeader from '../../components/AdminHeader';
import { FormatPrice } from '../../components/FormatPrice';
import AddProductModal from '../../components/AddProductModal';

const AdminHome = () => {
  const { products, addNewProduct, removeProduct } = useProducts();
  const [modalVisible, setModalVisible] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductPopularity, setNewProductPopularity] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('');
  const [newProductDetail, setNewProductDetail] = useState('');
  const [newProductImage, setNewProductImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Search logic to filter products based on searchQuery
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const addProduct = async () => {
    if (!newProductName || !newProductPrice || !newProductImage || !newProductDetail) {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProductName);
    formData.append('price', newProductPrice);
    formData.append('description', newProductDetail);
    formData.append('category', newProductCategory);
    formData.append('popularity', newProductPopularity);
    formData.append('image', {
      uri: newProductImage.uri,
      type: 'image/jpeg',
      name: 'product.jpg',
    });

    try {
      await addNewProduct(formData);
      resetForm();
      setModalVisible(false);
      Alert.alert('성공', '새 상품이 추가되었습니다.');
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('오류', '상품 추가에 실패했습니다.');
    }
  };

  const resetForm = () => {
    setNewProductName('');
    setNewProductPrice('');
    setNewProductDetail('');
    setNewProductImage(null);
  };

  const confirmRemoveProduct = (id) => {
    if (products.length > 1) {
      Alert.alert(
        '상품 삭제',
        '상품을 삭제하시겠습니까?',
        [
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
        ]
      );
    } else {
      Alert.alert('최소 개수 초과', '최소 1개의 상품은 존재해야 합니다.');
    }
  };

  return (
    <SafeAreaView className="w-full h-full">
      {/* Header */}
      <AdminHeader />

      {/* Search Input */}
      <View>
        <TextInput
          placeholder='Search'
          clearButtonMode='always'
          autoCapitalize='none'
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
          className="px-4 py-2 border-2 border-gray-400 rounded-lg m-2"
        />
      </View>

      {/* Product List */}
      <View className="w-full h-[80%] border-b-[1px] border-gray-400">
        <ScrollView className="w-full h-full mx-2">
          {filteredProducts.map((product) => (
            <View key={product.id} className="w-full h-16 flex flex-row justify-start items-center my-1">
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
                <Entypo name="cross" size={30} color="gray"/>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Add Button */}
      <TouchableOpacity className="absolute bottom-10 right-5 bg-[#45403D] p-2 rounded-lg" onPress={() => setModalVisible(true)}>
        <Text className="text-xl text-white font-pretendard-light">상품 추가</Text>
      </TouchableOpacity>

      {/* Product Modal */}
      <AddProductModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newProductImage={newProductImage} // Image
        newProductName={newProductName} // Product Name
        setNewProductName={setNewProductName}
        newProductPrice={newProductPrice} // Product Price
        setNewProductPrice={setNewProductPrice}
        newProductPopularity={newProductPopularity} // Product 인기도
        setNewProductPopularity={setNewProductPopularity}
        newProductCategory={newProductCategory} // Product 카테고리
        setNewProductCategory={setNewProductCategory}
        newProductDetail={newProductDetail} // Product Description
        setNewProductDetail={setNewProductDetail}
        addProduct={addProduct} // Add Product Function
      />
    </SafeAreaView>
  );
};

export default AdminHome;

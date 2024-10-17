import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, SafeAreaView, Alert, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { useProducts } from '../../api/ProductContext';
import * as ImagePicker from 'expo-image-picker';
import { Entypo, Octicons } from '@expo/vector-icons';


//Components
import AdminHeader from '../../components/AdminHeader'
import { FormatPrice } from '../../components/FormatPrice'

const AdminHome = () => {
  const { products, addNewProduct, removeProduct } = useProducts();
  const [modalVisible, setModalVisible] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductShortName, setNewProductShortName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductDetail, setNewProductDetail] = useState('');
  const [newProductPopularity, setNewProductPopularity] = useState('');
  const [newProductImage, setNewProductImage] = useState(null);


  //
  const addProduct = async () => {
    if (!newProductName || !newProductPrice || !newProductImage || !newProductDetail) {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProductName);
    formData.append('price', newProductPrice);
    formData.append('description', newProductDetail);
    formData.append('shortName', newProductShortName);
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
    setNewProductShortName('');
    setNewProductPrice('');
    setNewProductDetail('');
    setNewProductPopularity('');
    setNewProductImage(null);
  };

  const confirmRemoveProduct = (id) => {
    if (products.length > 1) {
      Alert.alert(
        "상품 삭제",
        "상품을 삭제하시겠습니까?",
        [
          { text: "취소", style: "cancel" },
          {
            text: "삭제",
            onPress: async () => {
              try {
                await removeProduct(id);
                Alert.alert("삭제 완료", "상품이 삭제되었습니다.");
              } catch (error) {
                console.error('Error deleting product:', error);
                Alert.alert("오류", "상품 삭제에 실패했습니다.");
              }
            }
          }
        ]
      );
    } else {
      Alert.alert('최소 개수 초과', '최소 1개의 상품은 존재해야합니다.');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setNewProductImage(result.assets[0]);
    }
  };


  return (
    <SafeAreaView className="w-full h-full">
      {/* Header */}
      <AdminHeader />
      {/* Product Info */}
      <ScrollView className="w-full h-full mx-2">
        {products.map((product) => (
          <View key={product.id} className="w-full h-[40%] flex flex-row justify-start items-center my-1">
            {/* Product Container */}
            <View className="w-[15%] h-full">
              <Image
                source={{ uri: product.image }}
                className="w-full h-full rounded-lg"
              />
            </View>

            {/* Product Info */}
            <View className="w-[70%] h-full flex justify-between items-start border-x-[0.3px] px-1 mx-1">
              <Text className="font-Pretendard-Medium">{product.name}</Text>
              <Text>{FormatPrice(product.price)}</Text>
            </View>
            {/* Delete Button */}
            <TouchableOpacity onPress={() => confirmRemoveProduct(product.id)}>
              <Entypo name="cross" size={30} color="gray" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity className="w-12 h-12 absolute bottom-10 right-5 bg-gray-600 flex justify-center items-center rounded-lg" onPress={() => setModalVisible(true)}>
        <Octicons name="diff-added" size={35} color="white" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(68, 63, 61, 0.6)' }}>
            <View className="bg-white rounded-lg w-[90%] h-[60%] p-4 flex flex-col justify-between items-center">
              {/* Modal Header */}
              <View className="w-full h-1/4 flex flex-row justify-start items-center gap-x-2">
                <TouchableOpacity className="flex justify-center items-center rounded-lg w-[30%] h-full border-[1.5px] border-gray-400" onPress={pickImage}>
                  {newProductImage ? (
                    <Image source={{ uri: newProductImage.uri }} className="w-full h-full rounded-lg" />
                  ) : (
                    <Text className="text-[#847958] text-[16px] font-Pretendard-Medium">이미지 선택</Text>
                  )}
                </TouchableOpacity>

                <View className="flex flex-col justify-between items-center w-[65%] h-full gap-y-2">
                  <TextInput
                    className="bg-white w-full h-[40%] rounded-lg border-[1.5px] border-gray-400 p-2"
                    placeholder="제품명"
                    value={newProductName}
                    onChangeText={setNewProductName}
                  />
                  <TextInput
                    className="bg-white w-full h-[40%] rounded-lg border-[1.5px] border-gray-400 p-2"
                    placeholder="가격"
                    value={newProductPrice}
                    onChangeText={setNewProductPrice}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Modal Body */}
              <View className="w-full h-2/4 border-2 border-gray-200 rounded-md">
                <TextInput
                  className="w-full p-2"
                  placeholder="상품 상세 설명"
                  value={newProductDetail}
                  onChangeText={setNewProductDetail}
                  multiline
                />
                
              </View>
              
              {/* Modal Bottom */}
              <View className="flex flex-row justify-between items-center w-full h-[10%]">
                <TouchableOpacity className="bg-[#847958] flex-1 h-[90%] justify-center items-center rounded-md mr-1" onPress={addProduct}>
                  <Text className="text-white text-xl font-Pretendard-Medium">추가</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#954F4C] flex-1 h-[90%] justify-center items-center rounded-md ml-1" onPress={() => setModalVisible(false)}>
                  <Text className="text-white text-xl font-Pretendard-Medium">취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminHome;
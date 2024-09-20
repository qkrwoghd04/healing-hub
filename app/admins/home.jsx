import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, SafeAreaView, Alert, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { useProducts } from '../contexts/ProductContext';
import * as ImagePicker from 'expo-image-picker';

const AdminHome = () => {
  const { products, addNewProduct, removeProduct } = useProducts();
  const [modalVisible, setModalVisible] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductDetail, setNewProductDetail] = useState('');
  const [newProductImage, setNewProductImage] = useState(null);
  const router = useRouter();

  const addProduct = async () => {
    if (products.length < 13) {
      if (!newProductName || !newProductPrice || !newProductImage || !newProductDetail) {
        Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
        return;
      }

      const formData = new FormData();
      formData.append('name', newProductName);
      formData.append('price', newProductPrice);
      formData.append('description', newProductDetail);
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
    } else {
      Alert.alert('최대 개수 초과', '최대 12개의 상품만 등록할 수 있습니다.');
    }
  };

  const resetForm = () => {
    setNewProductName('');
    setNewProductPrice('');
    setNewProductDetail('');
    setNewProductImage(null);
  };

  const confirmRemoveProduct = (id) => {
    if(products.length > 1){
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
      quality: 1,
    });

    if (!result.canceled) {
      setNewProductImage(result.assets[0]);
    }
  };

  const navigateToHome = () => {
    router.push('/(tabs)');
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>관리자 홈</Text>
        <TouchableOpacity onPress={navigateToHome} style={styles.homeButton}>
          <Image source={require('../../assets/icons/home.png')} style={styles.homeIcon} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {products.map((product) => (
            <View key={product.id} style={styles.productContainer}>
            <Image 
              source={{ uri: product.image }}
              style={styles.productImage} 
            />
            <View style={styles.verticalLine} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
            </View>
            <TouchableOpacity onPress={() => confirmRemoveProduct(product.id)} style={styles.deleteButton}>
              <Image source={require('../../assets/icons/delete.png')} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
          ))}
        </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>상품 추가</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {newProductImage ? (
                  <Image source={{ uri: newProductImage.uri }} style={styles.newProductImage} />
                ) : (
                  <Text style={styles.imagePickerText}>이미지 선택</Text>
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="제품명"
                value={newProductName}
                onChangeText={setNewProductName}
              />
              <TextInput
                style={styles.input}
                placeholder="가격"
                value={newProductPrice}
                onChangeText={setNewProductPrice}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="상품 상세 설명"
                value={newProductDetail}
                onChangeText={setNewProductDetail}
                multiline
              />
              <TouchableOpacity style={styles.modalButton} onPress={addProduct}>
                <Text style={styles.modalButtonText}>추가</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ede6',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#443F3D',
    fontFamily: 'Typography-Times-Regular',
  },
  homeButton: {
    padding: 8,
    borderRadius: 10,
  },
  homeIcon: {
    width: 24,
    height: 24,
    tintColor: '#443F3D',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  container: {
    padding: 20,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  verticalLine: {
    height: '80%',
    width: 1,
    backgroundColor: 'rgba(132, 121, 88, 0.2)', // #847958 with 20% opacity
    marginHorizontal: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#443F3D',
    marginBottom: 4,
    fontFamily: 'Pretendard-Medium',
  },
  productPrice: {
    fontSize: 16,
    color: '#847958',
    fontFamily: 'Pretendard-Medium',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
  deleteIcon: {
    width: 25,
    height: 25,
    tintColor: '#954F4C',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#954F4C',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#4299E1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    marginBottom: 25
  },
  addIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
    marginRight: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Pretendard-Medium',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(68, 63, 61, 0.6)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: '#847958',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  imagePickerText: {
    color: '#847958',
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
  },
  newProductImage: {
    width: '100%',
    height: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e9ede6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    fontFamily: 'Pretendard-Medium',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButton: {
    backgroundColor: '#847958',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButton: {
    backgroundColor: '#954F4C',
    marginTop: 12,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Pretendard-Medium',
  },
});

export default AdminHome;
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, SafeAreaView, Alert, Modal, TouchableWithoutFeedback, Keyboard  } from 'react-native';
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
    if (products.length < 10) {
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
      Alert.alert('최대 개수 초과', '최대 10개의 상품만 등록할 수 있습니다.');
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>관리자 홈</Text>
            <TouchableOpacity onPress={navigateToHome}>
              <Image source={require('../../assets/icons/home.png')} style={styles.homeIcon} />
            </TouchableOpacity>
          </View>
          {products.map((product) => (
            <View key={product.id} style={styles.productContainer}>
              <Image 
                source={{ uri: product.image }}
                style={styles.productImage} 
              />
              <Text style={styles.productText}>{product.name}</Text>
              <Text style={styles.productText}>{product.price}원</Text>
              <TouchableOpacity onPress={() => confirmRemoveProduct(product.id)}>
                <Image source={require('../../assets/icons/delete.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Image source={require('../../assets/icons/plus.png')} style={styles.icon} />
            <Text style={styles.addButtonText}>상품 추가</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
                  <Text>이미지 선택</Text>
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
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  homeIcon: {
    width: 24,
    height: 24,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addProductContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  newProductImage: {
    width: 98,
    height: 98,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productText: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',  // 모달의 최대 높이를 설정
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  newProductImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AdminHome;

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from '../StyledComponents';
import { Keyboard, StyleSheet, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { useProducts } from '../ProductContext';
import { ProductForm } from '../../types/Product'

interface DropdownItem {
  label: string;
  value: string;
}

const POPULARITY_OPTIONS: DropdownItem[] = [
  { label: '높음', value: 'High' },
  { label: '평범', value: 'Medium' },
  { label: '낮음', value: 'Low' },
];

const CATEGORY_OPTIONS: DropdownItem[] = [
  { label: '비타민 및 미네랄', value: '비타민 및 미네랄' },
  { label: '콜라겐 및 피부건강', value: '콜라겐 및 피부건강' },
  { label: '관절 건강', value: '관절 건강' },
  { label: '소화 및 장 건강', value: '소화 및 장 건강' },
  { label: '면역 강화', value: '면역 강화' },
  { label: '오메가3 및 혈관 건강', value: '오메가3 및 혈관 건강' },
  { label: '다이어트 및 체중 관리', value: '다이어트 및 체중 관리' },
  { label: '기타 건강 보조제', value: '기타 건강 보조제' },
];

interface ProductModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductModal: React.FC<ProductModalProps> = ({ modalVisible, setModalVisible }) => {
  const { addNewProduct } = useProducts();
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    price: '',
    popularity: 'Low', 
    category: '기타건강 보조제', 
    description: '',
    image: null,
  });
  
  const [image, setImage] = useState<string | null>();

  const pickImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:  ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(image);

    if (!image.canceled) {
      setImage(image.assets[0].uri);

      // 이미지 데이터를 formData에 추가
      setFormData(prev => ({
        ...prev,
        image: {
          uri: image.assets[0].uri,
          type: 'image/jpeg',
          name: 'product.jpg'
        }
      }));
    }
  }
  

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      price: '',
      popularity: 'Low', // 기본값
      category: '기타건강 보조제', // 기본값
      description: '',
      image: null,
    });
    setImage(undefined);
  }, []);
  

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const addProduct = useCallback(async () => {
    if (!formData.name || !formData.price || !formData.image || !formData.description) {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
      return;
    }
  
    try {
      await addNewProduct(formData); // ProductContext에서 제공하는 함수 사용
      resetForm();
      setModalVisible(false);
      Alert.alert('성공', '새 상품이 추가되었습니다.');
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('오류', '상품 추가에 실패했습니다.');
    }
  }, [formData, addNewProduct, resetForm, setModalVisible]);
  
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-white rounded-lg w-[90%] h-[60%] p-4 flex flex-col justify-between items-center">
            {/* Modal Header */}
            <View className="w-full h-1/4 flex flex-row justify-start items-center gap-x-2">
              <TouchableOpacity
                className="flex justify-center items-center rounded-lg w-[30%] h-full border-[1.5px] border-gray-400"
                onPress={pickImage}
              >
                {image ? (
                  <Image source={{ uri: image }} className="w-full h-full rounded-lg" />
                ) : (
                  <Text className="text-[#847958] text-[16px] font-Pretendard-Medium">
                    이미지 선택
                  </Text>
                )}
              </TouchableOpacity>

              <View className="flex flex-col justify-between items-center w-[65%] h-full gap-y-2">
                <TextInput
                  className="bg-white w-full h-[40%] rounded-lg border-[1.5px] border-gray-400 p-2"
                  placeholder="제품명"
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                />
                <TextInput
                  className="bg-white w-full h-[40%] rounded-lg border-[1.5px] border-gray-400 p-2"
                  placeholder="가격"
                  value={formData.price}
                  onChangeText={(value) => handleInputChange('price', value)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Dropdowns and Description */}
            <View className="flex flex-col w-full h-2/4 gap-2">
              <View className="flex-2 flex flex-row">
                <View className="flex-[40%] bg-white p-4 rounded-lg border-[1.5px] border-gray-400 mr-2">
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={POPULARITY_OPTIONS}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="인기도"
                    value={formData.popularity}
                    onChange={(item) => handleInputChange('popularity', item.value)}
                  />
                </View>
                <View className="flex-[60%] bg-white p-4 rounded-lg border-[1.5px] border-gray-400">
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={CATEGORY_OPTIONS}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="카테고리"
                    value={formData.category}
                    onChange={(item) => handleInputChange('category', item.value)}
                  />
                </View>
              </View>
              <View className="flex-1 rounded-lg border-[1.5px] border-gray-400">
                <TextInput
                  className="w-full p-2 relative"
                  placeholder="상품 상세 설명"
                  value={formData.description}
                  onChangeText={(value) => handleInputChange('description', value)}
                  multiline
                />
              </View>
            </View>

            {/* Buttons */}
            <View className="flex flex-row justify-between items-center w-full h-[10%]">
              <TouchableOpacity
                className="bg-white flex-1 h-[90%] justify-center items-center rounded-md mr-1 border-[2px] border-gray-800"
                onPress={addProduct}
              >
                <Text className="text-black text-xl font-Pretendard-Medium">추가</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-700 flex-1 h-[90%] justify-center items-center ml-1 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white text-xl font-Pretendard-Medium">취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  placeholderStyle: {
    color: 'gray',
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});

export default ProductModal;
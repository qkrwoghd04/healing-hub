import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Modal, TextInput, TouchableWithoutFeedback, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Keyboard, StyleSheet, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { useProducts } from '../../context/ProductContext';
import { ProductForm, Product } from '../../types/Product';
import CustomButton from '../CustomButton';
import CustomTextInput from '@/components/CustomTextInput'

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
  editingProduct?: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({
  modalVisible,
  setModalVisible,
  editingProduct,
}) => {
  const { addNewProduct, updateProduct } = useProducts();
  const [formData, setFormData] = useState<ProductForm>({
    name: editingProduct?.name || '',
    price: editingProduct ? editingProduct.price.toString() : '',
    popularity: editingProduct?.popularity || 'Low',
    category: editingProduct?.category || '기타 건강 보조제',
    description: editingProduct?.description || '',
    image: editingProduct?.image || '',
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        popularity: editingProduct.popularity,
        category: editingProduct.category,
        description: editingProduct.description,
        image: editingProduct.image,
      });
      setImage(editingProduct.image);
    } else {
      // 새로운 상품 추가 모드일 때 폼 초기화
      resetForm();
    }
  }, [editingProduct]);

  const [image, setImage] = useState<string | undefined>(editingProduct?.image);

  const isEditMode = !!editingProduct;

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      price: '',
      popularity: 'Low', // 기본값
      category: '기타 건강 보조제', // 기본값
      description: '',
      image: '',
    });
    setImage('');
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!formData.name || !formData.price || !formData.image || !formData.description) {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
      return;
    }

    try {
      if (isEditMode && editingProduct) {
        // 수정 모드 - id와 함께 데이터 전달
        await updateProduct(editingProduct.id, {
          name: formData.name,
          price: formData.price,
          popularity: formData.popularity,
          category: formData.category,
          description: formData.description,
          image: formData.image,
        });
        Alert.alert('성공', '상품이 수정되었습니다.');
      } else {
        // 추가 모드
        await addNewProduct(formData);
        Alert.alert('성공', '새 상품이 추가되었습니다.');
      }

      resetForm();
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving product:', error);
      Alert.alert('오류', '상품 저장에 실패했습니다.');
    }
  }, [
    formData,
    addNewProduct,
    updateProduct,
    isEditMode,
    editingProduct,
    resetForm,
    setModalVisible,
  ]);

  const pickImage = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!image.canceled) {
      const uri = image.assets[0].uri;
      console.log('Selected image URI:', uri);
      setImage(uri);
      handleInputChange('image', uri);
    }
  };

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-white rounded-lg w-[90%] h-[460px] p-4 flex flex-col justify-between items-center">
            {/* Modal Header */}
            <View className="w-full h-[140px] flex flex-row justify-start items-center gap-x-2">
              <Pressable
                className="flex justify-center items-center w-[30%] h-full "
                onPressOut={pickImage}>
                {image ? (
                  <Image source={image} style={{ width: '100%', height: '100%', borderRadius: 10, borderWidth: 1, borderColor: '#e8e8e8' }} />
                ) : (
                  <Text className="text-[#847958] text-[16px] font-Pretendard-Medium">
                    이미지 선택
                  </Text>
                )}
              </Pressable>

              <View className="flex flex-col justify-between items-center w-[65%] h-full gap-y-2">
                <CustomTextInput
                  placeholder="제품명"
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                />
                <CustomTextInput
                  placeholder="가격"
                  value={formData.price}
                  onChangeText={(value) => handleInputChange('price', value)}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Dropdowns and Description */}
            <View className="flex flex-col w-full h-[200px] gap-2">
              <View className="flex flex-row">
                <View className="flex-[40%] bg-white p-4">
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
                <View className="flex-[60%] bg-white p-4">
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
              <View className="flex-1">
                <CustomTextInput
                  placeholder="상품 상세 설명"
                  value={formData.description}
                  onChangeText={(value) => handleInputChange('description', value)}
                  multiline
                  height={120}
                />
              </View>
            </View>

            {/* Buttons */}
            <View className="flex flex-row justify-center items-center w-full h-[12%]">
              <View className='flex-1'>
                <CustomButton
                  buttonStyle=" w-[150px] h-16 p-2 border-2 border-blue rounded-lg flex justify-center items-center"
                  textStyle="text-2xl font-Pretendard-Medium text-blue"
                  onPress={() => setModalVisible(false)}
                  text="취소"
                />
              </View>
              <View className='flex-1'>
                <CustomButton
                  buttonStyle="w-[150px] h-16 p-2 bg-blue rounded-lg flex justify-center items-center"
                  textStyle="text-2xl font-Pretendard-Medium color-white"
                  onPress={handleSubmit}
                  text="수정"
                />
              </View>
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

// ProductModal.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const popularity = [
  { label: '높음', value: 'High' },
  { label: '평범', value: 'Medium' },
  { label: '낮음', value: 'Low' },
];

const category = [
  { label: '비타민 및 미네랄', value: '비타민 및 미네랄' },
  { label: '콜라겐 및 피부건강', value: '콜라겐 및 피부건강' },
  { label: '관절 건강', value: '관절 건강' },
  { label: '소화 및 장 건강', value: '소화 및 장 건강' },
  { label: '면역 강화', value: '면역 강화' },
  { label: '오메가3 및 혈관 건강', value: '오메가3 및 혈관 건강' },
  { label: '다이어트 및 체중 관리', value: '다이어트 및 체중 관리' },
  { label: '기타 건강 보조제', value: '기타 건강 보조제' },
];

const ProductModal = ({
  modalVisible,
  setModalVisible,
  newProductImage,
  pickImage,
  newProductName,
  setNewProductName,
  newProductPrice,
  setNewProductPrice,
  newProductPopularity,
  setNewProductPopularity,
  newProductCategory,
  setNewProductCategory,
  newProductDetail,
  setNewProductDetail,
  addProduct,
}) => {

  return (
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
              <TouchableOpacity
                className="flex justify-center items-center rounded-lg w-[30%] h-full border-[1.5px] border-gray-400"
                onPress={pickImage}
              >
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
            <View className="flex flex-col w-full h-2/4 gap-2">
              {/* Dropdown */}
              <View className="flex-2 flex flex-row">
                <View className="flex-[40%] bg-white p-4 rounded-lg border-[1.5px] border-gray-400 mr-2">
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selected={styles.selectedTextStyle}
                    data={popularity}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="인기도"
                    value={null}
                    onChange={item => {
                      setNewProductPopularity(item.value);
                    }}
                  />
                </View>
                <View className="flex-[60%] bg-white p-4 rounded-lg border-[1.5px] border-gray-400">
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selected={styles.selectedTextStyle}
                    data={category}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="카테고리"
                    value={null}
                    onChange={item => {
                      setNewProductCategory(item.value);
                    }}
                  />
                </View>
              </View>
              {/* Description */}
              <View className="flex-1 rounded-lg border-[1.5px] border-gray-400">
                <TextInput
                  className="w-full p-2 relative"
                  placeholder="상품 상세 설명"
                  value={newProductDetail}
                  onChangeText={setNewProductDetail}
                  multiline
                />
              </View>
            </View>

            {/* Modal Bottom */}
            <View className="flex flex-row justify-between items-center w-full h-[10%]">
              <TouchableOpacity
                className="bg-[#847958] flex-1 h-[90%] justify-center items-center rounded-md mr-1"
                onPress={addProduct}
              >
                <Text className="text-white text-xl font-Pretendard-Medium">추가</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#954F4C] flex-1 h-[90%] justify-center items-center rounded-md ml-1"
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

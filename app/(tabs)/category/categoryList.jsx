import React, { useEffect, useState } from 'react';
import {
  Text as NativeText,
  View as NativeView,
  ScrollView as NativeScrollView,
  SafeAreaView as NativeSafeAreaView,
  ActivityIndicator,
  TouchableOpacity as NativeTouchableOpacity,
} from 'react-native';
import { Image as NativeImage } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { EvilIcons } from '@expo/vector-icons';

// API and Context
import { useProducts } from '../../../api/ProductContext';

// components
import { FormatPrice } from '../../../components/functions/FormatPrice';
import ProductModal from '../../../components/modals/ProductModal';

const View = styled(NativeView);
const Text = styled(NativeText);
const Image = styled(NativeImage);
const SafeAreaview = styled(NativeSafeAreaView);
const ScrollView = styled(NativeScrollView);
const TouchableOpacity = styled(NativeTouchableOpacity);

const CategoryList = () => {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const { products, refreshProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // 모달 열기
  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  // Filter products based on selected category
  useEffect(() => {
    setLoading(true);
    const filterByCategory = () => {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
      setLoading(false);
    };

    filterByCategory();
  }, [category, products]);

  // Refresh product data
  useEffect(() => {
    refreshProducts();
  }, []);

  if (loading) {
    return (
      <SafeAreaview className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="56" color="#20284F" />
      </SafeAreaview>
    );
  }

  return (
    <SafeAreaview className="h-full w-full bg-gray-50">
      <View className="w-full h-full">
        {/* Category Title */}
        <View className="bg-black w-full h-[12%] flex flex-row justify-center items-center relative px-4 pt-8">
          <Text className="text-white text-2xl font-Pretendard-Medium text-center">{category}</Text>
          <TouchableOpacity
            className="absolute right-3 top-8"
            onPress={() => router.push('category')}>
            <EvilIcons name="close" size={62} color="white" />
          </TouchableOpacity>
        </View>

        {/* Product List in ScrollView */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <TouchableOpacity key={index} onPress={() => openModal(product)}>
                <View className="bg-white p-4 mb-4 rounded-md shadow-lg border-[1px] border-gray-900">
                  <View className="flex flex-row items-center">
                    <Image
                      source={{
                        uri: product.image,
                      }}
                      className="w-20 h-20 rounded-md mr-4 border-2 border-black bg-black"
                    />
                    <View className="flex-1">
                      <Text
                        className="text-xl font-Pretendard-Medium text-[#20284F]"
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {product.name}
                      </Text>
                      <View className="flex-row items-center">
                        <View className="w-full flex flex-row items-center mt-4">
                          <Text className="text-lg text-[#20284F] font-semibold">
                            {FormatPrice(product.price)}
                          </Text>
                          <Text
                            className="flex-1 text-gray-600"
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {' '}
                            / {product.description}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-lg text-gray-600">No products available in this category.</Text>
            </View>
          )}
        </ScrollView>
      </View>
      {selectedProduct && (
        <ProductModal visible={isModalVisible} onClose={closeModal} product={selectedProduct} />
      )}
    </SafeAreaview>
  );
};

export default CategoryList;

import React, { useMemo, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { EvilIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import  { Image } from 'expo-image';
// API and Context
import { useProducts } from '../../../components/ProductContext';

// components
import { FormatPrice } from '../../../components/functions/FormatPrice';
import ProductModal from '../../../components/modals/ProductModal';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

//type
import { Product } from '../../../types/Product';

const CategoryList = () => {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>();
  const [isModalVisible, setModalVisible] = useState(false);

  // 모달 열기
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  const filteredProducts = useMemo(
    () => products.filter((product: Product) => product.category === category),
    [products, category],
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <SafeAreaView className="h-full w-full bg-gray-50">
      <View className="w-full h-full">
        {/* Category Title */}
        <View className="bg-black w-full h-[12%] flex flex-row justify-center items-center relative px-4 pt-8">
          <Text className="text-white text-2xl font-Pretendard-Medium text-center">{category}</Text>
          <TouchableOpacity
            className="absolute right-3 top-8"
            onPress={() => router.push('/category')}>
            <EvilIcons name="close" size={62} color="white" />
          </TouchableOpacity>
        </View>

        {/* Product List in ScrollView */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product) => (
              <TouchableOpacity key={product.id} onPress={() => openModal(product)}>
                <View className="bg-white p-4 mb-4 rounded-md shadow-lg border-[1px] border-gray-900">
                  <View className="flex flex-row items-center">
                    <Image
                      source={
                        product.image
                      }
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 10,
                        marginRight: 16
                      }}
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
    </SafeAreaView>
  );
};

export default CategoryList;

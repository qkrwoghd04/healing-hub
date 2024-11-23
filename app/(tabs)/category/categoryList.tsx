import React, { useMemo } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
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
import { ErrorMessage } from '../../../components/ErrorMessage';
import { LoadingSpinner } from '../../../components/LoadingSpinner';

//type
import { Product } from '../../../types/Product';
import Header from '@/components/Header';

const CategoryList = () => {
  const { category } = useLocalSearchParams<{category: string}>();
  const { products, loading, error } = useProducts();
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
    <SafeAreaView className="h-full w-full">
      <View className="w-full h-full">
        {/* Category Title */}
          <Header name={category} icon={<EvilIcons name="close" size={62} color="black" />} route="/(tabs)/category"/> 
        {/* Product List in ScrollView */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product) => (
              <TouchableOpacity 
                key={product.id} 
                onPress={() => router.push({
                  pathname: '/modal',
                  params: {
                    id: product.id, 
                    name: product.name, 
                    price: product.price, 
                    description: product.description, 
                    image: product.image, 
                    product_detail_url: product.product_detail_url
                  }
                })}>
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
    </SafeAreaView>
  );
};

export default CategoryList;

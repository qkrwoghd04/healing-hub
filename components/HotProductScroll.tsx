import React, { useEffect, useRef, useCallback, memo } from 'react';
import { Animated } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Text, ScrollView } from 'react-native';
// Types
import { Product } from '../types/Product';

// Components
import ProductSlide from './ProductSlide';
import { sortProductsByPopularity } from './functions/sortProductsByPopularity';

interface HotProductScrollProps {
  products: Product[];
}

const HotProductScroll: React.FC<HotProductScrollProps> = ({ products }) => {
  console.log("[Hot Product] Rendered");
  const sortProductsByPopularityCallback = useCallback(sortProductsByPopularity, [products]);
  const filteredProducts = sortProductsByPopularityCallback(products).slice(0, 10);

  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1.5,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <View className="w-full h-[33%] bg-white rounded-2xl mb-2 shadow-xs">
        {/* Title Content */}
        <View className="flex-row justify-start items-center px-3 py-2">
          <Animated.Text
            style={[
              { opacity }, // Apply the animated opacity value
              {
                fontSize: 24,
                fontWeight: 'medium',
                marginRight: 8,
                color: '#FFC300',
              },
            ]}>
            인기 상품
          </Animated.Text>
          <FontAwesome name="thumbs-o-up" size={24} color="black" style={{marginTop: 5}}/>
        </View>
        {/* 컨텐츠 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12, gap: 20 }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductSlide key={product.id} item={product} />
            ))
          ) : (
            <Text>No products available</Text>
          )}
        </ScrollView>

    </View>
  );
};

export default memo(HotProductScroll);

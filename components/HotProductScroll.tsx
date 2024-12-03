import React, { useEffect, useRef, useCallback, memo } from 'react';
import { Animated } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, ScrollView } from 'react-native';
// Types
//
import { useProducts } from '@/context/ProductContext';

// Components
import ProductSlide from './ProductSlide';
import { sortProductsByPopularity } from './functions/sortProductsByPopularity';

const HotProductScroll = () => {
  console.log('[Hot Product] Rendered');
  const { products } = useProducts();
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
    <View className="w-full h-[33%] bg-white rounded-t-2xl mb-2 shadow-2xl">
      {/* Title Content */}
      <View className="flex-row justify-start items-center px-3 py-2">
        <Animated.Text
          style={[
            { opacity },
          ]}
          className='font-SpoqaMedium text-2xl mr-2 color-[#fcd24a]'
          >
          인기 상품
        </Animated.Text>
        <FontAwesome name="thumbs-o-up" size={24} color="black" style={{ marginTop: 5 }} />
      </View>
      {/* 컨텐츠 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 20 }}
      >
        {filteredProducts.map((product) => <ProductSlide key={product.id} item={product} />)}
      </ScrollView>
    </View>
  );
};

export default memo(HotProductScroll);

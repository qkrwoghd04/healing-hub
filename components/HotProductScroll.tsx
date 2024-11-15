import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Animated } from 'react-native';
import { Image } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, TouchableOpacity, Text, ScrollView } from './StyledComponents';
// Types
import { Product } from '../types/Product';

// Components
import { FormatPrice } from './functions/FormatPrice';
import ProductModal from './modals/ProductModal';
import { sortProductsByPopularity } from './functions/sortProductsByPopularity';

interface HotProductScrollProps {
  products: Product[];
}

const HotProductScroll: React.FC<HotProductScrollProps> = ({ products }) => {
  console.log('HotProduct Rendered');
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [modalVisible, setModalVisible] = useState(false);
  const sortProductsByPopularityCallback = useCallback(sortProductsByPopularity, [products]);
  const filteredProducts = sortProductsByPopularityCallback(products).slice(0, 10);
  
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(undefined);
    setModalVisible(false);
  };
  
  return (
    <View className="w-full h-[38%] rounded-md">
      <View className="flex flex-row justify-start items-center px-4 pb-2">
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
        <FontAwesome name="thumbs-o-up" size={24} color="black" />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 20 }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductSlide 
              key={product.id} 
              item={product} 
              onPress={() => openModal(product)} 
            />
          ))
        ) : (
          <Text>No products available</Text>
        )}

      </ScrollView>

      {/* Modal for Product Details */}
      <ProductModal visible={modalVisible} onClose={closeModal} product={selectedProduct} />
    </View>
  );
};

interface ProductSlideProps {
  item: Product;
  onPress: () => void;
}

const ProductSlide: React.FC<ProductSlideProps> = ({ item, onPress }) => {

  return (
    <View className="flex">
      <TouchableOpacity onPress={onPress}>
        <View className="flex flex-col justify-center items-center w-[15vh] h-[30vh] rounded-lg">
          {/* Image */}
          <View className="w-full h-1/2 flex justify-center items-center">
            <Image
              source={ {uri: item.image }}
              style={{
                width: '100%',
                height: '100%',
                borderWidth: 1,
                borderColor: '#000000',
                borderRadius: 12,
              }}
              contentFit="cover"
            />
          </View>
          <View className="w-full h-1/2 p-2">
            <Text
              className="text-lg mb-2 font-pretendard-light"
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.name}
            </Text>
            <Text
              className="text-gray-600 mb-2 font-pretendard-light"
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.description}
            </Text>
            <Text className="text-lg text-black font-Pretendard-Medium">
              {FormatPrice(item.price)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(HotProductScroll);
import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, ListRenderItem } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Asset } from 'expo-asset'
import { CategoryImgMap } from '../types/Product'
import { FlatGridItem } from './FlatGridItem';


interface FlatGridProductProps {
  dimension: number;
  setName: boolean;
  title: boolean;
  height: string;
}

interface CategoryItem {
  name: string;
  imgKey: string;
}

const FlatGridProduct: React.FC<FlatGridProductProps> = ({ dimension, setName, title, height }) => {
  const [categoryImages, setCategoryImages] = useState<Record<string, Asset[]>>({});

  useEffect(() => {
    const loadImages = async () => {
      const images = {
        비타민_및_미네랄: await Asset.loadAsync(require('../assets/images/vitamin.png')),
        콜라겐_및_피부건강: await Asset.loadAsync(require('../assets/images/collagen.png')),
        소화_및_장_건강: await Asset.loadAsync(require('../assets/images/digestion.png')),
        오메가3_및_혈관_건강: await Asset.loadAsync(require('../assets/images/omega3.png')),
        관절_건강: await Asset.loadAsync(require('../assets/images/joint.png')),
        면역_강화: await Asset.loadAsync(require('../assets/images/immune.png')),
        기타_건강_보조제: await Asset.loadAsync(require('../assets/images/others.png')),
      };
      setCategoryImages(images);
    };

    loadImages();
  }, []);

  const renderItem: ListRenderItem<CategoryItem> = useCallback(({item }) => (
    <FlatGridItem
      name={item.name}
      imgKey={item.imgKey}
      categoryImages={categoryImages}
      setName={setName}
    />
  ), [categoryImages, setName]);

  return (
    <View className={`w-full ${height} bg-white rounded-2xl mb-2 shadow-xs`}>
      {/* Title */}
      {title && (
        <View className="flex-row justify-start items-center px-4 gap-x-2">
          <Text className="text-black text-2xl font-Pretendard-Medium">카테고리별</Text>
          <FontAwesome5 name="capsules" size={24} color="black" />
        </View>
      )}
      {/* FlatGrid */}
      <FlatGrid
        itemDimension={dimension}
        data={CategoryImgMap}
        style={[{ paddingTop: 10 }, { paddingBottom: 10 }, { flex: 1 }]}
        spacing={10}
        renderItem={renderItem}
      />
    </View>
  );
};

export default FlatGridProduct;

import React, { useCallback } from 'react';
import { View, Text, ListRenderItem } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import { CategoryImgMap } from '../types/Product';
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

  const renderItem: ListRenderItem<CategoryItem> = useCallback(
    ({ item }) => (
      <FlatGridItem
        name={item.name}
        imgKey={item.imgKey}
        setName={setName}
      />
    ),
    [setName],
  );

  return (
    <View className={`w-full ${height} bg-white mb-2 shadow-xs`}>
      {/* Title */}
      {title && (
        <View className="flex-row justify-start items-center px-4 pt-2 gap-x-2">
          <Text className="text-black text-2xl font-SpoqaMedium">카테고리별</Text>
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

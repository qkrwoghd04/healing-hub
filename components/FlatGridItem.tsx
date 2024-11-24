import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Asset } from 'expo-asset';

interface ItemProps {
  name: string;
  imgKey: string;
  categoryImages: Record<string, Asset[]>;
  setName: boolean;
}

export function FlatGridItem({ name, imgKey, categoryImages, setName }: ItemProps): JSX.Element {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/category/categoryList',
          params: { category: name }
        })
      }>
      <View className="justify-center items-center rounded-xl px-3 h-[130px] font-Pretendard-Light border-[1px] border-gray-900">
        {categoryImages[imgKey] ? (
          <Image
            source={categoryImages[imgKey][0].uri}
            style={{
              marginBottom: 2,
              width: 56,
              height: 56,
              borderRadius: 15,
            }}
          />
        ) : null}
        {setName && <Text className="mt-2 text-center text-[16px]">{name}</Text>}
      </View>
    </TouchableOpacity>
  );
}

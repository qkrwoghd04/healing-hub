import React from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Asset } from 'expo-asset';
import { usePressAnimation } from '@/hook/usePressAnimation';

interface ItemProps {
  name: string;
  imgKey: string;
  categoryImages: Record<string, Asset[]>;
  setName: boolean;
}

export function FlatGridItem({ name, imgKey, categoryImages, setName }: ItemProps): JSX.Element {
  const { scaleValue, pressHandlers } = usePressAnimation();
  const router = useRouter();

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        {...pressHandlers(() =>
          router.push({
            pathname: '/category/categoryList',
            params: { category: name },
          }),
        )}>
        <View className="justify-center items-center rounded-xl px-3 h-[130px] border-[1px] border-gray-300">
          {categoryImages[imgKey] ? (
            <Image
              source={categoryImages[imgKey][0].uri}
              style={{
                marginBottom: 2,
                width: 56,
                height: 56,
              }}
            />
          ) : null}
          {setName && <Text className="mt-2 text-center font-SpoqaMedium text-[14px]">{name}</Text>}
        </View>
      </Pressable>
    </Animated.View>
  );
}

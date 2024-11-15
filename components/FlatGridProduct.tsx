import React, { useState, useEffect, memo } from 'react';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity } from './StyledComponents'
import { FlatGrid } from 'react-native-super-grid';
import { Asset } from 'expo-asset';

interface FlatGridProductProps {
  dimension: number,
  setName: boolean,
  title: boolean
}

const Categories = [
  { name: '비타민 및 미네랄', imgKey: '비타민_및_미네랄' },
  { name: '콜라겐 및 피부건강', imgKey: '콜라겐_및_피부건강' },
  { name: '소화 및 장 건강', imgKey: '소화_및_장_건강' },
  { name: '오메가3 및 혈관 건강', imgKey: '오메가3_및_혈관_건강' },
  { name: '관절 건강', imgKey: '관절_건강' },
  { name: '면역 강화', imgKey: '면역_강화' },
  { name: '기타 건강 보조제', imgKey: '기타_건강_보조제' },
];

const FlatGridProduct: React.FC<FlatGridProductProps> = ({ dimension, setName, title }) => {
  console.log('FlatGrid Rendered');
  const router = useRouter();
  // categoryImages의 타입을 Record<string, Asset>으로 설정
  const [categoryImages, setCategoryImages] = useState<Record<string, Asset[]>>({});

  useEffect(() => {
    const loadImages = async () => {
      const images = {
        비타민_및_미네랄: await Asset.loadAsync(require('../assets/icons/vitamin.webp')),
        콜라겐_및_피부건강: await Asset.loadAsync(require('../assets/icons/collagen.webp')),
        소화_및_장_건강: await Asset.loadAsync(require('../assets/icons/digestion.webp')),
        오메가3_및_혈관_건강: await Asset.loadAsync(require('../assets/icons/omega3.webp')),
        관절_건강: await Asset.loadAsync(require('../assets/icons/joint.webp')),
        면역_강화: await Asset.loadAsync(require('../assets/icons/immune.webp')),
        기타_건강_보조제: await Asset.loadAsync(require('../assets/icons/others.webp')),
      };
      setCategoryImages(images);
    };

    loadImages();
  }, []);

  return (
    <View className="flex-1 px-2">
      {title && (
        <View className="flex-row justify-start items-center px-4 gap-x-2">
          <Text className="text-black text-2xl font-Pretendard-Medium">카테고리별</Text>
          <FontAwesome5 name="capsules" size={24} color="black" />
        </View>
      )}
      <FlatGrid
        itemDimension={dimension}
        data={Categories}
        style={[
          { paddingTop: 12 },
          { paddingBottom: 12 },
          { flex: 1 },
        ]}
        spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({ pathname: '/category/categoryList', params: { category: item.name } })
            }>
            <View className="justify-center items-center rounded-xl px-3 h-[130px] font-Pretendard-Light bg-white border-[1px] border-gray-900">
              {categoryImages[item.imgKey] ? (
                <Image
                  source={categoryImages[item.imgKey][0].uri}
                  style={{
                    marginBottom: 2,
                    width: 48,
                    height: 48,
                    borderWidth: 2,
                    borderColor: '#000000',
                    borderRadius: 15,
                  }}
                />
              ) : null}
              {setName && <Text className="mt-2 text-center text-sm">{item.name}</Text>}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default memo(FlatGridProduct);

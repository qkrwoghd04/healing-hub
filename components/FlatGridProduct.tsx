import React, { useState, useEffect, memo } from 'react';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image'
import { FlatGrid } from 'react-native-super-grid';
import { Asset } from 'expo-asset';

interface FlatGridProductProps {
  dimension: number;
  setName: boolean;
  title: boolean;
  height: string;
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

const FlatGridProduct: React.FC<FlatGridProductProps> = ({ dimension, setName, title, height }) => {
  console.log("[FlatGrid] Rendered");
  const router = useRouter();
  // categoryImages의 타입을 Record<string, Asset>으로 설정
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

  return (
    <View className={`w-full ${height} bg-white rounded-2xl mb-2`}>
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
        data={Categories}
        style={[{ paddingTop: 10 }, { paddingBottom: 10 }, { flex: 1 }]}
        spacing={10}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({ 
                pathname: '/category/categoryList', 
                params: { category: item.name } 
              })
            }>
            <View className="justify-center items-center rounded-xl px-3 h-[130px] font-Pretendard-Light border-[1px] border-gray-900">
              {categoryImages[item.imgKey] ? (
                <Image
                  source={categoryImages[item.imgKey][0].uri}
                  style={{
                    marginBottom: 2,
                    width: 56,
                    height: 56,
                    borderRadius: 15,
                  }}
                />
              ) : null}
              {setName && <Text className="mt-2 text-center text-[16px]">{item.name}</Text>}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default memo(FlatGridProduct);

import { View, Pressable, Text } from 'react-native';  // Text 추가
import { Image } from 'expo-image'
import { Product } from '@/types/Product'
import { memo } from 'react'
import { FormatPrice } from './functions/FormatPrice'
import { Entypo } from '@expo/vector-icons'

const AdminProductItem = memo(({ item, onDeletePress, onProductPress }: {
  item: Product;
  onDeletePress?: (id: string) => void;
  onProductPress?: (product: Product) => void;
}) => (
  <View className="w-full h-20 flex flex-row justify-start items-center my-1 border-b-[0.5px] border-gray-200">
    <Pressable
      onPress={() => onProductPress?.(item)}
      className="flex-1 h-20 flex-row justify-start items-center">
      <View className="w-[15%] h-full mr-2">
        <Image
          source={{ uri: item.image }}
          style={{
            width: '100%',
            height: '100%',
          }}
          cachePolicy="memory-disk"
        />
      </View>
      <View className="w-[70%] h-full flex justify-center items-start border-l-[0.5px] border-gray-300 px-2">
        <Text className="font-Pretendard-Medium mb-2">{item.name}</Text>
        <Text>{FormatPrice(item.price)}</Text>
      </View>
    </Pressable>
    <Pressable onPress={() => onDeletePress?.(item.id)}>
      <Entypo name="cross" size={30} color="gray" />
    </Pressable>
  </View>
));

AdminProductItem.displayName = 'AdminProductItem';
export default AdminProductItem
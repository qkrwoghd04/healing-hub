import { FlatList } from 'react-native'
import React from 'react'
import { Product } from '@/types/Product'
import AdminProductItem from '@/components/AdminProductItem'

interface AdminProductListProps {
  products: Product[];
  onDeletePress?: (id: string) => void;
  onUpdatePress?: (product: Product) => void;
}

const AdminProductList: React.FC<AdminProductListProps> = ({
  products,
  onDeletePress,
  onUpdatePress
}) => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <AdminProductItem
          item={item}
          onDeletePress={onDeletePress}
          onUpdatePress={onUpdatePress}
        />
      )}
      keyExtractor={item => item.id}
      className="px-4"
      showsVerticalScrollIndicator={false}
      initialNumToRender={100}
      windowSize={5}
    />
  );
};

export default AdminProductList;
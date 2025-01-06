import { View, Alert } from 'react-native'
import React, { useState, useMemo } from 'react'
import SearchBar from '@/components/SearchBar'
import AdminProductList from '@/components/AdminProductList'
import { useProducts } from '@/context/ProductContext'
import { Product } from '@/types/Product'
import { router } from 'expo-router'

const Manage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { products, removeProduct, updateProduct } = useProducts()

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [products, searchQuery])

  // 상품 삭제
  const handleDeletePress = (id: string) => {
    Alert.alert(
      "상품을 삭제하시겠습니까?",
      "삭제한 상품은 복구할 수 없습니다",
      [
        {
          text: '확인',
          onPress: () => {
            try {
              removeProduct(id)
              Alert.alert('상품을 삭제했습니다');
            } catch (error) {
              console.error('Failed to delete product:', error);
            }
          },
        },
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]
    )
  }

  const handleUpdatePress = (product: Product) => {
    console.log(product)
    router.push('/manageProductModal')
  }

  return (
    <View className="flex-1 bg-white">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <AdminProductList
        onDeletePress={handleDeletePress}
        products={filteredProducts}
        onUpdatePress={handleUpdatePress}
      />
    </View>
  )
}

export default Manage
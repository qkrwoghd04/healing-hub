import { View } from 'react-native'
import React, { useState, useMemo } from 'react'
import SearchBar from '@/components/SearchBar'
import AdminProductList from '@/components/AdminProductList'
import { useProducts } from '@/context/ProductContext'
import { Product } from '@/types/Product'

const Manage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { products } = useProducts()

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [products, searchQuery])

  const handleDeletePress = (id: string) => {
    console.log('Delete pressed', id)
  }

  const handleProductPress = (product: Product) => {
    console.log('Product pressed', product)
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
        onProductPress={handleProductPress}
      />
    </View>
  )
}

export default Manage
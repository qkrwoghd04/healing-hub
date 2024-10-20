import React from 'react';
import { SafeAreaView as NativeSafeAreaView } from 'react-native';
import { styled } from "nativewind"

// Components
import HomeHeader from '../../components/headers/HomeHeader'
import HotProductScroll from '../../components/HotProductScroll'
import CallButton from '../../components/CallButton';
import CategoryProductScroll from '../../components/CategoryProductScroll';

// API
import { useProducts } from '../../api/ProductContext';


const SafeAreaView = styled(NativeSafeAreaView );

const HomeScreen = () => {
  // Fetch Products
  const { products } = useProducts(); 
  
  return (
    <SafeAreaView className="flex bg-white/100 relative h-full w-full">
      {/* Only using on dev process */}
      <HomeHeader />
      <HotProductScroll products={products}/>
      <CategoryProductScroll products={products}/>
      <CallButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
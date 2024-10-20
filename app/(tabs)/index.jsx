import React from 'react';
import { SafeAreaView as NativeSafeAreaView } from 'react-native';
import { styled } from "nativewind"

// Components
import HomeHeader from '../../components/headers/HomeHeader'
import HotProductScroll from '../../components/HotProductScroll'
import CallButton from '../../components/CallButton';
import FlatGridProduct from '../../components/FlatGridProduct';

// API
import { useProducts } from '../../api/ProductContext';


const SafeAreaView = styled(NativeSafeAreaView );

const HomeScreen = () => {
  // Fetch Products
  const { products } = useProducts(); 
  
  return (
    <SafeAreaView className="flex bg-white relative h-full w-full">
      {/* Only using on dev process */}
      <HomeHeader />
      <HotProductScroll products={products}/>
      <FlatGridProduct dimension={100} name={true} title={true}/>
      <CallButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
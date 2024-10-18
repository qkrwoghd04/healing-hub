import React from 'react';
import { SafeAreaView as NativeSafeAreaView } from 'react-native';
import { styled } from "nativewind"
// Components
import Header from '../../components/Header'
import HotProductScroll from '../../components/HotProductScroll'
import CallButton from '../../components/CallButton';
import CategoryProductScroll from '../../components/CategoryProductScroll';

const SafeAreaView = styled(NativeSafeAreaView );

const HomeScreen = () => {
  
  return (
    <SafeAreaView className="flex bg-white/100 relative h-full w-full">
      <Header />
      <HotProductScroll />
      <CategoryProductScroll />
      <CallButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
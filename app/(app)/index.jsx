import React from 'react';
import { SafeAreaView } from 'react-native';

// Components
import Header from '../../components/Header'
import HorizontalProductScroll from '../../components/HorizontalProductScroll'
import CallButton from '../../components/CallButton';

const HomeScreen = () => {
  
  return (
    <SafeAreaView className="flex bg-white/100 relative h-full w-full">
      <Header />
      <HorizontalProductScroll />
      <CallButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
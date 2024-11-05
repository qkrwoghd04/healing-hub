import React, { useEffect } from 'react';
import { styled } from "nativewind"
import { SafeAreaView as NativeSafeAreaView, BackHandler, Alert } from 'react-native';

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

  useEffect(() => {
    const backAction = () => {
      Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
        {
          text: '취소',
          onPress: () => null,
          style: 'cancel',
        },
        { 
          text: '종료', 
          onPress: () => BackHandler.exitApp() 
        },
      ]);
      return true; // true를 반환하면 기본 뒤로가기 동작을 막습니다
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
  }, []);
  
  return (
    <SafeAreaView className="flex bg-white relative h-full w-full">
      {/* Only using on dev process */}
      <HomeHeader />
      <HotProductScroll products={products}/>
      <FlatGridProduct dimension={100} setName={true} title={true}/>
      <CallButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
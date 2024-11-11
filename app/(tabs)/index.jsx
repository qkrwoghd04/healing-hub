import React, { useEffect } from 'react';
import { styled } from 'nativewind';
import { SafeAreaView as NativeSafeAreaView, BackHandler, Alert } from 'react-native';

// Components
import HomeHeader from '../../components/headers/HomeHeader';
import HotProductScroll from '../../components/HotProductScroll';
import CallButton from '../../components/CallButton';
import FlatGridProduct from '../../components/FlatGridProduct';

// API
import { useProducts } from '../../api/ProductContext';

const SafeAreaView = styled(NativeSafeAreaView);

const HomeScreen = () => {
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
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
  }, []);

  return (
    <SafeAreaView
      className="flex bg-white relative h-full w-full"
      accessible={true}
      accessibilityLabel="홈 화면"
      accessibilityHint="홈 화면입니다. 상단에는 헤더가 있고, 메인 컨텐츠로 인기 상품 스크롤 목록, 전체 상품 그리드, 그리고 고객센터 연락 버튼이 있습니다.">
      <HomeHeader accessible={true} accessibilityLabel="홈 화면 헤더" />
      <HotProductScroll
        products={products}
        accessible={true}
        accessibilityLabel="인기 상품 목록"
        accessibilityHint="좌우로 스크롤하여 인기 상품을 탐색할 수 있습니다"
      />
      <FlatGridProduct
        dimension={80}
        setName={true}
        title={true}
        accessible={true}
        accessibilityLabel="전체 상품 목록"
        accessibilityHint="그리드 형태로 전체 상품을 보여줍니다"
      />
      <CallButton
        accessible={true}
        accessibilityLabel="고객센터 연락하기"
        accessibilityRole="button"
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
